import React from 'react';
import { observer } from "mobx-react";

import Checkbox from '@material-ui/core/Checkbox';
const SearchSelected = observer(({search}) => {

    const handleToggle = (item) => {
        search.setSelectItem({name : item.name , item : item});
    };

    let selectedList = search.selectedAddressList.map((item, key ) =>{
        const labelId = `checkbox-list-label-${key}`;
        return (
            <div>
                {item.name}
                <div className = "checkBox">
                    <Checkbox
                        onClick={() => search.spliceSelectedList(item.name)}
                        edge="start"
                        //checked={checked.indexOf(value) !== -1}
                        checked={search.checkSeleted(item.name)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}/>
                </div>
            </div>
        )
    })

    return (
        <div>
            {selectedList}
        </div>
    );
});



export default SearchSelected;