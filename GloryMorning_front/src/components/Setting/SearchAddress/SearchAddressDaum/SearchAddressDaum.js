import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import DaumPostcode from 'react-daum-postcode';
import Grid from '@material-ui/core/Grid';
import UseStores from '../../../Setting/UseStores';
import SearchAddressItem from '../SearchAddressItem';
import SearchSelected from '../SearchSelected';
const SearchAddressDaum = observer(() => {
  const { search } = UseStores();
  const handleComplete = data => {
    console.log('[seoyeon] data', data);
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log('[seo]', fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    search.searchAddress(fullAddress);
  };
  let searchItems = search.searchAddressList.map((item, key) => {
    return (
      <SearchAddressItem search={search} key={key} value={key} item={item} />
    );
  });

  return (
    <Fragment>
      <div style={{ marginTop: '50px' }}></div>
      <DaumPostcode onComplete={handleComplete} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <span> [ SEARCH ITEMS ] </span>
          <div>{searchItems}</div>
        </Grid>
        <Grid item xs={6}>
          <span> [ SELECTED ADDRESS ] </span>
          <div>
            <SearchSelected locationSettingMode={true} />
          </div>
        </Grid>
        <button onClick={search.settingLocation}> settingLocation </button>
      </Grid>
    </Fragment>
  );
});

export default SearchAddressDaum;
