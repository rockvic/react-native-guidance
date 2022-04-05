import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import px from "../utils/px";

const styles = StyleSheet.create({
  container: {
    borderRadius: px(18),
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: px(10),
    shadowOpacity: 0.15,
    shadowColor: "#000000",
    elevation: 5
  },
});

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    // 卡片样式
    style: PropTypes.any
  };

  static defaultPropTypes = {
    style: {}
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
