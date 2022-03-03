const daysContainer = document.querySelectorAll(".days");
const hoursContainer = document.querySelectorAll(".hours");
const minutesContainer = document.querySelectorAll(".minutes");
const secondsContainer = document.querySelectorAll(".seconds");

const getCountdown = () => {
  let finalDate = new Date("Thu Mar 17 2022 19:27:37 GMT+0100").getTime();
  let currentDate = new Date().getTime();

  let timeDifference = finalDate - currentDate;

  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours % 24;
  minutes = ((minutes - 1) % 60) + 1;
  seconds = ((seconds - 1) % 60) + 1;

  console.log(seconds, minutes, hours, days);

  return { seconds, minutes, hours, days };
};

const UpdateTime = () => {
  const { seconds, minutes, hours, days } = getCountdown();

  daysContainer.forEach((element) => {
    element.innerHTML = days;
  });
  hoursContainer.forEach((element) => {
    element.innerHTML = hours;
  });
  minutesContainer.forEach((element) => {
    element.innerHTML = minutes;
  });
  secondsContainer.forEach((element) => {
    element.innerHTML = seconds;
  });
};

setInterval(() => UpdateTime(), 1000);
