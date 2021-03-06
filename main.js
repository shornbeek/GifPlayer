
    $( document ).ready(function() {

var gifArray = ["Run", "Fall", "Fail", "Ninja", "Love", "Party Rock", "John Candy", "Music", "Rick and Morty", "Simpsons", "Skynig", "Crying", "Fighting","Dancing", "Car Crash", "Flip"];

function showGifTag(){
    $("#gifButtonsView").empty();
    for (var i = 0; i < gifArray.length; i++){
        var buttonGif = $("<button>");
        
        buttonGif.addClass("action");
        buttonGif.addClass("btn btn-primary")
        buttonGif.attr("data-name", gifArray[i]);
        buttonGif.text(gifArray[i]);
        
        $("#gifButtonsView").append(buttonGif);
    }
}


// Function to add a new action button
function newButt(){
    $("#addGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == ""){
      return false; 
    }
    gifArray.push(action);

    showGifTag();
    return false;
    });
}

// Function that displays all of the gifs
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=yDCCeSvcpPbQ6VyCgzSv1zTTlb8gLQIx&limit=20";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); // console test to make sure something returns
        $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions
showGifTag(); // displays list of gifArray already created
newButt();

// Document Event Listeners
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    
    }else{

        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});

