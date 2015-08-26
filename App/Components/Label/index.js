import React from 'react-native';

var {
  View,
  Text,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  label: {
    fontWeight: 'bold'
  }
});

class Label extends React.Component {
  render() {
    return(<View style={styles.container}>
      <Text style={styles.label}>{this.props.label} </Text>
      <Text>{this.props.value}</Text>
    </View>
    )
  }
}

module.exports = Label;
