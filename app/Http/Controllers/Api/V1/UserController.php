<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Services\UploadService;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Mongodb\User;

class UserController extends Controller
{
    public function __construct()
    {
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
     */
    public function update(UserRequest $request, User $user, UploadService $uploadService)
    {
        $validated = $request->validated();

        $validated['image'] = $uploadService->singleUpload($request, 'image', "{$user->id}/profile", $user->image);
        $validated['backImage'] = $uploadService->singleUpload($request, 'backImage', "{$user->id}/profile", $user->backImage);

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
