class PomodoroTimer {
  constructor() {
    this.minutes = 25;
    this.seconds = 0;
    this.isRunning = false;
    this.timerId = null;
    this.initializeElements();
    this.initializeEventListeners();
  }

  initializeElements() {
    this.minutesElement = document.getElementById('minutes');
    this.secondsElement = document.getElementById('seconds');
    this.startButton = document.getElementById('start');
    this.pauseButton = document.getElementById('pause');
    this.resetButton = document.getElementById('reset');
    this.modeButtons = document.querySelectorAll('.mode');
  }

  initializeEventListeners() {
    this.startButton.addEventListener('click', () => this.start());
    this.pauseButton.addEventListener('click', () => this.pause());
    this.resetButton.addEventListener('click', () => this.reset());

    this.modeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.modeButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        this.minutes = parseInt(button.dataset.minutes);
        this.seconds = 0;
        this.updateDisplay();
      });
    });
  }

  start() {
    return chrome.runtime.sendMessage({ action: 'startTimer' });
  }

  pause() {
    return chrome.runtime.sendMessage({ action: 'pauseTimer' });
  }

  reset() {
    return chrome.runtime.sendMessage({ action: 'resetTimer' });
  }

  tick() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.complete();
        return;
      }
      this.minutes--;
      this.seconds = 59;
    } else {
      this.seconds--;
    }
    this.updateDisplay();
  }

  updateDisplay() {
    this.minutesElement.textContent = this.minutes.toString().padStart(2, '0');
    this.secondsElement.textContent = this.seconds.toString().padStart(2, '0');
  }

  complete() {
    this.pause();
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'src/assets/icons/icon128.png',
      title: 'Pomodoro Timer',
      message: 'Time is up! Take a break.',
    });
  }
}

// Initialize the timer when the popup loads
document.addEventListener('DOMContentLoaded', () => {
  new PomodoroTimer();
});
