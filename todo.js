const debug = false;

const POMODORO_COUNT = debug ? 3 : 1500;
const REST_COUNT = debug ? 3 : 300;
const toggleButton = document.querySelector("#toggle-btn");
const statusElement = document.querySelector("#status-text");
const timerElement = document.querySelector("#timer-text");
const resetButton = document.querySelector("#reset-btn");
const restButton = document.querySelector("#rest-btn");
const workButton = document.querySelector("#work-btn");

let workTimerCount = POMODORO_COUNT;
let restTimerCount = REST_COUNT;
let workTimerIsActive = true;
let timerInterval;

toggleButton.onclick = e => {
  if (workTimerIsActive) {
    if (workTimerCount === 0) { 
        
      workTimerIsActive = !workTimerIsActive;
      setWorkTimer(POMODORO_COUNT);


      statusClass = "timer-inactive";
      timerElement.className = statusClass;
      statusElement.className = statusClass;

      workButton.checked = false;
      restButton.checked = true;
    }
  } else {
    if (restTimerCount === 0) {
      workTimerIsActive = !workTimerIsActive;
      setRestTimer(REST_COUNT);


      statusClass = "timer-active";
      timerElement.className = statusClass;
      statusElement.className = statusClass;

      workButton.checked = true;
      restButton.checked = false;
    }
  }

  if (!timerInterval) {
    startTimer(e.target);
  } else {
    stopTimer(e.target);
  }
};

restButton.onclick = e => {
  if (workTimerIsActive === false) {
    return;
  }
  workTimerIsActive = false;
  setRestTimer(restTimerCount);

  statusClass = "timer-inactive";
  timerElement.className = statusClass;
  statusElement.className = statusClass;

  workButton.checked = false;
};

workButton.onclick = e => {
  if (workTimerIsActive === true) {
    return;
  }
  workTimerIsActive = true;
  setWorkTimer(workTimerCount);

  statusClass = "timer-active";
  timerElement.className = statusClass;
  statusElement.className = statusClass;

  restButton.checked = false;
};

resetButton.onclick = e => {
  if (workTimerIsActive === true) {
    setWorkTimer(POMODORO_COUNT);
    return;
  }
  setRestTimer(REST_COUNT);
};

function startTimer(startStopButton) {
  timerInterval = setInterval(() => {
    if (workTimerIsActive === true) {
      workTimerCount -= 1;
      updateDisplay(workTimerCount);

      if (workTimerCount === 0) {
        clearInterval(timerInterval);
      }
    } else {
      restTimerCount -= 1;
      updateDisplay(restTimerCount);

      if (restTimerCount === 0) {
        clearInterval(timerInterval);
      }
    }
  }, 1000);

  startStopButton.innerHTML = "Stop";
  resetButton.disabled = true;

  restButton.disabled = true;
  workButton.disabled = true;
}

function stopTimer(startStopButton) {
  clearInterval(timerInterval);
  timerInterval = undefined;

  startStopButton.innerHTML = "Start";
  resetButton.disabled = false;

  if (workTimerCount === 0) {
    workTimerIsActive = !workTimerIsActive;
    workTimerCount = workTimerIsActive ? POMODORO_COUNT : REST_COUNT;

    statusClass =
      workTimerIsActive === true ? "timer-active" : "timer-inactive";
    timerElement.className = statusClass;
    statusElement.className = statusClass;
    updateDisplay();
  }

  restButton.disabled = false;
  workButton.disabled = false;
}

function getMinutes(count) {
  let minutes = Math.floor(count / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes === 0 ? "00" : minutes;
}

function getSeconds(count) {
  let seconds = Math.floor(count % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return seconds === 0 ? "00" : seconds;
}

function setWorkTimer(remainingTime) {
  workTimerCount = remainingTime;
  updateDisplay(workTimerCount);
}

function setRestTimer(remainingTime) {
  restTimerCount = remainingTime;
  updateDisplay(restTimerCount);
}

function updateDisplay(count) {
  timerElement.innerHTML = `${getMinutes(count)}:${getSeconds(count)}`;
}

if (workTimerIsActive === true) {
  setWorkTimer(workTimerCount);

  statusClass = "timer-active";
  timerElement.className = statusClass;
  statusElement.className = statusClass;
  workButton.checked = true;
  restButton.checked = false;
} else {
  setRestTimer(restTimerCount);

  statusClass = "timer-inactive";
  timerElement.className = statusClass;
  statusElement.className = statusClass;
  workButton.checked = false;
  restButton.checked = true;
}  

////////////////

function addItem() {
    var textbox = document.getElementById("TextBox");
    var todoStr = textbox.value;
    var list = document.getElementById('TodoList');
    var todoItem = document.createElement('li');
    var checkbox = document.createElement('input'); 
    checkbox.type = "checkbox"; 
    checkbox.name = "CheckBox"; 
    checkbox.value = false; 
    checkbox.id = "checkbox_" + todoStr;

    var label = document.createElement('label'); 
    label.id = "label_" + todoStr;
    label.appendChild(document.createTextNode(todoStr)); 
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    
    checkbox.addEventListener("click", () => {
        var checked = checkbox.checked;
        if (checked) {
            label.classList.add("selected-text");
        } else {
            label.classList.remove("selected-text"); 
        }
    });


        list.appendChild(todoItem);
        textbox.value = "";
        console.log("added item: " + todoStr);
}