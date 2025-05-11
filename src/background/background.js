const TimerState = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
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

// This is what we need to track
const initialState = {
  timerState: TimerState.IDLE,
  sessionType: SessionType.POMODORO,
  timeRemaining: DEFAULT_POMODORO_DURATION * 60,
  completedPomodoros: 0,
  lastUpdated: Date.now(),
  isPaused: false,
};

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Pomodoro Timer extension installed');
  chrome.storage.local.set(initialState);
  chrome.storage.local.get(initialState, (result) => {
    console.log('Initial state set:', result);
  });
});

function getState() {
  return chrome.storage.local.get(initialState);
}

function resetState() {
  chrome.storage.local.set(initialState);
}

function updateState(newState) {
  chrome.storage.local.set({ ...getState(), ...newState });
}

function updateDisplay() {
  chrome.runtime.sendMessage({ action: 'updateDisplay' });
}

// Save State after each change
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.timerState) {
    timerState = changes.timerState.newValue;
    console.log('State changed:', changes);
  }
  if (changes.sessionType) {
    sessionType = changes.sessionType.newValue;
    console.log('State changed:', changes);
  }
  if (changes.completedPomodoros) {
    completedPomodoros = changes.completedPomodoros.newValue;
    console.log('State changed:', changes);
  }
  if (changes.isPaused) {
    isPaused = changes.isPaused.newValue;
    console.log('State changed:', changes);
  }
});

// Handle State updates from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    startTimer();
  } else if (request.action === 'stopTimer') {
    stopTimer();
  } else if (request.action === 'resumeTimer') {
    resumeTimer();
  } else if (request.action === 'resetTimer') {
    resetTimer();
  } else if (request.action === 'pauseTimer') {
    pauseTimer();
  } else if (request.action === 'resumeTimer') {
    resumeTimer();
  }
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

// Timer Control Funcions
function startTimer() {
  if (timerState === TimerState.IDLE) {
    timerState = TimerState.RUNNING;
    remainingTime = currentSessionDuration * 60;
    updateState({ timerState, remainingTime });
    updateDisplay();
  }
}

function stopTimer() {
  if (timerState === TimerState.RUNNING) {
    timerState = TimerState.IDLE;
    clearInterval(timerId);
    updateState({ timerState });
  }
}

function resumeTimer() {
  if (timerState === TimerState.PAUSED) {
    timerState = TimerState.RUNNING;
    updateDisplay();
  }
}

function pauseTimer(timerId) {
  if (timerState === TimerState.RUNNING) {
    timerState = TimerState.PAUSED;
    clearInterval(timerId);
  }
}

function resumeTimer() {
  if (timerState === TimerState.PAUSED) {
    timerState = TimerState.RUNNING;
    updateDisplay();
  }
}
