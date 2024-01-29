<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\FollowerController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->prefix('/user')->group(function () {
    // TODO refactor to the apiResource
    Route::post('/signup', 'signup');
    Route::post('/login', 'login')->name('login');
    Route::post('/logout', 'logout');
});

/* Route::controller(UserController::class)->prefix('/user')->middleware('auth.api')->group(function () {
    Route::post('/store', 'store');
    Route::delete('/{id}', 'destroy');
    Route::patch('/update/{id}', 'update');
    Route::get('/index', 'index');
    Route::get('/show/{id}', 'show');
}); */

Route::apiResource('users', UserController::class);

Route::apiResource('posts', PostController::class);

Route::apiResource('comments', CommentController::class)->middleware('auth.api');

Route::apiResource('blogs', BlogController::class);

Route::apiResource('followers', FollowerController::class)->only(['store', 'index', 'destroy'])->middleware('auth.api');
