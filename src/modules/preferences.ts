const preferences = (() => {
    let celsius = {
        name: 'celsius',
        symbol: 'C',
        value: 0,
    };

    let fahrenheit = {
        name: 'fahrenheit',
        symbol: 'F',
        value: 0,
    };

    let preferedTemperature = celsius || fahrenheit;

    return {
        celsius,
        fahrenheit,
        preferedTemperature,
    };
})();

export default preferences;
