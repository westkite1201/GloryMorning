import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Checkbox, Fab } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import UseStores from '../../../Setting/UseStores';
import './SearchSelected.scss';
const SearchSelected = observer(({ locationSettingMode }) => {
  const { search } = UseStores();
  /* 설정된 location 가져오기  */
  useEffect(() => {
    search.getSettingLocation();
  }, []);

  let { addressName } = search.selectedAddress;

  let selectedList = search.selectedAddressList.map((item, key) => {
    let selectClassName = `selected-box ${
      addressName === item.addressName ? 'select' : ''
    }`;
    const labelId = `checkbox-list-label-${key}`;
    return (
      <div
        className={selectClassName}
        onClick={() => search.setThisLocation(item)}
        key={key}
      >
        {item.addressName}
        <div className="check-box">
          {locationSettingMode && (
            <Checkbox
              onClick={() => search.spliceSelectedList(item.addressName)}
              edge="start"
              //checked={checked.indexOf(value) !== -1}
              checked={search.checkSeleted(item.addressName)}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          )}
        </div>
        {addressName && addressName === item.addressName && (
          <div>
            <Check />
          </div>
        )}
      </div>
    );
  });

  return <div className="selected-wrapper">{selectedList}</div>;
});

export default SearchSelected;
