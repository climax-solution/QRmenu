<?php

namespace App\Http\Controllers;

use App\Events\LiveStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Password;
use Exception;
use App\Http\Resources\Auth as AuthResource;
use App\Models\Order;
use App\Models\Reservation;
use Pusher\Pusher;

class AuthController extends BaseController
{
    /**
     * Sign Up api
     *
     * @return \Illuminate\Http\Response
     */
    public function postSignup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                // 'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required',
                'website' => 'required',
                'username' => 'required|unique:users'
            ]);

            if($validator->fails()){
                return $this->sendError('Validation Error.', $validator->errors());
            }
            $input = $request->all();
            $input['password'] = bcrypt($input['password']);
            $user = User::create($input);
            $success['email'] =  $input['email'];
        } catch (Exception $exception) {
            return $this->sendError($exception->getMessage());
        }

        return $this->sendResponse($success, 'User signup successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function postLogin(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'status'=> '1'])){
            $user = Auth::user();

            // if ($user->email_verified_at === null)
            //     return $this->sendError('Email no verificated.');

            $user->tokenResult = $user->createToken($user->email);
            $options = array(
                'cluster' => 'mt1',
                'encrypted' => false
            );
            $pusher = new Pusher(
                env('PUSHER_APP_KEY'),
                env('PUSHER_APP_SECRET'),
                env('PUSHER_APP_ID'),
                $options
            );

            // if ($user->permission == 'vendor') {
            //     $user = auth('api')->user();
            //     $date = date('Y-m-d');
            //     $order = Order::where(['vendor'=>$user->email,'view_status'=>'0', 'status'=>'0'])->where('created_at','like',$date.'%')->count();
            //     $reservation = Reservation::where(['vendor'=>$user->email,'status'=>'0'])->where('created_at','like',$date.'%')->count();
            //     $data = [
            //         'id' => $user->id,
            //         'list' => [
            //             'order' => $order,
            //             'reservation' => $reservation
            //         ]
            //     ];
            //     $pusher->trigger('messages', 'chat.'.$user->id, $data);
            // }
            return $this->sendResponse(new AuthResource($user), 'User login successfully.');
        }
        else{
            return $this->sendError('Invalid Credentials.', ['email' => __('auth.failed')]);
        }
    }

    /**
     * Create token password reset
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function postForgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? $this->sendResponse([], __($status))
            : $this->sendError('Email sending error.', ['email' => __($status)]);
    }

    /**
     * Fetch auth data
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function getUser(Request $request)
    {
        $user = auth('api')->user();

        return $this->sendResponse(new AuthResource($user), 'User fetch successfully.');
    }

    /**
     * Logout
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function getLogout(Request $request)
    {
        auth()->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'logout'
        ], 200);
    }

    public function postCheckToken(Request $request) {
        $user = auth('api')->user();
        return $this->sendResponse(new AuthResource($user), 'User fetch successfully.');
    }

    public function resetPassword(Request $request) {
        $input = $request->input();
        $input['password'] = bcrypt(1234);
        User::where('id',$input['id'])->update($input);
        return response()->json(['status'=>true]);
    }
}
