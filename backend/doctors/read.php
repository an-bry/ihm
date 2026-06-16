<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$sql = "SELECT * FROM doctors ORDER BY id DESC";
$stmt = $db->prepare($sql);
$stmt->execute();

$doctors = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($doctors);