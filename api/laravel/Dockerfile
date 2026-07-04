# Laravel API image for Render (Docker runtime).
FROM php:8.3-cli

# System deps + PHP extensions Laravel needs.
RUN apt-get update \
    && apt-get install -y --no-install-recommends git unzip libsqlite3-dev libzip-dev \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && rm -rf /var/lib/apt/lists/*

# Composer.
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Install PHP dependencies first (better layer caching).
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# App source.
COPY . .
RUN composer dump-autoload --optimize --no-dev

# Ensure a SQLite database file and writable storage exist.
RUN mkdir -p database storage/framework/{cache,sessions,views} bootstrap/cache \
    && touch database/database.sqlite \
    && chmod -R 777 storage bootstrap/cache

# Render provides $PORT at runtime.
ENV PORT=8000
EXPOSE 8000

CMD php artisan config:clear \
    && php artisan migrate --force \
    && php artisan db:seed --class=FilmSeeder --force \
    && php artisan serve --host 0.0.0.0 --port "${PORT}"
