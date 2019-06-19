import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from  './EditableList.module.css';
// import MediaInfoYesterday from '../../Dashboard/MediaInfoYesterday'
// import SoundQualityPieChart from '../../Dashboard/SoundQualityPieChart';
// import ReactVis from '../../Dashboard/ReactVis'
/* 대시보드 */
// import VmafGaugeGraph from '../../DashBoard/VmafGaugeGraph';
// import BtvaccumulateGraph from '../../DashBoard/BtvaccumulateGraph';
// import HitGraph from '../../DashBoard/HitGraph';
// import PertitleHitTable from '../../DashBoard/PertitleHitTable';
// import Top3ApprovedVod from '../../DashBoard/Top3ApprovedVod';
// import Top3ClearVod from '../../DashBoard/Top3ClearVod';
// /*새로 import  대시보드 */
// import VictoryTest from '../../DashBoard/VictoryTest'

// import ReactTab from '../../Dashboard/ReactTab'
// import MediaInfoToday from '../../Dashboard/MediaInfoToday'
// import Page2 from '../../Dashboard/Page2'
// import TreeMapGraph3 from '../../Graph/TreeMapGraph3'
// import WordCloud from '../../Graph/WordCloud'
// import GridTable from '../../Grid/GridTable'
// import GridTest from '../../Grid/GridTest'
// import GridTest2 from '../../Grid/GridTest2'

/* 대시보드  */
import TodayVmafGauge from '../../DashBoard/TodayVmafGauge';
import HighQuailtyHitDash from '../../DashBoard/HighQuailtyHitDash'
import ProfilePercentPieChart from '../../DashBoard/ProfilePercentPieChart';
import HighQuailtyDash from '../../DashBoard/HighQuailtyDash'
import NewHighQuailtyHitPlotGraphDash from '../../DashBoard/NewHighQuailtyHitPlotGraph'
import NewHighQuailtyDash from '../../DashBoard/NewHighQuailtyDash'
import NewHighQuailtyHitDash from '../../DashBoard/NewHighQuailtyHitDash'
import DashHighQuailtyHitPlotGraph from '../../DashBoard/DashHighQuailtyHitPlotGraph'


/* 레거시 대시보드  */
//import YesterdayVmafGauge from '../../LEGACYDashBoard/YesterdayVmafGauge';
//import GapPlotGraph from '../../LAGACY/DashBoard/GapPlotGraph';
//import SugubDash from '../../LEGACYDashBoard/SugubDash'
//import BunseokDash from '../../LEGACYDashBoard/BunseokDash'
//import CheungjeongDash from '../../LEGACYDashBoard/CheungjeongDash'
//import EqualizationDash from '../../LEGACYDashBoard/EqualizationDash'
//import HitPercentDash from '../../LEGACYDashBoard/HitPercentDash'




/*분석  */
import ExplainNewBunseok from '../../NewBunseok/ExplainNewBunseok'
import ToggleTest from  '../../NewBunseok/ToggleTest';
import BunseokTreemapToggle from '../../NewBunseok/BunseokTreemapToggle'
import ProfileWordCloud from '../../NewBunseok/ProfileWordCloud'
import ProfileTreeMap_Reload from '../../NewBunseok/ProfileTreeMap_Reload'
import SummaryGrid from '../../NewBunseok/SummaryGrid'

// import SearchAllContent from '../../NewBunseok/SearchAllContent'
// import BunseokAllContentTable from '../../NewBunseok/BunseokAllContentTable'

import BunseokSearchAllContentPertitleAndAll from '../../NewBunseok/BunseokSearchAllContentPertitleAndAll'
import BunseokAllContentTablePertitleAndAll_Reload from '../../NewBunseok/BunseokAllContentTablePertitleAndAll_Reload'


/* 수급  */
// import SugubTable from '../../NewSugub/SugubTable';
// import SugubProfileTreeMap from '../../NewSugub/SugubProfileTreeMap';
// import SugubProfileWordCloud from '../../NewSugub/SugubProfileWordCloud';


/* 측정  */
import ExplainNewCheugjeong from '../../NewCheugjeong/ExplainNewCheugjeong'
import VmafGraph from '../../NewCheugjeong/VmafGraph'
import RangeGrid from '../../NewCheugjeong/RangeGrid'
import CheugjeongAllContentTable from '../../NewCheugjeong/CheugjeongAllContentTable'
import CheugjeongToggle from '../../NewCheugjeong/CheugjeongToggle'
import CheugjeongSummary from '../../NewCheugjeong/CheugjeongSummary'
import CheugjeongSunburst from '../../NewCheugjeong/CheugjeongSunburst'
import CheugjeongGapPlotGraph from '../../NewCheugjeong/CheugjeongGapPlotGraph'

