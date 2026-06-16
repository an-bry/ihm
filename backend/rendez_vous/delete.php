<?php

include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "
DELETE FROM rendez_vous
WHERE id = :id
";

$stmt = $db->prepare($query);

$stmt->bindParam(":id", $data->id);

if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Rendez-vous supprimé"
    ]);
}else{
    echo json_encode([
        "success" => false
    ]);
}