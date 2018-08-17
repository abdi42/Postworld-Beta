/* @flow */

import React, { Component } from 'react'
import {
	View,
	StyleSheet,
	InteractionManager,
	KeyboardAvoidingView
} from 'react-native'
import { Spinner, Input, Item,Text,Button } from 'native-base'
import theme from '@common/colors.js'
import { verifyTwoFactor,sendSms } from '@Root/services/api/'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer'

class TwoFactor extends Component {

	constructor(props){
		super(props)

		this.state = {
			loading:false,
			prompt:{
				error:false,
				message:'Awesome! Now enter the two factor auth code we sent you.'
			}
		}
	}

	onSubmit = () => {
		this.setState({loading:true})

		InteractionManager.runAfterInteractions(() => {

			verifyTwoFactor(this.props.user.handle,this.state.token)
				.then((response) => {
					this.setState({loading:false})
					this.props.navigation.navigate('ImageUpload')
				})
				.catch((error) => {
					this.setState({prompt:error.response.data})
				})
		})
	}


	sendCode = () => {
		this.setState({loading:true})
		sendSms(this.props.user.handle,this.props.user.phoneNumber)
		.then((response) => {
			this.setState({prompt:{
				error:false,
				message:"We just sent you another code"
			},
			loading:false})
		})
		.catch((error) => {
			this.setState({prompt:error.response.data})
		})
	}

	render() {

		return (
			<View style={{flex:1}}>
				{!this.props.user ?(
					<View style={styles.body}>
	          <Spinner color='black' />
	        </View>
					) : (
						<View style={{flex:1}}>
							<View style={styles.container}>
								<KeyboardAvoidingView style={{padding:25,flex:0.50,flexDirection:'column',justifyContent:'space-between'}}>

									<Text style={{textAlign:"center",fontSize:20,alignSelf:"center",marginBottom:20,color:this.state.prompt.error ? '#e74c3c' : 'black'}}>
										{this.state.prompt.message}
									</Text>

									<Item regular style={styles.inputItem}>
										<Input
											placeholder='####'
											maxLength={6}
											style={styles.input}
											onChangeText={(token) => this.setState({token})}
											value={this.state.handle}/>
									</Item>


									<View>
										<Button
											onPress={this.sendCode}
											style={styles.sendButton}
											transparent>
											{this.state.loading ? (
												<Spinner color='black' />
											):(
												<Text>Resend Code</Text>
											)}
										</Button>
									</View>

								</KeyboardAvoidingView>
							</View>
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
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor:theme.white
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
		width:100,
		alignSelf:'center'
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
		textAlign:'center',
		backgroundColor:theme.tan,
		borderRadius:10,
		borderColor:theme.lightGray,
	},
	button:{
		backgroundColor:theme.lightGreen,
		borderColor:theme.lightGray,
		borderWidth:1,
	},
	sendButton:{
		marginTop:10,
		alignSelf:'center'
	},
	buttonText:{
		color:theme.black,
		padding:0,
		fontSize:20
	},
})

const mapStateToProps = state => {
	return {
		user:state.auth.user
	}
}

export default connect(mapStateToProps, {})(TwoFactor)
