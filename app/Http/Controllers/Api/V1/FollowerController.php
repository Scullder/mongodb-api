<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\FollowerFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\FollowerRequest;
use App\Http\Resources\FollowerResource;
use Illuminate\Http\Request;
use App\Models\Mongodb\Follower;

class FollowerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request, FollowerFilter $filter)
    {
        $filterItems = $filter->transform($request);

        $collection = ($filterItems != [])
            ? Follower::where($filterItems)->get()
            : Follower::all();

        return FollowerResource::collection($collection);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FollowerRequest $request)
    {
        $validated = $request->validated();

        $followId = Follower::where('userId', $validated['user_id'])
            ->where('followedUserId', $validated['followed_user_id'])
            ->first();

        if ($followId !== null) {
            return response('', 200);
        }

        $follow = Follower::create([
            'userId' => $validated['user_id'],
            'followedUserId' => $validated['followed_user_id']
        ]);

        return response(['id' => $follow->_id], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Follower::find($id)->delete();

        return response('', 200);
    }
}
