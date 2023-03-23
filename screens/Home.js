import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';


const Home = ({navigation}) => {

  

  const [sound, setSound] = useState();
  const [mute, setMute] = useState(false)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/Sounds/main.mp3'),{isLooping: true});
    setSound(sound);
    await sound.playAsync()
  }

  const soundControl = async () => {
    if(mute){
      await sound.playAsync()
    }else{
      await sound.pauseAsync()
    }
  }


  useEffect(() => {
    if(sound){
      sound.unloadAsync();
    }
    if (!mute) {
      playSound()
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity style={{marginRight: 20}}
        onPress={() => {
          setMute(!mute)
          soundControl()
        }}
      >
        {mute?
          (<Entypo name="sound-mute" size={74} color="#00675b" />): 
          (<Entypo name="sound" size={74} color="#00675b" />)
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('Game'),AsyncStorage.removeItem('row3Cels')}}>
        <Ionicons name="md-game-controller" size={74} color="#00675b" />
      </TouchableOpacity>
      </View>
  )
}
{/* <Entypo name="sound-mute" size={24} color="black" /> */}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c2e7ff',
    flexDirection: 'row',
  }
})