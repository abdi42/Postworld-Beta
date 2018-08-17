import React from 'react'
import PropTypes from 'prop-types'

import { Animated, Easing,Text } from 'react-native'
import { StackNavigator,TabNavigator,SwitchNavigator,addNavigationHelpers } from 'react-navigation'

import MapScreen from './Scenes/Map/'
import FeedScreen from './Scenes/Feed/'
import FeedDetail from './Scenes/Feed/detail.js'
import Tabs from './components/Tabs.js'
import AddPost from './Scenes/AddPost'
import ProfileScreen from './Scenes/Profile'
import SignUp from './Scenes/Auth/SignUp'
import Prompt from './Scenes/Auth/Prompt'
import Welcome from './Scenes/Auth/Welcome'
import TwoFactor from './Scenes/Auth/TwoFactor'
import AuthLoadingScreen from './Scenes/Auth/AuthLoading'
import { connect } from 'react-redux'
import ImageUpload from './Scenes/Auth/ImageUpload'
import Posts from './Scenes/Profile/Posts'
import About from './Scenes/Profile/About'

const TabStack =  TabNavigator({
	Feed: { screen: FeedScreen },
	Profile: { screen:ProfileScreen }
},{
	tabBarPosition: 'bottom',
	animationEnabled:true,
	tabBarComponent: props => <Tabs {...props}/>
})

const AppStack = StackNavigator(
	{
		Tabs:TabStack,
		FeedDetail: { screen: FeedDetail },
		MapScreen: { screen: MapScreen},
		MyPosts:{ screen: Posts },
		SavedPosts:{ screen: Posts },
		About: { screen:About }
	},
	{
		header: null,
		headerMode:'none',
	}
)

const AuthStack =  StackNavigator(
	{
		Welcome: { screen: Welcome },
		SignUp: { screen: SignUp },
		Prompt: { screen:Prompt },
		ImageUpload: { screen: ImageUpload },
		TwoFactor: { screen: TwoFactor }
	},
	{
		header: null,
		headerMode:'none',
	}
)


const AppNavigation =  SwitchNavigator(
	{
		AuthLoading:AuthLoadingScreen,
		App:AppStack,
		Auth:AuthStack
	},
	{
		initialRouteName: 'AuthLoading',
		animationEnabled:true,
	}
)

export default AppNavigation


// class Nav extends React.Component {
//   render() {
//     return (
//       <AppNavigation
//         navigation={addNavigationHelpers({
//           dispatch:this.props.dispatch,
//           state:this.props.navigation
//         })}></AppNavigation>
//     )
//   }
// }
//
// const mapStateToProps = state => ({
//   navigation: state.navigation,
// })
//
//
// export default connect(mapStateToProps)(Nav)
