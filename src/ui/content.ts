import {
    ArrowDown,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowUpLeft,
    ArrowUpRight,
    createElement,
} from 'lucide';
import { weatherAPI } from '../modules/api';
import { ProgressBar, StatusCard } from '../modules/components';
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
        Content.UpdateContent();
    }

    element.appendChild(temperatureButtons);

    return {
        element,
    };
})();

const SectionHeader = (containerID: string) => {
    const element = document.createElement('div');
    element.className = 'section-header';
    element.id = containerID;

    const header = document.createElement('div');
    header.classList.add('header');
    element.appendChild(header);

    function setName(name: string) {
        header.innerText = name;
    }

    return {
        element,
        setName,
    };
};

const WeekDisplay = (() => {
    const element = document.createElement('div');
    element.className = 'week-display';

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

        for (let i = 0; i < Object.keys(info!.days as Object).length; i++) {
            let card = weekCards[i];
            let propertyName = `day${i + 1}LocationInfo` as keyof DayInfo[];
            let dayInfo = info!.days[propertyName] as DayInfo;

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

const TodayDisplay = (() => {
    const element = document.createElement('div');
    element.className = 'today-display';

    function CreateCard() {
        const Card = document.createElement('div');
        Card.classList.add('card');

        const Title = document.createElement('div');
        Title.className = 'card-title';
        Card.appendChild(Title);

        const Item = document.createElement('div');
        Item.className = 'item';
        Card.appendChild(Item);

        return Card;
    }

    let Cards: HTMLElement[] = [];
    for (let i = 0; i < 4; i++) {
        let card = CreateCard();
        Cards.push(card);
        element.appendChild(card);
    }

    Cards[0].children[0].innerHTML = 'UV Index';
    const UVProgressBar = ProgressBar(11);
    Cards[0].children[1].appendChild(UVProgressBar.element);

    Cards[1].children[0].innerHTML = 'Wind Status';
    const WindStatus = StatusCard('wind-status');
    Cards[1].children[1].appendChild(WindStatus.element);

    Cards[2].children[0].innerHTML = 'Cloudiness';
    const CloudProgressBar = ProgressBar(100, '%');
    Cards[2].children[1].appendChild(CloudProgressBar.element);

    Cards[3].children[0].innerHTML = 'Visibility';
    const VisibilityStatus = StatusCard('visibility-status');
    Cards[3].children[1].appendChild(VisibilityStatus.element);

    function getWindMessage(windDirectionCode: string) {
        const windDirections: WindDirectionMapping = {
            N: 'North',
            NNE: 'North-Northeast',
            NE: 'Northeast',
            ENE: 'East-Northeast',
            E: 'East',
            ESE: 'East-Southeast',
            SE: 'Southeast',
            SSE: 'South-Southeast',
            S: 'South',
            SSW: 'South-Southwest',
            SW: 'Southwest',
            WSW: 'West-Southwest',
            W: 'West',
            WNW: 'West-Northwest',
            NW: 'Northwest',
            NNW: 'North-Northwest',
        };

        const windDirectionIcons: WindIcons = {
            N: createElement(ArrowUp),
            NNE: createElement(ArrowUpRight),
            NE: createElement(ArrowUpRight),
            ENE: createElement(ArrowUpRight),
            E: createElement(ArrowRight),
            ESE: createElement(ArrowDownRight),
            SE: createElement(ArrowDownRight),
            SSE: createElement(ArrowDownRight),
            S: createElement(ArrowDown),
            SSW: createElement(ArrowDownLeft),
            SW: createElement(ArrowDownLeft),
            WSW: createElement(ArrowDownLeft),
            W: createElement(ArrowLeft),
            WNW: createElement(ArrowUpLeft),
            NW: createElement(ArrowUpLeft),
            NNW: createElement(ArrowUpLeft),
        };

        const name = windDirections[windDirectionCode];
        const icon = windDirectionIcons[windDirectionCode];

        return {
            name,
            icon,
        };
    }

    function getVisibilityMessage(visibility: number) {
        if (visibility >= 10) return 'Good visibility';
        if (visibility >= 5) return 'Moderate visibility';
        if (visibility >= 1) return 'Poor visibility';
        if (visibility < 1) return 'Very poor visibility';
    }

    function UpdateTodayDisplay() {
        const info = weatherAPI.activeLocationInfo;
        const currentDay = 'day2LocationInfo' as keyof DayInfo[];
        const currentDayInfo = info!.days[currentDay] as DayInfo;

        const windKPH = info!.currentLocationInfo.Wind.kph;
        const windDirection = info!.currentLocationInfo.Wind.direction;
        const windMessage = getWindMessage(windDirection);

        UVProgressBar.setValue(currentDayInfo.UV);
        WindStatus.setValue(
            windKPH,
            'km/h',
            windMessage.name,
            windMessage.icon
        );

        const visibility = info!.currentLocationInfo.Visibility.km;
        const visibilityMessage = getVisibilityMessage(visibility)!;

        CloudProgressBar.setValue(info!.currentLocationInfo.Cloud);
        VisibilityStatus.setValue(visibility, 'km', visibilityMessage);
    }

    return {
        element,
        UpdateTodayDisplay,
    };
})();

const Content = (() => {
    function UpdateContent() {
        WeekDisplay.UpdateWeekDisplay();
        TodayDisplay.UpdateTodayDisplay();
    }

    const element = document.createElement('div');
    element.id = 'main';

    const WeekHeader = SectionHeader('week-header');
    WeekHeader.setName('Extended Forecast');

    const TodayHeader = SectionHeader('today-header');
    TodayHeader.setName("Today's Highlights");

    element.appendChild(NavBar.element);
    element.appendChild(WeekHeader.element);
    element.appendChild(WeekDisplay.element);
    element.appendChild(TodayHeader.element);
    element.appendChild(TodayDisplay.element);

    return {
        element,
        UpdateContent,
    };
})();

export default { Content, WeekDisplay };
