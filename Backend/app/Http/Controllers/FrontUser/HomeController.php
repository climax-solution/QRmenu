<?php

namespace App\Http\Controllers\FrontUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VendorItem;
use App\Models\VendorSpecial;
use App\Models\VendorCategory;
use App\Models\Order;
use App\Models\OrderConfiguration;
use App\Models\Reservation;
use App\Models\AvaibleDay;
use Validator;
use Exception;
use Srmklive\PayPal\Services\ExpressCheckout;
use Stripe;
use Razorpay\Api\Api;
use Session;

class HomeController extends Controller
{
    public function getspeciallist(Request $request) {
        $validate = $this->validation_check($request);
        if ($validate) {
            try {
                $data = $request->input();
                $email = vendor_email($data['subdomain']);
                if ($email) {
                    return response()->json(VendorSpecial::where('vendor',$email)->get());
                }
            }
            catch (Exception $error) {
                return response()->json([]);
            }
        }
        return false;
    }

    public function getitemlist(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                return response()->json(VendorItem::where('vendor',$email)->get());
            }
        }
        catch (Exception $error) {
            return response()->json([]);
        }
    }

    public function getcategorylist(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                return response()->json(VendorCategory::where('vendor',$email)->get());
            }
        }
        catch (Exception $error) {
            return response()->json([]);
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

    public function getspecialities(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                return response()->json(VendorSpecial::where('vendor',$email)->get());
            }
        }
        catch (Exception $error) {
            return response()->json([]);
        }
    }

    public function placereservation(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                unset($data['subdomain']);
                $data['vendor'] = $email;
                Reservation::create($data);
                return response()->json(['status'=>true]);
            }
        }
        catch (Exception $error) {
            return response()->json($error);
        }
    }

    public function getordertypelist(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                return response()->json(OrderConfiguration::where('user',$email)->first());
            }
        }
        catch (Exception $error) {
            return response()->json($error);
        }
    }

    public function gettimelist(Request $request) {
        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                return response()->json(AvaibleDay::where('user',$email)->first());
            }
        }
        catch (Exception $error) {
            return response()->json([]);
        }
    }

    public function createorder(Request $request) {
        $provider = new ExpressCheckout;
        $response = $provider->getExpressCheckoutDetails($request->token);

        if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {

        }
        else {
            return response()->json(['status'=>false]);
        }
    }


    public function placeorder(Request $request)
    {

        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            if ($email) {
                unset($data['subdomain']);
                unset($data['domain_url']);
                $data['vendor'] = $email;
                Order::create($data);
                return response()->json(['status'=>true]);
            }
            return response()->json(['status'=>false]);
        }
        catch (Exception $error) {
            return response()->json(['status'=>false]);
        }
    }

    /*--------Stripe-----------*/
    public function stripeMethod(Request $request)
    {
        $input = $request->input();
        $Token = $this->getStripeToken($input);
        // dd(gettype($Token));
        if (gettype($Token) == 'object') {
            Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            try {
                $strips = Stripe\Charge::create ([
                    "amount" => $input['total'],
                    "currency" => "usd",
                    "source" => $Token->id,
                    "description" => "This payment is tested purpose phpcodingstuff.com"
                ]);
                $validate = $this->validation_check($request);
                if (!$validate) return false;
                try {
                    $data = $request->input();
                    $email = vendor_email($data['subdomain']);
                    if ($email) {
                        unset($data['subdomain']);
                        unset($data['domain_url']);
                        $data['vendor'] = $email;
                        Order::create($data);
                        return response()->json(['status'=>true]);
                    }
                    return response()->json(['status'=>false]);
                }
                catch (Exception $error) {
                    return response()->json(['status'=>false]);
                }
                return response()->json(['success' => true]);
            }
            catch(Exception $error) {
                return response()->json($error);
            }
        }
        else {
            return response()->json(['status'=>false]);
        }
    }

    public function razorMethod(Request $request)
    {
        $input = $request->all();

        $api = new Api(env('RAZORPAY_KEY'), env('RAZORPAY_SECRET'));

        $payment = $api->payment->fetch($input['razorpay_payment_id']);

        if(count($input)  && !empty($input['razorpay_payment_id'])) {
            try {
                $response = $api->payment->fetch($input['razorpay_payment_id'])->capture(array('amount'=>$payment['amount']));

            } catch (Exception $e) {
                return  $e->getMessage();
                Session::put('error',$e->getMessage());
                return redirect()->back();
            }
        }

        Session::put('success', 'Payment successful');
        return redirect()->back();
    }

    public function getStripeToken($src) {
        $client = new \GuzzleHttp\Client(['verify' => false ]);
		$pubKey = env('STRIPE_KEY');
		$cardNumber = $src['card_number'];
		$cvc = $src['cvc'];
		$expMonth = $src['expire_mm'];
		$expYear = $src['expire_yy'];
		$headers = [
			'Pragma' => 'no-cache',
			'Origin' => 'https://js.stripe.com',
			'Accept-Encoding' => 'gzip, deflate',
			'Accept-Language' => 'en-US,en;q=0.8',
			'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36',
			'Content-Type' => 'application/x-www-form-urlencoded',
			'Accept' => 'application/json',
			'Cache-Control' => 'no-cache',
			'Referer' => 'https://js.stripe.com/v2/channel.html?stripe_xdm_e=http%3A%2F%2Fwww.beanstalk.dev&stripe_xdm_c=default176056&stripe_xdm_p=1',
			'Connection' => 'keep-alive'
		];
		$postBody = [
			'key' => $pubKey,
			'payment_user_agent' => 'stripe.js/Fbebcbe6',
			'card[number]' => $cardNumber,
			'card[cvc]' => $cvc,
			'card[exp_month]' => $expMonth,
			'card[exp_year]' => $expYear,
		];

		try {
            $response = $client->post('https://api.stripe.com/v1/tokens', [
                'headers' => $headers,
                'form_params' => $postBody
            ]);
            $result = json_decode($response->getbody()->getContents());
            // dd(json_decode($response->getbody()->getContents()));
    		return $result;
        }
        catch(Exception $error) {
            return false;
        }
    }
}


