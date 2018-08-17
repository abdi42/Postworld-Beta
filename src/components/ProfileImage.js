import React from 'react'
import PropTypes from 'prop-types'
import { AsyncStorage,View } from 'react-native'
import { Thumbnail,Badge,Text } from 'native-base'
import placeholder from './profile_placeholder.png'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'

class ProfileImage extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			image:'',
			notifications:null
		}
	}

	componentDidMount(){
		AsyncStorage.getItem('userToken',(err,result) => {
			if(result !== null){
				result = JSON.parse(result)

				this.setState({image:result.image,notifications:2})
			}
		})
	}

	badge(){
		if(this.props.disableBadge !== true && this.state.notifications !== null){
			return (
				<Badge style={{ position: 'absolute',zIndex:2, right: -10, paddingTop: 0, paddingBottom: 3, paddingLeft:4, paddingRight:4, borderRadius: 100, height: 22}}>
					<Text style={{ height: 16, fontSize: 13 }}>2</Text>
				</Badge>
			)
		}
	}

	render () {
		let imageSource = null

		if(this.state.image){
			imageSource = {uri:this.state.image}
		} else {
			imageSource = require('./profile_placeholder.png')
		}

		return (
			<View>
				{this.props.user &&
					<FastImage
						style={{borderRadius:25,width:50,height:50,...this.props.style}}
						source={{
							uri:this.props.user.image,
							cache:FastImage.priority.web,
							priority:FastImage.priority.high
						}}
					/>
				}
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		user:state.auth.user,
		loading:state.auth.loading
	}
}

export default connect(mapStateToProps,{})(ProfileImage)
