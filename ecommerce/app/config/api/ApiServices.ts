import {Config} from '../Constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export async function toGet() {
  try {
    console.log(Config.baseUrl, 'url');
    const header = {};
    const response = await axios.get(`${Config.baseUrl}`, header);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}
