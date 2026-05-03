<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // ❌ ما كاينش user
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // ❌ ماشي admin
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}