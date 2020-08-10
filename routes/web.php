<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('testing', function () {
    \App\User::query()->create([
        'name' => 'Admin',
        'email' => 'admin@system.com',
        'password' => \Illuminate\Support\Facades\Hash::make(123456789)
    ]);
});

Route::any('/login', 'API\AuthAPIController@login');

Route::get('{path}', function () {
    return view('app');
})->where('path', '^(?!.*(api|sanctum|broadcasting)).*$');
