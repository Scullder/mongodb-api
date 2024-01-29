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
        $rules = [
            'title' => 'nullable',
            'text' => 'required',
        ];

        foreach (request()->images as $i => $image) { 
            $rules['images.'. $i] = request()->hasFile('images.' . $i)
                ? 'image'
                : 'nullable';
        }  

        return $rules;
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            foreach ($validator->errors()->toArray() as $key => $errors) {
                if (preg_match('/images\./', $key)) {
                    $validator->errors()->add('images', __('validation.images'));
                }
            }
        });
    }
}
