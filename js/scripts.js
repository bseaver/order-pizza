  ////////////////////
 // Back End Section
////////////////////
var pizzaSizePrices = [
  [11, 5.00],
  [18, 9.00],
];

var pizzaToppingDefaultPrice = 0.50;


function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}


Pizza.prototype.calculateCost = function(sizePrices, toppingDefaultPrice) {
  var sizePrice;
  for (var i = 0; i < sizePrices.length; i++) {
    if (Math.round(sizePrices[i][0]) === Math.round(this.size)) {
      sizePrice = sizePrices[i][1];
      break;
    }
  }
  var toppingsPrice = this.toppings.length * toppingDefaultPrice;
  return sizePrice + toppingsPrice
};


  /////////////////////
 // Front End Section
/////////////////////

$(document).ready(function() {

  $("form").submit(function(event) {
    event.preventDefault();

    var pizzaSize = $("#pizzaSize input:checked").val();
    var pizzaToppings = [];
    $(".pizzaTopping input:checked").each(function() {
      pizzaToppings.push( $(this).attr("name") );
    });

    var orderPizza = new Pizza(pizzaSize, pizzaToppings);
    var pizzaPrice =  orderPizza.calculateCost(pizzaSizePrices, pizzaToppingDefaultPrice);

    $("#outputSection").children().first().text(pizzaPrice);
    $("#outputSection").fadeOut(100).fadeIn(100);
  });

}); // End document ready
