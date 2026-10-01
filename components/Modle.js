import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect,useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Modle = ({ stats, dispatch, setModle, active }) => {
  
  const [winSond, setWinSond] = useState()
  const [losSond, setLosSond] = useState()
  const win = async () => {
    const {sound} = await Audio.Sound.createAsync(require('../assets/Sounds/goodresult.mp3'))
    setWinSond(sound)
    await sound.playAsync()
  }
  const Lose = async () => {
    const {sound} = await Audio.Sound.createAsync(require('../assets/Sounds/wrong-buzzer.mp3'))
    setLosSond(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    if(stats){
      win()
    }else{
      Lose()
    }
  }, [])
  useEffect(() => {
    return () => {
      if (winSond) {
        winSond.unloadAsync()
      }
      if (losSond) {
        losSond.unloadAsync()
      }
    }
  }, [winSond, losSond])
  
  return (
    <View style={styles.overLay}>
      {stats ? (
        <View style={[styles.modle,{backgroundColor: "#00675b"}]}>
          <AntDesign name="checkcircle" size={54} color="#c2e7ff" />
          <Text style={styles.text}>فزت</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={{ alignItems: "center", flexDirection: "row" }}
              onPress={() => {
                dispatch({type: "navigating"})
                AsyncStorage.setItem("active", JSON.stringify(active + 1))
                AsyncStorage.removeItem("rows")
                AsyncStorage.removeItem("solBox")
              }}
            >
              <MaterialIcons name="navigate-next" size={24} color="#ffff" />
              <Text style={{ color: "#ffff", fontSize: 16 }}>التالي</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setModle(false)}}>
              <FontAwesome name="rotate-right" size={24} color="#ffff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.modle,{backgroundColor: '#e91e63'}]}>
          <Entypo name="circle-with-cross" size={54} color="#c2e7ff" />
          <Text style={styles.text}>اجابات خاطئه</Text>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => {setModle(false)}}
            >
              <FontAwesome name="rotate-right" size={24} color="#ffff" />
            </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  overLay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    flex: 1,
  },
  modle: {
    width: 250,
    height: 250,
    // backgroundColor: "#00675b",
    borderRadius: 9,
    color: "#c2e7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    marginTop: 10,
    color: "#ffff",
  },
  actions: {
    // flex: 1,
    width: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default Modle;
