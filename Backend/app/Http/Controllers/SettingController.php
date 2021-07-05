<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
class SettingController extends Controller
{
    public function getStatus(Request $request) {
        return response()->json(Package::first());
    }

    public function postModifyCreate(Request $request) {
        $data = $request->all();
        $check = Package::all();
        if (!count($check)) {
            Package::create($data);
            return response()->json(Package::first());
        }
        else {
            Package::where('id',$data['id'])->update($data);
            return response()->json(Package::first());            
        }
    }
}
