var config = {
    apiKey: "AIzaSyASQVyeoYJeqa5Kutqc2h0lZXh9ytkSgwg",
    authDomain: "blznks-page.firebaseapp.com",
    databaseURL: "https://blznks-page.firebaseio.com",
    projectId: "blznks-page",
    storageBucket: "blznks-page.appspot.com",
    messagingSenderId: "53977754618"
  };
  firebase.initializeApp(config);
var database = firebase.database();
$('#addTrain').on("click", function() {
  var trainName = $("#trainName").val().trim();
  var destination = $("#destinationName").val().trim();
  var firstTrain = moment($("#time").val().trim(), "HH:mm").format("HH:mm");
  var timeFrequency = $("#frequency").val().trim();
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: timeFrequency
    }
  database.ref().push(newTrain);
  console.log(newTrain.name);
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#tFrequencyInput").val("");
  return false;
});
database.ref().on("child_added", function(snapShot) {
  var trainName = snapShot.val().name;
  var destination = snapShot.val().place;
  var firstTrain = snapShot.val().ftrain;
  var timeFrequency = snapShot.val().freq;
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  var timeRemainder = timeDiff % timeFrequency;
  var minToTrain = timeFrequency - timeRemainder;
  var nextTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextTrain + "</td><td>" + timeFrequency + "</td><td>" + minToTrain + "</td></tr>");
});