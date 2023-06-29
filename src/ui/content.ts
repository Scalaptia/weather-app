const NavBar = (() => {
    const element = document.createElement('div');
    element.classList.add('navbar');
    
    return {
        element
    }
})();

const Content = (() => {
    function UpdateContent(location: string) {

    }

    const element = document.createElement('div');
    element.id = 'main';
    element.appendChild(NavBar.element)

    return {
        element,
        UpdateContent
    };
})();

export default Content;
