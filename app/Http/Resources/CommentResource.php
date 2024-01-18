<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CommentResource extends JsonResource
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
            'id' => $this->_id,
            'author' => [
                'authorId' => $this->authorId,
                'name' => $this->author->name,
                'image' => $this->author->image ? Storage::url($this->author->image) : null,
            ],
            'postId' => $this->postId,
            'text' => $this->text,
            'date' => $this->created_at,
        ];
    }
}
