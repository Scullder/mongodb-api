<?php

namespace Database\Factories;

use App\Services\SeedImagesService;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mongodb\User;
use App\Models\Mongodb\Post;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'authorId' => User::factory(),
            'title' => $this->faker->sentence(rand(5, 10)),
            'text' => $this->faker->paragraph(rand(5, 20)),
            'images' => SeedImagesService::getRandImages(),
        ];
    }
}