// import CheugjeongSearchAllContentReload from '../../NewCheugjeong/CheugjeongSearchAllContentReload'
// import CheugjeongContentTableForBoxplot from '../../NewCheugjeong/CheugjeongContentTableForBoxplot'

import BoxplotReload from '../../NewCheugjeong/BoxplotReload'
import CheugjeongGapPlotGraphSearch from '../../NewCheugjeong/CheugjeongGapPlotGraphSearch'


import CheugjeonAllContentTablePertitleAndAll_boxPlot from '../../NewCheugjeong/CheugjeonAllContentTablePertitleAndAll_boxPlot'
import CheugjeongSearchAllContentPertitleAndAll from '../../NewCheugjeong/CheugjeongSearchAllContentPertitleAndAll'






/*고품질화 */
import NewHighQuailtyProgressPlotGraph from '../../NewHighQuailty/NewHighQuailtyProgressPlotGraph'
import NewHighQualityToggleCNT from '../../NewHighQuailty/NewHighQualityToggleCNT';
import NewHighQuailtyHitPlotGraph from '../../NewHighQuailty/NewHighQuailtyHitPlotGraph'
//import NewHighQualityGrid_NewReload_FINAL from '../../NewHighQuailty/NewHighQualityGrid_NewReload_FINAL'
import NewHighQualityGrid_NewReload_FINAL_BACK from '../../NewHighQuailty/NewHighQualityGrid_NewReload_FINAL_BACK'
import NewHighQualityToggleHIT from '../../NewHighQuailty/NewHighQualityToggleHIT';
import ExplainNewHighQuailty from '../../NewHighQuailty/ExplainNewHighQuailty'


// import NewHighQuailtyAllContentTable from '../../NewHighQuailty/NewHighQuailtyAllContentTable';
// import NewHighQuailtySearchAllContent from '../../NewHighQuailty/NewHighQuailtySearchAllContent';
import ExplainNewHighQuailtyDetail from '../../NewHighQuailty/ExplainNewHighQuailtyDetail'
import NewHighQuailtyProgressPlotGraphSearch from '../../NewHighQuailty/NewHighQuailtyProgressPlotGraphSearch'
import PertitleExcelSummary from '../../NewHighQuailty/PertitleExcelSummary'
import NewHighQualitySearchAllContentPertitleAndAll from '../../NewHighQuailty/NewHighQualitySearchAllContentPertitleAndAll'
import NewHighQualityAllContentTablePertitleAndAll from '../../NewHighQuailty/NewHighQualityAllContentTablePertitleAndAll'


/*고화질화  */
import HighQualityToggleCNT from '../../HighQuailty/HighQualityToggleCNT'
import HighQualityToggleHIT from '../../HighQuailty/HighQualityToggleHIT'
import HighQualityGrid_NewReload_FINAL from '../../HighQuailty/HighQualityGrid_NewReload_FINAL'
import HighQuailtyProgressPlotGraph_Reload from '../../HighQuailty/HighQuailtyProgressPlotGraph_Reload'
import HighQuailtyHitPlotGraph_Reload from '../../HighQuailty/HighQuailtyHitPlotGraph_Reload'
import ExplainHighQuailty from '../../HighQuailty/ExplainHighQuailty'

// import HighQuailtyAllContentTable from '../../HighQuailty/HighQuailtyAllContentTable'
// import HighQuailtySearchAllContent from '../../HighQuailty/HighQuailtySearchAllContent'
import ExplainHighQuailtyDetail from '../../HighQuailty/ExplainHighQuailtyDetail'
//import ExeclDownloader from '../../HighQuailty/ExeclDownloader'

import HighQuailtyAllPlotGraphSearch from '../../HighQuailty/HighQuailtyAllPlotGraphSearch'
import HighQualityExcelSummary from '../../HighQuailty/HighQualityExcelSummary'


import HighQualitySearchAllContentPertitleAndAll from '../../HighQuailty/HighQualitySearchAllContentPertitleAndAll'
import HighQualityAllContentTablePertitleAndAll from '../../HighQuailty/HighQualityAllContentTablePertitleAndAll'



