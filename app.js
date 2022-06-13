let sel = selector => document.querySelector(selector),
    d = new Date(),
    date, month, year = d.getFullYear();

(d.getDate() < 10) ? date = `0${d.getDate()}`: date = d.getDate();
(d.getMonth() < 10) ? month = `0${d.getMonth() + 1}`: month = d.getMonth() + 1;

sel('.current-time__date').innerHTML = `${date}:${month}:${year}`;


/*......stopwatch......*/

setInterval(() => {
    let dd = new Date();
    let hh = dd.getHours();
    let mm = dd.getMinutes();
    let ss = dd.getSeconds();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    sel('.current-time__time').innerHTML = `${hh}:${mm}:${ss}`;
});
let stopwatchSetInterval, stopwatchSetInterval1;
let stop, reset;
let h = 0,
    m = 0,
    s = 0,
    ms = 0;
sel('.stopwatch__stop').addEventListener('click', () => {
    stop = true;
});
sel('.stopwatch__reset').addEventListener('click', () => {
    reset = true;
    let hours = '00',
        minutes = '00',
        seconds = '00',
        milisec = '000';
    sel('.stopwatch__counter').innerHTML = `${hours}:${minutes}:${seconds}:${milisec}`;
    sel('.stopwatch__right').innerHTML = '';
});
let stopwatch = () => {
    let currentD = new Date(),
        rizn = currentD - d,
        hours = (Math.floor((rizn % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + h,
        minutes = (Math.floor((rizn % (1000 * 60 * 60)) / (1000 * 60))) + m,
        seconds = (Math.floor((rizn % (1000 * 60)) / 1000)) + s,
        milisec = (Math.floor((rizn % (1000))));

    if (stop) {
        clearInterval(stopwatchSetInterval);
        sel('.stopwatch__start').disabled = false;
        h = hours;
        m = minutes;
        s = seconds;

    }
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    sel('.stopwatch__counter').innerHTML = `${hours}:${minutes}:${seconds}:${milisec}`;
    if (reset) {
        clearInterval(stopwatchSetInterval);
        sel('.stopwatch__start').disabled = false;
        hours = '00',
            minutes = '00',
            seconds = '00',
            milisec = '000';
        sel('.stopwatch__counter').innerHTML = `${hours}:${minutes}:${seconds}:${milisec}`;
    }
};


sel('.stopwatch__start').addEventListener('click', function () {
    d = new Date;
    stop = false;
    reset = false;
    stopwatchSetInterval = setInterval(stopwatch);
    this.disabled = true;
    sel('.stopwatch__loop').disabled = false;
});

sel('.stopwatch__loop').addEventListener('click', () => {
    sel('.stopwatch__right').innerHTML += `<h2 class="stopwatch__right-text">${sel('.stopwatch__counter').innerHTML}</h2>`;
});

/*......end-stopwatch......*/


/*......timer......*/
let minutesTimer = 25;
let timerInterval;
sel('.timer__number-minutes').innerHTML = minutesTimer;

sel('.timer__left-btn1').addEventListener('click', () => {
    minutesTimer += 1;
    sel('.timer__number-minutes').innerHTML = minutesTimer;
});

sel('.timer__left-btn2').addEventListener('click', () => {
    minutesTimer -= 1;
    sel('.timer__number-minutes').innerHTML = minutesTimer;
});

let timerDate,
    timerMilisec,
    timerStop = false,
    timerReset = false,
    timeStop = 0;

sel('.timer__right-btn-stop').addEventListener('click', () => {
    timerStop = true;
});
sel('.timer__right-btn-reset').addEventListener('click', () => {
    let minutes = '00',
        seconds = '00';
    timerReset = true;
    sel('.timer__counter').innerHTML = `${minutes}:${seconds}`;
    timerStop = false;
    sel('.timer__right-btn-start').disabled = false;
    sel('.timer__left-btn1').disabled = false;
    sel('.timer__left-btn2').disabled = false;
});

let timer = () => {
    let currentD = new Date();

    let rizn = timerMilisec - currentD.getTime();

    let minutes = Math.floor((rizn % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((rizn % (1000 * 60)) / 1000);

    if (timerStop) {
        clearInterval(timerInterval);
        timeStop = rizn;
        sel('.timer__right-btn-start').disabled = false;
    }

    if (minutes > 0 && minutes > 0) {
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;
        sel('.timer__counter').innerHTML = `${minutes}:${seconds}`;
    } else sel('.timer__counter').innerHTML = `Час вийшов`;
    if (timerReset) {
        let minutes = '00',
            seconds = '00';

        sel('.timer__counter').innerHTML = `${minutes}:${seconds}`;
        clearInterval(timerInterval);
    }
};

sel('.timer__right-btn-start').addEventListener('click', () => {
    timerDate = new Date();
    if (!timerStop) {
        timerMilisec = minutesTimer * 60 * 1000 + timerDate.getTime();

    } else timerMilisec = timeStop + timerDate.getTime()
    timerStop = false;
    timerReset = false;
    timerInterval = setInterval(timer);
    sel('.timer__left-btn1').disabled = true;
    sel('.timer__left-btn2').disabled = true;
    sel('.timer__right-btn-start').disabled = true;
});

/*......end-timer......*/