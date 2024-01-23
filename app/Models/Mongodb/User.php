<?php

namespace App\Models\Mongodb;

use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

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

}