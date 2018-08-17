import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Row,Grid,Col } from 'native-base';

class Prompt extends React.Component {
  render () {
    return (
      <Container contentContainerStyle={styles.container} style={{backgroundColor:"white"}}>
        <Content style={styles.body}>
          <Text style={{color:"black",marginTop:50,fontSize:21,fontFamily:"Helvetica Neue"}}>It looks like you are trying to get the <Text style={{color:"#5A79FD",fontSize:19,fontFamily:"Helvetica Neue"}}>FULL EXPERIENCE</Text>. Before you do that let us show you how this thing works with a quick tutorial.</Text>
          <Text style={{color:"black",marginTop:25,fontSize:21,fontFamily:"Helvetica Neue"}}>Afterwards we will have you create a username and then you will be good to go!</Text>

          <Button
            style={{backgroundColor:"#5A79FD",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:40,padding:0}}
            onPress={() => this.props.navigation.navigate("SignUp")}>
            <Text style={{color:'white',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Continue</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    fontSize:45,
    textAlign:"center",
    color:"white",
    marginTop:100,
    marginBottom:100
  },
  body: {
    padding:25,
  }
})

export default Prompt;
