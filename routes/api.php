<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::group(['prefix' => 'admin', 'namespace' => 'API\Admin'], function () {
        Route::get('employees-features', 'AdminEmployeesAPIController@getEmployeesFeatures');
        Route::post('employees', 'AdminEmployeesAPIController@createEmployee');
        Route::post('employees/datatable', 'AdminEmployeesAPIController@employeesDatatable');
    });
});

Route::post('employee/{id}/features-array', function (Request $request, $id) {
    $employee = \App\Models\Employee::query()->find($id);

    $employee->update([
        'features' => $request->input('features')
    ]);

    return [
        'employee' => $employee
    ];
});
