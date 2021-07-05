<?php

namespace App\Http\Controllers;
   
use Illuminate\Http\Request;
use App\Models\Package;
use Validator;

class PkgController extends Controller
{
    public function getPkgList(Request $request) {
        $data = Package::all();
        foreach ($data as $item) {
            $item['package_ability'] = unserialize($item['package_ability']);
        }
        return response()->json(['data'=>$data]);
    }

    public function postAddPkg(Request $request) {
        $validator = Validator::make($request->all(), [
            // 'name' => 'required',
            'package_name' => 'required|unique:packages',
        ]);
   
        if($validator->fails()){
            return response()->json(['status'=>false,'error'=>$validator->errors()]);
        }
        $data = $request->input();
        $data['package_ability'] = serialize($data['package_ability']);
        Package::insert($data);
        $data = Package::all();
        foreach ($data as $item) {
            $item['package_ability'] = unserialize($item['package_ability']);
        }
        return response()->json(['status'=>true, 'data'=>$data]);
    }

    public function postGetItem(Request $request) {
        $id = $request->input();
        $res = Package::where('id',$id['id'])->first();
        $res['package_ability'] = unserialize($res['package_ability']);
        return response()->json($res);
    }

    public function postUpdateItem(Request $request) {
        $data = $request->input();
        $data['package_ability'] = serialize($data['package_ability']);
        Package::where('id',$data['id'])->update($data);
        $res = Package::all();
        foreach ($res as $item) {
            $item['package_ability'] = unserialize($item['package_ability']);
        }
        return response()->json(['status'=>true, 'data'=> $res]);
    }

    public function postDeleteItem($id, Request $request) {
        Package::where('id',$id)->delete();
        $res = Package::all();
        foreach ($res as $item) {
            $item['package_ability'] = unserialize($item['package_ability']);
        }
        return response()->json(['status'=>true, 'data'=> $res]);
    }
}
