<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

try {

    $sql = "DELETE FROM consultations WHERE id = :id";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ':id' => $data->id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Consultation supprimée"
    ]);

} catch(Exception $e){

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}