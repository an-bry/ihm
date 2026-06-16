<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

try {

    $sql = "
        UPDATE consultations
        SET
            patient_id = :patient_id,
            medecin = :medecin,
            date_consultation = :date_consultation,
            motif = :motif,
            diagnostic = :diagnostic,
            traitement = :traitement,
            observations = :observations
        WHERE id = :id
    ";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ':id' => $data->id,
        ':patient_id' => $data->patient_id,
        ':medecin' => $data->medecin,
        ':date_consultation' => $data->date_consultation,
        ':motif' => $data->motif,
        ':diagnostic' => $data->diagnostic,
        ':traitement' => $data->traitement,
        ':observations' => $data->observations
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Consultation modifiée"
    ]);

} catch(Exception $e){

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}