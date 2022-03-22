import React, {PureComponent} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    // width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'red',
    borderRadius: 8,
  },
});

class Test extends PureComponent {
  render() {
    console.log('this.props in Test : ', this.props);
    return (
      <ScrollView
        // style={{backgroundColor: 'blue'}}
        contentContainerStyle={[styles.scrollContentContainer]}>
        <Text
          style={{
            fontSize: 24,
            marginTop: 15,
            marginLeft: 15,
            fontWeight: '800',
          }}>
          The first test screen
        </Text>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Test', {
                from: 'from Test....',
              });
            }}>
            <Text style={{fontSize: 22, color: 'white'}}>点我 go to Test</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Test1', {
                from: 'from Test....',
              });
            }}>
            <Text style={{fontSize: 22, color: 'white'}}>点我 go to Test1</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default Test;
