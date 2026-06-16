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

$db = (new Database())->getConnection();

$data = json_decode(file_get_contents("php://input"));

try {

    // 🔥 1. Vérifier RDV existe et est confirmé
    $check = $db->prepare("
        SELECT * FROM rendez_vous WHERE id = :id
    ");
    $check->execute([
        ":id" => $data->rendez_vous_id
    ]);

    $rdv = $check->fetch(PDO::FETCH_ASSOC);

    if (!$rdv) {
        echo json_encode([
            "success" => false,
            "message" => "Rendez-vous introuvable"
        ]);
        exit;
    }

    if ($rdv["statut"] !== "Confirmé") {
        echo json_encode([
            "success" => false,
            "message" => "Rendez-vous non confirmé"
        ]);
        exit;
    }

    // 🔥 2. INSERER CONSULTATION
    $sql = "INSERT INTO consultations (
        rendez_vous_id,
        patient_id,
        doctor_id,
        date_consultation,
        motif,
        diagnostic,
        traitement,
        observations
    ) VALUES (
        :rendez_vous_id,
        :patient_id,
        :doctor_id,
        :date_consultation,
        :motif,
        :diagnostic,
        :traitement,
        :observations
    )";

    $stmt = $db->prepare($sql);

    $stmt->execute([
        ":rendez_vous_id" => $data->rendez_vous_id,
        ":patient_id" => $data->patient_id,
        ":doctor_id" => $data->doctor_id,
        ":date_consultation" => $data->date_consultation,
        ":motif" => $data->motif,
        ":diagnostic" => $data->diagnostic,
        ":traitement" => $data->traitement,
        ":observations" => $data->observations
    ]);

    // 🔥 3. UPDATE RDV -> TERMINE
    $update = $db->prepare("
        UPDATE rendez_vous
        SET statut = 'Terminé'
        WHERE id = :id
    ");

    $update->execute([
        ":id" => $data->rendez_vous_id
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Consultation créée + RDV terminé"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}