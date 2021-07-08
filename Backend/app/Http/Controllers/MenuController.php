<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VendorCategory;
class MenuController extends Controller
{

    public function getcategorylist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $result = VendorCategory::where('vendor',$user->email)->get();
            return response()->json($result);
        }
        else return response()->json([]);
    }

    public function createcategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            $data['vendor'] = $user->email;
            VendorCategory::create($data);
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }

    public function updatecategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            VendorCategory::where(['vendor'=>$user->email,'id'=>$data['id']])->update($data);
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }

    public function removecategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            VendorCategory::where(['vendor'=>$user->email,'id'=>$data['id']])->delete();
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }
}
