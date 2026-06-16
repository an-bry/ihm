<?php

include_once "../config/cors.php";
include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$id = $_GET["id"] ?? 0;

$query = "
SELECT

r.*,

p.nom,
p.prenom,
p.telephone

FROM rendez_vous r

INNER JOIN patients p
ON r.patient_id = p.id

WHERE r.id = :id
";

$stmt = $db->prepare($query);
$stmt->bindParam(":id", $id);

$stmt->execute();

$data = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($data);