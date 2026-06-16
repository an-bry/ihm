<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    empty($data->name) ||
    empty($data->email) ||
    empty($data->password)
) {

    echo json_encode([
        "success" => false,
        "message" => "Tous les champs sont obligatoires"
    ]);

    exit();
}

$check = $db->prepare(
    "SELECT id FROM users WHERE email=:email"
);

$check->execute([
    ':email' => $data->email
]);

if ($check->rowCount() > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Email déjà utilisé"
    ]);

    exit();
}

$password = password_hash(
    $data->password,
    PASSWORD_DEFAULT
);

$sql = "INSERT INTO users(
            name,
            email,
            password,
            role
        )
        VALUES(
            :name,
            :email,
            :password,
            :role
        )";

$stmt = $db->prepare($sql);

$stmt->execute([
    ':name' => $data->name,
    ':email' => $data->email,
    ':password' => $password,
    ':role' => $data->role ?? 'reception'
]);

echo json_encode([
    "success" => true,
    "message" => "Utilisateur créé"
]);