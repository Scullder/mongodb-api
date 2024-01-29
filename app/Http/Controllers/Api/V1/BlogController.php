<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\BlogFilter;
use App\Models\Mongodb\Blog;
use Illuminate\Http\Request;
use App\Services\UploadService;
use App\Http\Requests\BlogRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth.api')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\JsonResource
     */
    public function index(Request $request, BlogFilter $filter)
    {
        return BlogResource::collection(
            Blog::where($filter->transform($request))->paginate(15)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogRequest $request, UploadService $uploadService)
    {
        $validated = $request->validated();

        $blog = Blog::create([
            'authorId' => $validated['author_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'content' => $validated['content'],
            'isPublic' => $validated['is_public'],
        ]);

        $image = $uploadService->singleUpload($request, 'image', "{$validated['author_id']}/blogs/blog-{$blog->id}");

        $blog->update(['image' => $image]);
        
        return response(['id' => $blog->id], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BlogResource
     */
    public function show(Blog $blog)
    {
        return new BlogResource($blog);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BlogRequest $request, Blog $blog, UploadService $uploadService)
    {
        $validated = $request->validated();
        $validated['image'] = $uploadService->singleUpload($request, 'image', "{$validated['authorId']}/blogs/blog-{$blog->id}", $blog->image);
        $blog->update($validated);

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        
        return response('', 200);
    }
}
