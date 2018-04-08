$(document).ready(function () {


  var topics = ["hockey", "baseball", "football", "soccer", "lacrosse"];

  function displayGifs() {
    // Grabbing and storing the data-name property value from the button
    var gifName = $(this).attr("data-name");
    var number = $("#gifNumber").val();

    // Constructing a queryURL using the gif data-name name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifName + "&api_key=dc6zaTOxFJmzC&limit=" + number;

      //makes card visible
      $(".card").removeClass("invisible");

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var gifDiv = $("<div class='float-left mr-1'>");

          var rating = results[i].rating;

          rating.toUpperCase;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating and storing an image tag
          var gifImage = $("<img class='gifImage'>");
          // Setting the src attribute of the image to a property pulled off the result item
          gifImage.attr("src", results[i].images.fixed_height_still.url);

          gifImage.attr("animate" , results[i].images.fixed_height.url);

          gifImage.attr("still" ,results[i].images.fixed_height_still.url);

          gifImage.attr("currentState" , gifImage.attr("src"));

          

          // Appending the paragraph and image tag to the animalDiv
          gifDiv.append(p);
          gifDiv.append(gifImage);

          // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
          $(".gif-results").prepend(gifDiv);
        }

      
      });
  }
  $(".gifImage").on("click" , function(){
    $(this).attr("src" ,  $(this).attr(results.images.fixed_height.url));
  });
  // This function handles events where a gif button is clicked
  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#searchTerm").val();

    // Adding gif from the textbox to our array
    topics.push(gif);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
    console.log(topics);
  });

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the gif div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#button-display").empty();

    // Looping through the array of gif buttons
    for (var j = 0; j < topics.length; j++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("gifButton btn btn-secondary ml-2 mt-3");
      // Adding a data-attribute
      a.attr("data-name", topics[j]);
      // Providing the initial button text
      a.text(topics[j]);
      // Adding the button to the buttons-view div
      $("#button-display").append(a);
    }
  }


//this function will run the display git function when the topic button is clicked
  $(document).on("click", ".gifButton", displayGifs);

  //this function changes between animing gifs and making the gif still
  $(document).on("click" , ".gifImage" , function(){
      var currentState = $(this).attr("currentState");
      var stillState = $(this).attr("still");
      var animateState = $(this).attr("animate");
    

      if(currentState === stillState){
        $(this).attr("src" , animateState);
        $(this).attr("currentState" , animateState);
      }else{
        $(this).attr("src" , stillState);
        $(this).attr("currentState" , stillState);
      }
  });

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  //function to clear out gif-reulsts div and empty the div of gifs 
  $("#clear").on("click", function () {
    $(".gif-results").empty();
  });



});