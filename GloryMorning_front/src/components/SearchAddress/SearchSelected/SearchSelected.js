import React from 'react';
import { observer } from "mobx-react";
import { Checkbox, Fab } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import './SearchSelected.scss'
const SearchSelected = observer(({search}) => {
    let { addressName } = search.selectedAddress;
    let selectedList = search.selectedAddressList.map((item, key ) =>{
       let selectClassName = `selected-box ${addressName === item.addressName ? 'select' : ''}`
        const labelId = `checkbox-list-label-${key}`;
        return (
            <div className = {selectClassName} 
                 onClick = {() => search.setThisLocation(item)}>
                {item.addressName}
                <div className = "check-box">
                    <Checkbox
                        onClick={() => search.spliceSelectedList(item.addressName)}
                        edge="start"
                        //checked={checked.indexOf(value) !== -1}
                        checked={search.checkSeleted(item.addressName)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}/>
                </div>
                <div >
                    <Check/>
                </div>
            </div>
        )
    })

    return (
        <div className ="selected-wrapper">
            {selectedList}
        </div>
    );
});



export default SearchSelected;