<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Columns match the camelCase JSON keys the frontend consumes, and
        // dates are stored as plain strings (e.g. "2026-10-14") so the API
        // output stays identical to the previous hardcoded catalog.
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('tagline');
            $table->string('releaseDate');
            $table->string('premiereDate');
            $table->string('poster');
            $table->text('synopsis');
            $table->json('cast');
            $table->string('trailerUrl');
            $table->string('category');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
