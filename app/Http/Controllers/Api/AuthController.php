<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Repository\UserRepositoryInterface;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(RegisterRequest $request, UserRepositoryInterface $userRepository): JsonResponse
    {
        $userRepository->registerUser($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function login(LoginRequest $request, UserService $userService): JsonResponse
    {
        $credentials = request(['email', 'password']);

        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $tokenResult = $userService->generateUserToken($request);

        return response()->json([
            'success'       => true,
            'access_token'  => $tokenResult->accessToken,
            'token_type'    => 'Bearer',
            'expires_at'    => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
