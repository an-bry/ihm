<?php

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$email = "admin2@gmail.com";

// vérifier si user existe déjà
$check = $db->prepare("SELECT id FROM users WHERE email = :email");
$check->execute([":email" => $email]);

if ($check->rowCount() > 0) {
    echo json_encode([
        "success" => false,
        "message" => "User already exists"
    ]);
    exit;
}

$name = "Admin";
$password = password_hash("123456", PASSWORD_DEFAULT);
$role = "admin";

$sql = "INSERT INTO users(name, email, password, role)
        VALUES(:name, :email, :password, :role)";

$stmt = $db->prepare($sql);

$stmt->execute([
    ":name" => $name,
    ":email" => $email,
    ":password" => $password,
    ":role" => $role
]);

echo json_encode([
    "success" => true,
    "message" => "User created successfully"
]);