<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'authorId' => $this->authorId,
            'author' => $this->author
                ? [
                    'authorId' => $this->author->id,
                    'name' => $this->author->name,
                    'image' => $this->author->image ? Storage::url($this->author->image) : null,
                ]
                : null,
            'title' => $this->title,
            'text' => $this->text,
            'images' => collect($this->images)->map(function ($image) {
                return Storage::exists($image) ? Storage::url($image) : null;
            }),
            'date' => date('d-m-Y H:i', strtotime($this->created_at)),
            'comments' => CommentResource::collection($this->comments),
        ];
    }
}
