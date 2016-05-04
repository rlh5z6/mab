function showProfile(tripID){
    $('#trip_info').modal("show");
    
    $("#tripName").html("");
    $("#tripLocation").html("");
    $("#tripFocus").html("");
    $("#tripTime").html("");
    $("#housingName").html("");
    $("#housingStreetAddress").html("");
    $("#housingAddress").html("");
    $("#housingWebsite").html("");
    $("#housingContactName").html("");
    $("#housingContactNumber").html("");
    $("#housingContactEmail").html("");
    
    console.log(tripID);
    data(tripID);
    siteLeader(tripID);
    
            
}




function data(tripID){
    $.ajax({
        url: '/ajax/tripData.php',
        type: 'GET',
        data: 'tripID='+tripID,
        success: function(data) {
            trip = JSON.parse(data);
            console.log(trip);
            trip.time = trip.season + " " + trip.year;
            if (trip.season == "Fall Weekend" || trip.season == "Spring Weekend") {
                trip.location = trip.county + " County, " + trip.state;
            }
            else if (trip.season == "International") {
                trip.location = trip.city + ", " + trip.country;
            }
            else {
                trip.location = trip.city + ", " + trip.state;
            }
            
            if (trip.housingID) {
                console.log("Yay");   
                housing(trip.housingID);
            }
            else {
                console.log("FUCK");   
            }
                
            
            document.getElementById("tripName").innerHTML = trip.tripName;
            document.getElementById("tripTime").innerHTML = trip.time;
            document.getElementById("tripFocus").innerHTML = trip.focus;
            document.getElementById("tripLocation").innerHTML = trip.location;
           
            
        },
        error: function() {
            console.error("Failed to load modal content.");   
        }
    });
}


function housing(housingID){
    $.ajax({
        url: '/ajax/tripHousing.php',
        type: 'GET',
        data: 'housingID='+housingID,
        success: function(data) {
            housingData = JSON.parse(data);
            console.log(housingData);
            housingData.address = housingData.city + ", " + housingData.state + " " + housingData.zipcode;
            document.getElementById("housingName").innerHTML = housingData.siteName;
            document.getElementById("housingStreetAddress").innerHTML = housingData.streetAddress;
            document.getElementById("housingAddress").innerHTML = housingData.address;
            document.getElementById("housingWebsite").innerHTML = housingData.website;
            if (housingData.contactID) {
                console.log("Yeah yeah yeah");
                contact(housingData.contactID);
            }
            
        },
        error: function() {
            console.error("Failed to load modal content.");   
        }
    });
}

function contact(contactID) {
    $.ajax({
        url: '/ajax/contact.php',
        type: 'GET',
        data: 'contactID='+contactID,
        success: function(data) {
            contactData = JSON.parse(data);
            console.log(contactData);
            document.getElementById("housingContactName").innerHTML = contactData.name;
            document.getElementById("housingContactNumber").innerHTML = contactData.phoneNum;
            document.getElementById("housingContactEmail").innerHTML = contactData.emailAddress;
            
        },
        error: function() {
            console.error("Failed to load modal content.");   
        }
    });
}
    
    
function siteLeader(tripID) {
    $.ajax({
        url: '/ajax/siteLeader.php',
        type: 'GET',
        data: 'tripID='+tripID,
        success: function(data) {
            siteLeaderData = JSON.parse(data);
            console.log(siteLeaderData);
            for(var i = 0; i < siteLeaderData.length; i++){
                document.getElementById("siteLeaderName"+(i+1)).innerHTML = siteLeaderData[i].firstName + " " + siteLeaderData[i].lastName;
            }
        },
        error: function() {
            console.error("Failed to load modal content.");   
        }
    });
}
        
      