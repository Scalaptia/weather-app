import search from './search';
import '../styles/sidebar.css';

const Sidebar = (() => {
    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar'


    sidebar.appendChild(search)

    return sidebar
})()

export default Sidebar