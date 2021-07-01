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
    // Authentication
Route::post('login', [AuthController::class, 'postLogin']);
Route::post('signup', [AuthController::class, 'postSignup']);
Route::post('forgot-password', [AuthController::class, 'postForgotPassword']);
Route::get('user', [AuthController::class, 'getUser']);
Route::get('logout', [AuthController::class, 'getLogout']);