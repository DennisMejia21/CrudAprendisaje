<?php

function conectarBaseDeDatos(): PDO
{
    $host = 'mysql';
    $baseDeDatos = getenv('MYSQL_DATABASE');
    $usuario = getenv('MYSQL_USER');
    $contrasena = getenv('MYSQL_PASSWORD');

    $dsn = "mysql:host=$host;dbname=$baseDeDatos;charset=utf8mb4";

    return new PDO(
        $dsn,
        $usuario,
        $contrasena,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
}