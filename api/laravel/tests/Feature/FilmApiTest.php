<?php

namespace Tests\Feature;

use Tests\TestCase;

class FilmApiTest extends TestCase
{
    public function test_it_returns_the_film_collection(): void
    {
        $response = $this->getJson('/api/films');

        $response->assertOk()
            ->assertJsonCount(3)
            ->assertJsonPath('0.title', 'The Velvet Hour');
    }

    public function test_it_returns_a_single_film(): void
    {
        $response = $this->getJson('/api/films/1');

        $response->assertOk()
            ->assertJsonPath('id', 1)
            ->assertJsonPath('title', 'The Velvet Hour');
    }

    public function test_it_accepts_contact_inquiries(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Ada Lovelace',
            'email' => 'ada@example.com',
            'message' => 'Hello from Laravel.',
        ]);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('message', 'Your note has been captured. We will be in touch.');
    }
}
