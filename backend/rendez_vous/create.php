<?php

include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if(
    empty($data->patient_id) ||
    empty($data->date_rdv) ||
    empty($data->heure_rdv) ||
    empty($data->motif)
){
    echo json_encode([
        "message" => "Données invalides"
    ]);
    exit;
}

$query = "INSERT INTO rendez_vous
(
    patient_id,
     doctor_id, 
    date_rdv,
    heure_rdv,
    motif,
    statut
)
VALUES
(
    :patient_id,
    :doctor_id,
    :date_rdv,
    :heure_rdv,
    :motif,
    :statut
)";

$stmt = $db->prepare($query);

$stmt->bindParam(":patient_id", $data->patient_id);
$stmt->bindParam(":doctor_id", $data->doctor_id);
$stmt->bindParam(":date_rdv", $data->date_rdv);
$stmt->bindParam(":heure_rdv", $data->heure_rdv);
$stmt->bindParam(":motif", $data->motif);
$stmt->bindParam(":statut", $data->statut);

if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Rendez-vous ajouté avec succès"
    ]);
  
}else{
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'ajout"
    ]);
}