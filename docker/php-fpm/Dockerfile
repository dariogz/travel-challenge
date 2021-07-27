FROM php:7.4-fpm-alpine

RUN apk add libzip-dev \
    && docker-php-ext-install zip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk add --no-cache php7 \
    php7-common \
    php7-fpm \
    php7-pdo \
    php7-opcache \
    php7-zip \
    php7-phar \
    php7-iconv \
    php7-cli \
    php7-curl \
    php7-openssl \
    php7-mbstring \
    php7-tokenizer \
    php7-fileinfo \
    php7-json \
    php7-xml \
    php7-xmlwriter \
    php7-simplexml \
    php7-dom \
    php7-pdo_mysql \
    php7-pdo_sqlite \
    php7-tokenizer \
    php7-pecl-redis

VOLUME /var/www

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000
CMD ["php-fpm"]