const TimerState = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

const SessionType = {
  POMODORO: 'pomodoro',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
};

const DEFAULT_POMODORO_DURATION = 25;
const DEFAULT_SHORT_BREAK_DURATION = 5;
const DEFAULT_LONG_BREAK_DURATION = 15;

const DEFAULT_SESSION_TYPE = SessionType.POMODORO;

let timerState = TimerState.IDLE;
let sessionType = DEFAULT_SESSION_TYPE;
let currentSessionDuration = DEFAULT_POMODORO_DURATION;
let remainingTime = 0;

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Pomodoro Timer extension installed');
});

// Handle alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoro') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'src/assets/icons/icon128.png',
      title: 'Pomodoro Timer',
      message: 'Time is up! Take a break.',
    });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    chrome.alarms.create('pomodoro', {
      delayInMinutes: request.minutes,
    });
  } else if (request.action === 'stopTimer') {
    chrome.alarms.clear('pomodoro');
  }
});
