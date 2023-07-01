const preferences = (() => {
    let celsius = {
        symbol: 'C',
        value: 0,
    };

    let farenheit = {
        symbol: 'F',
        value: 0,
    };

    let preferedTemperature = celsius || farenheit;

    return {
        celsius,
        farenheit,
        preferedTemperature,
    };
})();

export default preferences;
