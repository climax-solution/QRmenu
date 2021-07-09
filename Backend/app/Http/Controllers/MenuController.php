<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VendorCategory;
use App\Models\VendorItem;
use App\Models\VendorSpecial;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{

    public function getcategorylist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $result = VendorCategory::where('vendor',$user->email)->get();
            return response()->json($result);
        }
        else return response()->json([]);
    }

    public function createcategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            $data['vendor'] = $user->email;
            VendorCategory::create($data);
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }

    public function updatecategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            VendorCategory::where(['vendor'=>$user->email,'id'=>$data['id']])->update($data);
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }

    public function removecategory(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->all();
            VendorCategory::where(['vendor'=>$user->email,'id'=>$data['id']])->delete();
            return response()->json(['status'=>true,'data'=>VendorCategory::where('vendor',$user->email)->get()]);
        }
        else return response()->json(['status'=>true]);
    }

    public function createitem(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            try{
                $data = $request->input();
                $data['vendor'] = $user->email;
                $data['img_url'] = $this->file_upload($request->file('image'));
                VendorItem::create($data);
                return response()->json(['status'=>true,'data'=>VendorItem::where('vendor',$user->email)->get()]);
            }
            catch(Exception $error) {
                return response()->json(['status'=>false]);
            }
        }
    }

    public function itemlist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            return response()->json(VendorItem::where('vendor',$user->email)->get());
        }
    }

    public function updateitem(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->input();
            if ($request->file('image')) {
                Storage::disk('custom')->delete($data['img_url']);
                $data['img_url'] = $this->file_upload($request->file('image'));
            }
            $data['vendor'] = $user->email;
            VendorItem::where(['vendor'=>$user->email, 'id'=>$data['id']])->update($data);
            return response()->json(['status'=>true,'data'=>VendorItem::where('vendor',$user->email)->get()]);
        }
    }

    public function removeitem(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->input();
            $check = VendorItem::where($data)->first();
            Storage::disk('custom')->delete($check['img_url']);
            $check = VendorItem::where($data)->delete();
            return response()->json(['status'=>true,'data'=>VendorItem::where('vendor',$user->email)->get()]);
        }
    }

    public function speciallist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            return response()->json(VendorSpecial::where('vendor',$user->email)->get());
        }
    }

    public function createspecial(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            try{
                $data = $request->input();
                $data['vendor'] = $user->email;
                $data['img_url'] = $this->file_upload($request->file('image'));
                VendorSpecial::create($data);
                return response()->json(['status'=>true,'data'=>VendorSpecial::where('vendor',$user->email)->get()]);
            }
            catch(Exception $error) {
                return response()->json(['status'=>false]);
            }
        }
    }

    public function updatespecial(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->input();
            if ($request->file('image')) {
                Storage::disk('custom')->delete($data['img_url']);
                $data['img_url'] = $this->file_upload($request->file('image'));
            }
            $data['vendor'] = $user->email;
            VendorSpecial::where(['vendor'=>$user->email, 'id'=>$data['id']])->update($data);
            return response()->json(['status'=>true,'data'=>VendorSpecial::where('vendor',$user->email)->get()]);
        }
    }

    public function removespecial(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->input();
            $check = VendorSpecial::where($data)->first();
            Storage::disk('custom')->delete($check['img_url']);
            $check = VendorSpecial::where($data)->delete();
            return response()->json(['status'=>true,'data'=>VendorSpecial::where('vendor',$user->email)->get()]);
        }
    }

    public function file_upload($file) {
        $name = $file->getClientOriginalName();
        $ext = $file->extension();
        $name = md5($name) .time();
        Storage::disk('custom')->putFileAs('/', $file, $name.'.'.$ext);
        return $name.'.'.$ext;
    }

    public function orderlist(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            return response()->json(Order::where('vendor',$user->email)->orderBy('created_at','desc')->get());
        }
        else return response()->json([]);
    }

    public function updateorder(Request $request) {
        $user = auth('api')->user();
        if ($user) {
            $data = $request->input();
            Order::where(['vendor'=>$user->email,'id'=>$data['id']])->update($data);
            return response()->json(['status'=>true, 'data' => Order::where('vendor',$user->email)->orderBy('created_at','desc')->get()]);
        }
        else return response()->json([]);
    }
}
