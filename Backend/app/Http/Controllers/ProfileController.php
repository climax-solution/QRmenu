<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\AvaibleDay;
use Exception;
class ProfileController extends Controller
{
    public function getlistprofile(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            return response()->json(User::where('email',$user->email)->first());
        }
    }

    public function updateprofile(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            try {
                $data = $request->all();
                User::where('email',$user->email)->update($data);
                return response()->json(['success'=>true]);
            }
            catch(Exception $err) {
                return response()->json(['success'=>false]);
            }
        }
    }

    public function gettimelist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            return response()->json(AvaibleDay::where('user',$user->email)->first());
        }
    }

    public function updatetimelist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            try {
                $data = $request->all();
                $check = AvaibleDay::where('user',$user->email)->get();
                $data['user'] = $user->email;
                if (!count($check)) {
                    AvaibleDay::create($data);
                }
                else {
                    AvaibleDay::where('user',$user->email)->update($data);
                }
                return response()->json(['success'=>true]);
            }
            catch(Exception $err) {
                return response()->json(['success'=>false]);
            }
        }
        else {
            // return response()->json($user);

        }
    }
}
