<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentSetting;
use App\Models\OfflinePayment;
use App\Models\TransactionHistory;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class PaymentController extends Controller
{
    public function postModifyPayment(Request $request) {
        $check = PaymentSetting::all();
        $data = $request->all();
        if ( !count($check) ) {
            PaymentSetting::create($data);
        }
        else {
            PaymentSetting::where('id', $check[0]['id'])->update($data);
        }
        return response()->json(['success'=>true]);
    }

    public function getPaymentSettings(Request $request) {
        return response()->json(PaymentSetting::first());
    }

    public function offlinepayment(Request $request) {
        return response()->json(TransactionHistory::where('payment','4')->get());
    }

    public function transactionhistory(Request $request) {
        return response()->json(TransactionHistory::all());
    }

    public function approvetransaction(Request $request) {
        TransactionHistory::where(['id'=>$request->id, 'username'=>$request->email])->update(['status'=>1]);
        User::where(['email'=>$request->email, 'package'=> $request->package])->update(['package_status'=>1]);
        return response()->json(['status'=>true]);
    }
}
