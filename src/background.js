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
})

const handleOnStop = () => {
  console.log('On stop in bg')
}

const handleOnStart = () => {
  console.log('On start in bg', 'prefs received:', prefs)
  chrome.storage.local.set(prefs)
}