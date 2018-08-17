import React, { Component } from 'react'
import {
	View,
	StyleSheet,
	FlatList
} from 'react-native'
import { connect } from 'react-redux'

import PostCard from '@components/PostCard'
import { Container, Header,Content, Text,Body,Title,Spinner,Left,Right,Button,Icon } from 'native-base'
import { Center } from '@common/Layout'
import { SpinnerBody,ErrorIcon } from '@common'

import styled from 'styled-components'

class Posts extends Component {

	constructor(props){
		super(props)
	}

	render() {
		let message = 'This is a beta build of the Postworld app. Postworld is all about creating space where people can interact and share stories. We don\'t appreactiate trolls and unkind users. So please be nice! Postworld is an app that lets you discover the world all around you. Find out what people are talking about, what events are going on, and connect with your city in new and exciting ways. It\'s local, and it\'s live. Discover your world with Postworld.'

		return (
			<Container>
				<Header style={{backgroundColor:'#617AF5'}} rounded>
					<Left>
						<Button
							transparent
							onPress={() => this.props.navigation.goBack()}
						>
							<Icon name="arrow-back" style={{color:'white'}} />
						</Button>
					</Left>
					<Body>
						<Title style={{color:'white'}}>About</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					<Center>
						<Text style={{textAlign:'center',fontSize:20}}>{message}</Text>
					</Center>
				</Content>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		myPosts:state.posts.myPosts,
		loading:state.posts.loading,
		error:state.posts.error,
		loading:state.posts.loading
	}
}


export default connect(mapStateToProps, {})(Posts)
