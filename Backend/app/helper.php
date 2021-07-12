<?php
use App\Models\User;

if (!function_exists('vendor_email')) {
    function vendor_email($url) {
        $user = User::where('subdomain',$url)->first();
        return $user->email;
    }
}