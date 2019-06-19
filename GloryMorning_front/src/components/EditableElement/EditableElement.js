import React, { Component } from 'react'
import classnames from 'classnames';
import { observer, inject } from 'mobx-react';
import helpers from '../../lib/helpers'
@observer
class EditableElement extends Component {
    
  render() {
    const { 
        el,
        index,
        editPageFlag, 
        searchComponentByName,
         } = this.props;
/*
  createElement
    state 값으로 유지중인 layout을 화면 상에 나타내기 위해 div 형태로 반환하는 함수이다.
  */

    const removeStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer"
      };

      console.log(editPageFlag)

      console.log('el ', el.i)
      let Tag = helpers.isEmpty(el.TagName) ? 'div' : searchComponentByName(this.state, el.TagName);
      //let Tag = 'div'
        return (     
        <div className = {classnames({dragHandle: editPageFlag})}
             key       = {el.i}>
            <div className  = {'componentContainer'}
                id         = {el.i}>
            <Tag data = {el.i}
                wrapperid = {el.i}
                editPageFlag  = { editPageFlag }
                />
            </div>
            {
            editPageFlag  === true ?
            (
                <span
                className = "remove"
                style     = {removeStyle}
                //onClick   = {onRemoveItem(this, el.i)}
                >
                x
                </span>
                ) :
                (
                <span></span>
                )
            }
        </div>

        );
    }
}
export default EditableElement;
