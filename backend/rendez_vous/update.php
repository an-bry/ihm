<?php

include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

$query = "
UPDATE rendez_vous
SET

patient_id = :patient_id,
date_rdv = :date_rdv,
heure_rdv = :heure_rdv,
motif = :motif,
statut = :statut

WHERE id = :id
";

$stmt = $db->prepare($query);

$stmt->bindParam(":id", $data->id);
$stmt->bindParam(":patient_id", $data->patient_id);
$stmt->bindParam(":date_rdv", $data->date_rdv);
$stmt->bindParam(":heure_rdv", $data->heure_rdv);
$stmt->bindParam(":motif", $data->motif);
$stmt->bindParam(":statut", $data->statut);

if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Rendez-vous modifié"
    ]);
}else{
    echo json_encode([
        "success" => false
    ]);
}