import { weatherAPI } from '../modules/api';
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

    const selectFahrenheit = document.createElement('div');
    selectFahrenheit.classList.add('button');
    selectFahrenheit.innerText = '°F';
    selectFahrenheit.onclick = () =>
        (preferences.preferedTemperature = preferences.fahrenheit);
    temperatureButtons.appendChild(selectFahrenheit);

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

        element.classList.add('selected');
        Sidebar.UpdateSidebar();
        WeekDisplay.UpdateWeekDisplay();
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
        Card.appendChild(DayName);

        const DayIcon = document.createElement('img');
        Card.appendChild(DayIcon);

        const Temperature = document.createElement('div');
        Temperature.classList.add('minmax-temp');
        const maxTemp = document.createElement('div');
        Temperature.appendChild(maxTemp);
        const minTemp = document.createElement('div');
        Temperature.appendChild(minTemp);
        Card.appendChild(Temperature);

        return Card;
    }

    let weekCards: HTMLElement[] = [];
    for (let i = 1; i <= 7; i++) {
        let card = CreateCard();
        weekCards.push(card);
        element.appendChild(card);
    }

    function UpdateWeekDisplay() {
        const info = weatherAPI.activeLocationInfo;
        for (let i = 0; i <= 6; i++) {
            let card = weekCards[i];
            let propertyName = `day${i + 1}LocationInfo` as keyof LocationInfo;
            let dayInfo = info![propertyName] as DayInfo;

            const DayName = card.children[0] as HTMLDivElement;
            const DayIcon = card.children[1] as HTMLImageElement;
            const Temperature = card.children[2] as HTMLDivElement;
            const maxTemp = Temperature.children[0] as HTMLDivElement;
            const minTemp = Temperature.children[1] as HTMLDivElement;

            DayName.innerText = dayInfo.Date.toLocaleString('en-US', {
                weekday: 'short',
            });

            DayIcon.src = dayInfo.Condition.icon;

            let maxvalue: number =
                dayInfo.MaxTemperature[
                    `${preferences.preferedTemperature.name}` as
                        | 'celsius'
                        | 'fahrenheit'
                ];
            `MaxTemperature.${preferences.preferedTemperature.name}` as keyof DayInfo;
            maxTemp.innerText = `${maxvalue}°`;

            let minvalue: number =
                dayInfo.MinTemperature[
                    `${preferences.preferedTemperature.name}` as
                        | 'celsius'
                        | 'fahrenheit'
                ];
            `MinTemperature.${preferences.preferedTemperature.name}` as keyof DayInfo;
            minTemp.innerText = `${minvalue}°`;
        }
    }

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
