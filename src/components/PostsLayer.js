/* @flow */

import React, { Component } from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native'
import PostIcon from './mark.png'
import Mapbox from '@mapbox/react-native-mapbox-gl'

class PostsLayer extends Component {

	onShapeSourceLayer(e){
		this.props.onPress(e)
	}

	render() {
		let mapPosts = this.props.allIds.filter((id) => this.props.byId[id].map === true)

		let featureCollection = {
			type: 'FeatureCollection',
			features: mapPosts.map((id) => {
				let post = this.props.byId[id]

				return {
					type:'Feature',
					properties:{
						id:post._id,
						icon:PostIcon,
						voteCount:post.voteCount
					},
					geometry:{
						type:'Point',
						coordinates:post.geo.coordinates
					},
				}
			}),
			'maxzoom': 22,
			'minzoom':1
		}

		return (
			<Mapbox.ShapeSource
				id="ShapeSource"
				shape={featureCollection}
				cluster={true}
				clusterRadius={80}
				clusterMaxZoom={14}
				images={{posticon:PostIcon}}
				onPress={(feature) => this.onShapeSourceLayer(feature)}>
				<Mapbox.SymbolLayer  key='{id}' id='{id}' filter={['!has', 'point_count']} style={mapStyles.icon} minZoomLevel={1}/>
				<Mapbox.SymbolLayer id="clusteredPoints" filter={['has', 'point_count']} style={mapStyles.clusterPoints}/>
			</Mapbox.ShapeSource>
		)
	}
}


const mapStyles = Mapbox.StyleSheet.create({
	icon: {
		iconImage: 'posticon',
		iconSize:0.70,
		textSize:20,
		textField:'{voteCount}',
		textColor:'#fff',
		iconAllowOverlap:true,
		textAllowOverlap:true,
	},
	clusterPoints: {
		iconImage: 'posticon',
		iconSize:0.75,
		textField:'+{point_count}',
		textColor:'#fff',
		textSize:25,
		iconAllowOverlap:true,
		textAllowOverlap:true
	}
})

export default PostsLayer
