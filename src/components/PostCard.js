import React, { Component } from 'react'
import {
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import PropTypes from 'prop-types'
import { Thumbnail, Icon, Left, ActionSheet,Body, Right } from 'native-base'
import { Card,CardItem } from './common/Card'
import Text from '@common/Text'
import Vote from '@common/Vote'
import theme from '@common/colors.js'
import { TouchableIcon,TouchableImage } from '@common'

class BaseThumbnail extends Component{
	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<FastImage
				style={{borderRadius:18,width:36,height:36}}
				source={{
					uri:this.props.uri,
					cache:FastImage.priority.web
				}}
			/>
		)
	}
}

BaseThumbnail.propTypes = {
	uri:PropTypes.string
}


var BUTTONS = ['Flag post', 'Cancel']
var CANCEL_INDEX = 1

class PostCard extends Component {

	constructor(props){
		super(props)
		this.vote = this.vote.bind(this)
		this.press = this.press.bind(this)
	}

	shouldComponentUpdate(nextProps) {
		return this.props.post.voteCount !== nextProps.post.voteCount || this.props.post.replies !== nextProps.post.replies
	}

	vote(dir){

		const { post } = this.props

		this.props.onVote(post.id,dir)
	}

	showActionSheet(){
		ActionSheet.show(
			{
				options: BUTTONS,
				cancelButtonIndex: CANCEL_INDEX,
				title: 'Share'
			},
			buttonIndex => {}
		)
	}


	press(){
		this.props.onPress(this.props.post.id)
	}

	render() {
		const { post } = this.props

		let mapButton = null

		if(post.map === true && !this.props.geoDisabled){
			mapButton = (
				<TouchableImage
					source={require('./logo.png')}
					onPress={this.props.goToGeo}/>
			)
		}

		return (
			<TouchableWithoutFeedback
				onPress={this.press}>

				<Card style={{flex:1}}>
					<CardItem>
						<Left>
							<BaseThumbnail uri={post.user.image}></BaseThumbnail>
							<Body>
								<Text bold>{post.user.handle}</Text>
							</Body>
							<Right >
								<Vote onDownVote={this.vote} onUpVote={this.vote} voteCount={post.voteCount} votes={post.votes}></Vote>
							</Right>
						</Left>
					</CardItem>
					<CardItem>
						<Body>
							<Text>{post.content}</Text>
						</Body>
					</CardItem>
					<CardItem style={styles.card} footer >
						<Text subdue size={14}>{post.time} - {post.distance}</Text>
						{mapButton}
						<TouchableIcon
							name="ios-more"
							color="black"
							fontSize={28}
							onPress={this.showActionSheet}>
						</TouchableIcon>

						<Text style={styles.text}>{post.replies} replies</Text>
					</CardItem>
				</Card>

			</TouchableWithoutFeedback>
		)
	}
}


PostCard.propTypes = {
	post:PropTypes.object,
	geoDisabled:PropTypes.bool,
	goToGeo:PropTypes.func,
	onVote:PropTypes.func
}


const styles = StyleSheet.create({
	card:{
		backgroundColor:theme.white,
		flex: 1,
		flexShrink:1,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent: 'space-between',
		paddingTop:6,
		paddingBottom:0,
		margin:0
	},
	text:{
		paddingLeft:8,
		color:theme.grey,
		fontSize:15
	},
	icon:{
		textAlign:'center',
	},
	noPadding:{
		paddingBottom:0
	},
	image:{
		width:20,
		height:20
	}
})


export default PostCard
