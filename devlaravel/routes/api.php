<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;


Route::get('/test', function () {
    return 'hello world';
});
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/employee', [EmployeeController::class, 'index']);

    Route::post("/ajouter-employee", [EmployeeController::class, 'store']);
});
