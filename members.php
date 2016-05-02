<!DOCTYPE html>
<html>
<head>
	<title>MAB Member Database</title>
<link rel="icon" href="./img/mab_logo.png">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

<link href="dist/css/flat-ui.css" rel="stylesheet">

     <div class="row">
        <div class="col-xs-12">
          <nav class="navbar navbar-inverse navbar-embossed" role="navigation">
            <div class="navbar-header">
              <a class="navbar-brand">Mizzou Alternative Breaks</a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-01">
                <ul class="nav navbar-nav navbar-right">
                <li><a href="./members.php">Members</a></li>
                <li><a href="./trips.php">Trips</a></li>
                <li><a href="./sites.php">Sites</a></li>
                </ul>
               
            </div><!-- /.navbar-collapse -->
          </nav><!-- /navbar -->
        </div>
      </div> <!-- /row -->

    
</head>
<body>
    <br>
    <br>
    <div class="container">
  
    <form method="POST" class="navbar-form navbar-right" action="members.php" role="search">
      <div class="input-group">
        <input class="form-control" name="searchTxt" id="navbarInput-01" type="search" placeholder="Search by Pawprint">
        <span class="input-group-btn">
          <button type="submit" class="btn" name="searchButton"><span class="fui-search"></span></button>
        </span>
      </div>
    
    </form>   

    <?php
	//Check to make sure the Search button is pushed
	if(isset($_POST['searchButton']))
	{

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
        

		$searchText = $_POST['searchTxt'];
        $searchText = strtolower($searchText);
        $board = array("pns6h6", "klsfk2", "eahrk6", "mkkkcc", "cih359", "ltjvf9", "rrnyt7", "kmo827", "cwd7c4", "ljhc6f", "ksmtn7", 
"lea4h8", "atmgz4", "cebxtf");
        
        if (in_array($searchText, $board)) {
            echo "Reviews have been removed.";
        }
        else {
            $stmt = $conn->prepare("SELECT mi.firstName, mi.lastName, r.pawprint, t.tripName, r.review, r.reviewerPawprint
                                    FROM member_info mi, review r, trip t
                                    WHERE r.pawprint = mi.pawprint
                                    AND r.tripID = t.tripID
                                    AND r.pawprint = ?
                                    ORDER BY r.pawprint, t.tripID");
            $stmt->bind_param("s", $searchText);
            $stmt->execute();
            $stmt->bind_result($firstName, $lastName, $pawprint, $tripName, $review, $reviewerPawprint);
            $stmt->store_result();
            if ($stmt->num_rows > 0) {
                echo "<table class='table table-bordered table-striped'>";
                echo "<th>NAME</th><th>TRIP</th><th>REVIEW</th><th>REVIEWER</th>";
                    while ($stmt->fetch()) {
                        echo "<tr>";
                        echo "<td>{$firstName} {$lastName}</td><td>{$tripName}</td><td>{$review}</td><td>{$reviewerPawprint}</td>";
                        echo "</tr>";
                    }
                echo "</table>";
            }
            else {
                $stmt = $conn->prepare("SELECT t.tripID, t.tripName, t.season, m.pawprint, m.firstName, m.lastName
                                    FROM trip_member tm, trip t, member_info m
                                    WHERE tm.tripID = t.tripID
                                    AND tm.pawprint = m.pawprint
                                    AND tm.pawprint = ?
                                    ORDER BY t.tripID");
                $stmt->bind_param("s", $searchText);
                $stmt->execute();
                $stmt->bind_result($tripID, $tripName, $season, $pawprint, $firstName, $lastName);
                $stmt->store_result();
                if ($stmt->num_rows > 0) {
                    while ($stmt->fetch()) {
                        echo "<b>{$tripName}</b> ({$season}) did not submit reviews for <b>{$firstName} {$lastName}</b>.";
                    }
                }
                else {
                    echo "<b>{$searchText}</b> not found in the database.";
                }
            }
        }
        
    }
    ?>
   </div>
<br>
    
    
    
    
    </body>
</html>