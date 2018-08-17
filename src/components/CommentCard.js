import React, { Component } from 'react'
import {
	Platform,
	StyleSheet,
	View,
	Image,
	TouchableOpacity
} from 'react-native'
import { Container,List,ListItem, Header, Title, Content, Card, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base'
import { CardItem } from './common/Card'
import Text from './common/Text'
import Vote from '@common/Vote'
import theme from '@common/colors.js'

class BaseThumbnail extends React.PureComponent{
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.uri !== nextProps.uri
	}

	render() {

		return (
			<Thumbnail source={{uri: this.props.uri}} small/>
		)
	}
}

class CommentCard extends Component {

	constructor(props){
		super(props)
		this.vote = this.vote.bind(this)
	}

	shouldComponentUpdate(nextProps) {
		return this.props.comment.voteCount !== nextProps.comment.voteCount
	}

	vote(dir){
		const { comment } = this.props
		this.props.onVote(comment.id,dir)
	}

	render(){
		const { comment } = this.props

		return (
			<View style={{flex:1}}>
				<CardItem >
					<Left>
						<Thumbnail small source={{uri: comment.user.image}} />
						<Body>
							<Text bold>{comment.user.handle}</Text>
						</Body>
						<Right >
							<Vote onDownVote={this.vote} onUpVote={this.vote} voteCount={comment.voteCount} votes={comment.votes}></Vote>
						</Right>
					</Left>
				</CardItem>
				<CardItem>
					<Body>
						<Text>{comment.content}</Text>
					</Body>
				</CardItem>
				<CardItem style={styles.card} footer >
					<Text subdue size={13} style={{padding:0,marginLeft:0}}>{comment.time}</Text>
				</CardItem>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	buttons:{
		flex:1,
		flexDirection: 'row'
	},
	card:{
		backgroundColor:theme.white,
		flex: 1,
		flexShrink:1,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent: 'space-between',
		paddingTop:12 ,
		paddingBottom:6,
		margin:0
	},
})

export default CommentCard
