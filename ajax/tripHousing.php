<?php

if (isset($_GET['housingID'])) {
    $housingID = $_GET['housingID'];
    
    $servername = "us-cdbr-azure-central-a.cloudapp.net";
    $username = "b4f75722d4ac47";
    $password = "26434464";
    $db = "MizzouAlternativeBreaksData";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $db);

    
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 
    
    if (!$conn = mysql_connect('us-cdbr-azure-central-a.cloudapp.net', 'b4f75722d4ac47', '26434464')) {
        echo 'Could not connect to mysql';
        exit;
    }

    if (!mysql_select_db('MizzouAlternativeBreaksData', $conn)) {
        echo 'Could not select database';
        exit;
    }
    
    $sql = "SELECT * FROM housing h WHERE h.housingID ='".$housingID."'";
    $result=mysql_query($sql, $conn);
    $row=mysql_fetch_assoc($result);
    console.log($row);
    echo json_encode($row);    

    /*$sql= "SELECT t.tripID, t.housingID, h.*, c.*
        FROM trip t, housing h, contact c
        WHERE t.housingID = h.housingID
        AND h.contactID = c.contactID
        AND t.tripID ='".$tripID."'";
    $result=mysql_query($sql, $conn);
    $row=mysql_fetch_assoc($result);
    console.log($row);
    echo json_encode($row);    
    */
    }   

?>