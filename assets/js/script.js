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
    };

    setInterval(displayTime, 1000);
    // displayTime();

    function nextArrival(onset, frequency) {
        // var min = moment(frequency, "mm");
        // var min = moment().set('hour', frequency);
        console.log('train starts: ', onset);
        var hours = onset.slice(0, 2);
        let colon = hours.search(/:/i)
        console.log('colon: ', colon);
        if (colon !== -1) {
          console.log('the time was entered w/o colon: ', onset);
        } else if (colon == -1) {
          var removeIt = onset.replace(/:/g, '');
          console.log('train w/o colon: ', removeIt);
          var mins = removeIt.slice(2, 4);
          console.log('typed hour is: ', hours);
          console.log('typed mins are: ', mins);
          console.log(typeof(mins));
        }
        var min = moment(frequency).format("mm");
        console.log('train runs every ', frequency, ' minutes');
        let newTime = removeIt;
        console.log(typeof(newTime));
        let next = parseInt(newTime) + parseInt(mins);
        console.log('next train is at: ', next);
        let nextTrain = moment(next, "HH:mm A");
        console.log(nextTrain);
        // $("#nextArrival").text(nextTrain);
        let minAway = moment().add(nextTrain, 'minutes')
        let minTilArrival = moment(minAway, "HH:mm A");
        // $("#minAway").text(minTilArrival);

        //calculate the nextArrival
        // invoke the moment object w/ unix method and formatting
        // var displayDeets = moment().unix(trainDeets).format("HH:mm A");
        //
        // // calculate the frequency of trains in minutes (1440 = 24hrs in minutes)
        // var n = "";
        // for (n = 0; n < 1440; n++) {
        //     text += f[n];
        // };
        // var f = $("#frequency-input") * (n + 1);
        // var frequencyCalc = $("#frequency-input") + [f];
        //
        // var nextTrain = moment().diff(moment.unix(frequencyCalc, "X"), "minutes");
        //
        // let start = moment([onset]);
        // console.log('start: ', start);
        // let stop = moment([frequency]);
        // console.log(('stop: ', stop));
        // let next = start.diff(stop, 'min');
        // // console.log('first  train at: ', start);
        // // console.log('train frequency is: ', stop);
        // console.log('next train is at: ', next);
    };

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
        // var nextT;
        // var farOut;

        var trainDeets = {
          departureStation: departures,
          destinationStation: destination,
          firstDeparture: onset,
          departureFrequency: frequency,
          // next: nextT,
          // minAway: farOut,
        };

        console.log('station name: ', departures);
        if (isNaN(departures) == false) {
          $(".panel-mssg").text('Please enter a valid train station name');
          $("#departure-input").val('').focus();
          // return;
        } else if (isNaN(destination) == false) {
          console.log('destination name: ', destination);
          $(".panel-mssg").text('Please enter a valid train station name');
          $("#arrival-input").val('').focus();
          return;
        };
        console.log('first train entered: ', onset);

        if (moment(onset, "H:mm A").isValid()) {
          database.push(trainDeets);
          console.log('time entered correctly');
        } else if (moment(onset, "HHmm A")){
          // $(".panel-mssg").text('Please enter a valid time for first train departure');
          console.log('first train departure entered w/o colon: ', onset);
          $("#onset-input").val('').focus();
          return;
        };

        nextArrival(onset, frequency);

        $("#departure-input").val("");
        $("#arrival-input").val("");
        $("#onset-input").val("");
        $("#frequency-input").val("");

    });

    database.on("child_added", function(snapshot, value) {
        let leave = snapshot.val().departureStation;
        let arrival = snapshot.val().destinationStation;
        let firstTrain = snapshot.val().firstDeparture;
        let oscillation = snapshot.val().departureFrequency;
        // let next = snapshot.val().next;
        // let minAway = snapshot.val().minAway;

        $('#train').append(`<div>${leave}</div>`);
        $('#arrival').append(`<div>${arrival}</div>`);
        $('#howOften').append(`<div>${oscillation}</div>`);
        // $('#nextTrain').append(`<div>${next}</div>`);
        // $('#minAway').append(`<div>${minAway}</div>`);
    });

});
