import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/index';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AuthFlow from './src/navigations/AuthFlow';
import MainFlow from './src/navigations/MainFlow';
import { autoLogin } from './src/store/actions/authAction';

export default function App() {
  const Stack = createStackNavigator();
  const App = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
      const getStorage = async () => {
        await dispatch(autoLogin());
      };
      getStorage();
    }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none" initialRouteName="AuthFlow">
          {!user.email ? (
            <Stack.Screen name="AuthFlow" component={AuthFlow} />
          ) : (
            <Stack.Screen name="MainFlow" component={MainFlow} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
