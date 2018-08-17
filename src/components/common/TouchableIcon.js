/* @flow weak */

import React, {PureComponent} from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'native-base'
import styled from 'styled-components'
import theme from './colors.js'


const StyledIcon = styled(Icon)`
	color:${props => props.color  ? props.color : '#fff' };
	font-size:${props => props.fontSize ? props.fontSize : 28 };
	text-align: center;
`


class TouchableIcon extends PureComponent {

	render() {
		const color = theme[this.props.color]
		const hitSlop = this.props.hitSlop || {top: 10, bottom: 10, left: 15, right: 15}

		return (
			<TouchableOpacity
				style={{...this.props.style}}
				onPress={this.props.onPress}
				hitSlop={hitSlop}>
				<StyledIcon color={color} fontSize={this.props.fontSize} name={this.props.name}></StyledIcon>
			</TouchableOpacity>
		)
	}

}

TouchableIcon.propTypes = {
	color:PropTypes.string,
	onPress:PropTypes.func.isRequired,
	fontSize:PropTypes.number,
	hitSlop:PropTypes.object,
	name:PropTypes.string,
	style:PropTypes.object
}


export default TouchableIcon
