<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'role' => 'required|in:admin,employe',
        ]);

        if (! Auth::attempt([
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
        ])) {
            return response()->json([
                'success' => false,
                'message' => 'Email, mot de passe ou rôle incorrect.',
            ], 401);
        }

        $user = $request->user();

        if ($user->is_archived) {
            return response()->json([
                'success' => false,
                'message' => 'Ce compte est archivé.',
            ], 403);
        }

        $user->tokens()->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'poste' => $user->poste,
            ],
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();
        $token->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
                'poste' => $user->poste,
                'is_archived' => $user->is_archived,
            ],
        ]);
    }
}
