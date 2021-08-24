<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class BroadCastingController extends Controller
{
    public function index(Request $req) {
        return Broadcast::auth($req);
    }
}
