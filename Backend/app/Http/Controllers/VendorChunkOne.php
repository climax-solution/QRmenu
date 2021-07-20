<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderConfiguration;
use App\Models\PaymentHistory;
use App\Models\Feature;
use App\Models\Reservation;
use App\Models\Order;
use App\Models\TransactionHistory;
use Exception;
class VendorChunkOne extends Controller
{
    public function modifyorderconfig(Request $request) {
        $input = $request->all();
        $user = auth('api')->user();
        $check = OrderConfiguration::where('user',$user->email)->get();
        try{
            if (count($check)) {
                OrderConfiguration::where('user',$user->email)->update($input);
            }
            else {
                $input['user'] = $user->email;
                OrderConfiguration::create($input);
            }
            return response()->json(['success'=>true]);
        } catch (Exception $err) {
            return response()->json($err);
        }
    }

    public function getconfigsetting(Request $request) {
        $user = auth('api')->user();
        $result = OrderConfiguration::where('user',$user->email)->first();
        return response()->json($result);
    }

    public function vendorpaymenthistory(Request $request) {
        $user = auth('api')->user();
        $result = TransactionHistory::where('username',$user->email)->get();
        return response()->json($result);
    }

    public function featurelist(Request $request) {
        return response()->json(Feature::all());
    }

    public function updatefeature(Request $request) {
        $input = $request->all();
        foreach ($input as $item) {
            Feature::where('id',$item['id'])->update($item);
        }
        return response()->json(['success'=>true]);
    }

    public function reservation_list(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $email = $user->email;
            $sort = $request->input('sort');
            $where = ['vendor' => $email];
            if ($sort == 'today') $where['created_at'] = date('y-m-d');
            return response()->json(Reservation::where($where)->get());
        }
    }

    public function updateitem(Request $request) {
        $data = $request->all();
        Reservation::where('order_id',$data['order_id'])->update($data);
        return response()->json(['success'=>true]);
    }

    public function getkds(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $email = $user->email;
            $new = Order::where(['vendor'=>$email, 'status' => '0'])->count();
            $accept = Order::where(['vendor'=>$email, 'status' => '1'])->count();
            $complete = Order::where(['vendor'=>$email, 'status' => '2'])->count();
            $response = [
                'data'=>['new'=>$new, 'accept'=>$accept, 'complete'=>$complete],
                'status'=>true
            ];
            return response()->json($response);
        }
        return false;
    }

    public function getnotificationdata(Request $request) {

    }
}
