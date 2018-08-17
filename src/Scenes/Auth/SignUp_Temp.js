import React from 'react'
import PropTypes from 'prop-types'
import { View,StyleSheet,Dimensions,AsyncStorage, } from 'react-native'
import { Container, Header, Content, Input, Item,Text,Button,Spinner,Grid,Row,Col } from 'native-base';
const {height: screenHeight} = Dimensions.get('window');
import { NavigationActions } from 'react-navigation';
import config from '@Root/config.js'
import { connect } from 'react-redux'
import { signUp } from '../../actions/authActions'

class SignUp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      submitted:false,
      success:null,
      twoFactorSubmitted:false,
      username:null,
      token:null,
      responseError:null,
      number:null,
      msg:'Great! Now just enter in a quick username and you will be all set!'
    }
  }

  onSignUp(){
    this.setState({submitted:true})

    this.props.signUp(this.state.username,(response) => {
      AsyncStorage.setItem('userToken',JSON.stringify(response.user),(error) => {
        this.props.navigation.navigate('ImageUpload',{username:response.user.handle,userId:response.user._id})
      })
    })

  }

  verifyTwoFactor(){
    this.setState({twoFactorSubmitted:true})
    fetch(config.url + '/users/twofactor',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:JSON.stringify({
        handle:this.state.username,
        token:this.state.token
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.error){
        this.setState({twoFactorSubmitted:false,msg:responseJson.error})
      } else {
        this.setState({twoFactorSubmitted:true})
        AsyncStorage.setItem('userToken',JSON.stringify(responseJson.user),(error) => {
          if(error){
            this.setState({success:false},msg:"Something went wrong")
          } else {
            this.props.navigation.navigate('ImageUpload',{username:responseJson.user.username,userId:responseJson.user._id})
          }
        })
      }
    })
  }


  sendCode(){
    fetch(config.url + '/users/sendCode',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:JSON.stringify({
        handle:this.state.username,
        phoneNumber:this.state.number,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({success:true,msg:"Ok, we just sent a two factor auth code to your phone number"})
    })
  }

  twoFactor(){
    const body = {}
    if(this.state.twoFactorSubmitted){
      return (
        <View style={styles.body}>
          <Spinner color='black' />
        </View>
      )
    }
    else {
      return (
        <View style={styles.body}>
          <Text style={{textAlign:"center",fontSize:20,alignSelf:"center",color:"black",marginBottom:50,}}>{this.state.msg}</Text>

          <View style={{flexDirection:'row',marginBottom:50}}>
            <Item regular style={{flex:3,borderRadius:10,backgroundColor:"#FDFAF2",borderColor:"#979797",paddingBottom:5,paddingLeft:10,marginRight:5}}>
              <Input
                placeholder='Phone number'
                maxLength={10}
                style={{backgroundColor:"#FDFAF2",borderRadius:10,borderColor:"#979797"}}
                onChangeText={(number) => this.setState({number})}
                value={this.state.number}/>
            </Item>
            <View style={{flex:2,marginTop:5}}>
              <Button
                style={{backgroundColor:"#A0F6A9",borderColor:"#979797",borderWidth:1,alignSelf:"center",padding:0}}
                onPress={this.sendCode.bind(this)}>
                <Text style={{color:'black',paddingLeft:0,paddingRight:0,marginLeft:12.5,marginRight:12.5}}>Send code</Text>
              </Button>
            </View>
          </View>



          <Item regular style={{borderRadius:10,backgroundColor:"#FDFAF2",borderColor:"#979797",marginLeft:100,marginRight:100,paddingBottom:5}}>
            <Input
              placeholder='####'
              maxLength={6}
              style={{textAlign:"center",backgroundColor:"#FDFAF2",borderRadius:10,borderColor:"#979797"}}
              onChangeText={(token) => this.setState({token})}
              value={this.state.token}/>
          </Item>


          <Button
            style={{backgroundColor:"#2CB5FF",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:20,padding:0}}
            onPress={this.verifyTwoFactor.bind(this)}>
            <Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Authenticate</Text>
          </Button>

        </View>
      )
    }
  }

  loginForm(){
    const body = {}
    if(this.state.submitted){
      return (
        <View style={styles.body}>
          <Spinner color='black' />
        </View>
      )
    }
    else {
      return (
        <View style={styles.body}>
          <Text style={{textAlign:"center",fontSize:20,alignSelf:"center",marginBottom:20,}}>{this.state.msg}</Text>

          <Item regular style={{borderRadius:10,backgroundColor:"#FDFAF2",marginLeft:50,marginRight:50,borderColor:"#979797",paddingBottom:5}}>
            <Input
              placeholder='Your username…'
              style={{backgroundColor:"#FDFAF2",borderRadius:10,borderColor:"#979797"}}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
          </Item>

          <Button
            style={{backgroundColor:"#A0F6A9",borderColor:"#979797",borderWidth:1,alignSelf:"center",marginTop:40,padding:0}}
            onPress={this.onSignUp.bind(this)}>
            <Text style={{color:'black',padding:0,fontSize:20,marginLeft:12.5,marginRight:12.5}}>Submit</Text>
          </Button>

        </View>
      )
    }

  }

  render () {
    if(this.state.success == true){
      this.showForm = this.twoFactor
    }
    else {
      this.showForm = this.loginForm
    }
    return (
      <Container style={styles.container}>
        <Content>
          {this.showForm()}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
  },
  header:{
    fontSize:45,
    textAlign:"center",
    color:"white",
    marginTop:100,
    marginBottom:100
  },
  inputText:{
    color:"#fff",
    textAlign:"center",
    fontSize:20,
    marginTop:50,
    marginBottom:5
  },
  body: {
    flex:1,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    padding:25,
  }
})


export default connect(null, { signUp })(SignUp)
