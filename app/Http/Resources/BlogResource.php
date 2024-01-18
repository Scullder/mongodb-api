<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BlogResource extends JsonResource
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
            'image' => $this->image ? Storage::url($this->image) : null,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content,
            'is_public' => filter_var($this->isPublic, FILTER_VALIDATE_BOOLEAN),
            'created_at' => (new Carbon($this->created_at))->toDateTimeString(),
        ];
    }
}
