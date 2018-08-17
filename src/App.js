import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import AppNavigation from './AppNavigation.js'
import { Root } from 'native-base'
import {
	Platform,
	StyleSheet,
	View,
	Image,
	SafeAreaView
} from 'react-native'
import { Provider } from 'react-redux'
import { store,persistor } from './store'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import { PersistGate } from 'redux-persist/integration/react'

const onBeforeLift = (store) => {

}

export default class App extends Component {

	render() {
		return (
			<SafeAreaView style={{flex:1}}>
				<StatusBar
					backgroundColor="#fff"
					barStyle="dark-content"
					hidden={true}
				/>
				<Provider store={store}>
					<PersistGate
						loading={null}
						onBeforeLift={() => onBeforeLift(store)}
						persistor={persistor}>
						<Root>
							<AppNavigation></AppNavigation>
						</Root>
					</PersistGate>
				</Provider>
			</SafeAreaView>
		)
	}

}
