import React from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authAction';
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };
  return (
    <SafeAreaView style={{ margin: 20 }}>
      <Text style={{ fontSize: 30 }}>Profile Saya</Text>
      <View style={{ marginTop: 20 }}>
        <View>
          <Text style={{ color: 'grey', fontSize: 20 }}>ID:</Text>
          <Text style={{ fontSize: 20 }}>{user.id}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'grey', fontSize: 20 }}>Nama:</Text>
          <Text style={{ fontSize: 20 }}>{user.name}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: 'grey', fontSize: 20 }}>Email:</Text>
          <Text style={{ fontSize: 20 }}>{user.email}</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Button onPress={() => handleLogout()} title="Logout" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
