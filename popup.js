const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTime() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `The timer is at ${time}`;
  });
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = `The time is: ${currentTime} seconds`;
}

chrome.storage.sync.get(["name"], (res) => {
  const name = res.name ?? "???";
  nameElement.textContent = `Your name is ${name}`;
});

updateTime();
setInterval(updateTime, 1000);
