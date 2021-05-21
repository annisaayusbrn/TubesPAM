import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { login } from '../store/actions/authAction';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Isikan email dan password');
    }

    try {
      const res = await dispatch(login({ email, password }));
      if (res.error) {
        return Alert.alert('Error', res.message);
      } else {
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 25 }}>Login</Text>
        <Text style={{ marginTop: 10 }}>Email: </Text>
        <TextInput
          onChangeText={(val) => setEmail(val)}
          style={styles.formInput}
          placeholder="Masukkan Email"
          keyboardType="email-address"
        />
        <Text style={{ marginTop: 10 }}>Password: </Text>
        <TextInput
          onChangeText={(val) => setPassword(val)}
          style={styles.formInput}
          placeholder="Masukkan Password"
          secureTextEntry={true}
        />
        <View style={{ marginTop: 10 }}>
          <Button onPress={() => handleLogin()} title="Login" />
        </View>
        <Text style={{ marginTop: 20 }}>
          Belum punya akun?{' '}
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{ color: 'blue', fontWeight: 'bold' }}
          >
            Daftar
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default LoginScreen;
