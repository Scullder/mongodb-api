<?php

namespace App\Models\Mongodb;

use Database\Factories\BlogFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Mongodb\User;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'authorId',
        'image',
        'title',
        'description',
        'content',
        'isPublic',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'authorId', '_id');
    }

    protected static function newFactory()
    {
        return BlogFactory::new();
    }
}
