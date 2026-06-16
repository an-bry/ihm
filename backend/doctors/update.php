<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$sql = "UPDATE doctors SET
nom=:nom,
prenom=:prenom,
specialite=:specialite,
telephone=:telephone,
email=:email,
statut=:statut
WHERE id=:id";

$stmt = $db->prepare($sql);

$stmt->execute([
  ":id" => $data->id,
  ":nom" => $data->nom,
  ":prenom" => $data->prenom,
  ":specialite" => $data->specialite,
  ":telephone" => $data->telephone,
  ":email" => $data->email,
  ":statut" => $data->statut
]);

echo json_encode(["message" => "Médecin modifié"]);