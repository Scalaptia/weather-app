import '../styles/content.css'

const NavBar = (() => {
    const element = document.createElement('div');
    element.classList.add('navbar');

    const temperatureButtons = document.createElement('div');
    temperatureButtons.classList.add('temp-buttons');

    const selectCelsius = document.createElement('div')
    selectCelsius.classList.add('button')
    selectCelsius.innerText = '°C'
    temperatureButtons.appendChild(selectCelsius)
    const selectFarenheit = document.createElement('div')
    selectFarenheit.classList.add('button')
    selectFarenheit.innerText = '°F'
    temperatureButtons.appendChild(selectFarenheit)

    element.appendChild(temperatureButtons);

    return {
        element,
    };
})();

const Content = (() => {
    function UpdateContent(location: string) {}

    const element = document.createElement('div');
    element.id = 'main';
    element.appendChild(NavBar.element);

    return {
        element,
        UpdateContent,
    };
})();

export default Content;
