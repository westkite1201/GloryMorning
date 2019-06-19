import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

//컴포넌트에서 스토어에 접근할수 있게해준다.
// 정확히는 스토어에 있는 값을 컴포넌트의 props로 주입을 해준다.
@inject('counter')
//컴포넌트를 해당 스토어를 props로 전달 받아서 사용 할 수 있게 됩니다. 

//***함수 형태로 파라미터를 전달해주면 특정 값만 받아올 수 있음  */
@inject(stores => ({
  number : stores.counter.number,
  increase : stores.counter.increase,
  decrease : stores.counter.decrease
}))

class Counter extends Component {
  render() {
    const { number, increase, decrease } = this.props;
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    );
  }
}

export default Counter;