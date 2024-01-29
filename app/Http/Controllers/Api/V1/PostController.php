<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\PostFilter;
use App\Models\Mongodb\Post;
use Illuminate\Http\Request;
use App\Services\UploadService;
use Jenssegers\Mongodb\Auth\User;
use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.api')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request, PostFilter $filter)
    {
        return PostResource::collection(
            Post::where($filter->transform($request))->paginate(15)
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mongodb\Post $post
     * @return \App\Http\Resources\PostResource
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\PostRequest $request
     * @return \App\Http\Resources\PostResource
     */
    public function store(PostRequest $request, UploadService $uploadService)
    {
        $validated = $request->validated();
        $user = auth('sanctum')->user();

        $post = Post::create([
            'authorId' => $user->id,
            'title' => $validated['title'],
            'text' => $validated['text'],
            'images' => [],
        ]);

        $post->update([
            'images' => $uploadService->multiUpload($request, 'images', "{$user->id}/posts/post-{$post->id}"),
        ]);

        // 201
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \App\Http\Resources\PostResource
     */
    public function update(PostRequest $request, Post $post, UploadService $uploadService)
    {
        $validated = $request->validated();

        $images = $uploadService->multiUpload($request, 'images', "{$post->authorId}/posts/post-{$post->id}", $post->images);

        $post->update([
            'title' => (string) $validated['title'],
            'text' => (string) $validated['text'],
            'images' => $images,
        ]);

        //return response('', 204);
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::find($id)->delete();

        return response('', 200);
    }
}
