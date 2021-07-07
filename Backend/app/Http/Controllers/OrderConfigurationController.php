<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderConfiguration;
use Exception;
class OrderConfigurationController extends Controller
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
}
