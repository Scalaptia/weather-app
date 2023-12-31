export const weatherAPI = (() => {
    async function getData(location: string) {
        // const apiKey = '150da6ac985e48f8b6715206232106';
        const apiKey = 'd6e2d38aa0a94271818194039230507';
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`;

        try {
            const response = await fetch(url, { mode: 'cors' });

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
        console.log(info);
        const date = new Date(info.current.last_updated);

        const currentLocationInfo: CurrentInfo = {
            Location: {
                name: info.location.name,
                region: info.location.region,
                country: info.location.country,
            },
            Temperature: {
                celsius: info.current.temp_c,
                fahrenheit: info.current.temp_f,
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
            Visibility: {
                km: info.current.vis_km,
                miles: info.current.vis_miles,
            },
            Updated: date,
        };

        function createDayInfo(obj: any): DayInfo {
            const date = new Date(obj.date);

            return {
                Date: date,
                MaxTemperature: {
                    celsius: obj.day.maxtemp_c,
                    fahrenheit: obj.day.maxtemp_f,
                },
                MinTemperature: {
                    celsius: obj.day.mintemp_c,
                    fahrenheit: obj.day.mintemp_f,
                },
                Condition: {
                    text: obj.day.condition.text,
                    icon: obj.day.condition.icon,
                },
                UV: obj.day.uv,
            };
        }

        const daysLocationInfo: DayInfo[] = [];
        info.forecast.forecastday.forEach((day: Object) => {
            daysLocationInfo.push(createDayInfo(day));
        });

        const days: { [key: string]: any } = {};
        daysLocationInfo.forEach((location, index) => {
            const variableName = `day${index + 1}LocationInfo`;
            days[variableName] = location;
        });

        return {
            currentLocationInfo,
            days,
        };
    }

    let activeLocationInfo: LocationInfo | undefined;

    return {
        getLocationInfo,
        activeLocationInfo,
    };
})();

export const pexelsAPI = (() => {
    async function getCityImage(location: string) {
        const apiKey =
            '9vgnbQWPurNZnVB316qkWqSjAj2pC0xu2MbSbakiAJWGmMNdU0Wu8ZIQ';
        const url = `https://api.pexels.com/v1/search?query=${location}&orientation=landscape&per_page=1`;

        const request = new Request(url, {
            headers: {
                Authorization: apiKey,
            },
        });

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
