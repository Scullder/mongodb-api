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
        $filterItems = $filter->transform($request);

        $comments = ($filterItems != []) ? Comment::where($filterItems)->get() : Comment::all();

        return CommentResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequet $request)
    {
        $credentials = $request->validated();

        $comment = Comment::create([
            'authorId' => $credentials['author_id'],
            'postId' => $credentials['post_id'],
            'text' => $credentials['text'],
        ]);

        return response('', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
