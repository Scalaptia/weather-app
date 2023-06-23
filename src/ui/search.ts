import { Search, createElement } from "lucide";
import weatherAPI from "../modules/api";

const search = (() => {
    async function submitSearch(input: string) {
        const locationInfo = await weatherAPI.getLocationInfo(input);
        console.log(locationInfo);
    }

    const search = document.createElement('form');
    search.classList.add('search')

        const searchButton = document.createElement('button');
            const searchSVG = createElement(Search);
            searchButton.appendChild(searchSVG);
        search.appendChild(searchButton);

        const searchInput = document.createElement('input');
        search.appendChild(searchInput);

    search.addEventListener('submit', (e) => {
        e.preventDefault();
        submitSearch(searchInput.value);
    })

    return search;
})();

export default search;
