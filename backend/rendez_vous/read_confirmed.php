<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$db = (new Database())->getConnection();

try {

    $sql = "
        SELECT
            r.*,

            p.nom AS patient_nom,
            p.prenom AS patient_prenom,

            d.id AS doctor_id,
            d.nom AS doctor_nom,
            d.prenom AS doctor_prenom,
            d.specialite

        FROM rendez_vous r
        JOIN patients p ON p.id = r.patient_id
        LEFT JOIN doctors d ON d.id = r.doctor_id

        WHERE r.statut = 'Confirmé'
        ORDER BY r.date_rdv ASC
    ";

    $stmt = $db->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
    exit();

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
    exit();
}