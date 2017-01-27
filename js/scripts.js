  ////////////////////
 // Back End Section
////////////////////


  /////////////////////
 // Front End Section
/////////////////////
$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();

    // Capture name value pairs of selected pizza options
    var pizzaOptions = [];
    $(".pizzaOption input:checked").each(function() {
      pizzaOptions.push({
        name: $(this).attr("name"),
        value: $(this).val()
      })
    });

    var pizzaPrice =  pizzaOptions.length?pizzaOptions[0].value:"Please choose size";

    $("#outputSection").children().first().text(pizzaPrice);
    $("#outputSection").fadeOut(100).fadeIn(100);
  });

}); // End document ready
