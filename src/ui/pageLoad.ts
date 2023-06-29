import Content from './content';
import Sidebar from './sidebar';

const app = document.getElementById('app');

export default function () {
    app?.appendChild(Sidebar.element);
    app?.appendChild(Content.element);
}
