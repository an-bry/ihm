<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "../config/database.php";

$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];

$query = "SELECT * FROM patients WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(":id", $id);
$stmt->execute();

echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));