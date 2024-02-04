<?php

namespace App\Models\Mongodb;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Mongodb\User;
use App\Models\Mongodb\Comment;

class Post extends Model
{
    use HasFactory;

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

    protected static function newFactory()
    {
        return PostFactory::new();
    }
}