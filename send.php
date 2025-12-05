<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

$name = $_POST["name"];
$email = $_POST["email"];

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'TU_CORREO@tudominio.com';
    $mail->Password   = 'TU_PASSWORD_SMTP';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    $mail->setFrom('TU_CORREO@tudominio.com', 'Invitación');
    $mail->addAddress('TU_CORREO@tudominio.com');

    $mail->Subject = 'Nueva confirmación de asistencia';
    $mail->Body    = "Nombre: $name\nCorreo: $email";

    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
}