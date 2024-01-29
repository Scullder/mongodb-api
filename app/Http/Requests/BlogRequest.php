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
        $rules = [
            'authorId' => 'required',
            'title' => 'required',
            'description' => 'nullable',
            'content' => 'nullable',
            'isPublic' => 'nullable',
        ];

        $rules['image'] = request()->hasFile('image')
            ? 'image'
            : 'nullable';

        return $rules;
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!empty(request()->file('image')) && !request()->file('image')->isValid()) {
                $validator->errors()->add('image', __('Не удалось загрузить файл'));
            }
        });
    }
}
