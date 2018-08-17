import React from 'react'
import {ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View} from 'react-native'

import {StackActions, NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import {getUser} from '../../actions/authActions'

class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this._bootstrapAsync()
	}

	async _bootstrapAsync() {

		const route = this.props.user
			? 'App'
			: 'Auth'

		this.props.navigation.navigate(route)

	}


	// Render any loading content that you like here
	render() {
		return (
			<View></View>
		)
	}
}


const mapStateToProps = state => {
	return {user: state.auth.user}
}

export default connect(mapStateToProps, {getUser})(AuthLoadingScreen)
