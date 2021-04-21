<?php
namespace App\Services;

use App\Models\User;

class RegisterService
{
    public static function registerUser(array $request): User
    {
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
        ]);

        $user->createToken('Personal Access Token');

        return $user;
    }
}
