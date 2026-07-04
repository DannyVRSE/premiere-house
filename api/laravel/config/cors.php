<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Allowed frontend origins
    |--------------------------------------------------------------------------
    |
    | The origin(s) permitted to call this API from the browser. Set the
    | FRONTEND_URL environment variable to the deployed Vercel URL, e.g.
    | https://premiere-house.vercel.app. Multiple origins can be provided
    | as a comma-separated list. Use "*" to allow any origin.
    |
    */

    'allowed_origins' => array_values(array_filter(array_map(
        'trim',
        explode(',', env('FRONTEND_URL', '*')),
    ))),

];
