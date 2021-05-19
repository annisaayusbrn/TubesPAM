import React, { Component } from 'react'
import { Text, StyleSheet, View,Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default class Bookmark extends Component {
    render() {
        return ( 
                <View>
                    <View style = {styles.header}>
                        <View style={styles.headerlist}> 
                            <View style={styles.title}>
                                <Text style={styles.teks}> 
                                    Bookmark 
                                </Text>
                            </View>  
                        </View>
                    </View>
                    <ScrollView>
                        <View style= { styles.bg}>
                            <Text style={styles.tanggal}>
                                15 Feb
                            </Text>
                            <View style={styles.bookmarklist}> 
                                <Image source={require('./assets/tech.jpg')} style={styles.foto}
                                />
                                <View style={styles.konten}>
                                    <Text style={styles.judul}>
                                        14 things to know about International Women's Day
                                    </Text>
                                    <Text style={styles.isikonten}>
                                        simply dummy txt of the printing and been the industry's standart dummy and scrambled it to make
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
        )
    }
}

const styles = StyleSheet.create({
    header: { 
        backgroundColor : '#e74c3c' ,
        height : 130
    },
    headerlist: {
        flexDirection: 'row'
    },
    title: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    teks: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color : 'white',
        marginTop: 70
    },
    bg: {
        backgroundColor: '#bdc3c7'
    },
    tanggal: {
        marginHorizontal: 20,
        marginTop: 20,
        color : 'grey'
    },
    bookmarklist: {
        flexDirection: 'row',
        marginVertical : 20,
        marginHorizontal : 20
    },
    foto: {
        backgroundColor : 'grey',
        width : 100,
        height : 100
    },
    konten:{
        backgroundColor : 'white'
    },
    judul:{
        fontSize: 16,
        justifyContent: 'space-between'
    },
    isikonten:{
        fontSize: 12,
        justifyContent: 'space-between'
    }
})
