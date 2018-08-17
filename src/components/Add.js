import React, {Component} from 'react'
import {Text, TextInput, View,StyleSheet,AsyncStorage} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title,Content,Card,CardItem,Form,Textarea,Spinner } from 'native-base'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { createPost } from '../actions/postActions'
import styled from 'styled-components'
import KeyboardSpacer from 'react-native-keyboard-spacer'

const PostButton = styled(Button)`
  align-self:flex-end;
  border-radius: 10px;
  padding:0px;
  background-color:#A0F6A9;
  border: 1px solid #3B3B3B;
  /* Post: */
  height:35px;
`

const StyledText = styled(Text)`
  font-size:20;
  color:black;
  margin-left:45px;
  margin-right:45px;
  margin-top:3px;
  margin-bottom:3px;
`

const StyledCard = styled(Card)`
  border-radius: 5;
`

const StyledCardItem = styled(CardItem)`
  border-radius: 5;
`
const StyledTextarea = styled(Textarea)`
  height:200;
  width:280;
  font-size:20;
`

class Add extends React.Component {

	constructor(props){
		super(props)
		this.state ={
			content:'',
			latitude: null,
			longitude: null,
			error: null,
		}

		this.closeModal = this.closeModal.bind(this)
	}

	closeModal(){
		if(!this.props.postRequest){
			this.props.onSubmit()
		}
	}

	submit(){

		if(this.props.geo){
			this.props.createPost(this.state.content,this.props.geo,this.props.map,this.props.user)
		}
		else {
			navigator.geolocation.getCurrentPosition(
				(position) => {

					this.props.createPost(this.state.content,[position.coords.longitude,position.coords.latitude],false,this.props.user)
				},
				(error) => this.setState({ error: error.message }),
				{ timeout: 20000, maximumAge: 1000 },
			)
		}

		this.closeModal()

	}


	render () {
		if(this.props.postRequest){
			return (
				<View style={styles.modalContent}>
					<Spinner color='white' />
				</View>
			)
		} else {
			return (
				<View style={styles.modalContent}>
					<StyledCard>
						<StyledCardItem>
							<Body>
								<Form>
									<StyledTextarea multiline={true} maxLength={160} autoFocus={true} placeholder="Create a new post" onChangeText={(content) => this.setState({content})}/>
								</Form>
							</Body>
						</StyledCardItem>
					</StyledCard>
					<PostButton
						onPress={this.submit.bind(this)} >
						<StyledText>Post</StyledText>
					</PostButton>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: '#4F6EFD',
		padding:5,
		opacity:1
	},
})

const mapStateToProps = state => {
	return {
		postRequest: state.posts.postRequest,
	}
}

export default connect(mapStateToProps, { createPost })(Add)
