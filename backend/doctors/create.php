<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// gérer preflight (IMPORTANT)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$sql = "INSERT INTO doctors
(nom, prenom, specialite, telephone, email, statut)
VALUES
(:nom, :prenom, :specialite, :telephone, :email, :statut)";

$stmt = $db->prepare($sql);

$stmt->execute([
  ":nom" => $data->nom,
  ":prenom" => $data->prenom,
  ":specialite" => $data->specialite,
  ":telephone" => $data->telephone,
  ":email" => $data->email,
  ":statut" => $data->statut ?? "Actif"
]);

echo json_encode(["message" => "Médecin ajouté"]);