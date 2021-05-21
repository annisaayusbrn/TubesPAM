import serverApi from '../../api/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('password', payload.password);

    const res = await serverApi.post('api.php?apicall=register', formData);
    if (res.data.error) {
      return { error: true, message: res.data.message };
    } else {
      return { error: false, message: res.data.message };
    }
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('email', payload.email);
    formData.append('password', payload.password);

    const res = await serverApi.post('api.php?apicall=login', formData);

    if (res.data.error) {
      return { error: true, message: res.data.message };
    } else {
      await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch({ type: 'LOGIN', payload: res.data.user });
      return { error: false, message: res.data.message };
    }
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const autoLogin = () => async (dispatch) => {
  try {
    const userItem = await AsyncStorage.getItem('user');
    const user = JSON.parse(userItem);

    if (user) {
      console.log(user);
      dispatch({ type: 'LOGIN', payload: user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    dispatch({ type: 'LOGOUT', payload: '' });
  } catch (err) {
    console.log(err);
  }
};
