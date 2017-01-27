  ////////////////////
 // Back End Section
////////////////////


  /////////////////////
 // Front End Section
/////////////////////
$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();

    $("#outputSection").fadeOut(100).fadeIn(100);
  });

}); // End document ready
