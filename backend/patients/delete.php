<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");



// ✅ TOUJOURS EN PREMIER
include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "DELETE FROM patients WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(":id", $data->id);

echo json_encode(["message" => $stmt->execute() ? "Supprimé" : "Erreur"]);