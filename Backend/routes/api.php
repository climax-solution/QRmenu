<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PkgController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\PaymentController;
// Authentication
Route::post('login', [AuthController::class, 'postLogin']);
Route::post('signup', [AuthController::class, 'postSignup']);
Route::post('forgot-password', [AuthController::class, 'postForgotPassword']);
Route::get('user', [AuthController::class, 'getUser']);
Route::get('logout', [AuthController::class, 'getLogout']);
Route::post('check-token', [AuthController::class, 'postCheckToken']);

//Package Management
Route::get('pkglist', [PkgController::class, 'getPkgList']);
Route::post('addpkg', [PkgController::class, 'postAddPkg']);
Route::post('pkgitem', [PkgController::class, 'postGetItem']);
Route::post('editpkg', [PkgController::class, 'postUpdateItem']);
Route::delete('deletepkg/{id}', [PkgController::class, 'postDeleteItem']);

//Manage Restaurant
Route::get('restaurantlist', [RestaurantController::class, 'getRestList']);
Route::post('adduser',[RestaurantController::class, 'postAddUser']);

//Site Setting
Route::get('settingstatus', [SettingController::class, 'getStatus']);
Route::post('modifycreate', [SettingController::class, 'postModifyCreate']);

//Payment Setting
Route::post('modifycreate_payment', [PaymentController::class, 'postModifyPayment']);
Route::get('paymentsettings', [PaymentController::class, 'getPaymentSettings']);
Route::get('offlinepayment', [PaymentController::class, 'offlinepayment']);
Route::get('transactionhistory', [PaymentController::class, 'transactionhistory']);
