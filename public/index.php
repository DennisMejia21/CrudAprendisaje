<?php

require_once __DIR__ . '/../config/database.php';

try {
    $conexion = conectarBaseDeDatos();

    echo '<h1>CRUD de productos</h1>';
    echo '<p>Conexión con MySQL realizada correctamente.</p>';
} catch (PDOException $error) {
    http_response_code(500);

    echo '<h1>Error de conexión</h1>';
    echo '<p>' . $error->getMessage() . '</p>';
}