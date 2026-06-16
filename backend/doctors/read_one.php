<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];

$sql = "SELECT * FROM doctors WHERE id = :id";
$stmt = $db->prepare($sql);
$stmt->execute([":id" => $id]);

$doctor = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($doctor);