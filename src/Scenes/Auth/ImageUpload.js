import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet,Dimensions,AsyncStorage,Image,ActivityIndicator } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Spinner,Grid,Row,Col,ActionSheet } from 'native-base'
const {height: screenHeight} = Dimensions.get('window')
import { NavigationActions } from 'react-navigation'
import ImagePicker from 'react-native-image-picker'
import { Center } from '@common/Layout'
import ImageResizer from 'react-native-image-resizer'
import config from '@Root/config.js'
import { connect } from 'react-redux'
import { setImage } from '../../actions/authActions'
import { uploadImage } from '@services/api'

var BUTTONS = ['Take photo...', 'Choose from Library...','Cancel']
var CANCEL_INDEX = 2
class ImageUpload extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			uploadingImage:false,
			pickingImage:false
		}

		this.selectImage = this.selectImage.bind(this)
		this.uploadImage = this.uploadImage.bind(this)
	}

	selectImage(){
		const { params } = this.props.navigation.state

		var options = {
			title: 'Select Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		}

		this.setState({pickingImage:true,uploadingImage:true})

		ImagePicker.showImagePicker(options, (response) => {
			this.setState({pickingImage:false})
			if (response.didCancel) {

			} else {
				ImageResizer.createResizedImage(response.uri, 500, 500, 'JPEG', 80)
					.then(this.uploadImage)
					.catch((error) => {

					})
			}
		})
	}

	uploadImage(response) {

		const data = new FormData()

		data.append('image',{
			uri:response.uri,
			name:response.name,
			type:'image/jpeg',
		})

		uploadImage(data,this.props.user._id)
			.then((responseJson) => {
				this.props.setImage(responseJson.data)
				this.props.navigation.navigate('Tabs')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	render () {
		const uploadingImage = this.state.uploadingImage
		const pickingImage = this.state.pickingImage
		return (
			<Container style={styles.container}>
				{ uploadingImage === false ? (
					<Content>
						<View>
							<Button
								bordered
								style={{top:30,right:15,position:'absolute'}}
								onPress={() => this.props.navigation.navigate('Tabs')}>
								<Text>Skip</Text>
							</Button>
						</View>
						<View style={styles.body}>

							<Text style={{textAlign:'center',fontSize:30,alignSelf:'center',marginBottom:20,}}>Welcome</Text>

							<View>
								<Image
									style={{width: 150, height: 150}}
									source={require('./profile.png')}
								/>
							</View>


							<Text style={{textAlign:'center',fontSize:20,alignSelf:'center',marginTop:20,}}>{'You\'re all set'}</Text>
							<Text style={{textAlign:'center',fontSize:20,alignSelf:'center',}}>{'Take a minute to upload a profile photo'}</Text>

							<Button
								style={{backgroundColor:'#A0F6A9',borderColor:'#979797',borderWidth:1,alignSelf:'center',marginTop:40,padding:0}}
								onPress={this.selectImage}
							>
								<Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Upload Image</Text>
							</Button>

						</View>
					</Content>
				) : (
					<View style={styles.messageContainer}>
						<View style={styles.center}>
							{pickingImage ? (
								<ActivityIndicator size="large" color="#617AF5" style={styles.activity}/>
							) : (
								<View>
									<Text style={styles.text}>Uploading Image</Text>
									<ActivityIndicator size="large" color="#617AF5" style={styles.activity}/>
								</View>
							)}
						</View>
					</View>
				)}
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		backgroundColor:'white',
	},
	messageContainer:{
		flex:1,
		padding:25
	},
	body: {
		flex:1,
		height: screenHeight/2,
		marginTop:125,
		justifyContent: 'center',
		alignItems: 'center',
		padding:25,
	},
	center:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	text:{
		color:'#636e72',
		textAlign:'center',
		fontSize:20
	},
	activity:{
		paddingTop:25
	}
})


const mapStateToProps = state => {
	return {
		user:state.auth.user
	}
}


export default connect(mapStateToProps, {setImage})(ImageUpload)
