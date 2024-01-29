<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
//use Illuminate\Support\Facades\Storage;
//use Carbon\Carbon;
use App\Models\Mongodb\User;
use App\Http\Resources\UserResource;

class FollowerResource extends JsonResource
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
            'user_id' => $this->userId,
            'followed_user_id' => $this->followedUserId,
            'user' => new UserResource(User::find($this->followedUserId)),
        ];
    }
}
