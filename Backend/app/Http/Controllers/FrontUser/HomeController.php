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

    public function getuseremail(Request $request) {
        $input = $request->input();
        $res = User::where($input)->first();
        return response()->json(['email'=>$res->email]);
    }

    public function getpackagelist(Request $request) {
        $input = $request->input();
        $res = VendorPackage::where('vendor',$input['email'])->get();
        return response()->json($res);
    }
}
