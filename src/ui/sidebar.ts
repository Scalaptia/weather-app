import { Search, createElement } from 'lucide';
import weatherAPI from '../modules/api';
import '../styles/sidebar.css';

async function submitSearch(name: string) {
    const locationInfo: LocationInfo = await weatherAPI.getLocationInfo(name);
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
    const Card = document.createElement('div');

    const Icon = document.createElement('img');
    Icon.src = 'locationInfo.'
    Card.appendChild(Icon);

    return Card; 
})();



const Sidebar = (() => {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    sidebar.appendChild(SearchBar);
    sidebar.appendChild(DisplayCard);

    return sidebar;
})();

export default Sidebar;
