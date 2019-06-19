import React, { Component } from 'react';
import style from  './EditablePages.module.css';
import helpers from '../../../lib/helpers';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faHome,faSignOutAlt } from '@fortawesome/fontawesome-free-solid'

import Cookies from 'universal-cookie';
import history from '../../../history';

import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import * as api from '../../../lib/api/api';


fontawesome.library.add(faCheckSquare, faCoffee, faHome, faSignOutAlt);

const MyButton = styled(Button)({
	//background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	//background: 'linear-gradient(45deg, #fab005 30%, #f59f00 90%)',
	background: 'linear-gradient(45deg, #fa5252 30%, #ff8787 90%)',
	border: 0,
	borderRadius: 3,
	boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	//boxShadow: '0 3px 5px 2px #ff',
	color: 'white',
	height: 3,
	padding: '0px 10px',
	marginBottom: '20px',
	fontSize: '10px'
});

class EditablePages extends Component {

	constructor(props) {
		super(props);

		const cookies = new Cookies();

		this.dataItem = []

		this.state = {
			pageList:[],
			button: null,
			containerCss: style.pageContainer,
			userGb: cookies.get('user_gb'),
			gubunCDPage: [],
		};

	}

	render() {
		const { pushLogout } = this;
		return (
			<div className = {style.Container}>
				{/*<div className = {style.logo}>CQMS logo image</div>*/}
				<div className = {style.logo} >
					<img src ={require('./cqms_logo.png')} className = {style.logo_image} id ='대시보드'
					onClick = {this.props.loadPage} />
				</div>
				<div className = {this.state.containerCss}>
					{this.state.pageList}
					{this.state.button}
					<MyButton onClick={pushLogout}>		
					<FontAwesomeIcon 
						icon="sign-out-alt" 
						size="1x" 
						color="#ced4da"
					/>로그아웃
					</MyButton>
				</div>
			</div>
		);
	}
	/*
	handelButton: 현재 클릭한 버튼의 id를 handlePage 함수에 전달하여 값에 따라
								page를 저장하거나 수정 할 수 있게 하고 버튼을 변경한다.
	*/
	handelButton = (e) => {

		this.props.handlePage(e.currentTarget.id);
		//this.initPages();
		this.setState({
			button: e.currentTarget.id === 'editableButton' ?

							(
							
								<div className = {style.saveButton}
											 onClick   = {this.handelButton}
											 id        = 'saveButton'>
											 <FontAwesomeIcon icon="check-square" /><br /><br />
								{/*<FontAwesomeIcon icon = {['far' , 'save']}/>*/}

								 </div>
							 )
							:
							(<div id   = 'editableButton'
										className = {style.saveButton}
										onClick   = {this.handelButton}>
								 {/*<FontAwesomeIcon icon = {['fab' , 'whmcs']}/>*/}
								 <FontAwesomeIcon icon="check-square" />
							 </div>),

 			containerCss: e.currentTarget.id === 'editableButton' ?
											style.pageContainerWhite : style.pageContainer
		})
	}
	/*
	shouldComponentUpdate: 렌더링을 최소화하는 작업을 한다.
	*/
	shouldComponentUpdate(nextProps, nextState){

		if(this.state === nextState){
			return false;
		}

		return true;
 	 }
	/*
	componentDidMount : pageList 값이 비어있으면 초기화한다.
	(페이지가 추가 기능이 있을 경우 저장된 페이지리스트를 불러오는 루틴이 추가된다.)
	button을 초기화한다.
	*/
	componentDidMount() {
		const done = helpers.isEmpty(this.state.pageList);
		//
		if( done ){
			//this.initPages();
			this.getGubunCDPage();
		}
		if( this.state.userGb === '1' ){
			this.setState({
				button : (<div className = {style.saveButton}
							onClick   = {this.handelButton}
							id  = 'editableButton'>
											{/*<FontAwesomeIcon icon = {['fab', 'whmcs']}/>*/}
								<FontAwesomeIcon icon="check-square" />
						 </div>)
			})
		}
		
	}
	/*
	addPage: 페이지를 추가한다. (저장하는 skb에서는 사용하지 않는 기능)
	*/
	addPage = (e) => {
		this.setState({
			pageList: this.state.pageList.concat(
				<div className = {style.page}
						 onClick   = {this.props.loadPage}
						 id        = {this.state.pageList.length + 1}
						 key       = {this.state.pageList.length + 1}>
					{this.state.pageList.length + 1}
				</div>)
		})
	}

	pushLogout = () => {
		const cookies = new Cookies();
		cookies.remove('user_gb');
		cookies.remove('access_token');
		alert('로그아웃 되었습니다.');
		history.push('/home');
	}
	//아이디별  구분 페이지 가져오기 
	getGubunCDPage = async() => {
		const { userGb } = this.state;
		try {
		  const response = await api.getGubunPageList(userGb)
		  //console.log(response.data)
		  let gubunCDPage = response.data.map((item)=>{
			return item.PAGE_CD_NM
		  })
		  //console.log(gubunCDPage)
		  this.setState({
			gubunCDPage : gubunCDPage
		  }, () => this.initPages())
		}catch (e) {
		  // 오류가 났을 경우
		  console.log(e);
		}
	}
	/*
		initPages: 페이지 리스트를 초기화한다.
	*/
	initPages = () => {

		const { page_number } =this.props;
		const { userGb, gubunCDPage } = this.state;
		//console.log('gubunCDPage ', gubunCDPage)
			this.setState({
				pageList:gubunCDPage.map((item,i) => {
				
					return <div className =  { item === '대시보드'  ? ( style.page_home ) :( style.page )}
								onClick   = {this.props.loadPage}
								key       = {item}
								id        = {item}
								ref    = { ref => this.item = ref } /* ref를 dataItem 배열인덱스로 잡는다  */
								>
								{item === '대시보드' ? 
								(
									
									<div className = {style.fontAwesomeLogo}
												id = {item}>
									 			<FontAwesomeIcon icon="home"
															 	 size="2x"
																 color="#e67700"
																 id = {item}/>

									</div>
								)

								: (item) }

							 </div>
				})
			});
		

		// else{
		// 	this.setState({
		// 		pageList: ['대시보드','분석','측정','퍼타이틀'].map((item,i) => {

		// 			return <div className =  { i == 0  ? ( style.page_home ) :( style.page )}
		// 						onClick   = {this.props.loadPage}
		// 						key       = {item}
		// 						id        = {item}
		// 						ref    = { ref => this.item = ref } /* ref를 dataItem 배열인덱스로 잡는다  */
		// 						>
		// 						{i === 0 ? (<div className = {style.fontAwesomeLogo}
		// 										id = {item}>
		// 							 			<FontAwesomeIcon icon="home"
		// 													 	 size="2x"
		// 														 color="#e67700"
		// 														 id = {item}/>

		// 									</div>)

		// 						: (item) }

		// 					 </div>
		// 		})
		// 	});
		// }
	}
}

export default EditablePages;
