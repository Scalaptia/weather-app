const weatherAPI = (() => {
    async function getData(location: string) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=150da6ac985e48f8b6715206232106&q=${location}`);
        const data = await response.json();
        console.log(data)
    }

    return {
        getData
    }
})();

export default weatherAPI;