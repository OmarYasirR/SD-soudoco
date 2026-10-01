import { StatusBar } from "expo-status-bar";
import { useEffect, useState,useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SolTable from "../components/solTable";
import Data from "../db/data.json";
import Modle from "../components/Modle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import RowBuilder from "../components/RowBuilder";
import TheHeader from "../components/TheHeader";

export default function Game() {
  const [slectSond, setSlectSond] = useState();
  const [clickSond, setClickSond] = useState();
  const [deletSond, setDeletSond] = useState();
  
  const [newBox, setnewBox] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [modle, setModle] = useState(false);
  const [win, setWin] = useState(false);

  async function settingslct() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Sounds/wood-spin.mp3")
    );
    setSlectSond(sound);
    await sound.playAsync();
  }
  async function settingDelet() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Sounds/delete.mp3")
    );
    setDeletSond(sound);
    await sound.playAsync();
    setDeletSond(sound);
  }
  async function settingclk() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Sounds/ping-82822.mp3")
    );
    setClickSond(sound);
    await sound.playAsync();
    setClickSond(sound);
  }

  const El = ({ i0, i1, i2, i3, val }) => {
    if (val == "emty") {
      return (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: 13,
            }}
            onPress={() =>
              dispatch({
                type: "editting",
                payload: { i0: i0, i1: i1, i2: i2, i3: i3 },
              })
            }
          ></Text>
        </View>
      );
    }
    if (val === "hint") {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#777",
            justifyContent: "center",
            alignItems: "center",
            margin: 1,
            alignContent: "center",
          }}
        >
          <Entypo name="cross" size={15} color="white" />
        </View>
      );
    }
    if (val) {
      return (
        <Entypo
          name="check"
          size={18}
          color="#00675b"
          onPress={() =>
            dispatch({
              type: "editting",
              payload: { i0: i0, i1: i1, i2: i2, i3: i3 },
            })
          }
          style={{ alignSelf: "center" }}
        />
      );
    } else {
      return (
        <Entypo
          name="cross"
          size={18}
          color="#00675b"
          onPress={() =>
            dispatch({
              type: "editting",
              payload: { i0: i0, i1: i1, i2: i2, i3: i3 },
            })
          }
          style={{ alignSelf: "center" }}
        />
      );
    }
  };

  const crosCount = (array) => {
    let num = 0;
    array.map((item, i) => {
      item === false || item === "hint" ? num++ : undefined;
    });
    return num;
  };
  const indexswiper = (num) => {
    let ind;
    num == 0
      ? (ind = 3)
      : num == 1
      ? (ind = 2)
      : num == 2
      ? (ind = 1)
      : (ind = 0);
    return ind;
  };
  const editHandler = (Arr, i0, i1, i2, i3, state, active) => {
    const crntArr = Arr[i0][i1][i2].cells;
    const ischecked = Arr[i0][i1][i2].checked;
    if (state === "delete") {
      if (crntArr[i3] !== 'emty') {
        settingDelet()
      }
      if (crntArr[i3] === true) {
        Arr[i0][i1][i2].checked = false;
        if (i1 == 0) {
          setnewBox((prev) => {
            prev[indexswiper(i3)][i0] = "";
            return prev;
          });
        }
      }
      crntArr[i3] = "emty";
    }
    if (state === true) {
      if (!ischecked) {
        settingclk();
        Arr[i0][i1].map((item) => {
          item.cells[i3] !== "hint" ? (item.cells[i3] = false) : undefined;
        });
        crntArr.map((cell, i) => {
          cell != "hint" ? (Arr[i0][i1][i2].cells[i] = false) : undefined;
        });
        Arr[i0][i1][i2].checked = true;
        crntArr[i3] = true;
        if (i1 == 0) {
          // dispatch({
          //   type: "setSolBox",
          //   payload: { opr: true, i0: i0, i2: i2, i3: i3 },
          // });
        }
      }
    }
    if (state === false) {
      if (!ischecked) {
        settingclk();
        if (crosCount(crntArr) == 3) {
          Arr[i0][i1].map((item) => {
            item.cells[i3] !== "hint" ? (item.cells[i3] = false) : undefined;
          });
          crntArr[i3] = true;
          if (i1 == 0) {
          }
          Arr[i0][i1][i2].checked = true;
        }
        if (crosCount(crntArr) == 2) {
          crntArr[i3] = false;
          crntArr.map((item, i) => {
            if (item === "emty") {
              Arr[i0][i1][i2].checked = true;
              // Fill All Column Cells With Cross Sign
              Arr[i0][i1].map((item) => {
                item.cells[i] !== "hint" ? (item.cells[i] = false) : undefined;
              });
              crntArr[i] = true;
              crntArr[i3] = false;
            }
          });
        }
        if (crosCount(crntArr) < 2) {
          crntArr[i3] = false;
        }
      }
    }

    Arr[i0][i1].map((item, i) => {
      if (!item.cells.includes(true)) {
        item.checked = false;
      }
    });
    Filler(Arr[i0][i1], i0, i1, active);
    AsyncStorage.setItem("rows", JSON.stringify(Arr));
    return Arr;
  };


  const Filler = (Arr, i0, i1, active) => {
    let allNames = Data[active].names;
    let names = [];
    i0 == 0
      ? (names = allNames.nam1)
      : i0 == 1
      ? (names = allNames.nam2)
      : (names = allNames.nam3);
    if (i1 == 0) {
      Arr.map((row, i) => {
        if (row.cells.includes(true)) {
          let truIndx = row.cells.indexOf(true);
          setnewBox((prev) => {
            prev[indexswiper(truIndx)][i0] = names[i];
            AsyncStorage.setItem("solBox", JSON.stringify(prev));
            return prev;
          });
        }
      });
    }
  };

  const submtHandler = () => {
    setModle(true);
    const rows = state.Row;
    let ansrArr = [];
    rows.map((row, i1) => {
      row.map((block, i2) => {
        block.map((cels, i3) => {
          cels.cells[Data[state.active].answers[i1][i2][i3]] === true
            ? ansrArr.push(true)
            : ansrArr.push(false);
        });
      });
    });
    setWin(ansrArr.every(ele => ele === true));
  };

  // Perssisting Data
  const Perssesting = () => {
    AsyncStorage.getItem("active").then((res) => {
      if (res !== null) {
        dispatch({type: 'persestActive', payload: JSON.parse(res)})
      }
    });
    AsyncStorage.getItem("rows").then((res) => {
      if (res !== null) {
        dispatch({type: 'persestRows', payload: JSON.parse(res)})
      }
    }); 
    AsyncStorage.getItem("solBox").then((res) => {
      if (res !== null) {
        setnewBox(prev => {
          prev = JSON.parse(res)
          return prev
        })
      }
    });
  };
  const Seter = (arr) => {
    let ar = [];
    arr.map((rows, i) => {
      let Row = []
      rows.map((block, i) => {
        let blk = [];
        block.map((row, i) => {
          row.cells.map((cell, i) => {
            cell === true || cell === false ? (row.cells[i] = "emty") : undefined;
          });
          row.checked = false;
          blk.push(row);
        });
        Row.push(blk);
      });
      ar.push(Row)
    })
    return ar;
  };
  const cellGenerator = (ar) => {
    let finalArr = [];
    ar.map((row, i0) => {
      let nA = [];
      row.map((item, i1) => {
        let arr = [];
        item.map((it2, i2) => {
          let arr2 = [];
          it2.cells.map((it3, i3) => {
            arr2.push(<El i0={i0} i1={i1} i2={i2} i3={i3} val={it3} />);
          });
          arr.push(arr2);
        });
        nA.push(arr);
      });
      finalArr.push(nA);
    });
    return finalArr;
  };

  const crntStatSeter = (value) => {
    settingslct();
    return value;
  };

  const name = ["الاسم الاول", "الاسم الثاني", "الاسم الثالث"];
  const INITIALSTATE = {
    active: 0,
    Row: Data[0].rows,
    Cells: cellGenerator(Data[0].rows),
    curntstate: true,
    dewan: Data[0].dewan,
    nam1: Data[0].names.nam1,
    nam2: Data[0].names.nam2,
    nam3: Data[0].names.nam3,
  };
  const rowReducer = (state, action) => {
    switch (action.type) {
      case "navigating":
        setnewBox((prev) => {
          prev = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
          return prev;
        });
        setWin(false);
        setModle(false);
        Data[state.active].rows = Seter(Data[state.active].rows)
        if (state.active < Data.length - 1) {
          return {
            ...state,
            active: state.active + 1,
            Row: Data[state.active + 1].rows,
            Cells: cellGenerator(Data[state.active + 1].rows),
            dewan: Data[state.active + 1].dewan,
            nam1: Data[state.active + 1].names.nam1,
            nam2: Data[state.active + 1].names.nam2,
            nam3: Data[state.active + 1].names.nam3,
          };
        } else {
          return {
            ...state,
            active: 0,
            Row: Data[0].rows,
            Cells: cellGenerator(Data[0].rows),
            curntstate: true,
            dewan: Data[0].dewan,
            nam1: Data[0].names.nam1,
            nam2: Data[0].names.nam2,
            nam3: Data[0].names.nam3,
          };
        }
      case "editting":
        return {
          ...state,
          Row: editHandler(
            state.Row,
            action.payload.i0,
            action.payload.i1,
            action.payload.i2,
            action.payload.i3,
            state.curntstate,
            state.active
          ),
          Cells: cellGenerator(state.Row),
        };
      case "setCrntState":
        return {
          ...state,
          curntstate: crntStatSeter(action.payload),
        };
      case "persestActive":
        return {
          ...state,
          active: action.payload,
          Row: Data[action.payload].rows,
          Cells: cellGenerator(Data[action.payload].rows),
          dewan: Data[action.payload].dewan,
          nam1: Data[action.payload].names.nam1,
          nam2: Data[action.payload].names.nam2,
          nam3: Data[action.payload].names.nam3,
        };
      case "persestRows":
        return {
          ...state,
          Row: action.payload,
          Cells: cellGenerator(action.payload),
        };
        return {
          ...state,
          modle: !state.modle,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(rowReducer, INITIALSTATE);
  useEffect(() => {
    Perssesting()
  }, []);
  useEffect(() => {  
    return () => {
      if (slectSond) {
        slectSond.unloadAsync()
      }
      if (clickSond) {
        clickSond.unloadAsync()
      }
      if (deletSond) {
        deletSond.unloadAsync()
      }
    }
  }, [slectSond, clickSond, deletSond])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TheHeader Data={[state.dewan, state.nam3, state.nam2]} />
      <RowBuilder name={name[0]} names={state.nam1} blocks={state.Cells[0]} />
      <RowBuilder name={name[1]} names={state.nam2} blocks={state.Cells[1]} />
      <RowBuilder name={name[2]} names={state.nam3} blocks={state.Cells[2]} />

      <View style={styles.selectBox}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => dispatch({ type: "setCrntState", payload: true })}
        >
          <View
            style={[
              styles.bullets,
              {
                backgroundColor:
                  state.curntstate === true ? "red" : "transparent",
              },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              { opacity: state.curntstate === true ? 1 : 0.5, marginLeft: 6 },
            ]}
          >
            <Entypo name="check" size={30} color="#c2e7ff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => dispatch({ type: "setCrntState", payload: false })}
        >
          <View
            style={[
              styles.bullets,
              {
                backgroundColor:
                  state.curntstate === false ? "red" : "transparent",
              },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              { opacity: state.curntstate === false ? 1 : 0.5, marginLeft: 6 },
            ]}
          >
            <Entypo name="cross" size={30} color="#c2e7ff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => dispatch({ type: "setCrntState", payload: "delete" })}
        >
          <View
            style={[
              styles.bullets,
              {
                backgroundColor:
                  state.curntstate === "delete" ? "red" : "transparent",
              },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              {
                opacity: state.curntstate === "delete" ? 1 : 0.5,
                marginLeft: 6,
                padding: 2,
              },
            ]}
          >
            <AntDesign name="delete" size={23} color="#c2e7ff" />
          </View>
        </TouchableOpacity>
      </View>

      <SolTable
        tableHead={["الديوان", ...name]}
        tableData={newBox}
        tableTitle={state.dewan}
      />

      {modle && (
        <Modle
          stats={win}
          dispatch={dispatch}
          setModle={setModle}
          active={state.active}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => submtHandler()}>
        <Text style={{ color: "#c2e7ff" }}>موافق</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8fafd",
    direction: "rtl",
    position: "relative",
  },
  selectBox: {
    margin: 10,
    display: "flex",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: "38%",
    right: 0,
  },
  box: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00675b",
  },
  bullets: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderWidth: 1,
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: "#00675b",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
