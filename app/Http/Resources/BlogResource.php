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
            'id' => $this->id,
            'author' => [
                'authorId' => $this->authorId,
                'name' => $this->author->name,
                //'image' => $this->author->image ? Storage::url($this->author->image) : null,
                'image' => $this->author->image && Storage::exists($this->author->image)
                    ? Storage::url($this->author->image) . '?t=' . time() 
                    : null,
            ],
            'image' => $this->image && Storage::exists($this->image)
                ? Storage::url($this->image) . '?t=' . time() 
                : null,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content,
            'isPublic' => filter_var($this->isPublic, FILTER_VALIDATE_BOOLEAN),
            'date' => date('d/m/Y H:i', strtotime($this->created_at)),
        ];
    }
}
