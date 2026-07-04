<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = [
        'title',
        'tagline',
        'releaseDate',
        'premiereDate',
        'poster',
        'synopsis',
        'cast',
        'trailerUrl',
        'category',
        'status',
    ];

    protected $casts = [
        'cast' => 'array',
    ];

    // Keep the API payload lean and identical to the original catalog shape.
    protected $hidden = ['created_at', 'updated_at'];
}
