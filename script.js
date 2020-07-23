$(document).ready(function(){

    function searchCity(city){

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b16b8dd85bc345406e0453d1f7fc5fe0";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            console.log(response);

          // Constructing HTML containing city name and current weather info
            var cityName = $("<h1>").text(response.name);
            var cityTemp = $("<p>").text("Temperature: " + response.main.temp);
            var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");

            // empty content of card-body
            $(".card-body").empty();
            $(".card-body").append(cityName, cityTemp, cityHumidity, cityWindSpeed);

          });


        
    }

    //Event handler when user clicks search button after input city name
    $("#city-submit").on("click", function(event){
      // Preventing the button from trying to submit the form
          event.preventDefault();

      // Store the city name from search box
          var cityInput = $("#city-input").val().trim();

      // call searchCity function, passing cityInput as an argument
          searchCity(cityInput);

      

    });

});
