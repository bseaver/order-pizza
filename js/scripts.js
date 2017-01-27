  ////////////////////
 // Back End Section
////////////////////
var pizzaSizePrices = [
  [11, 5.00],
  [18, 9.00],
];

function Pizza(size) {
  this.size = size;
}

Pizza.prototype.calculateCost = function(sizePrices) {
  for (var i = 0; i < sizePrices.length; i++) {
    if (sizePrices[i][0] == this.size) {
      return sizePrices[i][1];
    }
  }
};

  /////////////////////
 // Front End Section
/////////////////////

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("#pizzaSize input:checked").val();

    var orderPizza = new Pizza(pizzaSize);
    var pizzaPrice =  orderPizza.calculateCost(pizzaSizePrices)

    $("#outputSection").children().first().text(pizzaPrice);
    $("#outputSection").fadeOut(100).fadeIn(100);
  });

}); // End document ready
