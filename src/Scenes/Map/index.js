import React, { Component } from 'react'
import { StyleSheet,TouchableOpacity,Text,View,KeyboardAvoidingView,ImageBackground,TouchableWithoutFeedback,InteractionManager} from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import { Row,Container, Header, Left, Body, Right, Icon, Button ,Title,Content,Card,CardItem,Form,Textarea,Fab} from 'native-base'
import PostModal from '../../components/PostModal'
import { NavigationActions } from 'react-navigation'
import PostCard from '@components/PostCard'
import { connect } from 'react-redux'
import { fetchPosts,getMapFeatures,getPost,postVote } from '../../actions/postActions'
import Add from '../../components/Add'
import ProfileImage from '../../components/ProfileImage'
import PostIcon from './mark.png'
import PostsLayer from '@components/PostsLayer'
import { TouchableIcon,TouchableImage } from '@common'

Mapbox.setAccessToken('pk.eyJ1IjoiYWJkaTQyIiwiYSI6ImNqaHNlZm9pYTAyM3kzcW15Y2kzdHd3N2kifQ.899OIbr__amO23qmSrRmyw')



class MapScreen extends Component {

	constructor(props){
		super(props)

		this.state = {
			modal:true,
			index:null,
			visible:false,
			addVisible:false,
			latitude:null,
			longitude:null,
			error:null,
			loadingMap:true,
			data:[],
			id:null,
			featureCollection:{
				type: 'FeatureCollection',
				features: []
			}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.goToDetail = this.goToDetail.bind(this)
		this.onShapeSourceLayer = this.onShapeSourceLayer.bind(this)
		this.toggleModel = this.toggleModel.bind(this)
		this.closePost = this.closePost.bind(this)
		this.closeAddPost = this.closeAddPost.bind(this)
		this.reCenter = this.reCenter.bind(this)
		this.goBack = this.goBack.bind(this)
		this.finishedLoadingMap = this.finishedLoadingMap.bind(this)
	}

	componentDidMount(){
		InteractionManager.runAfterInteractions(() => {
			this.watchId = navigator.geolocation.watchPosition(
				(position) => {
					this.setState({
						latitude: parseFloat(position.coords.latitude),
						longitude: parseFloat(position.coords.longitude),
						error: null,
					})
				},
				(error) => this.setState({ error: error.message }),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 })
		})
	}


	onSubmit(){
		this.setState({addVisible:false})
	}


	goToDetail() {
		let post = this.props.posts.byId[this.state.id]
		this.props.getPost(post)
		this.props.navigation.navigate('FeedDetail',{post:post,postId:post.id})
		this.setState({id:null,visible:false})
	}

	closePost(){
		this.setState({visible:false})
	}


	closeAddPost(){
		this.setState({addVisible:false})
	}

	showAddPost(content){
		return (
			<PostModal
				closePost={this.closeAddPost}
				style={{top:50}} visible={this.state.addVisible}
				opacity={1}>
				<Add onSubmit={this.onSubmit} geo={[this.state.longitude,this.state.latitude]} map navigate={this.props.navigation.navigate}></Add>
			</PostModal>
		)
	}

