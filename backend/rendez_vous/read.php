<?php

include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$query = "
SELECT
r.id,
r.patient_id,
p.nom,
p.prenom,
p.telephone,
r.date_rdv,
r.heure_rdv,
r.motif,
r.statut

FROM rendez_vous r

INNER JOIN patients p
ON r.patient_id = p.id

ORDER BY r.date_rdv DESC,
         r.heure_rdv DESC
";

$stmt = $db->prepare($query);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);