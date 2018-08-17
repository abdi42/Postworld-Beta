import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	FlatList,
	Dimensions,
	Image,
	InteractionManager
} from 'react-native'
import { Container,Header, Text, Button, Icon, Left, Right,Segment,Spinner } from 'native-base'
import { connect } from 'react-redux'
import { fetchPosts,getPost,postVote } from '../../actions/postActions'
import PostCard from '@components/PostCard'
import PropTypes from 'prop-types'
import theme from '@common/colors.js'
import styled from 'styled-components'
import { Content, Center} from '@common/Layout'

const {height: screenHeight} = Dimensions.get('window')

const SegmentText = styled(Text)`
  color:${props => props.active ? theme.blue : 'white'}
	fontSize:16px;
`

const SegmentButton = styled(Button)`
  background-color: ${props => props.active ? theme.blue : 'white'};
  border-color: #000000;
  border-top-left-radius:0;
  border-bottom-left-radius:0;
  border-top-right-radius:0;
  border-bottom-right-radius:0;
	padding-left:10px;
	padding-right:10px;
`
const HeaderStyled = styled(Header)`
	background-color:#FAFAFA
`


const ErrorIcon = styled(Icon)`
	color:#636e72;
	font-size:75;
	padding-bottom:25;
`

const MapIcon = styled.Image`
	width:30;
	height:30;
`
const SpinnerBody = styled.View`
	flex:1;
	justify-content: center;
	align-items: center;
	padding:25px;
	padding-top:25px;
`

class Feed extends Component {

	constructor(props){
		super(props)
		this.state ={
			isLoading: true,seg:1,latitude:0,longitude:0,
			data:[],
			skipBy:0,
			scrolling:true,
			refresh:false,
			coords:[]
		}
		this.loadPosts = this.loadPosts.bind(this)
		this._scrollToTop = this._scrollToTop.bind(this)
		this.segmentPress = this.segmentPress.bind(this)
		this.onRefresh = this.onRefresh.bind(this)
	}

	componentDidMount(){
		this.props.navigation.setParams({
			scrollToTop: this._scrollToTop
		})

		InteractionManager.runAfterInteractions(() => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let coords = [position.coords.longitude,position.coords.latitude]
					this.setState({coords})
					this.props.fetchPosts(true,coords)
				},
				() => {

				},
				{ timeout: 20000, maximumAge: 1000 },
			)
		})
	}

	segmentPress(seg) {

		if(seg === this.state.seg && this.props.loading){
			return
		}

		this.setState({seg})

		if(seg === 1){
			this.props.fetchPosts(true,this.state.coords)
		} else {
			this.props.fetchPosts(null,this.state.coords)
		}

	}

	goToMap(){
		this.props.navigation.navigate('MapScreen',{})
	}

	_keyExtractor (item) {
		return item
	}

	_scrollToTop(){
		if(this.flatListRef){
			this.flatListRef.scrollToOffset({x: 0, y: 0, animated: true})
		}
	}

	showActionSheet(){

	}

	_renderPosts (data) {
		const post = this.props.byId[data.item]
		return (
			<PostCard
				post={post}
				geoDisabled={false}
				onPress={() => {
					this.props.navigation.navigate({key:'FeedDetail-1',routeName:'FeedDetail',params:{post:post,index:data.index,postId:post.id}})
				}}
				goToGeo={() =>  this.props.navigation.navigate({key:'MapScreen-1',routeName:'MapScreen',params:{geo:post.geo.coordinates,prevPost:post._id}})}
				onVote={this.props.postVote}>

			</PostCard>
		)
	}

	loadPosts() {
		let skipBy = this.state.skipBy + 10

		this.setState({skipBy})
		this.props.fetchPosts()
	}

	onRefresh() {
		const seg = this.state.seg

		if(seg == 1){
			this.props.fetchPosts(true,this.state.coords)
		} else {
			this.props.fetchPosts(null,this.state.coords)
		}
	}

	render(){
		let feedView =  (
			<SpinnerBody>
				<Spinner color='black' />
			</SpinnerBody>
		)

		if(this.props.allIds && !this.props.loading){
			feedView = (
				<FlatList
					ref={(ref) => { this.flatListRef = ref }}
					style={styles.main}
					data={this.props.allIds}
					extraProps={this.props.byId}
					renderItem={this._renderPosts.bind(this)}
					keyExtractor={this._keyExtractor}
					initialNumToRender={4}
					refreshing={this.props.loading}
					onRefresh={this.onRefresh}>
				</FlatList>
			)
		} else if(this.props.error !== null){
			feedView = (
				<Center>
					<ErrorIcon type="FontAwesome" name="exclamation-circle" />
					<Text style={{color:'#636e72',textAlign:'center',fontSize:30}}>{this.props.error.message}</Text>
				</Center>
			)
		}

		return (
			<Container>
				<HeaderStyled hasTabs rounded>
					<Left/>
					<Segment style={styles.background}>
						<SegmentButton
							large
							first
							active={this.state.seg === 1 ? true : false}
							small
							onPress={() => this.segmentPress(1)}>
							<SegmentText active={this.state.seg === 2}>New</SegmentText>
						</SegmentButton>
						<SegmentButton
							large
							last
							active={this.state.seg === 2 ? true : false}
							small
							onPress={() => this.segmentPress(2)}>
							<SegmentText active={this.state.seg === 1}>Hot</SegmentText>
						</SegmentButton>
					</Segment>
					<Right>
						<Button
							transparent
							onPress={() => this.goToMap()}
						>
							<MapIcon source={require('./logo.png')} />
						</Button>
					</Right>
				</HeaderStyled>
				<Content>
					{feedView}
				</Content>
			</Container>
		)
	}
}

Feed.propTypes = {
	loading:PropTypes.bool,
	error:PropTypes.object,
	allIds:PropTypes.array,
	byId:PropTypes.object,
	postVote:PropTypes.func,
	getPost:PropTypes.func,
	fetchPosts:PropTypes.func,
	navigation:PropTypes.object
}


const styles = StyleSheet.create({
	main:{

	},
	body: {
		flex:1,
		height: screenHeight/2,
		justifyContent: 'center',
		alignItems: 'center',
		padding:25,
		paddingTop:25
	}
})

const mapStateToProps = state => {
	return {
		allIds:state.posts.allIds,
		byId:state.posts.byId,
		user:state.posts.user,
		currentItem:state.posts.currentItem,
		loading:state.posts.loading,
		error:state.posts.error
	}
}


export default connect(mapStateToProps, { fetchPosts,getPost,postVote })(Feed)
