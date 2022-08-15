'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: ''
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
  containerMovements.innerHTML = ''
  movements.forEach(function (mov, i) {
      const type = mov > 0 ? 'deposit' : 'withdrawal'
      const html =  `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin', html);
  })   
}

// displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc+mov,0);
  labelBalance.textContent = `${balance}€`;
}
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements.filter(mov => mov>0).reduce((acc, mov) => acc+mov,0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov=>mov<0).reduce((acc, mov) => acc+mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements.filter(mov => mov<0).map(deposit => (deposit*acc.interestRate)/100).filter((int, i, arr) => {console.log(arr); return int >=1}).reduce((acc, int)=> acc+int, 0);
  labelSumInterest.textContent = `${interest}€`
}
// calcDisplaySummary(account1.movements);

const createUsernames = function(accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(word => word[0]).join('');
  })
}
createUsernames(accounts);
console.log(accounts);


const calcPrintBalance = function(movements) {
  const balance = movements.reduce((acc, mov)=> acc+mov,0);
  labelBalance.textContent = `${balance}€`
}

calcPrintBalance(account1.movements);

let currentAccount;

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)) {
      //Display UI and message
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      //Display movements
      displayMovements(currentAccount.movements);

      //Display balance
      calcDisplayBalance(currentAccount.movements);

      //Display Summary
      calcDisplaySummary(currentAccount);
    }
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUSD = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov*euroToUSD;
// })

// console.log(movementsUSD);

// const movementsUSDFor = [];
// for (const mov of movements) movementsUSDFor.push(mov * euroToUSD);
// console.log(movementsUSDFor);

// const movementsDescription = movements.map((mov, i) => 
//   `Movement ${i+1}: You have ${mov>0 ? 'deposited': 'withdrew'} ${Math.abs(mov)}`
// )

// console.log(movementsDescription);

// const deposits = movements.filter((mov,i) => mov >0);
// console.log(deposits);

// const withdrawal = movements.filter((mov,i) => mov<0);
// console.log(withdrawal);

// const balance = movements.reduce((acc, cur) => acc+cur ,0);
// console.log(balance);

// const max = movements.reduce((acc, mov) => {
//   if(acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// const totalDepositsUSD = movements.filter(mov => mov<0).map((mov, i, arr) => {
//   console.log(arr);
//   return mov*euroToUSD;
// }).reduce((acc, mov) => acc+ mov, 0);
// console.log(totalDepositsUSD);

// const firstWithdrawal = movements.find(mov => mov<0);
// console.log(movements);
// console.log(firstWithdrawal);


/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


// const calcAverageHumanAge = function(ages) {
//    const humanAges = ages.map((dogAge) => dogAge <= 2 ? 2*dogAge: 16+dogAge*4);
//    console.log(humanAges);

//    const filterHumanAges = humanAges.filter((age) => age>=18);
//    console.log(filterHumanAges);

//   const average = filterHumanAges.reduce((acc, age) => acc+age, 0)/ filterHumanAges.length

//   return average;
// }

// const average1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
// const average2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])
// console.log(average1, average2);


