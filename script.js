$(document).ready(function(){

    //Function for retrieving current weather for a city
    //takes one argument, city representing city name
    function currentWeather(city){

      //Query URL for retrieving current weather condition
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b16b8dd85bc345406e0453d1f7fc5fe0";
      
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            //console.log(response);

          // Constructing HTML containing city name and current weather info
            var cityName = $("<h1>").text(response.name + ' ' + moment().format('LL'));
            var cityTemp = $("<p>").text("Temperature: " + response.main.temp);
            var cityHumidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var cityWindSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " mph");
            var weatherIcon = response.weather[0].icon;
            var showWeatherIcon = $("<img id='weatherIcon'>");
            showWeatherIcon.attr("src","https://openweathermap.org/img/w/" + weatherIcon + ".png");

            // empty content of card-body
            $("#currentWeather").empty();
            $("#currentWeather").append(cityName, showWeatherIcon, cityTemp, cityHumidity, cityWindSpeed);

            
            //Store latitude and longitude for UV Index
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;

            //Query URL for retrieving latitude and longitude for UV Index
            var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&apikey=b16b8dd85bc345406e0453d1f7fc5fe0";
            //console.log("the lat: "+latitude+ "&"+longitude);
            
            //ajax call to retrieve UV Index value
            $.ajax({
              url: uvQueryURL,
              method: "GET"
              }).then(function(response) {
                  var uvIndex = $("<p>").text("UV Index: " + response.value);
                  $("#currentWeather").append(uvIndex);
              });

          });
    
    


        
    }

    //Function for retrieving five day forecast for a city
    //takes one argument, city representing user input for city
    function forecast(city){
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=b16b8dd85bc345406e0453d1f7fc5fe0";
        $("#forcastWeather").empty();

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response);

          for(var i = 0; i < 5; i++){
            var forcastDate = moment().add(i, 'days').format('LL');
            var forcastDiv = $("<div class='forcastWeather'>");
            var cityTemp = $("<div>").text("Temp: " + response.list[i].main.temp);
            var cityHumidity = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%")
            var forcastIcon = response.list[i].weather[0].icon;
            var showForcastIcon = $("<img id='forcastIcon'>");
            showForcastIcon.attr("src","https://openweathermap.org/img/w/" + forcastIcon + ".png");

            //$("#forcastWeather").empty();
            forcastDiv.append(forcastDate, showForcastIcon, cityTemp, cityHumidity)

            
            $("#forcastWeather").append(forcastDiv);

            //$(".forcastWeather").append(cityTemp, cityHumidity);
          }
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
