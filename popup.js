const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const today = new Date();
const curHr = today.getHours();

function updateTime() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `${time}`;
  });
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = `The time is: ${currentTime} seconds`;
}

chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "???";
  if (curHr < 12) {
    nameElement.textContent = `Good Morning ${name}`;
  } else if (curHr > 18) {
    nameElement.textContent = `Good Afternoon ${name}`;
  } else {
    nameElement.textContent = `Good Evening ${name}`;
  }
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
    timer: 0,
  });
});

updateTime();
setInterval(updateTime, 1000);
