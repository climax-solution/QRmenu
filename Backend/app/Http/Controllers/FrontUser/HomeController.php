<?php

namespace App\Http\Controllers\FrontUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VendorItem;
use App\Models\VendorSpecial;
use App\Models\VendorCategory;
use App\Models\Order;
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
                return response()->json($error);
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
            return response()->json($error);
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
            return response()->json($error);
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
            return response()->json($error);
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
                Order::create($data);
            }
        }
        catch (Exception $error) {
            return response()->json($error);
        }
    }
}
