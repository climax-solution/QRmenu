<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\User;
use App\Models\VendorItem;
use App\Models\VendorSpecial;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function admin(Request $request) {
        $total_user = User::count();
        $new_user = User::where('status','0')->count();
        $blocked_user = User::where('status','-1')->count();
        $total_pkg = Package::count();
        $res = [
            'total_user' => $total_user,
            'new_user' => $new_user,
            'blocked_user' => $blocked_user,
            'total_pkg' => $total_pkg
        ];
        return response()->json($res);
    }

    public function vendor(Request $request) {
        $user = auth('api')->user();
        $menu = VendorItem::where('vendor',$user->email)->count();
        $special = VendorSpecial::where('vendor',$user->email)->count();
        $USER = User::where('email',$user->email)->first();
        $activepkg = Package::select('package_name')->where('id',$USER['package'])->first();
        $join_date = $user->created_at;
        $res = [
            'menu' => $menu,
            'special' => $special,
            'activepkg' => $activepkg['package_name'],
            'join_date' => $join_date,
            'earning' => $USER->earning
        ];
        return response()->json($res);
    }
}
