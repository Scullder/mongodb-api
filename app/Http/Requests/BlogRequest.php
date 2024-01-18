<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
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
        return [
            'author_id' => 'required',
            'image' => $this->getValidationRule('image'),
            'title' => 'required',
            'description' => 'nullable',
            'content' => 'nullable',
            'is_public' => 'nullable',
        ];
    }

    public function getValidationRule(String $key): string
    {
        if (request()->hasFile($key)) {
            return "nullable|image";
        }

        return "nullable|string";
    }
}
