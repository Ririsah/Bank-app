const account1 = {
    owner: 'Aiden Anderson',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2025-05-11T23:36:17.929Z',
        '2025-05-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT',
};

const account2 = {
    owner: 'Brianna Brown',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const account3 = {
    owner: 'Charles Clark',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-01T10:51:36.790Z',
    ]
};

const account4 = {
    owner: 'David Davis',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
    ]
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


const dateDisplay = document.querySelector('.date');
const balanceDisplay = document.querySelector('.balance_display');
const movementContainer = document.querySelector('.movement_container');
const depositsDisplay = document.querySelector('.deposit_display');
const withdrawalDisplay = document.querySelector('.withdrawal_display');
const interestDisplay = document.querySelector('.interest_display');
const timerDisplay = document.querySelector('.timer');
const btnSort = document.querySelector('.sort_btn');
const username = document.querySelector('.username_display');

const inputUsername = document.querySelector('.username');
const inputPin = document.querySelector('.pin');
const btnLogin = document.querySelector('.login_btn');
const containerHidden = document.querySelector('.hidden');
const coverHidden = document.querySelector('.cover');

const inputTrasferTo = document.querySelector('.input_trasfer_to');
const inputTrasferAmount = document.querySelector('.input_trasfer_amount');
const btnTransfer = document.querySelector('.transfer_btn');

const inputRequestAmount = document.querySelector('.input_request_amount');
const btnRequest = document.querySelector('.request_btn');

const inputCloseUser = document.querySelector('.input_close_user');
const inputClosePin = document.querySelector('.input_close_pin');
const btnClose = document.querySelector('.close_btn');


window.addEventListener("load", function () {
    alert(
        "Try the following data:\n" +
        "Account 1 - Username: aa, PIN: 1111\n" +
        "Account 2 - Username: bb, PIN: 2222\n" +
        "Account 3 - Username: cc, PIN: 3333\n" +
        "Account 4 - Username: dd, PIN: 4444"
    );
});

const eurToUsd = 1.1;

const displaySummary = function (account) {
    const deposits = account.movements
                    .filter(move => move > 0)
                    .reduce((acc, move) => acc += move, 0);
    const withdrawal = account.movements
                    .filter(move => move < 0)
                    .reduce((acc, move) => acc += move, 0);
    const interest = account.movements
                    .filter(mov => mov > 0)
                    .map(deposit => (deposit * account.interestRate) / 100)
                    .filter(deposit => deposit >= 1)
                    .reduce((acc, int) => acc + int, 0);

    depositsDisplay.textContent = formatCur(deposits, account.locale, account.currency);
    withdrawalDisplay.textContent = formatCur(Math.abs(withdrawal), account.locale, account.currency);
    interestDisplay.textContent = formatCur(interest, account.locale, account.currency);
}


const depositsConvert = movements
                        .filter(move => move > 0)
                        .map(move => move * eurToUsd)
                        .reduce(function(acc, move){
                            return acc += move;
                        }, 0);
console.log(depositsConvert);


const deposits = movements.filter(move => move > 0);
const withdrawl = movements.filter(move => move < 0);

console.log(deposits);
console.log(withdrawl);


// formata as datas
const formatMovementDate = function(date, locale) {
    const calcDaysPassed = (date1, date2) => 
        Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), date);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(locale).format(date);
}

// formata
const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};

// msotrar os movimentos de uma conta
const displayMovements = function (account, sort = false) {
    movementContainer.innerHTML = '';

    const combinedMovsDates = account.movements.map((mov, i) => ({
        movement: mov,
        MovDate: account.movementsDates.at(i),
    }));

    if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

    combinedMovsDates.forEach(function (object, i) {
        const { movement, MovDate } = object;
        const type = movement < 0 ? 'withdrawl' : 'deposit';

        const date = new Date(MovDate);
        const transitionDate = formatMovementDate(date, account.locale);

        const formattedMov = formatCur(movement, account.locale, account.currency);

        const html = `
        <div class="mov">
            <div class="movement_type">
                <p class="${type}">${i + 1} - ${type}</p>
                <span>${transitionDate}</span>
            </div>
            <p>${formattedMov}</p>
        </div>
        `;

        movementContainer.insertAdjacentHTML('afterbegin', html);
    });
};


//calculo total dos movimentos
const displayBalance = function(account) {
    account.balance = account.movements.reduce(function (acc, move) {
        return acc += move;
    }, 0);
    balanceDisplay.textContent = formatCur(account.balance, account.locale, account.currency);
}


//valor maximo
const maxValue = movements.reduce(function(acc, move) {
    return acc > move ? acc : move;
}, movements[0]);
console.log(maxValue);


// cria um username
const createUserName = function (account) {
    account.forEach(function (account) {
        account.username = account.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    });
};
createUserName(accounts);

const updateUi = function(account) {
    displayMovements(account);
    displayBalance(account);
    displaySummary(account);
}

const startLogOutTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        timerDisplay.textContent = `${min}:${sec}`;

        if (time === 0) {
        clearInterval(timer);
        coverHidden.style.opacity = 1;
        containerHidden.style.opacity = 0;
        }

        time--;
    };

    let time = 300;

    tick();
    const timer = setInterval(tick, 1000);

    return timer;
};




// login
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputUsername.value);

    if (currentAccount?.pin === Number(inputPin.value)) {

        coverHidden.style.opacity = 0;
        containerHidden.style.opacity = 1;

        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };

        dateDisplay.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


        username.innerHTML = `Hello, ${currentAccount.owner.split(' ')[0]}!`;

        inputUsername.value = inputPin.value = '';
        inputPin.blur();

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        updateUi(currentAccount);

    }

});


// transfer
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTrasferAmount.value);
    const receiverAccount = accounts.find(acc => acc.username === inputTrasferTo.value);

    if (amount > 0 && 
        receiverAccount &&
        currentAccount.balance >= amount && 
        receiverAccount?.username !== currentAccount.username) 
        {
            currentAccount.movements.push(-amount);
            receiverAccount.movements.push(amount);

            currentAccount.movementsDates.push(new Date().toISOString());
            receiverAccount.movementsDates.push(new Date().toISOString());

            clearInterval(timer);
            timer = startLogOutTimer();

            updateUi(currentAccount);
        }
    
    inputTrasferTo.value = inputTrasferAmount.value = '';
});


// request
btnRequest.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputRequestAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        setTimeout(function () {
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString());
            updateUi(currentAccount);
            clearInterval(timer);
            timer = startLogOutTimer();
        }, 2500);
    }
    
    inputRequestAmount.value = '';
});


// close
btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCloseUser.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const indexAcc = accounts.findIndex(account => account.username === currentAccount.username);
        accounts.splice(indexAcc, 1);
        containerHidden.style.opacity = 0;
    }

    inputCloseUser.value = inputClosePin.value = '';
});


// sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});


