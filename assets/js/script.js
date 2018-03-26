$(document).ready(function() {

    //set rules .read & .write to true
    var config = {
        apiKey: "AIzaSyBmIusdf6_fFrxRjCiYjZBnm4BJJT9musw",
        authDomain: "trains-31da5.firebaseapp.com",
        databaseURL: "https://trains-31da5.firebaseio.com",
        projectId: "trains-31da5",
        storageBucket: " ",
        messagingSenderId: "941064216673"
    };

    firebase.initializeApp(config);
    var database = firebase.database().ref();

    function displayTime() {
      let time = moment().format('HH:mm:ss');
      let date = moment().format('dddd, MM/DD/YYYY')
      $("#time").html(time);
      $("#date").html(date);
      setInterval(displayTime, 1000);
    }

    displayTime();

    function nextArrival(onset, frequency) {
      for (i = 0; i > onset.length; i++) {
        let timeIndex = onset[i].split(i[1]);
        // for (i = 0, i > timeIndex.length, i++) {
        // var timeMM =
          var timeMM = (timeIndex.pop().toString()) + (timeIndex.pop().toString());
          parseInt(timeMM);
          console.log('time in min: ', timeMM);
        // }
      }
        var onset = timeMM / 60;
        console.log('onset in nextArrival() is ', onset);
        let start = moment([onset]);
        let stop = moment([frequency]);
        let next = start.diff(stop, 'min');
        // return next;
        // console.log('first  train at: ', start);
        // console.log('train frequency is: ', stop);
        console.log('next train is at: ', next);
        return timeMM;
    }

    $(".form-control").keypress(function(e) {
      if (e.which == 13) {
        $('#add-train').trigger('click');
      }
    });

    $("#add-train").on("click", function(event) {
        event.preventDefault();

        var departures = $("#departure-input").val().trim();
        var destination = $("#arrival-input").val().trim();
        var onset = $("#onset-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        var trainDeets = {
          departureStation: departures,
          destinationStation: destination,
          firstDeparture: onset,
          departureFrequency: frequency,
        };

        if (!isNaN(departures)) {
          $(".panel-mssg").text('Please enter a valid train station name');
          $("#departure-input").val('').focus();
          return;
        }

        if (!isNaN(destination)) {
          $(".panel-mssg").text('Please enter a valid train station name');
          $("#arrival-input").val('').focus();
          return;
        }

        if (moment(onset, "H:mm A").isValid()) {
          database.push(trainDeets);
          console.log('time entered correctly');
        } else {
          $(".panel-mssg").text('Please enter a valid time for first train departure');
          $("#onset-input").val('').focus();
          return;
        }
        console.log('train starts: ', onset);
        console.log('train frequency: ', frequency);
        // nextArrival(onset, frequency);
        // let next = 10;
        // console.log('next train is at: ', timeMM);
        //
        // let nextTrain = moment(next, "HH:mm A");
        // $("#nextArrival").text(nextTrain);
        // let minTilArrival = moment(minTilArrival, "HH:mm A");
        // $("#minAway").text(minTilArrival);

        $("#departure-input").val("");
        $("#arrival-input").val("");
        $("#onset-input").val("");
        $("#frequency-input").val("");

    });

    database.on("value", function(snapshot, value) {
        let leave = snapshot.val().departureStation;
        let arrival = snapshot.val().destinationStation;
        let firstTrain = snapshot.val().firstDeparture;
        let oscillation = snapshot.val().departureFrequency;


        $('#train').text(leave);
        $('#arrival').text(arrival);
        $('#howOften').text(oscillation);
    });

    //invoke the moment object w/ unix method and formatting
    //var displayDeets = moment().unix(trainDeets).format("HH:mm A");


    //calculate the frequency of trains in minutes (1440 = 24hrs in minutes)
    // var n = "";
    // for (n = 0; n < 1440; n++) {
    //     text += f[n];
    // };
    // var f = $("#frequency-input") * (n + 1);
    // var frequencyCalc = $("#frequency-input") + [f];

    // //calculate the nextArrival
    // var nextTrain = moment().diff(moment.unix(frequencyCalc, "X"), "minutes");

    //display data from firebase into #input-body
    // $("#input-body").append(departureStation + destinationStation + firstDeparture + departureFrequency);

});
