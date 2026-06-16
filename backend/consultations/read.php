<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

try {

    $sql = "
        SELECT
            c.*,
            p.nom,
            p.prenom
        FROM consultations c
        INNER JOIN patients p
        ON c.patient_id = p.id
        ORDER BY c.id DESC
    ";

    $stmt = $db->prepare($sql);
    $stmt->execute();

    $consultations = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($consultations);

} catch(Exception $e){

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}