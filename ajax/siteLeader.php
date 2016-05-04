<?php

if (isset($_GET['tripID'])) {
    $tripID = $_GET['tripID'];
    
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
        
        /*$sql= "SELECT t.tripID, tm.pawprint, tm.siteLeaderFlag, mi.firstName, mi.lastName 
        FROM trip t, trip_member tm, member_info mi 
        WHERE t.tripID = tm.tripID
        AND tm.pawprint = mi.pawprint
        AND tm.siteLeaderFlag = 1
        AND t.tripID = '".$tripID."'";*/
    
    $sql = "SELECT t.tripID, tm.pawprint, tm.siteLeaderFlag, mi.firstName, mi.lastName 
    FROM trip t, trip_member tm, member_info mi 
    WHERE t.tripID = tm.tripID
    AND tm.pawprint = mi.pawprint
    AND tm.siteLeaderFlag = 1
    AND t.tripID ='".$tripID."'";
    
    $result=mysql_query($sql, $conn);
    while($row=mysql_fetch_assoc($result))
    {
        $results[] = $row;
    }
    //$row=mysql_fetch_assoc($result);    
    console.log($results);
    echo json_encode($results);    
    }   

?>