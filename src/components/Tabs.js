import React from 'react'
import { Text,TouchableOpacity,StyleSheet,AsyncStorage,ImageBackground} from 'react-native'
import {Footer,FooterTab,Button,Icon,View,Thumbnail} from 'native-base'
import PostModal from './PostModal'
import Add from './Add'
import { NavigationActions } from 'react-navigation'
import ProfileImage from './ProfileImage'
import { connect } from 'react-redux'
import { getUserState } from '../actions/postActions'
import { getKarma } from '../actions/authActions'

class Tabs extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			visible:false,
			loggedIn:null,
			user:{}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.showPost = this.showPost.bind(this)
	}


	onSubmit(){
		this.setState({visible:false})
	}

	showPost(){
		this.setState({visible:true})
		const { params } = this.props.navigation.state.routes[0]

		if(this.props.navigationState.index == 0){
			params.scrollToTop()
		}
	}

	homePress = () => {
		const { params } = this.props.navigation.state.routes[0]
		const routes = this.props.navigation.state.routes

		if(this.props.navigationState.index == 0){
			params.scrollToTop()
		} else {
			this.props.jumpTo(routes[0].key)
		}
	}

	profilePress = () => {
		const routes = this.props.navigation.state.routes
		this.props.getKarma(() => {
			this.props.jumpTo(routes[1].key)
		})
	}


	render() {

		let homeColor = ''
		let settingColor = ''
		let index = this.props.navigationState.index

		if(this.props.navigationState.index === 0){
			homeColor = '#2ecc71'
		}else {
			homeColor = '#AAAAAA'
		}

		if(this.props.navigationState.index === 1){
			settingColor = '#2ecc71'
		}else {
			settingColor = '#AAAAAA'
		}

		return (
			<Footer style={{backgroundColor:'#FAFAFA'}}>
				<PostModal closePost={() => this.setState({visible:false})} style={{top:20}} visible={this.state.visible} opacity={1}>
					<Add onSubmit={this.onSubmit} navigate={this.props.navigation.navigate}></Add>
				</PostModal>
				<FooterTab>
					<Button
						onPress={this.homePress}
						style={{paddingTop:0,paddingBottom:0}}>
						<Icon style={{color:index === 0 ? '#617AF5' : '#AAAAAA',fontSize:37}} active={this.props.navigationState.index === 0} name="ios-home" />
					</Button>
					<TouchableOpacity
						onPress={this.showPost}>
						<ImageBackground style={styles.roundedButton} source={require('../Scenes/Map/addIcon.png')}></ImageBackground>
					</TouchableOpacity>
					<Button
						onPress={this.profilePress}
						style={{paddingTop:0,paddingBottom:0}}>
						<ProfileImage></ProfileImage>
					</Button>
				</FooterTab>
			</Footer>
		)
	}
}

const styles = StyleSheet.create({

	MainContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF',
	},

	roundedButton: {
		top:-9,
		width:75,
		height:75
	},

	TextStyle:{
		color:'#fff',
		textAlign:'center',
	}

})

const mapStateToProps = state => {
	return {
		user:state.posts.user
	}
}


export default connect(mapStateToProps, { getUserState,getKarma })(Tabs)
