
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDAfLcbCx2JMhV2Sh50H830BYn1mOD3N4w",
    authDomain: "traintimefirebasehw.firebaseapp.com",
    databaseURL: "https://traintimefirebasehw.firebaseio.com/",
    storageBucket: "traintimefirebasehw.appspot.com"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var current_time = moment();

  $("#addbtn").on("click", function(e)
{
    e.preventDefault();

    var trainname = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firsttraintime = $("#firstTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
        
    var firsttrainconvert = moment(firsttraintime, "hh:mm").subtract("1 , years");
    var difference = current_time.diff(moment(firsttrainconvert), "minutes");
    var remain = difference % frequency;
    var minutesleft = frequency - remain;
    var nextarrival = moment().add(minutesleft, "minutes").format("hh:mm a");       

    database.ref().push({
        name: trainname,
        destination: destination,
        firsttime: firsttraintime,
        frequency: frequency,
        nextarrival: nextarrival,
        mins: minutesleft
      });

    $("#trainNameInput").val(" ");
    $("#destinationInput").val(" ");
    $("#firstTimeInput").val(" ");
    $("#frequencyInput").val(" ");
});

database.ref().on("child_added", function(ChildSnapshot)
{
    var child_snapshot = ChildSnapshot.val();

    console.log(child_snapshot.name);
    console.log(child_snapshot.destination);
    console.log(child_snapshot.frequency);
    console.log(child_snapshot.nextarrival);
    console.log(child_snapshot.minutesleft);

    $("#traintable").append("<tbody><tr><td>" + child_snapshot.name + "</td><td>" + child_snapshot.destination + "</td><td>"
    + child_snapshot.frequency + "</td><td>" + child_snapshot.nextarrival + "</td><td>" + child_snapshot.mins +"</td></tr></tbody>");
});