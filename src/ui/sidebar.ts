import { Droplets, Cloud, Search, createElement } from 'lucide';
import weatherAPI from '../modules/api';
import '../styles/sidebar.css';

let locationInfo: LocationInfo

export async function submitSearch(name: string) {
    locationInfo = await weatherAPI.getLocationInfo(name);
    DisplayCard.UpdateDisplayCard();
    console.log(locationInfo);
}

const SearchBar = (() => {
    const Bar = document.createElement('form');
    Bar.classList.add('searchbar');

    const Button = document.createElement('button');
    const searchSVG = createElement(Search);
    Button.appendChild(searchSVG);
    Bar.appendChild(Button);

    const Input = document.createElement('input');
    Input.placeholder = 'Search for a city...';
    Bar.appendChild(Input);

    Bar.addEventListener('submit', (e) => {
        e.preventDefault();
        submitSearch(Input.value);
        Input.value = '';
    });

    return Bar;
})();

const DisplayCard = (() => {
    function UpdateDisplayCard() {
        Icon.src = locationInfo.Condition.icon;
        TemperatureValue.innerText = locationInfo.Temperature.celsius.toString();
        TemperatureFormat.innerText = `°C`

        const dayOptions = {
            weekday: 'long',
        } as any;
        Day.innerText = locationInfo.Updated.toLocaleString('en-US', dayOptions);

        const hourOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        } as any;
        Hour.innerText = locationInfo.Updated.toLocaleString('en-US', hourOptions);

        StatusText.innerText = `${locationInfo.Condition.text} skies`;
        HumidityText.innerText = `${locationInfo.Humidity}% Humidity`;
    }

    const Card = document.createElement('div');
    Card.classList.add('displaycard');

    const Icon = document.createElement('img');
    Card.appendChild(Icon);

    const Temperature = document.createElement('div');
    Temperature.classList.add('temperature');
    const TemperatureValue = document.createElement('div');
    Temperature.appendChild(TemperatureValue);
    const TemperatureFormat = document.createElement('div');
    Temperature.appendChild(TemperatureFormat);
    Card.appendChild(Temperature);

    const Time = document.createElement('div');
    Time.classList.add('time');
    const Day = document.createElement('div');
    Time.appendChild(Day);
    const Hour = document.createElement('div');
    Time.appendChild(Hour);
    Card.appendChild(Time);

    const Condition = document.createElement('div');
    Condition.classList.add('Condition');

    const Status = document.createElement('div');
    Status.classList.add('status');
    Status.appendChild(createElement(Cloud));
    const StatusText = document.createElement('div');
    Status.appendChild(StatusText);
    Condition.appendChild(Status);

    const Humidity = document.createElement('div');
    Humidity.classList.add('humidity');
    Humidity.appendChild(createElement(Droplets));
    const HumidityText = document.createElement('div');
    Humidity.appendChild(HumidityText);
    Condition.appendChild(Humidity);
    Card.appendChild(Condition);

    return {
        Card,
        UpdateDisplayCard
    };
})();

const Sidebar = (() => {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    sidebar.appendChild(SearchBar);
    sidebar.appendChild(DisplayCard.Card);

    return sidebar;
})();

export default Sidebar;
