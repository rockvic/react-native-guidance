import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scroller: {
    flex: 1,
    paddingLeft: 15,
  }
});

export default class AndroidFonts extends Component {
  render() {
    return (
      <ScrollView style={styles.scroller}>
        <Text style={{ fontFamily: 'normal' }}>normal </Text>
        <Text style={{ fontFamily: 'notoserif' }}>notoserif </Text>
        <Text style={{ fontFamily: 'sans-serif' }}>sans-serif </Text>
        <Text style={{ fontFamily: 'sans-serif-light' }}>sans-serif-light </Text>
        <Text style={{ fontFamily: 'sans-serif-thin' }}>sans-serif-thin </Text>
        <Text style={{ fontFamily: 'sans-serif-condensed' }}>sans-serif-condensed </Text>
        <Text style={{ fontFamily: 'sans-serif-medium' }}>sans-serif-medium </Text>
        <Text style={{ fontFamily: 'serif' }}>serif </Text>
        <Text style={{ fontFamily: 'Roboto' }}>Roboto </Text>
        <Text style={{ fontFamily: 'monospace' }}>monospace </Text>

        <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10, color: 'red' }}>{`Custom Fonts：`}</Text>

        <Text style={{ fontFamily: 'DINPro' }}>'DINPro' 1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-Light' }}>'DINPro-Light'  1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-Regular' }}>'DINPro-Regular'  1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-Medium' }}>'DINPro-Medium'  1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-Bold' }}>'DINPro-Bold'  1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-Black' }}>'DINPro-Black' 1234567890 </Text>
        <Text style={{ fontFamily: 'DINPro-CondBold' }}>'DINPro-CondBold' 1234567890 </Text>
      </ScrollView>
    );
  }
}
