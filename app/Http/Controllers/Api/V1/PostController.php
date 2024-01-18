<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use App\Models\Mongodb\Post;
use Illuminate\Support\Facades\Storage;
use App\Filters\PostFilter;
use Illuminate\Support\Facades\File;

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
        $credentials = $request->validated();
        $user = auth('sanctum')->user();

        $post = Post::create([
            'authorId' => $user->_id,
            'title' => $credentials['title'],
            'text' => $credentials['text'],
            'images' => [],
        ]);

        if ($request->hasFile('images')) {
            $images = [];

            foreach ($request->file('images') as $image) {
                $images[] = $image->store("{$user->_id}/images/posts/post-{$post->id}");
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
    public function update(PostRequest $request, $id)
    {
        $validated = $request->validated();

        $post = Post::find($id);

        $images = [];

        // Delete all old images if not in current request
        if (isset($validated['oldImages'])) {
            foreach ($validated['oldImages'] as $key => $image) {
                $images[] = trim(str_replace('storage', '', parse_url($image, PHP_URL_PATH)), '/');
            }

            Storage::delete(array_diff($post->images, $images));
        }

        // Store new images
        foreach ($validated['images'] ?? [] as $key => $image) {
            if (File::isFile($image)) {
                $images[] = $image->store(auth('sanctum')->user()['_id'] . "/images/posts/post-{$post->_id}");
            }
        }

        $post->update([
            'title' => (string) $validated['title'] ?? '',
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
