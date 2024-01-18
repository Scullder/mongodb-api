<?php

namespace App\Models\Mongodb;

use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Mongodb\User;
use App\Models\Mongodb\Post;

class Comment extends Model
{
    protected $fillable = [
        'authorId', 'postId', 'text',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'authorId', '_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'postId', '_id');
    }

}
