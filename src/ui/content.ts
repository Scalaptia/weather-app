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

    function CreateCard(i: number) {
        const card = document.createElement('div');
        element.classList.add(`day${i}`);

        return card;
    }

    for (let i = 1; i <= 7; i++) {
        element.appendChild(CreateCard(i));
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

    return {
        element,
        UpdateContent,
    };
})();

export default { Content, WeekDisplay };
