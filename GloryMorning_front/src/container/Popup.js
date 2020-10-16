/*global kakao*/
import React from 'react';

class PopUp extends React.Component {
  constructor(props) {
    super(props);
  }
  map;
  markers = [];
  infowindows = [];
  componentDidMount() {
    var container = document.getElementById('myMap'); //지도를 담을 영역의 DOM 레퍼런스
    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(35.157588, 129.058822), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
    };

    this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 좌표-주소로 변환 도와줄
    // geocoder 라이브러리
    const geocoder = new kakao.maps.services.Geocoder();

    // mousedown 이벤트 맵에 등록
    this.kakao.event.addListener(this.map, 'mousedown', mouseEvent => {
      this.removeMarker();
      //geocoder 라이브러리 addressSearch 메서드 사용
      console.log(mouseEvent);
      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        async (result, status) => {
          let address = '';
          if (result.length >= 1) {
            if (
              result[0].road_address != null &&
              result[0].road_address != undefined
            ) {
              address = result[0].road_address.address_name;
            } else {
              if (result[0].address != null && result[0].address != undefined) {
                address = result[0].address.address_name;
              } else {
                address = '주소 정보 없음';
              }
            }
          } else {
            if (result.length >= 1) {
              if (
                result.road_address != null &&
                result.road_address != undefined
              ) {
                address = result.road_address.address_name;
              } else {
                if (result.address != null && result.address != undefined) {
                  address = result.address.address_name;
                } else {
                  address = '주소 정보 없음';
                }
              }
            }
          }
          console.log(address);
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(coords);
            this.setState({
              customAddressTitle: '',
              customAddress: result[0].road_address.address_name,
            });
            this.addMarker(mouseEvent.latLng);
          }
        },
      );
    });
  }
  render() {
    return (
      <div className="popup">
        <div id="myMap" style={{ width: '500px', height: '400px' }} />
      </div>
    );
  }
}
export default PopUp;
