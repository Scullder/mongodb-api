<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\BlogRequest;
use App\Http\Resources\BlogResource;
use Illuminate\Http\Request;
use App\Models\Mongodb\Blog;
use App\Filters\BlogFilter;
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
        $filterItems = $filter->transform($request);

        $blogs = ($filterItems != []) 
            ? Blog::where($filterItems)->get() 
            : Blog::all();

        return BlogResource::collection($blogs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BlogRequest $request)
    {
        $credentials = $request->validated();

        $blog = Blog::create([
            'authorId' => $credentials['author_id'],
            //'image' => $credentials['image'] ?? '',
            'title' => $credentials['title'],
            'description' => $credentials['description'],
            'content' => $credentials['content'],
            'isPublic' => $credentials['is_public'],
        ]);

        $imageName = $request->file('image')?->store("{$credentials['author_id']}/images/blogs/blog-{$blog->_id}");
        $blog->update(['image' => $imageName]);
        
        return response(['id' => $blog->_id], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \App\Http\Resources\BlogResource
     */
    public function show($id)
    {
        $blog = Blog::where('_id', $id)->first();

        if (!$blog) {
            return response([], 404);
        }

        return new BlogResource($blog);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BlogRequest $request, $id)
    {
        $validated = $request->validated();

        $blog = Blog::find($id);

        if ($request->image != Storage::url($blog->image)) {
            Storage::delete((string)$blog->image);
            $image = $request->file('image')?->store("{$validated['author_id']}/images/blogs/blog-{$blog->_id}");
        } else {
            $image = $blog->image;
        }

        $blog->update([
            'image' => (string)$image,
            'title' => (string)$validated['title'],
            'description' => (string)$validated['description'],
            'content' => (string)$validated['content'],
            'isPublic' => $validated['is_public'] ?? false,
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
        //
    }
}
