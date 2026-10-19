function print(n) {return console.log(n);}

function cascade(n) {
    return n < 10
    ? print(n)
    : print(n), cascade(n / 10), print(n);
}

cascade(10);