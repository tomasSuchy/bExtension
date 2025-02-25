//service-worker
import fetchLocations from "./api/fetchLocation.js"

chrome.runtime.onInstalled.addListener(details => {
  fetchLocations()
})

chrome.runtime.onMessage.addListener(data => {
  const { event, prefs } = data
  switch (event) {
    case 'onStop':
      handleOnStop();
      break;
    case 'onStart':
      handleOnStart(prefs)
      break;
    default:
      break;
  }
});

const handleOnStop = () => {
  console.log('On stop in bg');
  setRunningStatus(false);
  stopAlarm();
};

const handleOnStart = (prefs) => {
  console.log('On start in bg', 'prefs received:', prefs)
  chrome.storage.local.set(prefs);
  setRunningStatus(true);
  createAlarm();
};

const ALARM_JOB_NAME = "DROP";
const setRunningStatus = (isRunning) => {
  chrome.storage.local.set({ isRunning });
};

const createAlarm = () => {
  chrome.alarms.get(ALARM_JOB_NAME, existingAlarm => {
    if (!existingAlarm) {
      chrome.alarms.create(ALARM_JOB_NAME, {
        periodInMinutes: 1.0
      });
    }
  })
};

chrome.alarms.onAlarm.addListener(() => {
  console.log('OnAlarm scheduled code running');
});

const stopAlarm = () => {
  chrome.alarms.clearAll();
};