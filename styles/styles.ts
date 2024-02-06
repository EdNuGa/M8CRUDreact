  import { StyleSheet } from 'react-native';

 const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    padding: 5,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'cyan',
    textAlign: 'left',
    marginLeft: '15%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    color: 'black',
    width: 300,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
});

export default styles;