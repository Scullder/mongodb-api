<?php

namespace App\Models\Mongodb;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Database\Factories\UserFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'description',
        'discord',
        'telegram',
        'instagram',
        'image',
        'backImage',
    ];

    protected static function newFactory()
    {
        return UserFactory::new();
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'authorId', '_id');
    }
}