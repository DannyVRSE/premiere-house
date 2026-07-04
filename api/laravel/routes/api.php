<?php

use App\Http\Controllers\FilmController;
use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Route;

Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{id}', [FilmController::class, 'show']);
Route::post('/contact', [FilmController::class, 'contact']);
Route::post('/newsletter', [NewsletterController::class, 'subscribe']);
