<?php

namespace Database\Seeders;

use App\Models\Mongodb\Post;
use App\Models\Mongodb\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
            ->has(Post::factory()->count(20), 'posts')
            ->count(5)
            ->create();
    }
}
