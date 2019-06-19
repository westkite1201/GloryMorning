import WordStore from './word'
import EditStore from './edit';
import WeatherStore from './weather'
import TimerStore from './timer'
import CalenderStore from './calender'
import BoardStore from './board'
import ChatStore from './chat'
import sideStore from './sidebar'
import commentStore from './comment'
class RootStore {
    constructor() {
      this.chat = new ChatStore(this);
      this.calender = new CalenderStore(this);
      this.edit = new EditStore(this);
      this.word = new WordStore(this);
      this.weather = new WeatherStore(this);
      this.timer = new TimerStore(this);
      this.board = new BoardStore(this);
      this.sidebar = new sideStore(this);
      this.comment = new commentStore(this)
    }
  }
  
export default RootStore;