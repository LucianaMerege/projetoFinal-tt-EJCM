<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\User;

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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'email' => 'required,unique:users,email',
            'password' => 'required',
            'photo' => 'file|image|mimes:jpeg,png,gif,webp|max:2048', //mexer aqui
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new
        HttpResponseException(response()->json($validator->errors(),
        422));
    }


    
}
