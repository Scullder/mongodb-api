<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Services\UploadService;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Mongodb\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        // TODO: take out to the route layer
        $this->middleware('auth.api')->except(['index', 'show']);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO: finish all methods and refactor existed (for all controllers)
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \App\Http\Resources\UserResource
     */
    public function show($id)
    {
        return new UserResource(User::where('_id', $id)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest $request
     * @param  int  $id
     */
    public function update(UserRequest $request, User $user, UploadService $uploadService)
    {
        $validated = $request->validated();

        foreach (['image','backImage'] as $name) {
            $validated[$name] = $uploadService->singleUpload(
                path: "{$user->id}/profile",
                file: $request->file($name),
                oldFile: $request->input($name),
                modelFile: $user->$name,
            );
        }

        $user->update($validated);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

}
