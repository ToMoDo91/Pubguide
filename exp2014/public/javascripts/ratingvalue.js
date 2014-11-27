

$(document).ready(function() {

  var rating;
  var votes;
  var average;
  var dataip;

  $(function(){

    var pub =$('#pub-content').find("h1").text();

     $.ajax({
       type: "GET",
       dataType: "json",
       contentType: "application/javascript",
       async: false,
       url: 'https://api.mongolab.com/api/1/databases/pubguide/collections/pubs?apiKey=qkyLl4Bb5u8xgVxcTXhM_gtj6bzlOsvs&q={"Pub":"'+ pub + '"}',
       success: function (jsonData) {
            for (var key in jsonData) {

              votes = jsonData[key].votes;
              rating = jsonData[key].rate;
              console.log(jsonData[key].votes);
            }

       },
       error: function (request, textStatus, errorThrown) {
           console.log(request.responseText);
           console.log(textStatus);
           console.log(errorThrown);
       }
    });

    rating = parseInt(rating);
    votes = parseInt(votes);
    
    if (isNaN(rating)){
      rating = 0;
      alert(rating);
    };
    if (isNaN(votes)){
      votes = 0;
    };

    average = rating / votes;

    $('#rate').rateit('value', average);

    $.get("http://ipinfo.io", function(response) {
      dataip = response.ip;
    }, "jsonp");

  });



  $("#rate").click(function(event) {

    /* stop form from submitting normally */
    event.preventDefault();

    /* get some values from elements on the page: */
    if(!(dataip === '158.37.73.95')){
    rating += $('#rate').rateit('value');
    votes += 1;
    average = rating / votes;
    };

    $('#rate').rateit('value', average);

    //$("#rating").attr("value", rating);

    var pub =$('#pub-content').find("h1").text();

		$.ajax({
      url: 'https://api.mongolab.com/api/1/databases/pubguide/collections/pubs?apiKey=qkyLl4Bb5u8xgVxcTXhM_gtj6bzlOsvs&q={"Pub":"'+ pub + '"}',
			type: 'PUT',
			data: JSON.stringify( { "$set" : { "rate" : rating, "votes" : votes } } ),
      contentType: 'application/json'

    }).done(function( msg ) {
      console.log(msg);
    });

  });

});
