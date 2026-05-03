<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // ➕ Add Employee
    public function addEmployee(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'employee'
        ]);

        return response()->json([
            'message' => 'Employee created successfully',
            'user' => $user
        ], 201);
    }

    // 📋 List Employees
    public function listEmployees()
    {
        $employees = User::where('role', 'employee')->get();

        return response()->json([
            'employees' => $employees
        ]);
    }
}