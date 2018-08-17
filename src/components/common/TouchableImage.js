/* @flow weak */

import React, {PureComponent} from 'react'
import { TouchableOpacity,Image } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from './colors.js'


const StyledImage = styled(Image)`
	width:${props => props.width};
	height:${props => props.height};
`


class TouchableImage extends PureComponent {

	render() {

		const {
			width = 20,
			height = 20,
			hitSlop = {top: 10, bottom: 10, left: 15, right: 15},
			source
		} = this.props


		return (
			<TouchableOpacity
				style={{...this.props.style}}
				onPress={this.props.onPress}
				hitSlop={hitSlop}>
				<StyledImage source={source} width={width} height={height}></StyledImage>
			</TouchableOpacity>
		)
	}

}

TouchableImage.propTypes = {
	onPress:PropTypes.func.isRequired,
	hitSlop:PropTypes.object,
	style:PropTypes.object,
	width:PropTypes.number,
	height:PropTypes.number,
	source:Image.propTypes.source
}

export default TouchableImage