/* 사운드  */
import SoundSearchContent from '../../SoundValance/SoundSearchContent'
import SoundValance_NewReload_FINAL from '../../SoundValance/SoundValance_NewReload_FINAL'

import SoundValanceToggleCNT from '../../SoundValance/SoundValanceToggleCNT'
import SoundValanceHitPlotGraph from '../../SoundValance/SoundValanceHitPlotGraph';
import SoundValanceToggleHIT from '../../SoundValance/SoundValanceToggleHIT';
import SoundValanceCountPlotGraph from '../../SoundValance/SoundValanceCountPlotGraph'
import ExplainSoundValance from '../../SoundValance/ExplainSoundValance'


// import SoundValanceSearchAllContent from '../../SoundValance/SoundValanceSearchAllContent';
// import SoundValanceAllContentTable from '../../SoundValance/SoundValanceAllContentTable'
import ExplainSoundValanceDetail from '../../SoundValance/ExplainSoundValanceDetail'
import SoundValanceAllPlotGraphSearch from '../../SoundValance/SoundValanceAllPlotGraphSearch'

import SoundBalanceExcelSummary from '../../SoundValance/SoundBalanceExcelSummary'

import SoundBalanceSearchAllContentPertitleAndAll from '../../SoundValance/SoundBalanceSearchAllContentPertitleAndAll'
import SoundBalanceAllContentTablePertitleAndAll from '../../SoundValance/SoundBalanceAllContentTablePertitleAndAll'




/*주간보고 */
import WeeklyReportTable from '../../WeeklyReport/WeeklyReportTable'
import WeeklyReportSearch from '../../WeeklyReport/WeeklyReportSearch'
import WeeklyReportAllContentTableSD from '../../WeeklyReport/WeeklyReportAllContentTableSD'
import WeeklyReportSearchAllContentTableSD from '../../WeeklyReport/WeeklyReportSearchAllContentTableSD'
import WeeklyReportCategotyHitSummary from '../../WeeklyReport/WeeklyReportCategotyHitSummary'
import WeeklyReportTable_Reload from '../../WeeklyReport/WeeklyReportTable_Reload'

import PertitleHighQualityHitPlotGraph from '../../WeeklyReport/PertitleHighQualityHitPlotGraph'
import PertitleHighQualityCountPlotGraph from '../../WeeklyReport/PertitleHighQualityCountPlotGraph'
import PertitleHighQuailtyAllPlotGraphSearch from '../../WeeklyReport/PertitleHighQuailtyAllPlotGraphSearch'

import PertitleHighQualityToggleHIT from '../../WeeklyReport/PertitleHighQualityToggleHIT'
import PertitleHighQualityToggleCNT from '../../WeeklyReport/PertitleHighQualityToggleCNT'

/*	ALLMENU  */
// import SearchAllContentRadioSelect from '../../AllMenu/SearchAllContentRadioSelect'
// import SoundValance_NewReload_FINAL2 from '../../SoundValance/SoundValance_NewReload_FINAL2'
// import BunseokAllContentTablePertitleAndAll from '../../NewBunseok/BunseokAllContentTablePertitleAndAll'
import TestCompo from '../../NewBunseok/TestCompo'
import CustomTableLoader  from  '../../AllMenu/CustomTableLoader'
import Notice from '../../AllMenu/Notice'
// import PertitleAndRowDataTable from '../../AllMenu/PertitleAndRowDataTable'



/* ADMIN PAGE */
import UserManageTableReload from '../../Admin/UserManageTableReload'
import PageAuthorityManagement from '../../Admin/PageAuthorityManagement'
import UserApproveTable from '../../Admin/UserApproveTable'
import IframeTest from '../../AllMenu/IframeTest'






class EditableList extends Component {
	/*
	pureComponents: 사용자가 사용 할 수 있는 컴포넌트를 담는 리스트이다.
	import 한 각각의 객체를 value 값으로 설정하여 EditableList 외의
	컴포넌트들에서는 import 할 필요 없게 해준다.
				{ 유저권한테이블 : UserManageTableReload},
				{ 구분권한관리테이블 : PageAuthorityManagement},
				{ 유저승인테이블 : UserApproveTable},
	*/


