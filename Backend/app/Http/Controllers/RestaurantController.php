<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;
class RestaurantController extends Controller
{
    public function getRestList(Request $request) {
        $res = DB::table('users')
        ->join('packages', 'users.package', '=', 'packages.id')
        ->select('users.*','packages.package_name')->get();
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
