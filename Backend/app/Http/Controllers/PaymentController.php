<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentSetting;
use App\Models\OfflinePayment;
use App\Models\TransactionHistory;

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
        return response()->json(OfflinePayment::all());
    }

    public function transactionhistory(Request $request) {
        return response()->json(TransactionHistory::all());
    }
}
