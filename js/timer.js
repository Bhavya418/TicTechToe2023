function updateTimer() {
    future = Date.parse("Sept 24, 2023 7:00:00");
    now = new Date();
    diff = future - now;
 
    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);
 
    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;
 
    document.getElementById("timer")
        .innerHTML =
        `<div>  ${d}  <span>days</span></div>` + 
        `<div> ${h} <span>hours</span></div>` +
        `<div>${m}<span>minutes</span></div>` +
        `<div>${s}<span>seconds</span></div>`; 
 }
 setInterval('updateTimer()', 1000);
class CountdownCard {
    constructor(label) {
      this.cardEle = this.createDOMElements(label);
      this.currentValue = "--";
    }
  
    createDOMElements(label) {
      const cardEle = document.createElement('div');
      cardEle.className = 'flip-timer__piece';
      cardEle.innerHTML = `
        <div class="flip-timer__card card">
            <div class="card-segment__top"></div>
            <div class="card-segment__bottom"></div>
            <div class="card__back">
                <div class="card-segment__bottom"></div>
            </div>
        </div>
        <span class="timer__label">${label}</span>
      `;
      return cardEle;
    }
  
    update(val) {
        val = val.toString().padStart(2, "0");
    
        const cardTop = this.cardEle.querySelector('.card-segment__top');
        const cardBottom = this.cardEle.querySelector('.card-segment__bottom');
        const cardBack = this.cardEle.querySelector('.card__back');
        const cardBackBottom = this.cardEle.querySelector('.card__back .card-segment__bottom');
    
        if (val !== this.currentValue) {
            cardBack.setAttribute('data-value', this.currentValue);
            cardBottom.setAttribute('data-value', this.currentValue);
    
            this.currentValue = val;
            cardTop.innerText = this.currentValue;
            cardBackBottom.setAttribute('data-value', this.currentValue);
    
            this.cardEle.classList.remove('flip');
            void this.cardEle.offsetWidth;
            this.cardEle.classList.add('flip');
        }
    }
}
  
class Timer {
    constructor(countdown, callback) {
        this.countdown = countdown ? new Date(Date.parse(countdown)) : false;
        this.callback = callback || function () {};

        this.cardEle = document.createElement('div');
        this.cardEle.className = 'flip-timer';

        this.timeObj = {};
        const total = this.getTimeRemaining();

        for (const key in total) {
            if (key !== 'Total') {
            this.timeObj[key] = new CountdownCard(key);
            this.cardEle.appendChild(this.timeObj[key].cardEle);
            }
        }

        this.updateClock = this.updateClock.bind(this);
        setTimeout(this.updateClock, 500);
    }
  
    updateClock() {
        requestAnimationFrame(this.updateClock);

        if (this.i++ % 10) return;
    
        const { Total, ...timeRemaining } = this.getTimeRemaining();

        if (Total < 0) {
            cancelAnimationFrame(this.timeinterval);
            for (const key in this.timeObj) {
                this.timeObj[key].update(0);
            }
            this.callback();
            return;
        }
    
        for (const key in this.timeObj) {
            this.timeObj[key].update(timeRemaining[key]);
        }
    }
  
    getTimeRemaining() {
        const total = Date.parse(this.countdown) - Date.now();
        return {
                Total: total,
                Days: Math.floor(total / (1000 * 60 * 60 * 24)),
                Hours: Math.floor(total / (1000 * 60 * 60)) % 24,
                Minutes: Math.floor(total / (1000 * 60)) % 60,
                Seconds: Math.floor(total / 1000) % 60,
        };
    }
}
  
let deadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

let clock = new Timer(deadline);

document.querySelector('#countdown-timer-div').appendChild(clock.cardEle);