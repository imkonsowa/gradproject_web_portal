<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthAPIController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => true,
                'silent' => true
            ], 200);

        } else {
            return response()->json([
                'error' => 'invalid_credentials',
                'silent' => true
            ], 422);
        }
    }

}
