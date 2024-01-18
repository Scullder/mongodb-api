<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\File;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // Get rules for every 'images' items depend from it type(string, file)
        /* return array_merge([
          'title' => 'nullable',
          'text' => 'required',
          'images.*' => 'nullable|image',
          'oldImages.*' => 'nullable'
        ], $this->getValidationRules('images')); */

        return [
            'title' => 'nullable',
            'text' => 'required',
            'images.*' => 'nullable|image',
            'oldImages.*' => 'nullable|string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($validator->errors()->has('images.0')) {
                $validator->errors()->add('images', __('validation.images'));
            }
        });
    }

    public function getValidationRules(string $key): array
    {
        $rules = [];

        dd($this->all());

        foreach ($this->all()['images'] ?? [] as $keyImage => $image) {
            if (File::isFile($image)) {
                $rules["$key.$keyImage"] = 'nullable|image';
            } else {
                $rules["$key.$keyImage"] = 'nullable|string';
            }
        }

        return $rules;
    }
}
