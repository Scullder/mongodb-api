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
            'email' => 'required|unique:users,email,' . $this->user . ',_id',
            'discord' => 'nullable',
            'telegram' => 'nullable',
            'instagram' => 'nullable',
            'description' => 'nullable',
        ];

        $rules['image'] = request()->hasFile('image')
            ? 'image'
            : 'nullable';

        $rules['backImage'] = request()->hasFile('backImage')
            ? 'image'
            : 'nullable';
       
        return $rules;
    }
}
