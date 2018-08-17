import { CardItem as BaseCardItem } from 'native-base'
import styled from 'styled-components'
import React from 'react'

const CardStyled = styled.View`
  margin-vertical: 0.5px;
  margin-horizontal: 0.5px;
  border-width: 1.5px;
  border-radius: 10px;
  border-color: #ccc;
  flex-wrap: nowrap;
  background-color: #fff;
  elevation: 3px;
  padding:5px;
`

const CardItem = styled(BaseCardItem)`
  padding-top:0px;
  padding-bottom:0px;
  background-color:#fff;
`

class Card extends React.PureComponent {
	render(){
		return (
			<CardStyled {...this.props}>
				{this.props.children}
			</CardStyled>
		)
	}
}

export {
	Card,
	CardItem
}
