<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        $email = strtolower(trim($data['email']));

        if (Subscriber::where('email', $email)->exists()) {
            return response()->json([
                'success' => true,
                'message' => "You're already on the list — see you at the premiere.",
            ]);
        }

        Subscriber::create(['email' => $email]);

        return response()->json([
            'success' => true,
            'message' => "You're on the list. Front-row updates are on their way.",
        ], 201);
    }
}
