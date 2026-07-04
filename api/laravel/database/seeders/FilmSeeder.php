<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;

class FilmSeeder extends Seeder
{
    /**
     * Seed the demo film catalog.
     *
     * Idempotent: keyed on title with updateOrCreate, so it is safe to run on
     * every redeploy without creating duplicates.
     */
    public function run(): void
    {
        $films = [
            [
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
            [
                'title' => 'Gilded Ashes',
                'tagline' => 'An empire of glass, a fire that remembers everything.',
                'releaseDate' => '2026-09-05',
                'premiereDate' => '2026-08-28',
                'poster' => 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=900&q=80',
                'synopsis' => 'A dynasty of glassmakers guards a secret that could burn their fortune to the ground, until the youngest heir decides some truths are worth the flames.',
                'cast' => ['Isolde Faye', 'Marcus Kane', 'Delphine Roux'],
                'trailerUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'category' => 'Epic',
                'status' => 'Premiering Soon',
            ],
            [
                'title' => 'Neon Requiem',
                'tagline' => 'In a city that never sleeps, someone is dreaming for everyone.',
                'releaseDate' => '2026-12-11',
                'premiereDate' => '2026-12-04',
                'poster' => 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
                'synopsis' => 'A memory-broker in a rain-soaked megacity discovers a stolen dream that could unravel the fragile peace between the living and the archived.',
                'cast' => ['Kai Nakamura', 'Vera Lindqvist', 'Osei Boateng'],
                'trailerUrl' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                'category' => 'Sci-Fi',
                'status' => 'Awaiting Premiere',
            ],
            [
                'title' => 'The Quiet Coast',
                'tagline' => 'The tide always brings something back.',
                'releaseDate' => '2027-02-20',
                'premiereDate' => '2027-02-14',
                'poster' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
                'synopsis' => 'When a detective retreats to a windswept fishing village to forget her last case, the disappearance of a local girl drags every buried secret back to the surface.',
                'cast' => ['Freya Holt', 'Sebastian Ó Riain', 'Nadia Whitmore'],
                'trailerUrl' => 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
                'category' => 'Mystery',
                'status' => 'In Development',
            ],
        ];

        foreach ($films as $film) {
            Film::updateOrCreate(['title' => $film['title']], $film);
        }
    }
}
