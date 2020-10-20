import { observable, action, computed } from 'mobx';
import * as searchApi from '../lib/api/searchApi';
import _ from 'lodash';
import { toast } from 'react-toastify';

/* setting 이지만 현재 backgroundSetting 이라 보는게 맞다  */
export default class SearchStore {
  /* 다른 스토어에 접근하기 위함  */
  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @observable isLoading = false;
  @observable searchAddressList = [];

  //선택된 address s
  @observable selectedAddressList = [];

  @observable selectedAddress = {
    addressName: '',
    address: null,
    roadAddress: null,
    addressType: '',
    memIdx: null,
    x: '',
    y: '',
  };
  // @observable selectedAddress = {
  //   address_name: '',
  //   address: null,
  //   roadAddress: null,
  //   b_code: '',
  //   h_code: '',
  //   main_address_no: '',
  //   mountain_yn: '',
  //   region_1depth_name: '',
  //   region_2depth_name: '',
  //   region_3depth_h_name: '',
  //   region_3depth_name: '',
  //   sub_address_no: '',
  //   x: '',
  //   y: '',
  //   road_address_name: '',
  //   address_name: '',
  //   building_name: '',
  //   main_building_no: '',
  //   road_name: '',
  //   sub_building_no: '',
  //   underground_yn: '',
  //   zone_no: '',
  // };

  /* 선택된 로케이션으로 .현재 weather  */
  @action
  setThisLocation = item => {
    console.log('[SEO] ', item);
    this.selectedAddress = item;
    /* private 모드일때만 */
    // this.rootStore.weather.getWeatherDataShortTerm(false, item);
    // this.rootStore.weather.getWeatherData('ALL', false, item);
    // this.rootStore.weather.getDustInfo(false, item)

    //member 모드일떄
    this.rootStore.weather.initChart();
    this.rootStore.weather.getWeatherDataV2('ALL', false, item);
    // this.rootStore.weather.getWeatherData('REH', false, item);
    // this.rootStore.weather.getWeatherData('POP', false, item);
    // this.rootStore.weather.getWeatherData('R06', false, item);
    // this.rootStore.weather.getWeatherData('SKY', false, item);
    // this.rootStore.weather.getWeatherData('T3H', false, item);

    this.rootStore.weather.getWeatherDataShortTerm(false, item);
    this.rootStore.weather.getDustInfo(false, item);
  };
  /* 
    location setting 
    원하는 주소를 DB에세팅 하기 
  */
  @action
  settingLocation = async () => {
    console.log('[seoyeon]  selectedAddressList', this.selectedAddressList);
    try {
      const res = await searchApi.settingLocation(this.selectedAddressList);
      if (res.status === 200) {
        toast.success('🦄 야호 저장에 성공하였습니다!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        console.log('[SEO][settingLocation] = ', res.data);
        this.selectedAddressList = res.data.map(item => {
          return {
            addressName: item.address_name,
            x: item.x,
            y: item.y,
            address: item.address,
            roadAddress: item.road_address,
          };
        });

        console.log(
          '[SEO][settingLocation] this.selectedAddressList ',
          this.selectedAddressList,
        );
      }
    } catch (e) {
      alert('settingLocation 실패 error = ', e);
    }
  };

  /* 저장된 로케이션 가져오기  */
  @action
  getSettingLocation = async () => {
    const res = await searchApi.getSettingLocation();
    console.log('[seoyeon] getSettingLocation ', res);
    if (res.status === 200) {
      this.selectedAddressList = res.data.map(item => {
        console.log('[SEO] getSettingLocation item', item);
        return {
          addressName: item.address_name,
          x: item.x,
          y: item.y,
          address: item.address,
          roadAddress: item.road_address,
        };
      });
    }
  };

  @action
  searchAddress = async query => {
    try {
      //오류날 경우 반복 요청해야하나?
      const res = await searchApi.searchAddress(query);
      if (res.status === 200) {
        console.log('[seoyeon] = ', res.data.documents);
        this.searchAddressList = res.data.documents;
      }
    } catch (e) {}
  };

  checkSeleted = addressName => {
    let isExist = false;
    for (let key of this.selectedAddressList) {
      if (key.addressName === addressName) {
        isExist = true;
        break;
      }
    }
    //console.log("[SEO] checkSelected " , name, isExist)
    return isExist;
  };

  /* 
    밑에꺼를 동일하게 사용하면 될 줄 알았으나 
    오류로 인해 함수를 하나 더 만들겠
  */
  @action
  spliceSelectedList = addressName => {
    let index = 0;
    console.log('name ', addressName);
    this.selectedAddressList = this.selectedAddressList.filter(item => {
      return item.addressName !== addressName;
    });
    console.log(
      '[SEO][spliceSelectedList] this.selectedAddressList',
      this.selectedAddressList,
    );
  };

  @action
  setSelectItem = item => {
    let index = 0;
    let isExist = false;
    for (let key of this.selectedAddressList) {
      console.log(key.addressName, ' ', item.addressName);
      if (key.addressName === item.addressName) {
        isExist = true;
        break;
      }
      index += 1;
    }
    if (isExist) {
      this.selectedAddressList.splice(index, 1); // 현재 인덱스만 날림
    } else {
      this.selectedAddressList.push(item);
    }
    console.log(
      '[SEO][setSelectItem] this.selectedAddressList',
      this.selectedAddressList,
    );
  };
}
