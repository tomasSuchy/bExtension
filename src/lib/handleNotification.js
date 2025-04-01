export const handleNotification = (activeAppointments) => {
  if (activeAppointments.length > 0) createNotification(activeAppointments[0]);
}

const createNotification = (activeAppointment) => {
  chrome.notifications.create({
    title: "Global Entry Drops",
    message: `Found an open interview at ${activeAppointment.timestamp}`,
    icon: '/src/images/icon48.png',
    type: "basic"
  })
}

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({ url: "https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&returnUrl=ttp-external&service=up" })
})