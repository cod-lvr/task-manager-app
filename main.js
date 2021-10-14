class Clock {
  constructor(tag, minute) {
    this.tag = tag;
    this.minute = +minute;
    this.second = 59;
    this.timeOutId = undefined;
    this.displayClock();
  }

  displayClock() {
    if ((this.second > 0 && this.minute > 0) || this.minute == 0) {
      this.second--;
    }
    if (this.minute == 1) {
      this.minute = 0;
    }
    if (this.second == 0) {
      this.second = 59;
      this.minute--;
    }

    document.getElementById(this.tag).innerHTML = `
    ${this.minute} : ${this.second}
    `;

    this.timeOutId = setTimeout(() => {
      this.displayClock();
    }, 1000);
  }

  cancelTimeOut() {
    if (this.minute < 0 && this.second == 0) {
      console.log("worked");
      this.timeOutId = clearsetTimeout(this.timeOutId);
    }
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
    let tasktime = document.querySelector("input#task-time");

    // validate userInput
    if (taskName.value.trim() !== 0 && tasktime.value <= 0) {
      return;
    }

    const addTask = new Task(taskName.value, tasktime.value);
    addTask.createNewTask();
    taskName.value = "";
    tasktime.value = "";
  }
}

new TaskHandler();
