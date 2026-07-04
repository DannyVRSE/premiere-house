<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FilmController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Film::orderBy('id')->get());
    }

    public function show(int $id): JsonResponse
    {
        $film = Film::find($id);

        if (! $film) {
            return response()->json(['message' => 'Film not found'], 404);
        }

        return response()->json($film);
    }

    public function contact(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        Inquiry::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Your note has been captured. We will be in touch.',
        ], 201);
    }
}
