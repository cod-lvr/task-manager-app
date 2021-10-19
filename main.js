class Clock {
  constructor(tag, minute) {
    this.tag = tag;
    this.minute = minute;
    this.startClock();
  }

  startClock() {
    this.timeConvert();
    this.clockTimer();
    this.startTimeOut();
  }

  timeConvert() {
    this.rhours = Math.floor(this.minute / 60);
    this.minutes = (this.minute - this.rhours) * 60;
    return (this.rminutes = Math.round(this.minutes));
  }

  clockTimer() {
    if (this.rminutes < 10) {
      this.rminutes = ` 0${this.rminutes}`;
    }

    if (this.rminutes == -1 || isNaN(this.rminutes)) {
      this.stopTimeOut();
      return;
    }

    this.displayClock();
    this.rminutes--;
  }

  displayClock() {
    document.getElementById(
      this.tag
    ).innerHTML = `Secounds Left : ${this.rminutes} `;
  }

  startTimeOut() {
    this.timeOutId = setInterval(() => {
      this.clockTimer();
    }, 1000);
  }

  stopTimeOut() {
    clearInterval(this.startTimeOut);
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
            <span id="radio">minutes: ${this.taskTime}</span>
            <h2>${this.taskName}</h2>
        `;
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

    if (taskName.value.trim() !== 0 && taskTime.value == 0) {
      return;
    }

    const addTask = new Task(taskName.value, taskTime.value);
    addTask.createNewTask();
    taskName.value = "";
    taskTime.value = "";
  }
}

new TaskHandler();
