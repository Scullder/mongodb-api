<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\PostFilter;
use App\Models\Mongodb\Post;
use Illuminate\Http\Request;
use App\Services\UploadService;
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
        $filterItems = $filter->transform($request);

        $resource = ($filterItems != [])
            ? PostResource::collection(Post::where($filterItems)->get())
            : PostResource::collection(Post::all());

        return $resource;
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
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\PostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $validated = $request->validated();
        $user = auth('sanctum')->user();

        $post = Post::create([
            'authorId' => $user->id,
            'title' => $validated['title'],
            'text' => $validated['text'],
            'images' => [],
        ]);

        if ($request->hasFile('images')) {
            $images = [];

            foreach ($request->file('images') as $image) {
                $images[] = $image->store("{$user->id}/images/posts/post-{$post->id}");
            }

            $post->update([
                'images' => $images,
            ]);
        }

        return response('', 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, Post $post, UploadService $uploadService)
    {
        $validated = $request->validated();

        $images = $uploadService->multiUpload(
            path: $post->authorId . "/images/posts/post-{$post->id}", 
            files: $request->files('images'),
            oldFiles: $request->input('images'),
            modelFiles: $post->images
        );

        $post->update([
            'title' => (string) $validated['title'],
            'text' => (string) $validated['text'],
            'images' => $images,
        ]);

        return response('', 204);
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
    }
}
