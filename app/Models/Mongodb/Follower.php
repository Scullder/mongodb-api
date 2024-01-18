<?php

namespace App\Models\Mongodb;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class Follower extends Model
{
    protected $fillable = [
        'userId',
        'followedUserId',
    ];
}
