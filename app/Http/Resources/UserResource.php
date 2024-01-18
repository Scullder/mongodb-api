<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            '_id' => $this->_id,
            'email' => $this->email,
            'name' => $this->name,
            'description' => $this->description,
            'image' => $this->image ? Storage::url($this->image) : null, 
            'tag' => $this->tag,
        ];
    }
}
