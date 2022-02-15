'use strict';

// set variables
let hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// start sites
// set obj
let seattle = {
  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgSales: 6.3,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0,
  calcCust: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust));
    }
  },
  calcCookies: function () {
    this.calcCust();
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgSales));
      this.totalCookies += (this.cookiesPerHour[i]);
    }
  },
};

let tokyo = {
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgSales: 1.2,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0,
  calcCust: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust));
    }
  },
  calcCookies: function () {
    this.calcCust();
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgSales));
      this.totalCookies += (this.cookiesPerHour[i]);
    }
  },
};

let dubai = {
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgSales: 3.7,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0,
  calcCust: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust));
    }
  },
  calcCookies: function () {
    this.calcCust();
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgSales));
      this.totalCookies += (this.cookiesPerHour[i]);
    }
  },
};

let paris = {
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgSales: 2.3,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0,
  calcCust: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust));
    }
  },
  calcCookies: function () {
    this.calcCust();
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgSales));
      this.totalCookies += (this.cookiesPerHour[i]);
    }
  },
};


let lima = {
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgSales: 4.6,
  custPerHour: [],
  cookiesPerHour: [],
  totalCookies: 0,
  calcCust: function () {
    for (let i = 0; i < hours.length; i++) {
      this.custPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust));
    }
  },
  calcCookies: function () {
    this.calcCust();
    for (let i = 0; i < hours.length; i++) {
      this.cookiesPerHour.push(Math.ceil(this.custPerHour[i] * this.avgSales));
      this.totalCookies += (this.cookiesPerHour[i]);
    }
  },
};

let stores = [seattle, tokyo, dubai, paris, lima];

function storeSales() {
  for (let i = 0; i < stores.length; i++) {
    let getStores = stores[i];
    getStores.calcCookies();
    showStoreSales(getStores);
  }
}

// DOM window
let sales = document.getElementById('city sales');


function showStoreSales(storeLoc) {
  let articleElem = document.createElement('artcle');
  sales.appendChild(articleElem);

  let h1Elem = document.createElement('h1');
  h1Elem.textContent = storeLoc.location;
  articleElem.appendChild(h1Elem);

  let ulElem = document.createElement('ul');
  articleElem.appendChild(ulElem);

  for (let j = 0; j < hours.length; j++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${hours[j]}: ${storeLoc.cookiesPerHour[j]}`;
    ulElem.appendChild(liElem);
  }
  let liElem = document.createElement('li');
  liElem.textContent = `Total ${storeLoc.totalCookies}`;
  ulElem.appendChild(liElem);
}

// let liEl = document.createElement('li');
// for (let i = 0; i < stores.length; i++) {
//   for (let j = 0; j < hours.length; j++)
//     liEl.textContent = `${stores[i].cookiesPerHour}: ${hours[j]} cookies`;
//   olElem.appendChild(liEl);
//   for (let j = 0; j < hours.length; j++) {
//     const liEl = document.createElement('li');
//     liEl.textContent = `${hours[j]}: ${storeLoc.cookiesPerHour[j]}`;
//     ulElem.appendChild(liEl);


console.log(seattle.cookiesPerHour);
console.log(seattle.totalCookies);
console.log(tokyo.cookiesPerHour);
console.log(tokyo.totalCookies);
console.log(dubai.cookiesPerHour);
console.log(dubai.totalCookies);
console.log(lima.cookiesPerHour);
console.log(lima.totalCookies);

storeSales();