	reCenter(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: parseFloat(position.coords.latitude),
					longitude: parseFloat(position.coords.longitude),
					error: null,
				})
				this.map.flyTo([parseFloat(position.coords.longitude),parseFloat(position.coords.latitude)],600)
			})
	}

	onShapeSourceLayer(e) {

		const feature = e.nativeEvent.payload

		if(feature.properties.cluster){
			return
		} else {
			this.setState({id:feature.properties.id,visible:true})
		}

	}

	toggleModel(){
		this.setState({addVisible:true})
	}

	goBack(){
		navigator.geolocation.clearWatch(this.watchId)
		this.props.navigation.goBack()
	}

	finishedLoadingMap() {
		this.setState({loadingMap:false})
	}

	render() {
		// const { postStore } = this.props.screenProps;
		// const {posts} = postStore;
		const backAction = NavigationActions.back({
			key: 'FeedScreen-1'
		})

		const { params } = this.props.navigation.state
		let geo = [this.state.longitude,this.state.latitude]
		if((params != undefined || params != null) & params.geo){
			geo = params.geo
		}

		return (
			<View style={styles.container}>
				<Mapbox.MapView
					textureMode={true}
					styleURL="mapbox://styles/abdi42/cjhsge0rx7vyo2rp9kfssubsz?optimize=true"
					ref={(ref) => (this.map = ref)}
					userTrackingMode={Mapbox.UserTrackingModes.Follow}
					zoomLevel={19}
					logoEnabled={false}
					scrollEnabled={!this.state.loadingMap}
					zoomEnabled={!this.state.loadingMap}
					rotateEnabled={!this.state.loadingMap}
					pitchEnabled={false}
					compassEnabled={false}
					centerCoordinate={params.geo}
					showUserLocation={true}
					style={styles.container}
					pitch={45}
					onDidFinishRenderingMapFully={this.finishedLoadingMap}
				>

					<PostsLayer allIds={this.props.posts.allIds} byId={this.props.posts.byId} onPress={this.onShapeSourceLayer}></PostsLayer>

					<View>
						<TouchableOpacity
							style={{top:30,left:30,position:'absolute'}}
							onPress={this.goBack}
							hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
							<Icon style={{color:'white',fontSize:40}}name="md-arrow-round-back"/>
						</TouchableOpacity>
					</View>


					<TouchableIcon
						style={{bottom:20,left:27,position:'absolute'}}
						onPress={this.reCenter}
						color='white'
						fontSize={55}
						name='md-locate'
					></TouchableIcon>


					<View style={{width:80,height:80,alignSelf:'center',marginBottom:25,position:'absolute',bottom:0}}>
						<TouchableImage
							style={{}}
							source={require('./addIcon.png')}
							onPress={this.toggleModel}
							width={75}
							height={75}/>
					</View>

					<TouchableOpacity
						style={{bottom:20,right:30,position:'absolute'}}
						onPress={() => this.props.navigation.navigate('SamplePage')}
						hitSlop={{top: 10, bottom: 10, left: 20, right: 22}}>
						<ProfileImage style={{width:55,height:55,borderRadius:25}}></ProfileImage>
					</TouchableOpacity>

				</Mapbox.MapView>
				{
					this.state.id !== null &&
					<PostModal bottomClose={true} closePost={this.closePost} style={{top:75}} visible={this.state.visible} opacity={0}>
						<TouchableWithoutFeedback
							onPress={this.goToDetail}>
							<View style={{flex:1}}>
								<PostCard
									post={this.props.posts.byId[this.state.id]}
									geoDisabled={true}
									onPress={this.goToDetail}
									onVote={this.props.postVote}>
								</PostCard>
							</View>
						</TouchableWithoutFeedback>
					</PostModal>
				}
				{this.showAddPost()}
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	roundedButton: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		//marginTop:10,
		//paddingTop:15,
		//paddingBottom:15,
		width:80,
		height:80,
		backgroundColor:'#5484DA',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#5484DA',
	},
	annotationFill: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'orange',
		transform: [{ scale: 0.6 }],
	},
	markerContainer:{
		width: 55,
		height: 55,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
		shadowColor:'#5484DA',
		shadowOffset:{width:2.5,height:2.5},
		shadowRadius:5,
		shadowOpacity:0.8
	},
	marker: {
		backgroundColor:'#5484DA',
		width: 50,
		height: 50,
		borderRadius: 25,
		shadowColor:'red',
		shadowOffset:{width:50,height:50},
		shadowRadius:5
	}
})



const mapStateToProps = state => {
	return {
		posts:state.posts,
		currentItem:state.posts.currentItem,
		mapFeatures:state.posts.mapFeatures
	}
}

export default connect(mapStateToProps, { fetchPosts,getMapFeatures,postVote,getPost })(MapScreen)
