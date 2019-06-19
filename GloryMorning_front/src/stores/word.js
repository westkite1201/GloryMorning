import { observable, action, computed } from 'mobx';

export default class WordStore {
  @observable goodWordItems = [];
  @observable selectedItems = [];

  @observable author;
  @observable text;
  // **** 추가됨
  constructor(root) {
    this.root = root;
  }

  @action  
  putWord = (author, text) => {
    console.log('author ' , author , ' text ' , text )
    let lengthGoodWord = this.goodWordItems.length;
    lengthGoodWord += 1
    console.log('lengthGoodWord ' ,lengthGoodWord)
    this.goodWordItems.push({
        author,
        text ,
        key : lengthGoodWord,
    });
    console.log('goodWordItems ' ,this.goodWordItems)
  }

  @action
  handleAuthorChange = (e) => {
    this.author = e.target.value
  };

  @action
  handleTextChange = (e) => {
    this.text = e.target.value
  };

   




  @action
  put = (name, price) => {
    const { number } = this.root.counter;
    // 존재하는지 찾고
    const exists = this.selectedItems.find(item => item.name === name);
    if (!exists) {
      // 존재하지 않는다면 새로 집어넣습니다.
      this.selectedItems.push({
        name,
        price,
        count: number,
      });
      return;
    }
    // 존재 한다면 count 값만 올립니다.
    exists.count += number;
  };

  @action
  take = name => {
    const itemToTake = this.selectedItems.find(item => item.name === name);
    itemToTake.count--;
    if (itemToTake.count === 0) {
      // 갯수가 0 이면
      this.selectedItems.remove(itemToTake); // 배열에서 제거처리합니다.
    }
  };

  @computed
  get total() {
    console.log('총합 계산...');
    return this.selectedItems.reduce((previous, current) => {
      return previous + current.price * current.count;
    }, 0);
  }
}