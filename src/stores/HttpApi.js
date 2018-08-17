export default class HttpApi {
  constructor() {
    this.url = "http://localhost:3000"
  }

  getPosts() {
    return fetch('http://localhost:3000/posts/feed',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        latitude:41.255130,
        longitude:-96.019380
      })
    })
  }

  getComments(postId){
    return fetch(this.url+ '/posts/' + postId+'/comments')
      .then(response => response.json())
  }

  votePost(postId,userId,dir){
    return fetch(this.url + '/posts/' + postId + '/votes',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        userId:userId,\
        dir:dir
      })
    })
    .then(response => response.json())
  }

  signUp(userHandle) {
    return fetch(this.url + '/users',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:JSON.stringify({
        handle:userHandle
      })
    })
    .then((response) => response.json())
  }

  sendCode(userHandle,phoneNumber) {
    return fetch(this.url + '/users/sendCode',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:JSON.stringify({
        handle:userHandle,
        phoneNumber:phoneNumber,
      })
    })
    .then((response) => response.json())
  }

  verifyTwoFactor(username,token) {
    return fetch(this.url + '/users/twofactor',{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body:JSON.stringify({
        handle:username,
        token:token
      })
    })
    .then((response) => response.json())
  }
}
