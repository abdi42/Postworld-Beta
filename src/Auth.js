import { AsyncStorage } from "react-native"

class Auth {
  constructor() {
    this.user = null;
  }


   getUserState = async () => {
    try {
      const userId = await AsyncStorage.getItem('userToken') || 'none';
    } catch (error) {
      // Error retrieving data
      
    }
    return userId;
  }

}

export default Auth;
