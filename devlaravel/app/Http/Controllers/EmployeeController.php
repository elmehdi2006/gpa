<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

// /employee?is_archived=0|1
class EmployeeController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User pas connecte'
            ]);
        }

        $query = User::where('role', 'employe');

        if ($request->filled('is_archived') && in_array($request->is_archived, ['0', '1'])) {
            $query->where('is_archived', $request->is_archived);
        }

        $employees = $query->get();

        return response()->json([
            'success' => true,
            'message' => "Employee retrieved successfully",
            'data' => $employees
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            "email" => 'required|string|unique:users,email',
            "poste" => 'required|string',
            "password" => 'required|string|min:8'
        ]);

        $employe = User::create([
            "name" => $validated['name'],
            "email" => $validated['email'],
            "poste" => $validated['poste'],
            "role" => "employe",
            "password" => Hash::make($validated['password'])
        ]);

        return response()->json([
            "success" => true,
            "message" => "Employe added successfully",
            "employe" => $employe
        ]);
    }
}
