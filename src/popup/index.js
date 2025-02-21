//Control buttons
const startBtn = document.getElementById('startBtn');
const endBtn = document.getElementById('stopBtn');
//Form inputs
const locationIdElement = document.getElementById('locationId');
const startDateElement = document.getElementById('startDate');
const endDateElement = document.getElementById('endDate');

startBtn.onclick = () => {
  const prefs = {
    locationId: locationIdElement.value,
    startDate: startDateElement.value,
    endDate: endDateElement.value,
    tzData: locationIdElement.options[locationIdElement.selectedIndex].getAttribute('data-tz')
  }
  chrome.runtime.sendMessage({ event: 'onStart', prefs });
};

endBtn.onclick = () => {
  chrome.runtime.sendMessage({ event: 'onStop' });
};

chrome.storage.local.get(['locationId', 'startDate', 'endDate', 'locations'], (result) => {
  const { locationId, startDate, endDate, locations } = result;

  setLocations(locations);

  if (locationId) locationIdElement.value = locationId;
  if (startDate) startDateElement.value = startDate;
  if (endDate) endDateElement.value = endDate;
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