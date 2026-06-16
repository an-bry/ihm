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
    empty($data->email) ||
    empty($data->password)
) {
    echo json_encode([
        "success" => false,
        "message" => "Email et mot de passe requis"
    ]);
    exit();
}

$sql = "SELECT * FROM users WHERE email = :email";

$stmt = $db->prepare($sql);

$stmt->execute([
    ':email' => $data->email
]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {

    echo json_encode([
        "success" => false,
        "message" => "Utilisateur introuvable"
    ]);

    exit();
}

if (
    password_verify(
        $data->password,
        $user['password']
    )
) {

    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Mot de passe incorrect"
    ]);
}