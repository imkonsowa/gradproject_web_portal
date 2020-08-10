<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Yajra\DataTables\Facades\DataTables;

class AdminEmployeesAPIController extends Controller
{
    public function getEmployeesFeatures()
    {
        $employees = Employee::query()->select(['id', 'features'])->get()->map(function ($employee) {
            return ["$employee->id" => $employee->features];
        });

        return Response::json([
            'employees' => $employees
        ]);
    }

    public function createEmployee(Request $request)
    {
        $employee = Employee::query()->create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);

        $employee->update([
            'cover' => $employee->addMediaFromRequest('cover')
                ->toMediaCollection('cover')
                ->getUrl()
        ]);

        return Response::json([
            'employee' => $employee
        ]);
    }

    public function employeesDatatable()
    {
        return DataTables::of(Employee::query())->make(true);
    }
}
