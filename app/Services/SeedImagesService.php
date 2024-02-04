<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

/**
 * Files from Request can be of type File and type string, so we need save them in various ways
 * 
 */
class SeedImagesService
{
    public static function getRandImages()
    {
        $images = [];

        foreach (scandir(public_path('factory-images')) as $image) {
            $from = public_path('factory-images/' . $image);
            $to = config('filesystems.disks.public.root') . '/' . $image;

            if (File::isFile($from) && !File::exists($to)) {
                File::copy($from, $to);
            }

            if (File::isFile($to)) {
                $images[] = $image;
            }
        }

        if (!$images) {
            return [];
        }

        shuffle($images);
        return array_slice($images, 0, rand(0, count($images)));
    }
}
