<?php

namespace App\Http\Resources;

use App\Models\Mongodb\Follower;
use App\Models\Mongodb\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'image' => $this->image 
                ? Storage::url($this->image) . '?t=' . time() 
                : null,
            'backImage' => $this->backImage 
                ? Storage::url($this->backImage) . '?t=' . time() 
                : null,
            'tag' => $this->tag,
            'discord' => $this->discord,
            'telegram' => $this->telegram,
            'instagram' => $this->instagram,
            'followersCount' => Follower::where('userId', $this->id)->count(),
            'followingCount' => Follower::where('followedUserId', $this->_id)->count(),
            'publicationsCount' => Post::where('authorId', $this->_id)->count(),
        ];
    }
}
