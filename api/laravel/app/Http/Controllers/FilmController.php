<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FilmController extends Controller
{
    private array $films = [
        [
            'id' => 1,
            'title' => 'The Velvet Hour',
            'tagline' => 'A midnight romance set against a fading city skyline.',
            'releaseDate' => '2026-10-14',
            'premiereDate' => '2026-10-12',
            'poster' => 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
            'synopsis' => 'When a reclusive architect returns to the city that broke her heart, she is drawn into a late-night romance that rewrites her future.',
            'cast' => ['Mina Sol', 'Jules Armand', 'Sage Hollow'],
            'trailerUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'category' => 'Romance',
            'status' => 'Premiering Soon',
        ],
        [
            'id' => 2,
            'title' => 'After the Static',
            'tagline' => 'A pulse-racing thriller told in the language of echoes.',
            'releaseDate' => '2026-11-03',
            'premiereDate' => '2026-10-29',
            'poster' => 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=900&q=80',
            'synopsis' => 'A radio host uncovers a pattern in the city’s missing transmissions and must race to stop a signal that predicts the next disappearance.',
            'cast' => ['Noah Vale', 'Elena Cruz', 'Rian Quill'],
            'trailerUrl' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
            'category' => 'Thriller',
            'status' => 'Awaiting Premiere',
        ],
        [
            'id' => 3,
            'title' => 'North of Summer',
            'tagline' => 'A luminous coming-of-age story about first loves and last chances.',
            'releaseDate' => '2027-01-18',
            'premiereDate' => '2027-01-15',
            'poster' => 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
            'synopsis' => 'Three friends cross a remote coastal town in search of a vanished lighthouse keeper and the truth behind a single summer memory.',
            'cast' => ['Tomi Reid', 'Ava Sloane', 'Luca Martin'],
            'trailerUrl' => 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
            'category' => 'Drama',
            'status' => 'In Development',
        ],
    ];

    private array $inquiries = [];

    public function index(): JsonResponse
    {
        return response()->json($this->films);
    }

    public function show(int $id): JsonResponse
    {
        $film = collect($this->films)->firstWhere('id', $id);

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

        $this->inquiries[] = [
            ...$data,
            'createdAt' => now()->toISOString(),
        ];

        return response()->json([
            'message' => 'Your note has been captured. We will be in touch.',
            'success' => true,
        ], 201);
    }
}
