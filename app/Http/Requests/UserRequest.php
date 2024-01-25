<?php

namespace App\Http\Requests;

use App\Models\Mongodb\User;
use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'required',
            //'email' => 'required|unique:users,email,' . $this->user . ',_id',
            'discord' => 'nullable',
            'telegram' => 'nullable',
            'instagram' => 'nullable',
            'description' => 'nullable',
            /* 'image' => [
                function ($attribute, $value, $fail) {
                    if (!request()->hasFile($attribute)) {
                        request()->remove($attribute);
                    }
                }
            ], */
        ];

        if (request()->hasFile('image')) {
            $rules['image'] = 'image';
        } else {
            $rules['image'] = 'nullable';
        }

        if (request()->hasFile('backImage')) {
            $rules['backImage'] = 'image';
        } else {
            $rules['backImage'] = 'nullable';
        }
       
        return $rules;
    }
}
