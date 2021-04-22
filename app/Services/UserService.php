<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Laravel\Passport\PersonalAccessTokenResult;

class UserService {

    public function generateUserToken(Request $request): PersonalAccessTokenResult
    {
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->filled('remember_me')) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return $tokenResult;
    }
}
