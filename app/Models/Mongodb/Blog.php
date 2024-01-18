<?php

namespace App\Models\Mongodb;

use Jenssegers\Mongodb\Eloquent\Model;
use App\Models\Mongodb\User;

class Blog extends Model
{
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
}
