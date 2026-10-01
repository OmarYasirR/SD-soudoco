import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'

const TheHeader = ({Data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.emty}></View>
      <View style={{flex: 1}}>
        <View style={styles.lableCont}>
          {['اسم الديوان','الاسم الثالث','الاسم الثاني'].map((item,i) => (
            <Text style={[styles.lable,{borderLeftWidth: i == 2? 2: 0}]}>{item}</Text>
          ))}
        </View>
          <View style={styles.horzCont}>
            {Data.map((arr, index) => (
              <View style={[styles.itemCont,{borderRightWidth: index == 2?0: 2}]}>
                  <View style={{
                    flex: 1,
                    transform: [{ rotate: "-90deg" }],
                  }}>
                    {arr.map((item,i) => (
                      <Text style={[styles.item,{borderBottomWidth: i == 3?0: 2}]}>{item}</Text>
                    ))}
                  </View>
              </View>
            ))}
          </View>
      </View>
    </View>
  )
}

export default memo(TheHeader) 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    marginHorizontal: 5,
  },
  emty: {
    width: 108,
  },
  horzCont: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: '#00675b',
    alignItems: 'flex-start',
  },
  itemCont: {
    fontSize: 12,
    flex: 1,
    borderColor: '#00675b',
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    fontSize: 12,
    borderColor: '#00675b',
    textAlign: 'center',
    width: 120,
    alignSelf: 'center',
  },
  lableCont: {
    height: 20,
    flexDirection: 'row',
  },
  lable : {
    borderWidth: 2,
    borderColor: '#00675b',
    borderBottomWidth: 0,
    flex: 1,
    fontSize: 12,
    textAlign: 'center'
  }
})