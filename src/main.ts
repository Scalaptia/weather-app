import weatherAPI from './modules/api';
import './styles/main.css';
import pageLoad from './ui/pageLoad';

pageLoad();

(async () => console.log(await weatherAPI.getLocationInfo('ensenada')))();
