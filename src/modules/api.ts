const weatherAPI = (() => {
    async function getData(location: string) {
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=150da6ac985e48f8b6715206232106&q=${location}`,
            { mode: 'cors' }
          );
      
          if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
          }
      
          const locationData = await response.json();
          return locationData;
        } catch (error: any) {
          throw new Error(error)
        }
    }

    // Parse JSON for important information
    async function getLocationInfo(loc: string) {
        const info = await getData(loc);
        const Location = {name: info.location.name, region: info.location.region, country: info.location.country};
        const Temperature = {celsius: info.current.temp_c, farenheit: info.current.temp_f};
        const Condition = {text: info.current.condition.text, icon: info.current.condition.icon};
        const Wind = {mph: info.current.wind_mph, kph: info.current.wind_kph, direction: info.current.wind_dir};
        const Humidity = info.current.humidity;
        const Cloud = info.current.cloud;
        const Updated = info.current.last_updated_epoch;

        return {
            Location,
            Temperature,
            Condition,
            Wind,
            Humidity,
            Cloud,
            Updated
        }
    }

    return {
        getLocationInfo
    };
})();

export default weatherAPI;
