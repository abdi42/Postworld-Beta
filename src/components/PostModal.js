import React, {Component} from 'react'
import {View,StyleSheet} from 'react-native'
import { Container,Button, Icon,Content } from 'native-base'
import Modal from 'react-native-modal'

class PostModal extends Component {
	constructor(props){
		super(props)
		this.state ={ modalVisible: false,content:''}
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible})
	}

	submit(){
		this.props.onSubmit(this.state.content)
		this.setModalVisible(false)
	}

	render() {
		const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png'
		let addContent = this.props.children

		if(this.props.bottomClose === true){
			addContent = (
				<View style={{flex:1}}>
					{this.props.children}
					<Button
						onPress={() => this.props.closePost()}
						transparent
						style={{alignSelf: 'flex-start'}}>
						<Icon type="FontAwesome" name="times-circle" style={{color:'#fff',fontSize:30}}></Icon>
					</Button>
				</View>
			)
		} else {
			addContent = (
				<View style={{flex:1}}>
					<Button
						onPress={() => this.props.closePost()}
						transparent
						style={{alignSelf: 'flex-end'}}>
						<Icon type="FontAwesome" name="times-circle" style={{color:'#fff',fontSize:30}}></Icon>
					</Button>
					{this.props.children}
				</View>
			)
		}

		return (
			<Modal
				animationType="slide"
				animationOut="slideOutDown"
				hideModalContentWhileAnimating={true}
				animationInTiming={25}
				isVisible={this.props.visible}
				style={[styles.modal,this.props.style]}
				backdropOpacity={this.props.opacity}
				backdropColor="#4F6EFD"
				useNativeDriver={true}>
				<View style={{flex:1}}>
					<Content contentContainerStyle={styles.modalContent}>
						{addContent}
					</Content>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	modal:{
		top:10,
		flex:1,
		margin:10,
	},
	modalContent: {
		borderRadius:10,
		backgroundColor:'#4F6EFD',
		padding:7,
		paddingBottom:2
	},
})


export default PostModal
