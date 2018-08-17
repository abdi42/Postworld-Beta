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


  _keyExtractor = (data) => {
    return data._id
  }

  _renderPosts = (data) => {
		let post = data.item

    return (
			<PostCard
				post={post}
				geoDisabled={false}
				onPress={() => {}}
				goToGeo={() =>  this.props.navigation.navigate({key:'MapScreen-1',routeName:'MapScreen',params:{geo:post.geo.coordinates,prevPost:post._id}})}
				onVote={() => {}}>
			</PostCard>
    )
  }

	render() {
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
            <Title style={{color:'white'}}>My Posts</Title>
          </Body>
          <Right/>
				</Header>
				<Content>
					{!this.props.myPosts || this.props.loading ? (
            <SpinnerBody>
              <Spinner color='black' />
            </SpinnerBody>
          ):(
            <View>
              {this.props.error ? (
                <Center>
        					<ErrorIcon type="FontAwesome" name="exclamation-circle" />
        					<Text style={{color:'#636e72',textAlign:'center',fontSize:30}}>{this.props.error.message}</Text>
        				</Center>
              ):(
                <FlatList
        					ref={(ref) => { this.flatListRef = ref }}
        					data={this.props.myPosts}
        					renderItem={this._renderPosts}
        					keyExtractor={this._keyExtractor}
        					initialNumToRender={4}
        					refreshing={this.props.loading}>
        				</FlatList>
              )}
            </View>
          )}
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
