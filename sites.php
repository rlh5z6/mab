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
  
    <form method="POST" class="navbar-form navbar-right" action="sites.php" role="search">
      <div class="input-group">
        <input class="form-control" name="searchTxt" id="navbarInput-01" type="search" placeholder="Search">
        <span class="input-group-btn">
          <button type="submit" class="btn" name="searchButton"><span class="fui-search"></span></button>
        </span>
      </div>
    <select class="form-control select select-primary" name="search" data-toggle="select">
        <option default>Search By</option>
        <option value="Trip Name">Trip Name</option>
        <option value="City">City</option>
        <option value="State">State</option>
        <option value="Service Focus">Service Focus</option>
    </select> 
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
        $searchText = strtoupper($searchText);
        
        $searchTextTemp = $searchText . '%';
        $stmt = $conn->prepare("SELECT t.tripID, t.tripName, t.season, t.year, t.city, t.state, h.housingID, h.siteName
                                FROM trip t, housing h
                                WHERE t.housingID = h.housingID
                                AND t.city LIKE ?");
        $stmt->bind_param("s", $searchTextTemp);
        $stmt->execute();
        $stmt->bind_result($tripID, $tripName, $season, $year, $city, $state, $housingID, $siteName);
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            echo "<table class='table table-bordered table-striped'>";
            echo "<th>TRIP</th><th>LOCATION</th><th>SEASON</th><th>YEAR</th><th>HOUSING</th>";
                while ($stmt->fetch()) {
                    echo "<tr>";
                    echo "<td>{$tripName}</td><td>{$city}, {$state}</td><td>{$season}</td><td>{$year}</td><td>{$siteName}</td>";
                    echo "</tr>";
                }
            echo "</table>";
        }   
        else {
            echo "No results found.";
        }
        
        
    }
    ?>
   </div>
<br>
</body>
</html>