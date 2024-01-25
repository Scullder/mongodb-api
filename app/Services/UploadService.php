<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class UploadService
{
    // TODO: вместо кучи параметров использовать Request и ключ файла !?
    public function singleUpload(string $path, \Illuminate\Http\UploadedFile|null $file, string|null $oldFile = null, string|null $modelFile = null): string|null
    {
        $uploaded = null;

        if ($modelFile) {
            $uploaded = Str::after(parse_url($oldFile, PHP_URL_PATH), 'storage/');
            
            if ($uploaded != $modelFile) {
                Storage::delete((string)$modelFile);
            }
        }

        if ($file) {
            try {
                $uploaded = $file->store($path);
            } catch (\Exception) {
                $uploaded = null;
            }
        }

        return $uploaded;
    }

    public function multiUpload(string $path, array $files, array|null $oldFiles = null, array|null $modelFiles = null): array
    {
        $uploaded = [];

        // delete all files that are in model recordes and not in current request
        foreach ($oldFiles as $oldFile) {
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

        foreach ($files as $file) {
            $uploaded[] = $file->store($path);
        }

        return $uploaded;
    }
}
