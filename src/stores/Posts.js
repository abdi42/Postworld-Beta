import {observable,action,configure,runInAction,autorun,spy} from "mobx"
//configure({ enforceActions: true });
import HttpApi from './HttpApi'

const httpApi = new HttpApi();



class Middleware {
  use(fn) {
    this.go = (stack => next => stack(fn.bind(this, next.bind(this))))(this.go);
  }

  go = next => next();
}

var middleware = new Middleware();

_storePosts = async (posts) => {
  try {
    await AsyncStorage.setItem('POSTS',posts);
  } catch (error) {
    // Error saving data
  }
}

class PostStore {
  @observable posts = []
  @observable geoPosts = [
    [-96.016434,41.248672],
    [-96.017905,41.249654],
    [-96.020230,41.248772]
  ];

  @observable state = 'pending';

  constructor(){
  }

  fetchPosts (userId) {
    if(this.posts.length > 0){
      return
    }

    this.state = 'done';

    fetch('http://localhost:3000/posts/feed',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        latitude:41.255130,
        longitude:-96.019380,
        userId:userId
      })
    })
      .then(res => res.json())
      .then((posts) => {
        posts.sort((a,b) => {
          a.commentsLoaded = false;
          b.commentsLoaded = false;

          var dateA = new Date(a.createdAt)
          var dateB = new Date(b.createdAt)

          return dateB - dateA;
        })

        this.posts = posts;
      })

  }

  @action getComments(index) {
    httpApi.getComments(this.posts[index]._id)
      .then(comments => {
        this.posts[index].comments = comments;
        this.posts[index].commentsLoaded = true
      });
  }

  @action addPost(postContent,geo = [],user) {

    const post = {
      id:uuidv4(),
      username:user.handle,
      content:postContent,
      likes:0,
      distance:"Here",
      comments:[],
      votes:[],
      geo:geo,
      time:"Now",
      image:user.image
    }

    fetch('http://localhost:3000/posts',{
      method:'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        latitude:41.255130,
        longitude:-96.019380,
        content:postContent,
        userId:user._id
      })
    })
    .then(res => res.json())
    .then((response) => {



      AsyncStorage.getItem('POSTS',(err,result) => {
        if(result !== null) {
          var posts = JSON.parse(result);

          this.posts.unshift(post);

          _storePosts(JSON.stringify([response.savedPost,...posts]))
        }
      })

    })


  }

  @action upVote(index){
    if(this.posts[index].userVoted == null || this.posts[index].userVoted != "up"){
      this.posts[index].votes.push({
        postId:this.posts[index],
        username:'johndoe',
        upVoted:true,
      })

      this.posts[index].userVoted = "up"

      this.posts[index].voteCount+=1;
    }
  }

  @action upVoteComment(index,commentIndex){
    if(this.posts[index].comments[commentIndex].userVoted == null || this.posts[index].comments[commentIndex].userVoted != "up"){
      this.posts[index].comments[commentIndex].userVoted = "up"
      this.posts[index].comments[commentIndex].votes+=1;
    }
  }

  @action downVoteComment(index,commentIndex){
    if(this.posts[index].comments[commentIndex].userVoted == null || this.posts[index].comments[commentIndex].userVoted != "down"){
      this.posts[index].comments[commentIndex].userVoted = "down"
      this.posts[index].comments[commentIndex].votes-=1;
    }
  }

  @action downVote(index){
    if(this.posts[index].userVoted == null || this.posts[index].userVoted != "down"){
      this.posts[index].votes.push({
        postId:this.posts[index],
        username:'johndoe',
        upVoted:true,
      })

      this.posts[index].userVoted = "down"

      this.posts[index].voteCount-=1;
    }
  }

  @action vote(index,dir,userId) {
    const orginalDir = dir;
    var postDir = 0

    if(this.posts[index].votes.length > 0){
      return
    }

    return httpApi.votePost(this.posts[index]._id,userId,dir)
      .then(responseJson => {
        switch (dir) {
          case 1:
            this.posts[index].voteCount +=1
            break;
          case -1:
            this.posts[index].voteCount -=1
            break;
        }

        this.posts[index].votes = [responseJson]
      })

  }

  @action addComment(index,username,comment){
    this.posts[index].comments.unshift({
      username:username,
      content:comment,
      votes:0
    })
  }



  @action
  loadComments = (comments,index) => {
    this.posts[index].content = "ello world";
  }

  upVoted(username,post){
    var voted = false;

    post.votes.map(vote => {
      if(vote.username === username){
        voted = true;
      }
    })

    return voted;
  }

  downVoted(username,post){
    var voted = false;

    post.votes.map(vote => {
      if(vote.username === username && !vote.upVoted){
        voted = true;
      }
    })

    return voted;
  }

}

export default new PostStore()
