import React, { Component } from 'react';
import _ from 'lodash';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { observer, inject } from 'mobx-react';
const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);

class EditView extends Component {
  static get defaultProps() {
    /* 여기서 layout에 대한 디폴트 크기를 조절함  */
    return {
      className: 'layout',
      cols: 36,
      rowHeight: 1,
    };
  }

  constructor(props) {
    super(props);
    this.dataItem = [];
  }

  componentDidMount() {
    let {
      loadPage,
      getUserBackground,
      getWeatherDataV2,
      setSocketConnection,
      updateWeatherDataIntevalStart,
    } = this.props;
    //nowGeolocation();
    alert('componentDidMount');
    loadPage();
    setSocketConnection();
    updateWeatherDataIntevalStart();
    getUserBackground('testUser');
    getWeatherDataV2('ALL');
    window.addEventListener('resize', _.debounce(this.updateDimensions, 300));
    //window.onresize = this.handleResizeEnd;
  }
  componentWillUnmount() {
    const { setLayout } = this.props;
    //alert('edit view componentWillUnMount');
    //setLayout(null);
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    const { allChartResizing } = this.props;
    console.log('im listening');
    allChartResizing();
  };
  componentDidUpdate() {
    let { allChartResizing } = this.props;
    allChartResizing();
  }
  render() {
    console.log('editview render');
    let {
      layout,
      onLayoutChange,
      createElement,
      handleResizeChildComponent,
      backgroundUrl,
      selectedBackgroundUrl,
      useBackgroundURL,
      backgroundColor,
    } = this.props;
    // let layout = [
    //         {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    //         {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //         {i: 'c', x: 4, y: 0, w: 1, h: 2}
    //       ];
    //       console.log('layout ' , layout)

    console.log('[SEO] backgroundUrl', backgroundUrl, selectedBackgroundUrl);
    let background = selectedBackgroundUrl
      ? selectedBackgroundUrl
      : backgroundUrl;

    if (!useBackgroundURL) {
      background = '';
    }
    let style = {
      height: '100%',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundColor: backgroundColor,
      backgroundImage: `url(${background})`,
    };
    return (
      <div className={style.rglContainer} style={style}>
        <div className={style.dropLayout} style={{ width: '100%' }}>
          <ResponsiveReactGridLayout
            id={'rgl'}
            layout={layout}
            onLayoutChange={onLayoutChange}
            useCSSTransforms={true}
            draggableHandle=".dragHandle"
            resizableHandle=".resizeHandle"
            margin={[25, 25]}
            onResize={handleResizeChildComponent}
            //verticalCompact ={false}
            {...this.props}
          >
            {layout.map((el, index) => createElement(el, index))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

export default inject(({ edit, setting, weather }) => ({
  index: edit.index,
  layout: edit.layout,
  page_number: edit.page_number,

  loadPage: edit.loadPage,
  onLayoutChange: edit.onLayoutChange,
  setLayout: edit.setLayout,
  createElement: edit.createElement,
  onRemoveItem: edit.onRemoveItem,
  allChartResizing: edit.allChartResizing,
  handleResizeChildComponent: edit.handleResizeChildComponent,

  backgroundUrl: edit.backgroundUrl,
  useBackgroundURL: setting.useBackgroundURL,
  backgroundColor: setting.backgroundColor,
  getUserBackground: setting.getUserBackground,
  selectedBackgroundUrl: setting.selectedBackgroundUrl,
  setSocketConnection: weather.setSocketConnection,
  updateWeatherDataIntevalStart: weather.updateWeatherDataIntevalStart,
  getWeatherDataV2: weather.getWeatherDataV2,
}))(observer(EditView));
