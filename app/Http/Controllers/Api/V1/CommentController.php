<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequet;
use App\Models\Mongodb\Comment;
use App\Http\Resources\CommentResource;
use App\Filters\CommentFilter;

class CommentController extends Controller
{
    public function index(Request $request, CommentFilter $filter)
    {
        return CommentResource::collection(
            Comment::where($filter->transform($request))->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\CommentResource
     */
    public function store(CommentRequet $request)
    {
        $comment = Comment::create($request->validated());

        return new CommentResource($comment);
    }

    /* 
    public function show($id)
    {
        //
    }
   
    public function update(Request $request, $id)
    {
        //
    }
   
    public function destroy($id)
    {
        //
    } 
    */
}
