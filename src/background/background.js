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
