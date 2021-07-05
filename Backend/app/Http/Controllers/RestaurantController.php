<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use Validator;
class RestaurantController extends Controller
{
    public function getRestList(Request $request) {
        return response()->json(Restaurant::all());
    }

    public function postAddUser(Request $request) {
        $validator = Validator::make($request->all(), [
            // 'name' => '  required',
            'email' => 'required|email|unique:users',
            'username' => 'required',
            'packages' => 'required',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json(['status'=>false,$validator->errors()]);
        }

        $data = $request->input();
        $data['password'] = bcrypt($data['password']);
        Restaurant::create($data);
        return response()->json(['status'=>true]);
    }
}
