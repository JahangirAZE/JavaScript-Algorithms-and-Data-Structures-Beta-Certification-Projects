let price = 3.26;
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

const changeDueElem = document.getElementById('change-due');
const cashInput = document.getElementById('cash');
const purchaseButton = document.getElementById('purchase-btn');
const priceLabel = document.getElementById('price-screen');
const drawerDisplay = document.getElementById('cash-drawer-display');

const displayChange = (status, changeList) => {
  changeDueElem.innerHTML = `<p>Status: ${status}</p>`;
  changeDueElem.innerHTML += changeList
    .map(
      ([denomination, value]) => `<p>${denomination}: $${value}</p>`
    )
    .join('');
};

const processPayment = () => {
  const paidAmount = Math.round(Number(cashInput.value) * 100);
  const itemPrice = Math.round(price * 100);

  if (!cashInput.value || isNaN(paidAmount)) {
    alert('Please enter a valid amount.');
    return;
  }

  if (paidAmount < itemPrice) {
    alert('Customer does not have enough money to purchase the item.');
    cashInput.value = '';
    return;
  }

  if (paidAmount === itemPrice) {
    changeDueElem.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cashInput.value = '';
    return;
  }

  let remainingChange = paidAmount - itemPrice;
  const reversedCid = [...cid]
    .reverse()
    .map(([denomination, amount]) => [
      denomination,
      Math.round(amount * 100)
    ]);
  const denominationValues = [10000, 2000, 1000, 500, 100, 25, 10, 5, 1];
  const result = { status: 'OPEN', changeList: [] };
  const totalCashInDrawer = reversedCid.reduce((total, [_, amount]) => total + amount, 0);

  if (totalCashInDrawer < remainingChange) {
    changeDueElem.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  if (totalCashInDrawer === remainingChange) {
    result.status = 'CLOSED';
  }

  for (let i = 0; i < reversedCid.length; i++) {
    if (remainingChange >= denominationValues[i] && remainingChange > 0) {
      const [denomination, availableAmount] = reversedCid[i];
      const changeForThisDenomination = Math.min(availableAmount, remainingChange);
      const coinCount = Math.floor(changeForThisDenomination / denominationValues[i]);
      const changeAmount = coinCount * denominationValues[i];
      remainingChange -= changeAmount;

      if (coinCount > 0) {
        result.changeList.push([denomination, changeAmount / 100]);
      }
    }
  }
  if (remainingChange > 0) {
    changeDueElem.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  displayChange(result.status, result.changeList);
  updateDisplay(result.changeList);
};

const handleClick = () => {
  if (!cashInput.value) {
    return;
  }
  processPayment();
};

const updateDisplay = changeList => {
  const currencyMap = {
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

  if (changeList) {
    changeList.forEach(([denomination, amount]) => {
      const targetDenomination = cid.find(([name]) => name === denomination);
      targetDenomination[1] = (Math.round(targetDenomination[1] * 100) - Math.round(amount * 100)) / 100;
    });
  }

  cashInput.value = '';
  priceLabel.textContent = `Total: $${price}`;
  drawerDisplay.innerHTML = `<p><strong>Cash in Drawer:</strong></p>
    ${cid
      .map(
        ([denomination, amount]) =>
          `<p>${currencyMap[denomination]}: $${amount}</p>`
      )
      .join('')}
  `;
};

purchaseButton.addEventListener('click', handleClick);

cashInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleClick();
  }
});

updateDisplay();