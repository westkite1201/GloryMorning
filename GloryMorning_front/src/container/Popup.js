/*global kakao */
import React, { useEffect } from 'react';
import './popup.scss';
import { observer } from 'mobx-react';
import UseStores from '../components/Setting/UseStores';
import SearchAddressDaum from '../components/Setting/SearchAddress/SearchAddressDaum';
let map;
const Map = observer(() => {
  const { search } = UseStores();
  useEffect(() => {
    mapscript();
  }, []);

  function panTo(lat, lng) {
    console.log('[seo] lat = ', lat, 'lng = ', lng);

    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(lat, lng);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }
  useEffect(() => {
    console.log('[seo] selectedAddress', search.selectedAddress);
    const { x, y } = search.selectedAddress;
    let lat = parseFloat(y);
    let lng = parseFloat(x);
    if (lat && lng) panTo(lat, lng);
  }, [search.selectedAddress]);
  const mapscript = () => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };
    //map
    map = new kakao.maps.Map(container, options);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(
      37.62197524055062,
      127.16017523675508,
    );

    // 마커를 생성
    // let marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });

    // // 마커를 지도 위에 표시
    // marker.setMap(map);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? '<div>도로명주소 : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          var content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            '</div>';

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  };
  // function setCenter() {
  //   // 이동할 위도 경도 위치를 생성합니다
  //   var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);

  //   // 지도 중심을 이동 시킵니다
  //   map.setCenter(moveLatLon);
  // }

  // function panTo() {
  //   // 이동할 위도 경도 위치를 생성합니다
  //   var moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942);

  //   // 지도 중심을 부드럽게 이동시킵니다
  //   // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  //   map.panTo(moveLatLon);
  // }

  return (
    <div className="map_wrap">
      <SearchAddressDaum />
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="hAddr">
          <span className="title">지도중심기준 행정동 주소정보</span>
          <span id="centerAddr"></span>
        </div>
      </div>
    </div>
  );
});
export default Map;
