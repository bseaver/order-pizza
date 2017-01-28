  ////////////////////
 // Back End Section
////////////////////
var pizzaSizes = [
  // [value, price, description, option name]
  ["11", 5.00, "11 Inch", "pizzaSize"],
  ["18", 9.00, "18 Inch", "pizzaSize"],
];

var pizzaToppings = [
  ["redSauce", "Red Sauce"],
  ["whiteSauce", "White Sauce"],
  ["mozzarella", "Mozzarella Cheese"],
  ["pepperoni", "Pepperoni"],
  ["artichoke", "Artichoke"]
]

function fromIdToDataItem(id, dataArray, idColumn, ItemColumn) {
  for (var i = 0; i < dataArray.length; i++) {
    if (dataArray[i][idColumn] === id) {
      return dataArray[i][ItemColumn];
    }
  }
}

var pizzaToppingDefaultPrice = 0.50;


function Pizza(size, toppings) {
  this.size = size;
  this.toppings = toppings;
}


Pizza.prototype.calculateCost = function(sizePrices, toppingDefaultPrice) {
  var sizePrice = fromIdToDataItem(this.size, sizePrices, 0, 1);
  var toppingsPrice = this.toppings.length * toppingDefaultPrice;
  return sizePrice + toppingsPrice
};


Pizza.prototype.describe = function(sizesData, toppingsData) {
  var description = fromIdToDataItem(this.size, sizesData, 0, 2);
  this.toppings.forEach(function(topping) {
    description += ", " + fromIdToDataItem(topping, toppingsData, 0, 1);
  })
  return description;
}


function Order() {
  this.pizzas = [];
}


Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}




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


// Define variables for storing HTML templates
var pizzaSizeRadioButtonTemplate;
var pizzaToppingCheckboxTemplate;


// Render Size Radio Buttons based upon size data and radio button template HTML
function insertPizzaSizeRadioButtons(pizzaSizes, radioButtonTemplate) {
  $("#pizzaSize").html("");
  pizzaSizes.forEach(function(pizzaSizeData) {
    var newSizeButton = radioButtonTemplate.replace("sampleLabel", pizzaSizeData[2]).replace("sampleValue", pizzaSizeData[0]);
    $("#pizzaSize").append(newSizeButton);
    $("#pizzaSize input:first").prop("checked", "checked");
  });
}


// Render toppings checkboxes based upon toppings data chceckbox template HTML
function insertPizzaPizzaToppingCheckboxes(pizzaToppings, pizzaToppingCheckboxTemplate) {
  $("#pizzaToppings").html("");
  pizzaToppings.forEach(function(pizzaToppingData) {
    var newToppingCheckbox = pizzaToppingCheckboxTemplate.replace("sampleLabel", pizzaToppingData[1]).replace("sampleName", pizzaToppingData[0]);
    $("#pizzaToppings").append(newToppingCheckbox);
  });
}


// Create an empty order for pizzas
var customerOrder = new Order();


$(document).ready(function() {
  // Render Pizza Size Radio Buttons
  pizzaSizeRadioButtonTemplate = $("#pizzaSize").html();
  insertPizzaSizeRadioButtons(pizzaSizes, pizzaSizeRadioButtonTemplate);

  // Render Pizza Toppings Checkboxes
  pizzaToppingCheckboxTemplate = $("#pizzaToppings").html();
  insertPizzaPizzaToppingCheckboxes(pizzaToppings, pizzaToppingCheckboxTemplate);


  $("#addPizzaButton").click(function() {
    var selectedSize = $("#pizzaSize input:checked").val();
    var selectedToppings = [];
    $(".pizzaTopping input:checked").each(function() {
      selectedToppings.push( $(this).attr("name") );
    });

    var orderPizza = new Pizza(selectedSize, selectedToppings);
    customerOrder.addPizza(orderPizza);

    $("#addedPizzas").html("");
    customerOrder.pizzas.forEach(function(pizza) {
      $("#addedPizzas").append(
        "<tr>" +
          "<td>" + pizza.describe(pizzaSizes, pizzaToppings) + "</td>" +
          "<td>" + "$" + pizza.calculateCost(pizzaSizes, pizzaToppingDefaultPrice).formatMoney(2) + "</td>" +
        "</tr>"
      );
    });

    insertPizzaSizeRadioButtons(pizzaSizes, pizzaSizeRadioButtonTemplate);
    insertPizzaPizzaToppingCheckboxes(pizzaToppings, pizzaToppingCheckboxTemplate);
  });

}); // End document ready
