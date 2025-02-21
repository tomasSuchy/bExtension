const startBtn = document.getElementById('startButton')
const endBtn = document.getElementById('stopButton')

startBtn.onclick = () => {
  const prefs = {
    locationId: locationIdElement.value,
    startDate: startDateElement.value,
    endDate: endDateElement.value,
  }
  chrome.runtime.sendMessage({ event: 'onStart', prefs })
}

endBtn.onclick = () => {
  chrome.runtime.sendMessage({ event: 'onStop' })
}

chrome.storage.local.get(['locationid', 'startDate', 'endDate'], (result) => {
  const { locationId, startDate, endDate } = result;

  if (locationId) locationIdElement.value = locationId
  if (startDate) startDateElement.value = locationId
  if (endDate) endDateElement.value = locationId
})