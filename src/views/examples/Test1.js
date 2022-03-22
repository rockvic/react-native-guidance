import React, {PureComponent} from 'react';

import {View, Text} from 'react-native';

class Test1 extends PureComponent {
  static displayName = '测试1';
  static description = '测试界面1';
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    console.log(this.props.navigation.getState());
    return (
      <View>
        <Text
          style={{
            fontSize: 24,
            marginTop: 15,
            marginLeft: 15,
            fontWeight: '800',
          }}>
          The second test screen
        </Text>
        <Text
          style={{
            fontSize: 40,
            marginTop: 15,
            marginLeft: 15,
            color: 'darkgray',
          }}>
          <Text style={{fontSize: 20, fontWeight: '800'}}>
            Param 'from' pass by Test:
          </Text>
          {'\n'}
          {this.props.route && this.props.route.params
            ? this.props.route.params.from
            : 'null'}
        </Text>
      </View>
    );
  }
}

export default Test1;
