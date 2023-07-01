import preferences from '../modules/preferences';
import '../styles/content.css';
import Sidebar from './sidebar';

const NavBar = (() => {
    const element = document.createElement('div');
    element.classList.add('navbar');

    const temperatureButtons = document.createElement('div');
    temperatureButtons.classList.add('temp-buttons');

    const selectCelsius = document.createElement('div');
    selectCelsius.classList.add('button');
    selectCelsius.classList.add('selected'); // Set as default
    selectCelsius.innerText = '°C';
    selectCelsius.onclick = () =>
        (preferences.preferedTemperature = preferences.celsius);
    temperatureButtons.appendChild(selectCelsius);

    const selectFarenheit = document.createElement('div');
    selectFarenheit.classList.add('button');
    selectFarenheit.innerText = '°F';
    selectFarenheit.onclick = () =>
        (preferences.preferedTemperature = preferences.farenheit);
    temperatureButtons.appendChild(selectFarenheit);

    temperatureButtons.addEventListener('click', (event) => {
        const selectedButton = event.target as HTMLDivElement;
        toggleSelectedTemperature(selectedButton);
    });

    function toggleSelectedTemperature(element: HTMLDivElement) {
        const buttons = Array.from(
            temperatureButtons.children
        ) as HTMLDivElement[];

        buttons.forEach((button) => {
            button.classList.remove('selected');
        });

        Sidebar.UpdateSidebar();
        element.classList.add('selected');
    }

    element.appendChild(temperatureButtons);

    return {
        element,
    };
})();

const WeekDisplay = (() => {
    const element = document.createElement('div');
    element.classList.add('weekdisplay');

    function CreateCard() {
        const Card = document.createElement('div');
        Card.classList.add(`daycard`);

        const DayName = document.createElement('div');
        DayName.innerText = 'Sun';
        Card.appendChild(DayName);

        const DayIcon = document.createElement('img');
        DayIcon.src = 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
        Card.appendChild(DayIcon);

        const Temperature = document.createElement('div');
        Temperature.classList.add('minmax-temp');

        const maxTemp = document.createElement('div');
        maxTemp.innerText = '19°';
        Temperature.appendChild(maxTemp);
        const minTemp = document.createElement('div');
        minTemp.innerText = '7°';
        Temperature.appendChild(minTemp);

        Card.appendChild(Temperature);

        return Card;
    }

    let weekCards = [];
    for (let i = 1; i <= 7; i++) {
        let card = CreateCard();
        weekCards.push(card);
        element.appendChild(card);
    }

    function UpdateWeekDisplay() {}

    return {
        element,
        UpdateWeekDisplay,
    };
})();

const Content = (() => {
    function UpdateContent() {}

    const element = document.createElement('div');
    element.id = 'main';
    element.appendChild(NavBar.element);
    element.appendChild(WeekDisplay.element);

    return {
        element,
        UpdateContent,
    };
})();

export default { Content, WeekDisplay };
