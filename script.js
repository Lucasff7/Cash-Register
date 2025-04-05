let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const DENOMINATIONS = [
  ['ONE HUNDRED', 10000],
  ['TWENTY', 2000],
  ['TEN', 1000],
  ['FIVE', 500],
  ['ONE', 100],
  ['QUARTER', 25],
  ['DIME', 10],
  ['NICKEL', 5],
  ['PENNY', 1]
];

const purchBtn = document.getElementById("purchase-btn");
const priceScreen = document.getElementById("price-screen");
const cash = document.getElementById("cash");
const displayChangeDue = document.getElementById('change-due');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  if (change.length > 0) {
    displayChangeDue.innerHTML += change
      .map(([name, amount]) => `<p>${name}: $${amount.toFixed(2)}</p>`)
      .join('');
  }
};

const checkResults = () => {
  if (!cash.value) return;

  const cashCents = Math.round(Number(cash.value) * 100);
  const priceCents = Math.round(price * 100);
  let changeDue = cashCents - priceCents;

  if (cashCents < priceCents) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (cashCents === priceCents) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let drawerTotal = 0;
  let change = [];
  let cidMap = {};

  cid.forEach(([name, amount]) => {
    cidMap[name] = Math.round(amount * 100);
    drawerTotal += cidMap[name];
  });

  const originalCid = JSON.parse(JSON.stringify(cid));
  if (drawerTotal < changeDue) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  for (let [name, val] of DENOMINATIONS) {
    let used = 0;
    while (changeDue >= val && cidMap[name] >= val) {
      changeDue -= val;
      cidMap[name] -= val;
      used += val;
    }
    if (used > 0) {
      change.push([name, used / 100]);
    }
  }

  if (changeDue > 0) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  const remainingTotal = Object.values(cidMap).reduce((a, b) => a + b, 0);

  const status = remainingTotal === 0 ? 'CLOSED' : 'OPEN';

  formatResults(status, change);

  if (status === 'CLOSED') {
    cid = originalCid.map(([name, amount]) => [name, 0]);
  } else {
    cid = cid.map(([name]) => [name, cidMap[name] / 100]);
  }

  updateUI();
};

const updateUI = () => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(([denominationName, amount]) =>
        `<p>${currencyNameMap[denominationName]}: $${amount.toFixed(2)}</p>`
      )
      .join('')}`;
};

purchBtn.addEventListener('click', checkResults);

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();
