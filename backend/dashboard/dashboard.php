<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "../config/database.php";

$db = (new Database())->getConnection();

try {

    // RDV aujourd'hui
    $rdvToday = $db->query("
        SELECT COUNT(*) as total
        FROM rendez_vous
        WHERE date_rdv = CURDATE()
    ")->fetch(PDO::FETCH_ASSOC);

    // RDV confirmés
    $rdvConfirmed = $db->query("
        SELECT COUNT(*) as total
        FROM rendez_vous
        WHERE statut = 'Confirmé'
    ")->fetch(PDO::FETCH_ASSOC);

    // consultations terminées (ou total consultations)
    $consultations = $db->query("
        SELECT COUNT(*) as total
        FROM consultations
    ")->fetch(PDO::FETCH_ASSOC);

    // patients actifs
    $patients = $db->query("
        SELECT COUNT(*) as total
        FROM patients
    ")->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "rdv_today" => (int)$rdvToday["total"],
        "rdv_confirmed" => (int)$rdvConfirmed["total"],
        "consultations" => (int)$consultations["total"],
        "patients" => (int)$patients["total"]
    ]);

} catch(Exception $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}