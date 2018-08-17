import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Body,List,ListItem,Left,Right,Separator,Icon,Spinner } from 'native-base'
import { AsyncStorage,AlertIOS,StyleSheet,View } from 'react-native'
import ProfileImage from '../../components/ProfileImage'
import { Text,SpinnerBody } from '@common'
import { connect } from 'react-redux'
import { fetchMyPosts } from '../../actions/postActions'

class ProfileScreen extends Component {

	constructor(props){
		super(props)
	}

	clearStorage(){
		AsyncStorage.clear(() => {
			AlertIOS.alert(
				'Storage cleared!'
			)
		})
	}


	myPosts = () => {
		this.props.fetchMyPosts(() => {
			this.props.navigation.navigate('MyPosts')
		})
	}

	about = () => {
		this.props.navigation.navigate('About')
	}

	render(){
		return (
			<Container>
				<Header style={{backgroundColor:'#617AF5'}} rounded>
					<Body>
						<Title style={{color:'white'}}>Profile</Title>
					</Body>
				</Header>
				{!this.props.user ? (
					<SpinnerBody>
						<Spinner color='black'></Spinner>
					</SpinnerBody>
				) : (
					<Content>
						<List style={{backgroundColor:'#fff'}}>
							<ListItem itemHeader thumbnail style={{paddingTop:15,paddingBottom:15}}>
								<Left>
									<ProfileImage disableBadge={true} style={{width:60,height:60,borderRadius:10}}></ProfileImage>
								</Left>
								<Body style={{borderBottomWidth:0,paddingTop:10,paddingBottom:0}}>
									<Text size={18} style={{paddingTop:5}}>{this.props.user.handle}</Text>
									<Text subdue size={16} style={{paddingTop:2.5}}>Karma: {this.props.user.karma}</Text>

									<Text></Text>
									{/* <Text>Level 1 - noobasaurus</Text> */}
								</Body>
								<Right>
									<Text></Text>
								</Right>
							</ListItem>
							<ListItem itemDivider>
								<Text>Info</Text>
							</ListItem>

							<ListItem icon button onPress={this.myPosts}>
								<Left>
									<Button style={{backgroundColor:'transparent'}}>
										<Icon style={{color:'#e74c3c'}} type="FontAwesome" name="heart"/>
									</Button>
								</Left>
								<Body>
									<Text>My Posts</Text>
								</Body>
								<Right>
									<Icon type="FontAwesome" name="angle-right"></Icon>
								</Right>
							</ListItem>

							<ListItem icon button onPress={this.about}>
								<Left>
									<Button>
										<Icon type="FontAwesome" name="info-circle"/>
									</Button>
								</Left>
								<Body>
									<Text>About</Text>
								</Body>
								<Right>
									<Icon type="FontAwesome" name="angle-right"></Icon>
								</Right>
							</ListItem>

						</List>
					</Content>
				)}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		user:state.auth.user
	}
}


export default connect(mapStateToProps,{fetchMyPosts})(ProfileScreen)
