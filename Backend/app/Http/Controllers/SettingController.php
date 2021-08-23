<?php

namespace App\Http\Controllers;

use App\Models\EmailSetting;
use Illuminate\Http\Request;
use App\Models\Setting;
class SettingController extends Controller
{
    public function getStatus(Request $request) {
        $result = Setting::first();
        $result['normal_setting'] = isset($result['normal_setting']) ? unserialize($result['normal_setting']) : [];
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

    public function postEmailSetting(Request $request) {
        return response()->json(EmailSetting::first());
    }

    public function postmodifyEmailCreate(Request $request) {
        $input = $request->input();
        $row = EmailSetting::count();
        if ($row) {
            $item = EmailSetting::first();
            EmailSetting::where('id', $item['id'])->update($input);
        }
        else {
            EmailSetting::create($input);
        }
        return response()->json([ 'success' => true ]);
    }
}
