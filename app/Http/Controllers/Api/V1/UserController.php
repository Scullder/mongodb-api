<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\Mongodb\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
        //
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
    public function update(UserRequest $request, $id)
    {
        $user = User::find($id);
        $validated = $request->validated();

        $files = ['image', 'backImage'];

        foreach ($files as $file) {
            if (
                $request->hasFile($file) ||
                Str::after(parse_url($request->$file, PHP_URL_PATH), 'storage/') != $user->$file
            ) {
                Storage::delete((string)$user->$file);
                $validated[$file] = null;
            }

            if ($request->hasFile($file)) {
                $validated[$file] = $request
                    ->file($file)
                    ?->storeAs("{$id}/profile", "{$file}.{$request->file($file)->extension()}");
            }
        }
        
        //dd($validated);

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
