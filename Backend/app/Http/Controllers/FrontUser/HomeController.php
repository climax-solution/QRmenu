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
use App\Models\User;
use App\Models\VendorPackage;
use Validator;
use Exception;


use Endroid\QrCode\QrCode;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\LabelAlignment;


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


    public function placeorder(Request $request)
    {

        $validate = $this->validation_check($request);
        if (!$validate) return false;
        try {
            $data = $request->input();
            $email = vendor_email($data['subdomain']);
            $subdomain = $data['subdomain'];
            if ($email) {
                unset($data['subdomain']);
                unset($data['domain_url']);
                $data['vendor'] = $email;
                $res = Order::create($data);
                $url = 'http://'. $subdomain .'/track-order?phone='.$res->phone.'&id='.$res->id;
                $qrCode = new QrCode($url);
                $qrCode->setSize(300);
                $qrCode->setMargin(10);
                $qrCode->setEncoding('UTF-8');
                $qrCode->setWriterByName('png');
                $qrCode->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH());
                $qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0, 'a' => 0]);
                $qrCode->setBackgroundColor(['r' => 255, 'g' => 255, 'b' => 255, 'a' => 0]);
                $qrCode->setLogoSize(150, 200);
                $qrCode->setValidateResult(false);
                $qrCode->setRoundBlockSize(true);
                $qrCode->setWriterOptions(['exclude_xml_declaration' => true]);
                header('Content-Type: '.$qrCode->getContentType());
                $file_name= 'qrcode/'.time().'.png';
                $qrCode->writeFile(public_path('/'.$file_name));
                return response()->json(['status'=>true, 'order_id'=>$res->id,'qrcode'=>$file_name]);
            }

            return response()->json(['status'=>false]);
        }
        catch (Exception $error) {
            return response()->json(['status'=>$error]);
        }
    }

    public function getuseremail(Request $request) {
        $input = $request->input();
        $res = User::where($input)->first();
        return response()->json(['email'=>$res->email]);
    }

    public function getpackagelist(Request $request) {
        $data = $request->input();
        $email = vendor_email($data['subdomain']);
        $res = VendorPackage::where('vendor',$email)->get();
        return response()->json($res);
    }

    public function gettrackorder(Request $request) {
        $input = $request->input();
        $res = Order::where('id',$input['id'])->where('phone',$input['phone'])->first();
        return response()->json($res);
    }
}
