<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->getMethod() === 'OPTIONS') {
            $response = new Response(null, 204);
        } else {
            $response = $next($request);
        }

        $allowed = config('cors.allowed_origins', ['*']);
        $origin = $request->headers->get('Origin');

        if (in_array('*', $allowed, true)) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        } elseif ($origin !== null && in_array($origin, $allowed, true)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
            $response->headers->set('Vary', 'Origin');
        }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');

        return $response;
    }
}
