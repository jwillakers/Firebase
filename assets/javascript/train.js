// Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
alert("hi")
// Assumptions
    var tFrequency = 3;

// Time is 3:30 AM
    var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

// Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//Variable to figure out the converted train time
  // var trainTimeConverted = moment(trainTime, "HH:mm");

// add Firebase...this code comes from the Firebase API I created here:Https://Console.Firebase.Google.Com/
  
  var config = {
    apiKey: "AIzaSyABvE85oypqliNt5czdh6dA-U0Q0lmSpXY",
    authDomain: "train-tracker-5e16c.firebaseapp.com",
    databaseURL: "https://train-tracker-5e16c.firebaseio.com",
    projectId: "train-tracker-5e16c",
    storageBucket: "train-tracker-5e16c.appspot.com",
    messagingSenderId: "404276825717"
  };
// Initialize Firebase
  firebase.initializeApp(config);

  var traindata = firebase.database();

  // when submit button clicked
  $("#click-button").on("click",function(){
// prevent page from refreshing
    event.preventDefault();

// gets user input and trims off any extra spaces
      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#train-destination-input").val().trim();
      var trainTime = moment($("#train-start-input").val().trim(), "HH:mm").format("HH:mm");
      var trainFrequency = $("#rate-input").val().trim();

// Creates local "temporary" object for holding inputs
      var newTrain = {
        train: trainName,
        destination: trainDestination,
        first: trainTime,
        frequency: trainFrequency
    };
//Setting the new values in the database
    traindata.ref().push(newTrain);
    
// testing
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
    alert("train added")
    
    //Clearing the inputs
     $("#train-name-input").val("");
     $("#train-destination-input").val("");
     $("#train-start-input").val("");
     $("#rate-input").val("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
traindata.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
    
// Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  var differenceTimes = moment().diff(firstTrainTime, "minutes");
   //Variable to figure out the converted train time
  var trainTimeConverted = moment(firstTrainTime, "HH:mm");
    //Declaring a time difference variable
  var timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log(timeDifference);
    
  var frequencyMinutes = childSnapshot.val().frequency;
    console.log("Frequency Minutes: " + frequencyMinutes);
  
  var minutesAway = Math.abs(timeDifference % frequencyMinutes);
    console.log("Minutes Away: " + minutesAway);
  
  var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
    console.log("Next Arrival: " + nextArrival);
  
    
//Adding into the table
$("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
          trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
 });