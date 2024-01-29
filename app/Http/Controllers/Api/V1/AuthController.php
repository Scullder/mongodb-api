<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Mongodb\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $credentials = $request->validated();

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Invalid login attempt'
            ], 400);
        }

        $user = Auth::user(); 
        $token = $user->createToken('api')->plainTextToken;

        return response([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        Auth::user()->currentAccessToken()->delete();

        return response('', 204);
    }
}
