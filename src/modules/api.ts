export const weatherAPI = (() => {
    async function getData(location: string) {
        const apiKey = '150da6ac985e48f8b6715206232106';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
        
        try {
            const response = await fetch(
                url,
                { mode: 'cors' }
            );

            if (!response.ok) {
                throw new Error(
                    'Request failed with status ' + response.status
                );
            }

            const locationData = await response.json();
            return locationData;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    // Parse JSON for important information
    async function getLocationInfo(loc: string) {
        const info = await getData(loc);
        const date = new Date(info.current.last_updated);

        const locationInfo: LocationInfo = {
            Location: {
                name: info.location.name,
                region: info.location.region,
                country: info.location.country,
            },
            Temperature: {
                celsius: info.current.temp_c,
                farenheit: info.current.temp_f,
            },
            Condition: {
                text: info.current.condition.text,
                icon: info.current.condition.icon,
            },
            Wind: {
                mph: info.current.wind_mph,
                kph: info.current.wind_kph,
                direction: info.current.wind_dir,
            },
            Humidity: info.current.humidity,
            Cloud: info.current.cloud,
            Updated: date,
        };

        return locationInfo;
    }

    return {
        getLocationInfo,
    };
})();

export const pexelsAPI = (() => {
    
    async function getCityImage(location: string) {
        const apiKey = '9vgnbQWPurNZnVB316qkWqSjAj2pC0xu2MbSbakiAJWGmMNdU0Wu8ZIQ';
        const url = `https://api.pexels.com/v1/search?query=${location}&orientation=landscape&per_page=1`;

        const request = new Request(url, {
            headers: {
                Authorization: apiKey,
            },
        })

        try {
            const response = await fetch(request);
            const imageData = await response.json();

            if (!response.ok) {
                throw new Error(
                    'Request failed with status ' + response.status
                );
            }
            return imageData;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return {
        getCityImage,
    };
})();
