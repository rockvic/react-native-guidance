import React, {PureComponent} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';

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

// const tabBarheight = useBottomTabBarHeight();

class Records extends PureComponent {
  render() {
    console.log('this.props in Record : ', this.props);
    return (
      <BottomTabBarHeightContext.Consumer>
        {tabBarheight => {
          return (
            <ScrollView
              // style={{backgroundColor: 'blue'}}
              contentContainerStyle={[
                styles.scrollContentContainer,
                {paddingBottom: tabBarheight},
              ]}>
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
                  <Text style={{fontSize: 22, color: 'white'}}>
                    点我 go to Test
                  </Text>
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
                  <Text style={{fontSize: 22, color: 'white'}}>
                    点我 go to Test1
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <Text>I18n.locale: {I18n.locale}</Text>
              <Text>I18n.t('home.tab_home'): {I18n.t('home.tab_home')}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[styles.btn, {paddingHorizontal: 20}]}
                  onPress={() => {
                    I18n.locale = 'cn';
                    this.setState({locale: I18n.locale});
                  }}>
                  <Text style={{fontSize: 22, color: 'white'}}>
                    中文
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, {paddingHorizontal: 20}]}
                  onPress={() => {
                    I18n.locale = 'en';
                    this.setState({locale: I18n.locale});
                  }}>
                  <Text style={{fontSize: 22, color: 'white'}}>
                    英文
                  </Text>
                </TouchableOpacity>
              </View> */}
              <Text>
                {`
                  import { View, Text, TouchableOpacity } from 'react-native';

                  function MyTabBar({ state, descriptors, navigation }) {
                    return (
                      <View style={{ flexDirection: 'row' }}>
                        {state.routes.map((route, index) => {
                          const { options } = descriptors[route.key];
                          const label =
                            options.tabBarLabel !== undefined
                              ? options.tabBarLabel
                              : options.title !== undefined
                              ? options.title
                              : route.name;
                  
                          const isFocused = state.index === index;
                  
                          const onPress = () => {
                            const event = navigation.emit({
                              type: 'tabPress',
                              target: route.key,
                              canPreventDefault: true,
                            });
                  
                            if (!isFocused && !event.defaultPrevented) {
                              navigation.navigate({ name: route.name, merge: true });
                            }
                          };
                  
                          const onLongPress = () => {
                            navigation.emit({
                              type: 'tabLongPress',
                              target: route.key,
                            });
                          };
                  
                          return (
                            <TouchableOpacity
                              accessibilityRole="button"
                              accessibilityState={isFocused ? { selected: true } : {}}
                              accessibilityLabel={options.tabBarAccessibilityLabel}
                              testID={options.tabBarTestID}
                              onPress={onPress}
                              onLongPress={onLongPress}
                              style={{ flex: 1 }}
                            >
                              <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                                {label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  }
                  
                  // ...
                  
                  <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
                    {...}
                  </Tab.Navigator>
                `}
              </Text>
              <View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    this.props.navigation.navigate('Test', {
                      from: 'from Test....',
                    });
                  }}>
                  <Text style={{fontSize: 22, color: 'white'}}>
                    点我 go to Test
                  </Text>
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
                  <Text style={{fontSize: 22, color: 'white'}}>
                    点我 go to Test1
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          );
        }}
      </BottomTabBarHeightContext.Consumer>
    );
  }
}

export default Records;
