'use strict';

// set variables
let hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
let stores = [];
let salesTable = document.getElementById('sales table');
let inputStore = document.getElementById('store-form');
let grandTotal = 0;
let hourlyTotalsList = [];

//Replace all of your object literals for the salmon cookie stand with a single constructor function that, when called with the ‘new’ keyword, it creates a new instance. (static unique consistent properties in each store object)
function StoreSales(minCust, maxCust, avgSales, location) {
  // assigning unique static properties
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.location = location;
  // assigning non-static properties (properties that change in each object)
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  // create each instantiated object store into its own array
  stores.push(this);

  // adding the method which calculates the random number of customers per hour
  //If I wanted to use the prototype method this would be "StoreSales.prototype.custPerHour" and it would be outside of the constructor
  this.custPerHour = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // calculating cookies per hour sold using the customer per hour method from above
  //If I wanted to use the prototype method this would be "StoreSales.prototype.hourlyTotals" and it would be outside of the constructor
  this.hourlyTotals = function () {
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour(this.minCust, this.maxCust) * this.avgSales));
    }
  };

  // daily total cookies method; calc cookies per hour and add to total cookies per each location
  //If I wanted to use the prototype method this would be "StoreSales.prototype.dailyTotal"  and it would be outside of the constructor
  this.dailyTotal = function () {
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      this.totalCookies += this.cookiesPerHour[i];
    }
  };

  // Calling all the methods
  //If I wanted to use the prototype method this would be "StoreSales.prototype.dailyStats" and it would be outside of the constructor
  this.dailyStats = function () {
    this.hourlyTotals();
    this.dailyTotal();
    this.render();
  };

  //Replace the lists of your data for each store and build a single table of data instead. It should look similar to the following:
  //Each cookie stand location should have a separate render() method that creates and appends its row to the table
  // creating the table rows for the locations and the table cells for the cookiesPerHour property
  //If I wanted to use the prototype method this would be "StoreSales.prototype.render" and it would be outside of the constructor
  this.render = function () {
    let trElem = document.createElement('tr'); // table row creation
    let tdElem = document.createElement('td'); // table cell creation
    tdElem.textContent = this.location;
    trElem.appendChild(tdElem);
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      tdElem = document.createElement('td'); // table cell creation
      tdElem.textContent = this.cookiesPerHour[i];
      trElem.appendChild(tdElem);
    }
    tdElem = document.createElement('td'); // table cell creation
    tdElem.textContent = this.totalCookies;
    trElem.appendChild(tdElem);
    salesTable.appendChild(trElem);
  };
}


// if I had used prototypes: think inherit showing you can have the methods within your constructor but you can also have it outside of the constructor, and that the prototype means that the object will inherit the method within the prototype method

//The header row and footer row are each created in their own stand-alone function
// creating the table head and the hours of the day and then creating cells for each hour
function renderTableHead() {
  let trH = document.createElement('thead'); // table header (row)
  let thElem = document.createElement('th'); //table header (cell)
  thElem.textContent = 'Hour of Day: Location';
  trH.appendChild(thElem);
  for (let i = 0; i < hours.length; i++) {
    let thElem = document.createElement('th'); // table header (cell)
    thElem.textContent = hours[i];
    trH.appendChild(thElem);
  }
  let thTotalH = document.createElement('th'); //table header (cell)
  thTotalH.textContent = 'Daily Location Total';
  trH.appendChild(thTotalH);
  let salesTable = document.getElementById('sales table'); // DOM window
  salesTable.appendChild(trH);
}

// calculating the hourly totals and the grand totals and pushing hourly totals into the hourly total list for use in footer table
function calculator() {
  for (let i = 0; i < hours.length; i++) {
    let hourlyTotals = 0;
    for (let j = 0; j < stores.length; j++) {
      hourlyTotals += stores[j].cookiesPerHour[i];
    }
    grandTotal += hourlyTotals;
    hourlyTotalsList[i] = hourlyTotals;
  }
}

//The header row and footer row are each created in their own stand-alone function
// creating the table row (table foot) and cells for the hourly totals and grand total
function renderTableFoot() {
  calculator();
  let trF = document.createElement('tfoot'); //foot row
  trF.setAttribute('id', 'tfooter');
  let tdElem = document.createElement('td'); //table cell
  tdElem.textContent = 'Hourly Totals';
  trF.appendChild(tdElem);
  for (let i = 0; i < hourlyTotalsList.length; i++) {
    let thElem = document.createElement('td'); // table cell
    thElem.textContent = hourlyTotalsList[i];
    trF.appendChild(thElem);
  }
  let tdFTotal = document.createElement('td'); // table cell
  tdFTotal.textContent = grandTotal;
  trF.appendChild(tdFTotal);
  let salesTable = document.getElementById('sales table'); // DOM window
  salesTable.appendChild(trF);
}

// instantiating a new object to the constructor
let seattle = new StoreSales(23, 65, 6.3, 'Seattle');
let tokyo = new StoreSales(3, 24, 1.2, 'Tokyo');
let dubai = new StoreSales(11, 38, 3.7, 'Dubai');
let paris = new StoreSales(20, 38, 2.3, 'Paris');
let lima = new StoreSales(2, 16, 4.6, 'Lima');

// calling the daily stats: hourly totals and daily totals and rendering individual objects
seattle.dailyStats();
tokyo.dailyStats();
dubai.dailyStats();
paris.dailyStats();
lima.dailyStats();


// rendering table head with hours of the day
renderTableHead();
// render table foot with grand totals
renderTableFoot();

//Step 3 Event Handler -tell event what to do with the info of what it's heard
function handleSubmit(event) {
  event.preventDefault();

  let location = event.target.storeLocation.value;
  let minCust = +event.target.minCust.value;
  let maxCust = +event.target.maxCust.value;
  let avgSales = +event.target.avgSales.value;

  let newStore = new StoreSales(minCust, maxCust, avgSales, location);

  newStore.dailyStats();

  let tableFootRemove = document.getElementById('tfooter');
  tableFootRemove.innerHTML = "";
  tableFootRemove.remove();
  renderTableFoot();

  inputStore.reset();
}

//Step 2 Add Event listener and tell it what even to listen for, then pass to the event handler
inputStore.addEventListener('submit', handleSubmit);

