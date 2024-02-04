<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mongodb\User;
use App\Models\Mongodb\Post;
use Illuminate\Support\Facades\File;

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
            //'authorId' => User::factory(),
            'title' => $this->faker->sentence(rand(5, 10)),
            'text' => $this->faker->paragraph(rand(5, 20)),
            'images' => $this->getRandImages(),
        ];
    }

    private function getRandImages()
    {
        $images = [];

        foreach (scandir(public_path('factory-images')) as $image) {
            $from = public_path('factory-images/' . $image);
            $to = config('filesystems.disks.public.root') . '/' . $image;

            if (File::isFile($from)) {
                $images[] = $image;

                if (!File::exists($to)) {
                    File::copy($from, $to);
                }
            }
        }

        if (!$images) {
            return [];
        }

        shuffle($images);
        return array_slice($images, 0, rand(0, count($images)));
    }
}
