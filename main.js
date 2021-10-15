class Clock {
  constructor(tag, minute) {
    this.tag = tag;
    this.minute = minute;
    this.timeOutId = undefined;
    this.displayClock();
  }

  timeConvert() {
    this.hours = this.minute / 60;
    this.rhours = Math.floor(this.hours);
    this.minutes = (this.hours - this.rhours) * 60;
    return (this.rminutes = Math.round(this.minutes));
  }

  displayClock() {
    if (this.rminutes < 10) {
      this.rminutes = "0" + this.rminutes;
    }

    this.docDisplay(this.minute, this.rminutes);

    if (this.rminutes == 0) {
      this.cancelTimeOut();
      this.docDisplay(0, 0);
    }
    this.rminutes--;
    this.startTimeOut();
  }

  docDisplay(min, sec) {
    document.getElementById(this.tag).innerHTML = `
    ${min} : ${sec}
    `;
  }

  startTimeOut() {
    this.timeOutId = setTimeout(() => {
      this.displayClock();
    }, 1000);
  }

  cancelTimeOut() {
    clearTimeout(this.timeOutId);
  }
}

class Task {
  tasks = [];

  constructor(taskName, taskTime) {
    this.taskName = taskName;
    this.taskTime = taskTime;
    this.taskId = Math.round(Math.random() * 6);
  }

  createNewTask() {
    this.tasks = [...this.tasks, this.taskId];

    const taskList = document.querySelector(".tasks-container ul");
    const taskEl = document.createElement("li");
    taskEl.className = "task";
    taskEl.innerHTML = `
            <span id="radio">${this.taskTime}</span>
            <h2>${this.taskName}</h2>
            <button class="start-btn">start</button>
        `;

    const startBtn = taskEl.querySelector("button");
    // startBtn.addEventListener("click");

    taskList.append(taskEl);
    this.clockCounter();
  }

  clockCounter() {
    new Clock("clock", this.taskTime);
  }
}

class TaskHandler {
  constructor() {
    this.addTaskBtn();
  }

  addTaskBtn() {
    const addTask = document.querySelector(".start-btn");
    addTask.addEventListener("click", this.startTask);
  }

  startTask() {
    App.init();
  }
}

class App {
  static init() {
    let taskName = document.querySelector("input#task-name");
    let taskTime = document.querySelector("input#task-time");

    const taskNameValue = taskName.value;
    const taskTimeValue = taskTime.value;

    if (taskNameValue.trim() !== 0 && isNaN(taskTimeValue)) {
      return;
    }

    const addTask = new Task(taskNameValue, taskTimeValue);
    addTask.createNewTask();
    taskName.value = "";
    taskTime.value = "";
  }
}

new TaskHandler();
