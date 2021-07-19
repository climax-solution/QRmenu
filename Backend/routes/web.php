<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $data = [
        "key"               => 123,
        "amount"            => 3212321321,
        "name"              => 'adsfadfadfadf',
        "description"       => 'afadfadfadfadf',
        "prefill"           => [
            "name"              => 'adfadfadfadf',
            "email"             => 'adfadfadadfadf',
            "contact"           => 'adfadsfdsfadsfadsfadsf',
        ],
        "notes"             => [
            "address"           => '122132121221ddddddd',
            "merchant_order_id" => 'dafds1234safa',
        ],
        "order_id"          => '123123213123',
    ];
    $cu = json_encode($data);
    return view('welcome', compact('cu'));
});
