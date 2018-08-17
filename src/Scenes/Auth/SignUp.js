/* @flow */

import React, { Component } from 'react'
import {
	View,
	StyleSheet,
	InteractionManager,
	KeyboardAvoidingView,
	Keyboard
} from 'react-native'
import { Spinner, Input, Item,Text,Button,Footer,FooterTab,Container,Content } from 'native-base'
import theme from '@common/colors.js'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signUpSuccess,signUpRequest } from '../../actions/authActions'
import { connect } from 'react-redux'
import { signUpUser } from '@Root/services/api/'
import KeyboardSpacer from 'react-native-keyboard-spacer'

class SignUp extends Component {

	constructor(props){
		super(props)

		this.state = {
			loading:false,
			prompt:{
				error:null,
				message:'Great! Now enter in a quick user name and your number below so we can verify your account'
			},
			btnLocation:0
		}
	}


	onSubmit = () => {
		this.setState({loading:true})
		this.props.signUpRequest()

		InteractionManager.runAfterInteractions(() => {
			signUpUser(this.state.handle,this.state.number)
				.then((response) => {

					this.props.signUpSuccess(response.data)
					this.props.navigation.navigate('TwoFactor')
				})
				.catch((error) => {
					this.setState({prompt:error.response.data,loading:false})
				})
		})
	}

	render() {
		let prompt = this.state.prompt
		return (
			<View
				 resetScrollToCoords={{ x: 0, y: 0 }}
				 scrollEnabled={false}
				 style={{flex:1,backgroundColor:theme.white}}>
				<View style={styles.container}>
					{this.state.loading ?(
						<View style={styles.body}>
		          <Spinner color='black' />
		        </View>
					) : (
						<KeyboardAvoidingView
							resetScrollToCoords={{ x: 0, y: 0 }}
							style={{flex:1, flexDirection:'column'}}>
							<Text style={{textAlign:"center",padding:25,fontSize:18,alignSelf:"center",color:this.state.prompt.error ? '#e74c3c' : 'black'}}>
								{prompt.message}
							</Text>

							<Item regular style={styles.inputItem}>
								<Input
									placeholder='Your username…'
									style={styles.input}
									onChangeText={(handle) => this.setState({handle})}
									value={this.state.handle}/>
							</Item>

							<Item regular style={styles.inputItem}>
								<Input
									placeholder='Phone number'
									maxLength={10}
									style={styles.input}
									onChangeText={(number) => this.setState({number})}
									value={this.state.number}/>
							</Item>
						</KeyboardAvoidingView>
					)}
					{!this.state.loading && (
						<View>
							<Button
								block
								style={styles.button}
								onPress={this.onSubmit}>
								<Text style={styles.buttonText}>Next</Text>
							</Button>
							<KeyboardSpacer/>
						</View>
					)}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		flexDirection: 'column',
		backgroundColor:theme.white,
	},
	body: {
		flex:0.20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputItem: {
		borderRadius:10,
		backgroundColor:theme.tan,
		borderColor:theme.lightGray,
		paddingBottom:5,
		width:225,
		alignSelf:'center',
		margin:10
	},
	twoFactorInput: {
		borderRadius:10,
		backgroundColor:theme.tan,
		borderColor:theme.lightGray,
		paddingBottom:5,
		width:100,
		alignSelf:'center'
	},
	input:{
		backgroundColor:theme.tan,
		borderRadius:10,
		borderColor:theme.lightGray,
	},
	button:{
		backgroundColor:theme.lightGreen,
		borderColor:theme.lightGray,
		borderWidth:1,
		borderRadius:0
	},
	footertab:{
		backgroundColor:theme.lightGreen,
		borderColor:theme.lightGray,
		borderWidth:1,
		borderRadius:0
	},
	buttonText:{
		color:theme.black,
		padding:0,
		fontSize:20
	}
})

export default connect(null, { signUpSuccess,signUpRequest })(SignUp)
