// CONVERTING ADDRESS OBJECT TO LOCATION
function convertLoc(address) {
    let lati = address.latitude;
    let longi = address.longitude;
    pos = {
        lat: lati,
        lon: longi
    }
    return pos
};

// USING YELP API TO RETRIEVE DATA AND HANDLEBAR HELPER FUNCTIONS
function businesses() {
    var cuisineSearch = $("#cuisine").val();
    var locationSearch = $("#locationOfEater").val();
    Handlebars.registerHelper('json', function (context) {
        return JSON.stringify(context);
    });
    Handlebars.registerHelper('mile', function (context) {
        return JSON.stringify(Number((context / 1000).toFixed(1)));
    });
    Handlebars.registerHelper("ratingConvert", function (context) {
        switch (context) {
            case (5):
                return ("<img src='/images/stars/small_5.png'></img>");
            case (4.5):
                return ("<img src='/images/stars/small_4_half.png'></img>");
            case (4):
                return ("<img src='/images/stars/small_4.png'></img>");
            case (3.5):
                return ("<img src='/images/stars/small_3_half.png'></img>");
            case (3):
                return ("<img src='/images/stars/small_3.png'></img>");
            case (2.5):
                return ("<img src='/images/stars/small_2_half.png'></img>");
            case (2):
                return ("<img src='/images/stars/small_2.png'></img>");
            case (1.5):
                return ("<img src='/images/stars/small_1_half.png'></img>");
            case (1):
                return ("<img src='/images/stars/small_1.png'></img>");
            case (0):
                return ("<img src='/images/stars/small_0.png'></img>");

        }
    });

    Handlebars.registerHelper("statusConvert", function (context) {
        switch (context) {
            case (false):
                return ("<span style='color:green'><b>Open</b></span>");
            case (true):
                return ("<span style='color:red'><b>Closed</b></span>");
        }
    });

    $("#output").empty();

    // CALL YELP API
    $.ajax({
        url: "/returnBusinesses",
        type: "get",
        data: {
            cuisine: cuisineSearch,
            location: locationSearch,
        },
        success: function (data) {
            present(data);
        }
    });
}

// Converting HTML Template using the API data to cards
function present(data) {
    let x = data["businesses"].length;
    var source = document.getElementById("businessesDisplayTemplate").innerHTML;
    var template = Handlebars.compile(source);
    if (x == 0) {
        $("#output").append("<h1>No results found!</h1>")
    }
    else {
        for (let i = 0; i < x; i++) {
            $("#output").append(
                template(data["businesses"][i])
            );
        }
    }
}