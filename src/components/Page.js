import React from 'react';
import { View } from 'react-native';

import MapHeader from './MapHeader';

import sheet from '../../styles/sheet';
import colors from '../../styles/colors';

class Page extends React.Component {

  render() {
    return (
      <View style={sheet.matchParent}>
        <MapHeader
          relative
          backgroundColor={colors.primary.pink}
          statusBarColor={colors.primary.pinkDark}
          statusBarTextTheme={'light-content'}
          label={this.props.label}
          onBack={this.props.onDismissExample}
        />

        {this.props.children}
      </View>
    );
  }
}

export default Page;
