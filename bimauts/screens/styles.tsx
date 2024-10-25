import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#333',
  },
  content: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
  languageSwitch: {
    marginTop: 16,
  },
  bannerCard: {
    marginBottom: 8,
    width: 300,
    height: 150,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sliderButton: {
    marginHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    marginVertical: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  transactionDetail: {
    marginTop: 10,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: 'red',
  },
  transactionButtons: {

    flexDirection: 'row',

    justifyContent: 'space-around',

    marginVertical: 20,

  },
});
export default globalStyles;