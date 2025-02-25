//Control buttons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
//Form inputs
const locationIdElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');
//Span listeners
const runningSpan = document.getElementById('runningSpan');
const stoppedSpan = document.getElementById('stoppedSpan');

//Error messages
const locationIdError = document.getElementById('locationIdError');
const startDateError = document.getElementById('startDateError');
const endDateError = document.getElementById('endDateError');

const hideElement = (elem) => {
  elem.style.display = 'none';
};
const showElement = (elem) => {
  elem.style.display = 'block';
};
const disableElement = (elem) => {
  elem.disabled = true;
};
const enableElement = (elem) => {
  elem.disabled = false;
};

const handleOnStartState = () => {
  //Tags
  showElement(runningSpan);
  hideElement(stoppedSpan);
  //Control btns
  disableElement(startBtn);
  enableElement(stopBtn);
  //Inputs
  disableElement(locationIdElement);
  disableElement(startDateElement);
  disableElement(endDateElement);
};
const handleOnStopState = () => {
  //Tags
  showElement(stoppedSpan);
  hideElement(runningSpan);
  //Control btns
  disableElement(stopBtn);
  enableElement(startBtn);
  //Inputs
  enableElement(locationIdElement);
  enableElement(startDateElement);
  enableElement(endDateElement);
};

const performOnStartValidations = () => {
  if (!locationIdElement.value) {
    showElement(locationIdError);
  } else {
    hideElement(locationIdError);
  }
  if (!startDateElement.value) {
    showElement(startDateError);
  } else {
    hideElement(startDateError);
  }
  if (!endDateElement.value) {
    showElement(endDateError);
  } else {
    hideElement(endDateError);
  }

  return locationIdElement.value && startDateElement.value && endDateElement.value;
}

startBtn.onclick = () => {
  const allFieldsValid = performOnStartValidations();

  if (!allFieldsValid) return;

  handleOnStartState();
  const prefs = {
    locationId: locationIdElement.value,
    startDate: startDateElement.value,
    endDate: endDateElement.value,
    tzData: locationIdElement.options[locationIdElement.selectedIndex].getAttribute('data-tz')
  }
  chrome.runtime.sendMessage({ event: 'onStart', prefs });
};

stopBtn.onclick = () => {
  handleOnStopState();
  chrome.runtime.sendMessage({ event: 'onStop' });
};

chrome.storage.local.get(['locationId', 'startDate', 'endDate', 'locations', 'isRunning'], (result) => {
  const { locationId, startDate, endDate, locations, isRunning } = result;

  setLocations(locations);

  if (locationId) locationIdElement.value = locationId;
  if (startDate) startDateElement.value = startDate;
  if (endDate) endDateElement.value = endDate;
  if (isRunning) {
    handleOnStartState();
  } else {
    handleOnStopState();
  }
});

const setLocations = (locations) => {
  locations.forEach(location => {
    let optionElement = document.createElement('option');
    optionElement.value = location.id;
    optionElement.innerHTML = location.name;
    optionElement.setAttribute('data-tz', location.tzData);
    locationIdElement.appendChild(optionElement);
  });
};