<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\ExpressCheckout;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Razorpay\Api\Api;
use App\Models\TransactionHistory;
use App\Models\PaymentSetting;
use App\Models\User;
use Exception;
use Session;
use Validator;
use Illuminate\Support\Str;

class SubscriptPayController extends Controller
{
    public function paypalTrans(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $user = auth('api')->user();
            if ($user) {
                unset($data['subdomain']);
                $data['vendor'] = $user->email;
                $data['payment'] = 0;
                $data['status'] = 1;
                TransactionHistory::create($data);
                User::where('email',$user->email)->update(['package'=>$data['package']]);
                return response()->json(['status'=>true,'user'=>User::where('email',$user->email)->first()]);
            }
            return response()->json(['status'=>false]);
        }
        catch (Exception $error) {
            return response()->json(['status'=>false]);
        }
    }



    public function validation_check($request) {
        $validator = Validator::make($request->all(), [
            'subdomain'=>'required'
        ]);
        if ($validator->fails()) {
            return false;
        }
        return true;
    }

    public function paypalMethod(Request $request){
        $setting = PaymentSetting::first();
        if (!$setting) {
            return response()->json(['status'=>false]);
        }
        $paypal_email = $setting['paypal_email'];
        if ( !$paypal_email ) return response()->json(['status'=>false]);
        $input = $request->input();
        $return_url = $input['domain_url'].'?status=success&type=paypal';
        $cancel_url = $input['domain_url'].'?status=failure&type=paypal';
        //  $notify_url = action('User\PaypalController@notify');
        $item_name = Str::random(4).time()." Plan";
        $item_number = Str::random(4).time();
        $item_amount = $input['price'];
        $querystring = '';
        // Firstly Append paypal account to querystring
        $querystring .= "?business=".urlencode($paypal_email)."&";

        // Append amount& currency (£) to quersytring so it cannot be edited in html

        //The item name and amount can be brought in dynamically by querying the $input['item_number'] variable.
        $querystring .= "item_name=".urlencode($item_name)."&";
        $querystring .= "amount=".urlencode($item_amount)."&";
        $querystring .= "item_number=".urlencode($item_number)."&";

        $querystring .= "cmd=".urlencode(stripslashes('_xclick'))."&";
        $querystring .= "bn=".urlencode(stripslashes('PP-BuyNowBF:btn_buynow_LG.gif:NonHostedGuest'))."&";
        $querystring .= "lc=".urlencode(stripslashes('RU'))."&";
        $querystring .= "currency_code=".urlencode(stripslashes('NOK'))."&";

        // Append paypal return addresses
        $querystring .= "return=".urlencode(stripslashes($return_url))."&";
        $querystring .= "cancel_return=".urlencode(stripslashes($cancel_url))."&";
        //  $querystring .= "notify_url=".urlencode($notify_url)."&";

        $querystring .= "custom=1";
        // Redirect to paypal IPN
        $hostname = $setting['paypal_status'] ? 'https://www.paypal.com/cgi-bin/webscr' : 'https://www.sandbox.paypal.com/cgi-bin/webscr';
        return response()->json(['url'=>$hostname.$querystring]);
    }

    public function stripeMethod(Request $request){
        $input = $request->input();
        $item_name = Str::random(4).time()." Plan";
        $item_number = Str::random(4).time();
        $item_amount = $input['price'];
        $item_currency = 'NOK';
        $src = PaymentSetting::first();
        if ( !$src ) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $secret = $src['stripe_secret_key'];
        if (!$secret) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $stripe = Stripe::make($secret);
        try{
            $token = $stripe->tokens()->create([
                'card' =>[
                    'number' => $input['card_number'],
                    'exp_month' => $input['expire_mm'],
                    'exp_year' => $input['expire_yy'],
                    'cvc' => $input['cvc'],
                ],
            ]);
            if (!isset($token['id'])) {
                return response()->json(['status'=>false, 'message' => 'Token Problem With Your Token.']);
            }
            $charge = $stripe->charges()->create([
                'card' => $token['id'],
                'currency' => $item_currency,
                'amount' => $item_amount,
                'description' => $item_name,
            ]);
            $create = [
                'package' => $input['package'],
                'price' => $input['price'],
                'status' => 1,
                'payment' => 1
            ];
            TransactionHistory::create($create);
            return response()->json(['status'=>false, 'message' => 'Transferred Succesfully!']);

        }catch (Exception $e){
            return back()->with('unsuccess', $e->getMessage());
        }catch (\Cartalyst\Stripe\Exception\CardErrorException $e){
            return back()->with('unsuccess', $e->getMessage());
        }catch (\Cartalyst\Stripe\Exception\MissingParameterException $e){
            return back()->with('unsuccess', $e->getMessage());
        }
        return response()->json(['status'=>false, 'message' => 'Please Enter Valid Credit Card Informations.']);
    }

    public function razorMethod(Request $request)
    {

        $input = $request->input();
        $this->displayCurrency = 'NOK';
        $src = PaymentSetting::first();
        if ( !$src ) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $secret = $src['razor_secret'];
        $keyId = $src['razor_key'];
        if (!$secret) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $user = auth('api')->user();
        $API = new Api($keyId, $secret);
        $item_name = Str::random(4)." Plan";
        $item_number = Str::random(4).time();
        $item_amount = $input['price'];

        $orderData = [
            'receipt'         => $item_number,
            'amount'          => $item_amount * 100, // 2000 rupees in paise
            'currency'        => 'INR',
            'payment_capture' => 1 // auto capture
        ];

        $razorpayOrder = $API->order->create($orderData);

        $razorpayOrderId = $razorpayOrder['id'];

        session(['razorpay_order_id'=> $razorpayOrderId]);

        $displayAmount = $amount = $orderData['amount'];

        if ($this->displayCurrency !== 'INR')
        {
            $url = "https://api.fixer.io/latest?symbols=$this->displayCurrency&base=INR";
            $exchange = json_decode(file_get_contents($url), true);
            $displayAmount = $exchange['rates']['NOK'] * $amount / 100;
        }

        $data = [
            "key"               => $keyId,
            "amount"            => $amount,
            "name"              => $item_name,
            "description"       => $item_name,
            "prefill"           => [
                "name"              => $user->username,
                "email"             => $user->email,
                "contact"           => $user->whatsapp,
            ],
            "notes"             => [
                "address"           => Str::random(15),
                "merchant_order_id" => $item_number,
            ],
            "order_id"          => $razorpayOrderId,
        ];

        if ($this->displayCurrency !== 'INR')
        {
            $data['display_currency']  = $this->displayCurrency;
            $data['display_amount']    = $displayAmount;
        }

        $json = json_encode($data);
        $displayCurrency = $this->displayCurrency;
        return response()->json(['options'=>$data]);
    }

    public function razorResult(Request $request){

        $success = true;

        $error = "Payment Failed";

        $input = $request->input();
        $this->displayCurrency = 'INR';
        $src = PaymentSetting::first();
        if ( !$src ) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $secret = $src['razor_secret'];
        $keyId = $src['razor_key'];
        if (!$secret) {
            return response()->json(['status'=>false, 'message' => 'Setting Error.']);
        }
        $API = new Api($keyId, $secret);
        if (empty($input['razorpay_payment_id']) === false)
        {
            try
            {
                $attributes = array(
                    'razorpay_order_id' => $input['razorpay_order_id'],
                    'razorpay_payment_id' => $input['razorpay_payment_id'],
                    'razorpay_signature' => $input['razorpay_signature']
                );

                $API->utility->verifyPaymentSignature($attributes);
            }
            catch(Exception $e)
            {
                $success = false;
                $error = 'Razorpay Error : ' . $e->getMessage();
            }
        }

        if ($success === true)
        {

            $razorpayOrder = $API->order->fetch($input['razorpay_order_id']);
            unset($input['razorpay_order_id']);
            $user = auth('api')->user();
            $order_id = $razorpayOrder['receipt'];
            $transaction_id = $input['razorpay_payment_id'];
            $input['txnid'] = $transaction_id;
            $input['status'] = 1;
            $input['username'] = $user->username;
            TransactionHistory::create($input);
            return response()->json(['status'=>true]);
        }
        else{
            return response()->json(['status'=>false]);
        }
    }

    public function bamboraMethod(Request $REQ) {
        $setting = PaymentSetting::first();
        if (!$setting) {
            return response()->json(['status'=>false]);
        }
        $bambora = $setting['bambora_merchant'];
        if ( !$bambora ) return response()->json(['status'=>false]);
        $accessToken = $setting['bambora_access_key'];
        $merchantNumber = $setting['bambora_merchant'];
        $secretToken = $setting['bambora_secret_key'];
        $apiKey = base64_encode(
        $accessToken . "@" . $merchantNumber . ":" . $secretToken
        );
        $checkoutUrl = "https://api.v1.checkout.bambora.com/sessions";

        $request = array();
        $request["order"] = array();
        $request["order"]["id"] = Str::random(7);
        $request["order"]["amount"] = $REQ->price;
        $request["order"]["currency"] = "NOK";

        $request["url"] = array();
        $request["url"]["accept"] = $REQ->domain_url."?type=bambora&status=success";
        $request["url"]["cancel"] = $REQ->domain_url."?type=bambora&status=failure";
        $request["url"]["callbacks"] = array();
        $request["url"]["callbacks"][] = array("url" => "https://example.org/callback");

        $request["subscription"] = array();
        $request["subscription"]["action"] = "create";
        $request["subscription"]["description"] = "Bambora checkout subscription example";
        $request["subscription"]["reference "] = $merchantNumber;

        $requestJson = json_encode($request);
        $contentLength = isset($requestJson) ? strlen($requestJson) : 0;
        $headers = array(
            'Content-Type: application/json',
            'Content-Length: ' . $contentLength,
            'Accept: application/json',
            'Authorization: Basic ' . $apiKey
        );

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_POSTFIELDS, $requestJson);
        curl_setopt($curl, CURLOPT_URL, $checkoutUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_FAILONERROR, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $rawResponse = curl_exec($curl);
        $response = json_decode($rawResponse);
        return response()->json($response);
    }

    public function bamboraTrans(Request $request) {
        try {
            $data = $request->input();
            $user = auth('api')->user();
            if ($user) {
                $data['vendor'] = $user->email;
                $data['payment'] = 0;
                $data['status'] = 3;
                TransactionHistory::create($data);
                User::where('email',$user->email)->update(['package'=>$data['package']]);
                return response()->json(['status'=>true,'user'=>User::where('email',$user->email)->first()]);
            }
            return response()->json(['status'=>false]);
        }
        catch (Exception $error) {
            return response()->json(['status'=>false]);
        }
    }

    public function offlineMethod(Request $request) {
        $input = $request->input();
        $user = auth('api')->user();
        if (!$user) {
            return response()->json(['status'=>false]);
        }
        $input['username'] = $user->email;
        TransactionHistory::create($input);
        User::where('email',$data['username'])->update(['package'=>$data['package'], 'package_status'=>0]);
        return response()->json(['status'=>true]);
    }
}
