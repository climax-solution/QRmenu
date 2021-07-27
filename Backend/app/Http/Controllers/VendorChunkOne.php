<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrderConfiguration;
use App\Models\PaymentHistory;
use App\Models\Feature;
use App\Models\Reservation;
use App\Models\Order;
use App\Models\TransactionHistory;
use App\Models\VendorItem;
use App\Models\VendorSpecial;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\fileExists;

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
        $user = auth('api')->user();
        $date = date('Y-m-d');
        $order = Order::where(['vendor'=>$user->email,'view_status'=>'0', 'status'=>'0'])->where('created_at','like',$date.'%')->count();
        $reservation = Reservation::where(['vendor'=>$user->email,'status'=>'0'])->where('created_at','like',$date.'%')->count();
        return response()->json(['order'=>$order, 'reservation'=>$reservation]);
    }

    public function getorderitem(Request $request) {
        $input = $request->input();
        Order::where($input)->update(['view_status'=>'1']);
        $src = Order::where($input)->first();
        $data = json_decode($src->carts);
        foreach ($data as $item) {
            if ( $item->type == 'item' ) {
                $ITEMS = VendorItem::where('id',$item->id)->first();
                $item->item_name = $ITEMS->title;
            }
            else {
                $ITEMS = VendorSpecial::where('id',$item->id)->first();
                $item->item_name = $ITEMS->special_name;
            }
        }
        return response()->json($data);
    }

    public function backupDB(){
        $DbName = env('DB_DATABASE');
        $get_all_table_query = "SHOW TABLES ";
        $result = DB::select(DB::raw($get_all_table_query));

        $prep = "Tables_in_$DbName";
        foreach ($result as $res){
            $tables[] =  $res->$prep;
        }



        $connect = DB::connection()->getPdo();

        $get_all_table_query = "SHOW TABLES";
        $statement = $connect->prepare($get_all_table_query);
        $statement->execute();
        $result = $statement->fetchAll();


        $output = '';
        foreach($tables as $table)
        {
            $show_table_query = "SHOW CREATE TABLE " . $table . "";
            $statement = $connect->prepare($show_table_query);
            $statement->execute();
            $show_table_result = $statement->fetchAll();

            foreach($show_table_result as $show_table_row)
            {
                $output .= "\n\n" . $show_table_row["Create Table"] . ";\n\n";
            }
            $select_query = "SELECT * FROM " . $table . "";
            $statement = $connect->prepare($select_query);
            $statement->execute();
            $total_row = $statement->rowCount();

            for($count=0; $count<$total_row; $count++)
            {
                $single_result = $statement->fetch(\PDO::FETCH_ASSOC);
                $table_column_array = array_keys($single_result);
                $table_value_array = array_values($single_result);
                $output .= "\nINSERT INTO $table (";
                $output .= "" . implode(", ", $table_column_array) . ") VALUES (";
                $output .= "'" . implode("','", $table_value_array) . "');\n";
            }
        }
        $file_name = 'database_backup_on_' . date('y-m-d') . '.sql';
        if (fileExists($file_name)) unlink($file_name);
        $file_handle = fopen($file_name, 'w+');
        fwrite($file_handle, $output);
        fclose($file_handle);
        return response()->download(public_path($file_name));
    }
}