	state = {
		componentList: '',
		pureComponents:[
			{IframeTest : IframeTest},

			{ 유저권한테이블 : UserManageTableReload},
			{ 구분권한관리테이블 : PageAuthorityManagement},
			{ 유저승인테이블 : UserApproveTable},
	
	
				{/* 테스트_하이스톡 : HighStockTest */}, 
				{ 테스트_분석_테스트컴포_쿼런트뷰 : TestCompo},
				{ 테스트_프로그래스 : CustomTableLoader },
				{ 공지사항 : Notice},

				//대시보드 
				{ 대시_누적품질지표  : TodayVmafGauge},
				{ 대시_고품질화_파이그래프 : ProfilePercentPieChart },

				{ 대시_고품질화_편수율_현황 : NewHighQuailtyDash},
				{ 대시_고품질화_히트_현황 : NewHighQuailtyHitDash},
				{ 대시_고화질화_편수율_현황 : HighQuailtyDash},
				{ 대시_고화질화_히트현황 : HighQuailtyHitDash },

				{ 대시_고품질화_히트율그래프 : NewHighQuailtyHitPlotGraphDash},
				{ 대시_고화질화_히트율그래프 : DashHighQuailtyHitPlotGraph } ,

				{},

				/* 분석  */
				{ 분석_설명 : ExplainNewBunseok},
				{ 분석_토글 : ToggleTest },
				{ 분석_트리맵 : ProfileTreeMap_Reload},
				{ 분석_트리맵_토글 : BunseokTreemapToggle},
				{ 분석_SummaryGrid : SummaryGrid},
				{ 분석_워드클라우드: ProfileWordCloud},
				{ 분석_퍼타이틀_올컨텐츠_테이블_검색 : BunseokSearchAllContentPertitleAndAll},
				{ 분석_퍼타이틀_올컨텐츠_테이블 : BunseokAllContentTablePertitleAndAll_Reload},

				{},
			
				/* 측정 쪽에 올라 감  */
				{ 측정_설명 : ExplainNewCheugjeong},
				{ 측정_토글 : CheugjeongToggle },

				{ 측정_갭_그래프_검색 :CheugjeongGapPlotGraphSearch },
				{ 측정_갭_그래프 : CheugjeongGapPlotGraph},

				{ 측정_선버스트 : CheugjeongSunburst},
				{ 측정_RangeGrid : RangeGrid },
				{ 측정_CheugjeongAllContentTable : CheugjeongAllContentTable},

				{ 측정_서머리 : CheugjeongSummary },
			
				{ 측정_박스플롯서칭 :  CheugjeongSearchAllContentPertitleAndAll},
				{ 측정_ALL_PERTITLE_박스폴롯테이블 : CheugjeonAllContentTablePertitleAndAll_boxPlot},
				{ 측정_박스플롯리로드 :BoxplotReload },
				{ 측정_VMAF : VmafGraph}, 
				
				{},

		
				/*고품질 화  */
				{ 고품질화_설명 : ExplainNewHighQuailty},

				{고품질화_설명_디테일 : ExplainNewHighQuailtyDetail},

				{고품질화_토글_편수 : NewHighQualityToggleCNT},
				{고품질화_토글_히트  : NewHighQualityToggleHIT },
				{고품질화_편수그래프_검색 : NewHighQuailtyProgressPlotGraphSearch},
				{고품질화_편수_그래프 : NewHighQuailtyProgressPlotGraph},
				{고품질화_히트_그래프: NewHighQuailtyHitPlotGraph},

				{고품질화_셀렉션_백업 : NewHighQualityGrid_NewReload_FINAL_BACK},

	
				{고품질화_summary_excel : PertitleExcelSummary},


				{ 고품질화_퍼타이틀_올컨텐츠_테이블_검색 : NewHighQualitySearchAllContentPertitleAndAll},
				{ 고품질화_퍼타이틀_올컨텐츠_테이블 : NewHighQualityAllContentTablePertitleAndAll},

				{},

				/* 고화질화   */
				{고화질화_설명 : ExplainHighQuailty},
				{고화질화_설명디테일 : ExplainHighQuailtyDetail},
				{고화질화_토글_편수 :HighQualityToggleCNT},
				{고화질화_토글_히트 : HighQualityToggleHIT},
				{고화질화_편수_그래프 : HighQuailtyProgressPlotGraph_Reload},
				{고화질화_히트_그래프 : HighQuailtyHitPlotGraph_Reload},
				{고화질화_셀렉션: HighQualityGrid_NewReload_FINAL},
				{/*고화질화_올컨텐츠테이블 : HighQuailtyAllContentTable*/},
				{/*고화질화_올컨텐츠테이블검색 : HighQuailtySearchAllContent*/},
	
				{고화질화_편수그래프_검색 : HighQuailtyAllPlotGraphSearch},
				{고화질화_엑셀서머리 : HighQualityExcelSummary},

				{고화질화_10M6M_올컨텐츠_테이블_검색 : HighQualitySearchAllContentPertitleAndAll},
				{고화질화_10M6M_올컨텐츠_테이블 : HighQualityAllContentTablePertitleAndAll},
			
				{},

				/* 사운드 valnce  */
				{사운드_설명 : ExplainSoundValance},
				{사운드_SoundSearchContent : SoundSearchContent },
				{사운드_셀렉션 : SoundValance_NewReload_FINAL},
				{사운드_토글_편수 : SoundValanceToggleCNT},
				{사운드_편수_그래프 : SoundValanceCountPlotGraph},
				{사운드_토글_히트 : SoundValanceToggleHIT},
				{사운드_히트_그래프 : SoundValanceHitPlotGraph},

				{/*사운드_올컨텐츠테이블검색 : SoundValanceSearchAllContent*/}, 
				{/*사운드_올컨텐츠테이블 : SoundValanceAllContentTable*/},

				{사운드_설명_디테일 : ExplainSoundValanceDetail }, 
				{사운드_편수그래프_검색 : SoundValanceAllPlotGraphSearch},
				{사운드_엑셀서머리 : SoundBalanceExcelSummary},
	
				{ 사운드_ALC_올컨텐츠_테이블_검색 : SoundBalanceSearchAllContentPertitleAndAll},
				{ 사운드_ALC_올컨텐츠_테이블 : SoundBalanceAllContentTablePertitleAndAll},

			


				/*주간 보고 */
	
				{ 주간보고_리로드  : WeeklyReportTable_Reload},
				{ 주간보고_검색 : WeeklyReportSearch },
				{ 주간보고_올컨텐츠_테이블 : WeeklyReportAllContentTableSD },
				{ 주간보고_올컨텐츠_테이블_검색 : WeeklyReportSearchAllContentTableSD},
				{ 주간보고_카테고리별_히트_엑셀: WeeklyReportCategotyHitSummary},
				{ 주간보고_퍼타이틀_고화질화_히트율_라인_그래프 : PertitleHighQualityHitPlotGraph },
				{ 주간보고_퍼타이틀_고화질화_편수율_라인_그래프 : PertitleHighQualityCountPlotGraph},
				{ 주간보고_퍼타이틀_고화질화_편수율_라인_그래프_서치 : PertitleHighQuailtyAllPlotGraphSearch},
				{ 주간보고_퍼타이틀_HIT_토글 : PertitleHighQualityToggleHIT },
				{ 주간보고_퍼타이틀_CNT_토글 : PertitleHighQualityToggleCNT}
			]
	};

