<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
class SettingController extends Controller
{
    public function getStatus(Request $request) {
        $result = Setting::first();
        $result['normal_setting'] = unserialize($result['normal_setting']);
        return response()->json($result);
    }

    public function postModifyCreate(Request $request) {
        $data = $request->all();
        $check = Setting::all();
        if (isset($data['normal_setting'])) $data['normal_setting'] = serialize($data['normal_setting']);
        if (!count($check)) {
            Setting::insert($data);
            return response()->json(Setting::first());
        }
        else {
            Setting::where('id',$check[0]['id'])->update($data);
            return response()->json(Setting::first());            
        }
    }
}
