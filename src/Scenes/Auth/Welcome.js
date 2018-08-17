import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Row,Grid,Col,Footer,FooterTab } from 'native-base'
import theme from '@common/colors.js'

class Welcome extends React.Component {
	render () {
		return (
			<Container contentContainerStyle={styles.container} style={{backgroundColor:'#fff'}}>
				<Content style={styles.body}>
					<Text style={{marginTop:25,fontSize:19,fontFamily:'Helvetica Neue'}}>Welcome to POSTWORLD! We are happy you are here. POSTWORLD is a place for people to share, collect, and discover the stories of their world. Posts are location specific, and public for all to see. Have a special note about a place, object, or aspect of your city? Share it! And as you travel this great planet you can collect other posts you enjoy as well.  We ask that all users be respectful of other posters. Anything offensive, inappropriate, or otherwise uncool will have you removed from the community.
					</Text>
					<Text style={{marginTop:25,fontSize:19,fontFamily:'Helvetica Neue'}}>
            As a guest, you will not be able to:
					</Text>
					<Text style={{marginTop:5,fontSize:19,fontFamily:'Helvetica Neue'}}>
            *Post
					</Text>
					<Text style={{marginTop:5,fontSize:19,fontFamily:'Helvetica Neue'}}>
            *Favorite/Collect Posts
					</Text>
					<Text style={{marginTop:5,fontSize:19,fontFamily:'Helvetica Neue'}}>
            *Have a profile
					</Text>
					<Text style={{marginTop:5,fontSize:19,fontFamily:'Helvetica Neue'}}>
            You are free to discover as much as you like however. Have fun!
					</Text>
				</Content>
				<Footer>
					<FooterTab style={styles.footertab}>
						<Button
							large
							onPress={() => this.props.navigation.navigate('SignUp')}>
							<Text style={styles.buttonText}>Next</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	header:{
		fontSize:45,
		textAlign:'center',
		color:'white',
		marginTop:100,
		marginBottom:100
	},
	body: {
		paddingTop:10,
		padding:25,
	},
	footertab:{
		backgroundColor:theme.lightGreen,
		borderColor:theme.lightGray,
		borderWidth:1,
		borderRadius:0
	},
	buttonText:{
		color:theme.black,
		fontSize:20,
		padding:6
	}
})

export default Welcome
