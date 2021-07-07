<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderConfiguration;
use App\Models\PaymentHistory;
use App\Models\Feature;
use Exception;
class VendorChunkOne extends Controller
{
    public function modifyorderconfig(Request $request) {
        $input = $request->all();
        $user = auth('api')->user();
        $check = OrderConfiguration::where('user',$user->email)->get();
        try{
            if (count($check)) {
                OrderConfiguration::where('user',$user->email)->update($input);
            }
            else {
                $input['user'] = $user->email;
                OrderConfiguration::create($input);
            }
            return response()->json(['success'=>true]);
        } catch (Exception $err) {
            return response()->json($err);
        }
    }

    public function getconfigsetting(Request $request) {
        $user = auth('api')->user();
        $result = OrderConfiguration::where('user',$user->email)->first();
        return response()->json($result);
    }

    public function vendorpaymenthistory(Request $request) {
        $user = auth('api')->user();
        $result = PaymentHistory::where('user',$user->email)->get();
        return response()->json($result);
    }

    public function featurelist(Request $request) {
        return response()->json(Feature::all());
    }

    public function updatefeature(Request $request) {
        $input = $request->all();
        foreach ($input as $item) {
            Feature::where('id',$item['id'])->update($item);
        }
        return response()->json(['success'=>true]);
    }
}
