/* @flow */

import React, { Component } from 'react'
import {
	View,
	TouchableOpacity
} from 'react-native'

import { Icon } from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from '@common/colors.js'

const Text = styled.Text`
	text-align:center;
	font-size:12.5;
	font-weight:bold;
`

const IconStyled = styled(Icon)`
	font-size:30;
	line-height:0;
	letter-spacing:0;
	color: ${props => props.voted ? props.color : theme.grey};
`

class Vote extends Component {

	constructor(props){
		super(props)
		this.upVote = this.upVote.bind(this)
		this.downVote = this.downVote.bind(this)
	}

	upVote() {
		if(this.props.votes.length === 0){
			this.props.onUpVote(1)
		}
	}

	downVote() {
		if(this.props.votes.length === 0){
			this.props.onUpVote(-1)
		}
	}

	render() {
		let upVoted = false
		let downVoted = false

		if(this.props.votes.length > 0){
			const userVote = this.props.votes[0]

			if(userVote.dir === 1){
				upVoted = true
			} else {
				downVoted = true
			}
		}

		return (
			<View>
				<TouchableOpacity
					transparent
					hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
					onPress={this.upVote}
					vertical>
					<IconStyled active type="FontAwesome" color={theme.green} name="caret-up" voted={upVoted}></IconStyled>
				</TouchableOpacity>
				<Text>{this.props.voteCount}</Text>
				<TouchableOpacity
					transparent
					hitSlop={{top: 10, bottom: 10, left: 15, right: 15}}
					onPress={this.downVote}
					vertical>
					<IconStyled active type="FontAwesome" color={theme.red} name="caret-down" voted={downVoted} />
				</TouchableOpacity>
			</View>
		)
	}
}

Vote.propTypes = {
	onUpVote:PropTypes.func,
	onDownVote:PropTypes.func,
	voteCount:PropTypes.number
}


export default Vote