	render() {
		return (
	
			<div className = {style.EditableList_Container}
					 style = {this.props.style === null ? null : this.props.style}>
				{this.state.componentList}
			</div>
		);
	}
	shouldComponentUpdate(nextProps, nextState){
		if(nextProps === this.props){
			return false;
		}
		if(nextState === this.stae){
			return false;
		}
		return true;
	}
	/*
	componentDidMount
	1. mapToComponent를 통해 사용 할 수 있는 컴포넌트 목록을 초기화한다.
	2. props로 전달반은 hookingComponentList 함수에 pureComponents를
		 전달하여 EditableLayout에서 각 컴포넌트를 화면에 생성 할 수 있게 한다.
		 (현재 layout에서 사용중인 컴포넌트만을 쓸 수 있게 해준다.
		 layout에서 모든 컴포넌트를 import 할 필요가 없어진다.)
	*/
	componentDidMount() {
		this.setState({
			componentList: this.mapToComponent(this.state.pureComponents)
		});
		this.props.hookingComponentList(this.state.pureComponents);
	}
	/*
	mapToComponent
	1. pureComponents의 키 값(컴포넌트의 이름)만을 추출해 div로 만드는 함수이다.
		 onClick 이벤트에 props로 전달받은 handleSelect 함수를 연결하여
		 div를 클릭하면 layout에 해당 컴포넌트가 추가될 수 있도록 해준다.
	*/
	mapToComponent = data => {
		return data.map((item, i) => {
			let name;
			for(let compName in item){
				name = compName;
			}
			return (<div className  = {style.EditableList_Component}
						 onClick    = {this.props.handleSelect}
						 key  		= {i}
						 id			= {name}>
						{name}
						
					</div>);
		});
	};
}

export default EditableList;
