<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * Files from Request can be of type File and type string, so we need save them in various ways
 * 
 */
class UploadService
{
    public function singleUpload(Request $request, string $key, string $path, $modelFile = null): string|null
    {
        $uploaded = null;

        $uploaded = Str::after(parse_url($request->input($key), PHP_URL_PATH), 'storage/');
        
        if ($uploaded != $modelFile) {
            Storage::delete((string)$modelFile);
        }

        if ($request->file($key)) {
            try {
                $uploaded = $request->file($key)->store($path);
            } catch (\Exception $e) {
                $uploaded = null;
            }
        }

        return $uploaded;
    }

    public function multiUpload(Request $request, string $key, string $path, array $modelFiles = []): array
    {
        $uploaded = [];

        // delete all files that are in model recordes and not in current request
        foreach ($request->input($key) ?? [] as $oldFile) {
            // get relative path
            $oldFile = trim(str_replace('storage/', '', parse_url($oldFile, PHP_URL_PATH)), '/');

            if (!in_array($oldFile, $modelFiles)) {
                Storage::delete($oldFile);
            } else {
                $uploaded[] = $oldFile;
            }
        }

        // delete files that are not in model records
        if ($modelFiles) {
            Storage::delete(array_diff(Storage::files($path), $modelFiles));
        }

        foreach ($request->file($key) ?? [] as $file) {
            $uploaded[] = $file->isValid() 
                ? $file->store($path)
                : null;
        }

        return $uploaded;
    }
}
