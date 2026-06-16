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

// ❗ sécurité simple
if (!$data) {
    echo json_encode(["message" => "Données invalides"]);
    exit();
}

$query = "INSERT INTO patients 
(nom, prenom, sexe, date_naissance, telephone, adresse, contact_urgence, telephone_urgence, groupe_sanguin)
VALUES
(:nom, :prenom, :sexe, :date_naissance, :telephone, :adresse, :contact_urgence, :telephone_urgence, :groupe_sanguin)";

$stmt = $db->prepare($query);

$stmt->bindParam(":nom", $data->nom);
$stmt->bindParam(":prenom", $data->prenom);
$stmt->bindParam(":sexe", $data->sexe);
$stmt->bindParam(":date_naissance", $data->date_naissance);
$stmt->bindParam(":telephone", $data->telephone);
$stmt->bindParam(":adresse", $data->adresse);
$stmt->bindParam(":contact_urgence", $data->contact_urgence);
$stmt->bindParam(":telephone_urgence", $data->telephone_urgence);
$stmt->bindParam(":groupe_sanguin", $data->groupe_sanguin);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Patient ajouté avec succès"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur ajout patient"
    ]);
}