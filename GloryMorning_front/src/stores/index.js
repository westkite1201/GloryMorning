import WordStore from './word'
import EditStore from './edit';
import WeatherStore from './weather'
import sideStore from './sidebar'

class RootStore {
    constructor() {
      this.edit = new EditStore(this);
      this.word = new WordStore(this);
      this.weather = new WeatherStore(this);
      this.sidebar = new sideStore(this);
    }
  }
  
export default RootStore;