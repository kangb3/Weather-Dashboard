$(document).ready(function(){

    //Function for retrieving current weather for a city
    //takes one argument, city representing city name
    function currentWeather(city){

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b16b8dd85bc345406e0453d1f7fc5fe0";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            //console.log(response);

          // Constructing HTML containing city name and current weather info
            var cityName = $("<h1>").text(response.name);
            var cityTemp = $("<p>").text("Temperature: " + response.main.temp);
            var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");

            // empty content of card-body
            $(".currentWeather").empty();
            $(".currentWeather").append(cityName, cityTemp, cityHumidity, cityWindSpeed);

          });
    
    


        
    }

    //Function for retrieving five day forecast for a city
    //takes one argument, city representing user input for city
    function forecast(city){
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b16b8dd85bc345406e0453d1f7fc5fe0";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response);
        });
    }

    //Event handler when user clicks search button after input city name
    $("#city-submit").on("click", function(event){
      // Preventing the button from trying to submit the form
          event.preventDefault();

      // Store the city name from search box
          var cityInput = $("#city-input").val().trim();

      // call searchCity function, passing cityInput as an argument
          currentWeather(cityInput);
          forecast(cityInput);

      

    });

});
