import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { register } from '../store/actions/authAction';
import { useDispatch } from 'react-redux';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert('Error', 'Isikan semua form');
    }

    try {
      const res = await dispatch(register({ name, email, password }));
      if (res.error) {
        return Alert.alert('Error', res.message);
      } else {
        return Alert.alert('Success', res.message, [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setEmail('');
              setPassword('');
              navigation.navigate('Login');
            },
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 25 }}>Register</Text>

        <Text style={{ marginTop: 10 }}>Nama: </Text>
        <TextInput
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.formInput}
          placeholder="Masukkan Nama"
        />
        <Text style={{ marginTop: 10 }}>Email: </Text>
        <TextInput
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.formInput}
          placeholder="Masukkan Email"
          keyboardType="email-address"
        />
        <Text style={{ marginTop: 10 }}>Password: </Text>
        <TextInput
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          style={styles.formInput}
          placeholder="Masukkan Password"
        />
        <View style={{ marginTop: 10 }}>
          <Button onPress={() => handleRegister()} title="Register" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

export default RegisterScreen;
