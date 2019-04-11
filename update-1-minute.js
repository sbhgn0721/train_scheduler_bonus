//1. Initialize Firebase

var config = {
    apiKey: "AIzaSyCAU8gy3MOK-cWeCb_GjU47q4HwYrmJafM",
    authDomain: "train-scheduler-47c54.firebaseapp.com",
    databaseURL: "https://train-scheduler-47c54.firebaseio.com",
    projectId: "train-scheduler-47c54",
    storageBucket: "",
    messagingSenderId: "422776789357"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  //2. Submit button for adding new train schedule
  $("#add-new-train").on("click", function (event) {
    event.preventDefault();
  
    //Grabs user input
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train-time").val().trim(), "HHmm").format("X");
    var trainFrequency = $("#frequency").val().trim();
  
    var id = document.getElementById('current-train-schedule').rows.length;
    //Creats local "temporary" object for holding train data
    var newTrain = {
      id: id+1,
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency
    };
  
    //Uploads data to the database
    database.ref().push(newTrain);
  
    //Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Train has been successfully added");
  
    //Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
  
  })
  var tempArray = [];
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    
    //Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    //Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
  
  
    //Calculate how many minutes away from next train arrival
    var currentToStartTime = moment().diff(moment(firstTrainTime, "X"), "minutes");
      console.log(currentToStartTime);
    var remainder = currentToStartTime % trainFrequency;
      console.log(remainder);
      var minutesAway;
      if(remainder<0){
        minutesAway = trainFrequency + remainder;
      }
      else{
        minutesAway = trainFrequency - remainder;
      }
    
    
    var nextArrivalTime = moment().add(minutesAway, 'minutes').format("hh:mm A");
   
    var index = childSnapshot.val().id-1;
  setInterval(function () {
    currentToStartTime = moment().diff(moment(firstTrainTime, "X"), "minutes");
    console.log(currentToStartTime);
  
    remainder = currentToStartTime % trainFrequency;
    console.log(remainder);
    if(remainder<0){
      minutesAway = trainFrequency + remainder;
    }
    else{
      minutesAway = trainFrequency - remainder;
    }
  
    //Calculate next train arrival time
  
    nextArrivalTime = moment().add(minutesAway, 'minutes').format("hh:mm A");
    
    
    var myTable = document.getElementById('current-train-schedule');
    // console.log('my iiiiiii',i);
     myTable.rows[index].cells[3].innerHTML = nextArrivalTime;
     myTable.rows[index].cells[4].innerHTML = minutesAway;
    
  }, 60*1000);
  
  
    //Create new row in the current train schdule table
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrivalTime),
      $("<td>").text(minutesAway)
    );
  
    //Append the new row to the table
    $("#current-train-schedule").append(newRow);
  
  
  })
  