//Loads buttons on to page on inital page load
$(function() {
    addButtons(gifs, 'gifButton', '#gifButtons');
});

var gifs = ["Plane",'Train','Automobile'];

//Created function to make the buttons and add them to the page
function addButtons(gifArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < gifArray.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', gifArray[i]);
        a.text(gifArray[i]);
        $(areaToAddTo).append(a);
    }

}
//On click function that queries the giphy api whatever button the user clicked
$(document).on('click', '.gifButton', function(){
    $('#gifs').empty();
    $('.gifButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var gifDiv = $('<div class="gif-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var gifImage = $('<img>');
             gifImage.attr('src', still);
             gifImage.attr('data-still', still);
             gifImage.attr('data-animate', animated);
             gifImage.attr('data-state', 'still')
             gifImage.addClass('gifImage');

             gifDiv.prepend(p)
             gifDiv.prepend(gifImage)

             $('#gifs').append(gifDiv);
         }
        
    }); 
});
//On click function to transition a gif from a still state to an animated state
$(document).on('click', '.gifImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})
//On click function to add a new gif button to the page that the user inputted
$('#addGif').on('click', function(){
    var newGif = $('input').eq(0).val();

    if (newGif.length > 2){
        gifs.push(newGif);
    }

    addButtons(gifs, 'gifButton', '#gifButtons');

    return false;
});