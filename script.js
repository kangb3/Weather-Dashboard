$(document).ready(function(){

    function searchCity(city){

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b16b8dd85bc345406e0453d1f7fc5fe0";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {

            console.log(response);

          });


        
    }


    $("#city-submit").on("click", function(event){
          event.preventDefault();

          var cityInput = $("#city-input").val().trim();

          searchCity(cityInput);
    });

  });
