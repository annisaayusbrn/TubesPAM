import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Myreg from './reg';

export default class Login extends Component {
    render() {
        return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logocontainer}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.myform}>
                <Myreg/>
            </View>
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282830',
        width: Dimensions.get('window').width,
    },
    logocontainer:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        alignItems: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold",
    },
    myform:{
        flex: 1,
    },
});