const daysContainer = document.querySelectorAll(".days");
const hoursContainer = document.querySelectorAll(".hours");
const minutesContainer = document.querySelectorAll(".minutes");
const secondsContainer = document.querySelectorAll(".seconds");
const secondsWrap = document.getElementById("seconds");
const minutesWrap = document.getElementById("minutes");
const hoursWrap = document.getElementById("hours");
const daysWrap = document.getElementById("days");

const getCountdown = () => {
  let finalDate = new Date("Thu Mar 17 2022 19:27:37 GMT+0100").getTime();
  let currentDate = new Date().getTime();

  let timeDifference = finalDate - currentDate;

  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours % 24;
  minutes = minutes % 60;
  seconds = seconds % 60;

  return { seconds, minutes, hours, days };
};

const runAnimation = (currentTime) => {
  if (currentTime.seconds !== prevTime.seconds) {
    const helperCard = animateCard(currentTime.seconds, 60);
    secondsWrap.appendChild(helperCard);
    setTimeout(() => {
      secondsWrap.removeChild(helperCard);
    }, 1000);
  }
  if (currentTime.minutes !== prevTime.minutes) {
    const helperCard = animateCard(currentTime.minutes, 60);
    minutesWrap.appendChild(helperCard);
    setTimeout(() => {
      minutesWrap.removeChild(helperCard);
    }, 1000 * 60);
  }
  if (currentTime.hours !== prevTime.hours) {
    const helperCard = animateCard(currentTime.hours, 24);
    hoursWrap.appendChild(helperCard);
    setTimeout(() => {
      hoursWrap.removeChild(helperCard);
    }, 1000 * 60 * 60);
  }
  if (currentTime.days !== prevTime.days) {
    const helperCard = animateCard(currentTime.days);
    daysWrap.appendChild(helperCard);
    setTimeout(() => {
      daysWrap.removeChild(helperCard);
    }, 1000 * 60 * 60 * 24);
  }

  prevTime = currentTime;
};

const UpdateTime = () => {
  const { seconds, minutes, hours, days } = getCountdown();

  daysContainer.forEach((element, index) => {
    if (index === 1) element.innerHTML = days;
    else element.innerHTML = days;
  });
  hoursContainer.forEach((element, index) => {
    if (index === 1) element.innerHTML = (hours + 1) % 24;
    else element.innerHTML = hours;
  });
  minutesContainer.forEach((element, index) => {
    if (index === 1) element.innerHTML = (minutes + 1) % 60;
    else element.innerHTML = minutes;
  });
  secondsContainer.forEach((element, index) => {
    if (index === 1) element.innerHTML = (seconds + 1) % 60;
    else element.innerHTML = seconds;
  });

  runAnimation({ seconds, minutes, hours, days });
};

const animateCard = (value, limit = 0) => {
  let helperCard = document.createElement("div");
  helperCard.className = "helper-value";
  let valueHelp = document.createElement("div");
  valueHelp.className = "value-help";
  helperCard.appendChild(valueHelp);

  let spanTag = document.createElement("span");
  spanTag.innerText = value;
  let spanTag2 = document.createElement("span");
  spanTag2.innerText = limit ? (value + 1) % limit : value + 1;

  let up = document.createElement("div");
  up.className = "up";
  up.appendChild(spanTag2);

  let down = document.createElement("div");
  down.className = "down helper-down";
  down.appendChild(spanTag);

  up.style.animation = "upflip 300ms linear 0ms 1 normal forwards";
  down.style.animation = "downflip 250ms linear 300ms 1 normal forwards";

  helperCard.appendChild(up);
  helperCard.appendChild(down);

  return helperCard;
};

let prevTime = { seconds: null, minutes: null, hours: null, days: null };

setInterval(() => UpdateTime(), 1000);
// UpdateTime();
