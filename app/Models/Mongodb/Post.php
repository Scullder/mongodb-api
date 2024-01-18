<?php

namespace App\Models\Mongodb;

use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Mongodb\User;
use App\Models\Mongodb\Comment;

class Post extends Model
{
    protected $fillable = [
        'authorId', 'title', 'text', 'images',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'authorId', '_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'postId', '_id');
    }
}