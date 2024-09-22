// styles.js
import { text } from 'body-parser';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabIcon: {
    fontSize: 30,
    color: 'gray',
  },
  plusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    bottom: -20,
    left: 175,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  plusIcon: {
    fontSize: 30,
    color: 'white',
  },

});

export default styles;


