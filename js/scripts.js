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

// From: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };


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

    $("#outputSection").children().first().text("$" + pizzaPrice.formatMoney(2));
    $("#outputSection").fadeOut(100).fadeIn(100);
  });

}); // End document ready
