<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;
class RestaurantController extends Controller
{
    public function getRestList(Request $request) {
        $res = User::where('permission', 'vendor')->get();
        foreach($res as $item) {
            $package = Package::where('id',$item->package)->select('package_name')->first();
            $item->package_name = $package->package_name;
        }
        return response()->json($res);
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
        User::create($data);
        return response()->json(['status'=>true]);
    }

    public function updateuser(Request $request) {
        $input = $request->input();
        User::where(['id'=>$input['id'], 'permission'=>'vendor'])->update($input);
        return response()->json(User::where('permission','vendor')->get());
    }
}
