<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$sql = "DELETE FROM doctors WHERE id = :id";
$stmt = $db->prepare($sql);

$stmt->execute([":id" => $data->id]);

echo json_encode(["message" => "Médecin supprimé"]);