'use strict';

// set variables
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let stores = [];
let salesTable = document.getElementById('sales table')
let grandTotal = 0;
let hourlyTotalsList = [];

function StoreSales(minCust, maxCust, avgSales, id) {
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSales = avgSales;
  this.id = id;
  this.cookiesPerHour = [];
  this.totalCookies = 0;

  stores.push(this);

  this.custPerHour = function(min, max){
    return Math.floor(Math.random()* (max - min)+min);
  };
  this.hourlyTotals = function (){
    for(let i = 0; i < hours.length; i++){
      this.cookiesPerHour.push(Math.ceil(this.custPerHour(this.minCust, this.maxCust)* this.avgSales));
    }
  };
  this.dailyTotal = function (){
    for(let i = 0; i < this.cookiesPerHour.length; i++){
      this.totalCookies += this.cookiesPerHour[i];
    }
  };
  this.dailyStats = function(){
    this.hourlyTotals();
    this.dailyTotal();
    this.render();
  };
  this.render = function(){
    let trElem = document.createElement('tr');
    let tdElem = document.createElement('td');
    tdElem.textContent = this.id;
    trElem.appendChild(tdElem);
    for (let i = 0; i < this.cookiesPerHour.length; i++){
      tdElem = document.createElement('td');
      tdElem.textContent = this.cookiesPerHour[i];
      trElem.appendChild(tdElem);
    }
    tdElem = document.createElement('td');
    tdElem.textContent = this.totalCookies;
    trElem.appendChild(tdElem);
    salesTable.appendChild(trElem);
  };
}

function renderH(){
  let trH = document.createElement('tr');
  let tdElem = document.createElement('td');
  tdElem.textContent = 'Hour of Sale';
  trH.appendChild(tdElem);
  for(let i = 0; i < hours.length; i++){
    let thElem = document.createElement('th');
    thElem.textContent = hours[i];
    trH.appendChild(thElem);
  }
  let tdTotalH = document.createElement('td');
  tdTotalH.textContent = 'Total';
  trH.appendChild(tdTotalH);
  let salesTable = document.getElementById('sales table');
  salesTable.appendChild(trH);
}

function calculator(){
  for (let i = 0; i < hours.length; i++){
    let hourlyTotals = 0;
    for (let j = 0; j < stores.length; j++){
      hourlyTotals += stores[j].cookiesPerHour[i];
    }
    grandTotal += hourlyTotals;
    hourlyTotalsList[i] = hourlyTotals;
  }
}

function renderF(){
  let trF = document.createElement('tr');
  let tdElem = document.createElement('td');
  tdElem.textContent = 'Hour Total';
  trF.appendChild(tdElem);
  for(let i = 0; i < hourlyTotalsList.length; i++){
    let thElem = document.createElement('td');
    thElem.textContent =  hourlyTotalsList[i];
    trF.appendChild(thElem);
  }
  let  tdFTotal = document.createElement('td');
  tdFTotal.textContent = grandTotal;
  trF.appendChild(tdFTotal);
  let salesTable = document.getElementById('footer');
  salesTable.appendChild(trF);
}

renderH();

let seattle = new StoreSales(23, 65, 6.3, 'Seattle');
let tokyo = new StoreSales(3, 24, 1.2, 'Tokyo');
let dubai = new StoreSales(11, 38, 3.7, 'Dubai');
let paris = new StoreSales(20, 38, 2.3, 'Paris');
let lima = new StoreSales(2, 16, 4.6, 'Lima');

seattle.dailyStats();
tokyo.dailyStats();
dubai.dailyStats();
paris.dailyStats();
lima.dailyStats();

calculator();
renderF();



