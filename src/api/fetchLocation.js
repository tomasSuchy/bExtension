const LOCATION_ENDPOINT = "https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry";

export default function fetchLocations() {
  fetch(LOCATION_ENDPOINT)
    .then(response => response.json())
    .then(data => {
      const filteredData = data.map((item) => (
        {
          id: item.id,
          name: item.name,
          shortName: item.shortName,  
          tzData: item.tzData
        }
      ));
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      chrome.storage.local.set({ locations: filteredData });
      console.log(filteredData);
    })
    .catch(error => console.error(error));
}
