import Sidebar from './sidebar';

const app = document.getElementById('app');

export default function () {
    app?.appendChild(Sidebar);
}
