function searchCity(city){

    var queryURL = "api.openweathermap.org/data/2.5/weather" + city + "q={city name}&appid=b16b8dd85bc345406e0453d1f7fc5fe0";

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {



      });

}