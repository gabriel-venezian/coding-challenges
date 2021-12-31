'use strict'; 

const formatTime = (time) => time < 10 ? `0${time}` : time;

const refreshTime = (time) => {
  const seconds = document.getElementById('seconds');
  const minutes = document.getElementById('minutes');
  const hours = document.getElementById('hours');
  const days = document.getElementById('days');

  const secondsQuantity = time % 60;
  const minutesQuantity = Math.floor((time % 3600) / 60);
  const hoursQuantity = Math.floor((time % 86400) / 3600);
  const daysQuantity = Math.floor(time / 86400);

  seconds.textContent = formatTime(secondsQuantity);
  minutes.textContent = formatTime(minutesQuantity);
  hours.textContent = formatTime(hoursQuantity);
  days.textContent = formatTime(daysQuantity);
};

const countdownTimer = (time) => {
  const stopCount = () => clearInterval(intervalId);

  const count = () => {    
    if (time === 0)  {
      stopCount();
    }
    refreshTime(time);
    time--;
  };

  const intervalId = setInterval(count, 1000);
};

const remainingTime = () => {
  const eventDate = new Date ('2023-09-23 18:30:00');
  const today = Date.now();

  return Math.floor((eventDate - today) / 1000);
};

countdownTimer(remainingTime());
