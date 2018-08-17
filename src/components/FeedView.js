import React, { Component } from 'react';
import {
  Platform,
  View,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView
} from 'react-native';
import PostCard from './PostCard';
import ListItem from './ListItem'

class FeedView extends Component {
  _renderPosts= (item,index) => {
    const post = item;

    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => this.props.navigate("FeedDetail",{post:post,index:index})}>
        <View>
          <PostCard
            post={post}
            goToGeo={() => this.props.navigate("MapScreen",{geo:post.geo.coordinates})}
            onUpVote={() => {}}
            onDownVote={() => {}}>
          </PostCard>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render(){

    return (
      <ScrollView>
        {
          this.props.posts.map(this._renderPosts)
        }
      </ScrollView>
    );
  }
}

export default FeedView;
