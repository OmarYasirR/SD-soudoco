import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const RowBuilder = ({ name, names, blocks }) => {
  
  return (
    <View style={styles.container}>
        <View style={[styles.namCont]}>
          <View style={[styles.name,{borderTopWidth: blocks.length == 3? 2: 0}]}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.names}>
            {names.map((item, i) => (
              <Text style={[styles.nam,{borderTopWidth: i == 0 & blocks.length == 3 ? 2: 0 }]}>{item}</Text>
            ))}
          </View>
        </View>
        <View style={[blokStyles.blockCont, { flex: blocks.length / 3 }]}>
          {blocks.map((block, i) => (
            <View style={[blokStyles.block,{borderTopWidth: blocks.length == 3? 2:0}]}>
              {block.map((row, i) => (
                <View style={blokStyles.row}>
                  {row.map((cell, i) => (
                    <View style={blokStyles.cell}>{cell}</View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
  );
};

export default memo(RowBuilder);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginHorizontal: 5,
  },
  namCont: {
    flexDirection: "row",
    width: 110,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  name: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#00675b",
    borderRightColor: "transparent",
    borderRightWidth: 0,
    borderLeftWidth: 2,
    height: "100%",
    width: 25,
    paddingLeft: 7,
  },
  nameText: {
    transform: [{ rotate: "-90deg" }],
    // borderWidth: 1,
    // borderColor: 'red',
    fontSize: 12,
    alignSelf: "flex-end",
    flex: 1,
    width: 100,
    height: 25,
    textAlign: "center",
  },
  names: {
    width: 85,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderColor: "#00675b",
  },
  nam: {
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 2,
    borderColor: "#00675b",
    fontSize: 11,
    textAlign: "center",
    height: 25,
  },
});

const blokStyles = StyleSheet.create({
  blockCont: {
    flexDirection: "row",
  },
  block: {
    borderColor: "#00675b",
    borderWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    borderColor: "#c8e1ff",
    borderWidth: 1,
    height: 25,
    flex: 1,
  },
  cell: {
    borderColor: "#c8e1ff",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
