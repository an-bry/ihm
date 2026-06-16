<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// IMPORTANT POUR PRE-FLIGHT (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include_once '../config/database.php';

$db = (new Database())->getConnection();

$data = json_decode(file_get_contents("php://input"));

try {

    $sql = "UPDATE rendez_vous 
            SET statut = 'annulé'
            WHERE id = :id";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":id" => $data->id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Rendez-vous annulé"
    ]);

} catch(Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}