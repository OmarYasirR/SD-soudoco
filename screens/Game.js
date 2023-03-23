import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Table, TableWrapper, Cell, Rows } from "react-native-table-component";
import SolTable from "../components/solTable";
import Data from "../db/data.json";
import Modle from "../components/Modle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';


export default function Game() {
  const [active, setActive] = useState(0)
  const [crntQustion, setCrntQustion] = useState(Data[active])
  const [modle, setModle] = useState(false);
  const [win, setWine] = useState(false);

  // Sounds
  const [slect, setSlect] = useState()
  const [click, setClick] = useState()
  async function settingslct() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/Sounds/wood-spin.mp3'));
    setSlect(sound);
    await sound.playAsync()
    setSlect(sound)
  }
  async function settingclk() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/Sounds/ping-82822.mp3'));
    setClick(sound);
    await sound.playAsync()
    setClick(sound)
  }


  const El = ({ i1, i2, i3, val, arToSet }) => (
    <View>{cellValSeter(val, arToSet, i1, i2, i3)}</View>
  );

  const crosCount = (array) => {
    let num = 0;
    array.map((item, i) => {
      item === false || item === "hint" ? num++ : undefined;
    });
    return num;
  };

  const editHandler = (arToset, Arr, i1, i2, i3) => {
    const crntArr = Arr[i1][i2].cells;
    const ischecked = Arr[i1][i2].checked;

    if (curntstate === "delete") {
      if (crntArr[i3] === true) {
        Arr[i1][i2].checked = false;
        Filler(false, arToset, i2, i3)
      }
      crntArr[i3] = "emty";
    }
    if (curntstate === true) {
      if (!ischecked) {
        settingclk()
        Arr[i1].map((item) => {
          item.cells[i3] !== "hint" ? (item.cells[i3] = false) : undefined;
        });
        crntArr.map((cell, i) => {
          cell != "hint" ? (Arr[i1][i2].cells[i] = false) : undefined;
        });
        Arr[i1][i2].checked = true;
        crntArr[i3] = true;
        if(i1 == 0){
          Filler(true, arToset, i2, i3)
        }
      }
    }
    if (curntstate === false) {
      if (!ischecked) {
        settingclk()
        if (crosCount(crntArr) == 3) {
          Arr[i1].map((item) => {
            item.cells[i3] !== "hint" ? (item.cells[i3] = false) : undefined;
          });
          crntArr[i3] = true;
          if(i1 == 0){
            Filler(true, arToset, i2, i3)
          }
          Arr[i1][i2].checked = true;
        }
        if (crosCount(crntArr) == 2) {
          crntArr[i3] = false;
          crntArr.map((item, i) => {
            if (item === "emty") {
              Arr[i1][i2].checked = true;
              // Fill All Column Cells With Cross Sign
              Arr[i1].map((item) => {
                item.cells[i] !== "hint" ? (item.cells[i] = false) : undefined;
              });
              crntArr[i] = true;
              if(i1 == 0){
                Filler(true, arToset, i2, i)
              }
              crntArr[i3] = false;
            }
          });
        }
        if (crosCount(crntArr) < 2) {
          crntArr[i3] = false;
        }
      }
    }
    
    Arr[i1].map((item, i) => {
      if(!(item.cells.includes(true))){
        item.checked = false;
      }
    });
    AsyncStorage.setItem(`row${arToset}`, JSON.stringify(Arr))
    return Arr;
  };
  
  const clickHandler = (arToset, i1, i2, i3) => {
    
    if (arToset === 1) {
      editHandler(arToset, row1, i1, i2, i3)
      setRow1((prev) => {
        AsyncStorage.getItem('row1').then((res) => {
          prev = JSON.parse(res);
        })
        return prev;
      });
    }
    if (arToset === 2) {
      editHandler(arToset, row2, i1, i2, i3)
      setRow2((prev) => {
        AsyncStorage.getItem('row2').then((res) => {
          prev = JSON.parse(res)
        })
        return prev;
      });
    }
    if (arToset === 3) {
      editHandler(arToset, row3, i1, i2, i3)
      setRow3((prev) => {
        AsyncStorage.getItem('row3').then((res) => {
          prev = JSON.parse(res)
        })
        return prev;
      });
    }
    setRow1Cels((prev) => {
      prev = cellGenerator(row1, 1);
      return prev;
    });
    setRow2Cels((prev) => {
      prev = cellGenerator(row2, 2);
      return prev;
    });
    setRow3Cels((prev) => {
      prev = cellGenerator(row3, 3);
      return prev;
    });
  };
  const [curntstate, setCurntstate] = useState(true);

  const Filler = (oprtor, num, i2, i3) => {
    let names;
    num == 1 ? (names = nam1) : num == 2 ? (names = nam2) : (names = nam3);
    setSolbox((prev) => {
      prev[i3][num - 1] = oprtor ? names[i2] : "";
      AsyncStorage.setItem('box', JSON.stringify(prev))
      return prev;
    });
      
    
    
  };

  const submtHandler = () => {
    setModle(true)
    const rows = [row1,row2,row3];
    let ansrArr = [];
    rows.map((row, i1) => {
      row.map((block, i2) => {
        block.map((cels, i3) => {
          cels.cells[crntQustion.answers[i1][i2][i3]] === true
            ? ansrArr.push(true)
            : ansrArr.push(false);
        });
      });
    });
    setWine(ansrArr.every(ele => ele === true))    
    // 
  };

  // Perssisting Data
  const Perssesting =() => {
    AsyncStorage.getItem('active').then((res) => {
      if (res !== null) {
        setActive(JSON.parse(res))
      }
    })
    AsyncStorage.getItem('box').then((res) => {
      if (res !== null) {
        setSolbox((prev) => {
          prev = JSON.parse(res)
          return prev
        })
      }else{
        setSolbox([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ])
      }
    })
    AsyncStorage.getItem('row1').then((res) => {
    if(res !== null) {
      setRow1(prev => {
        prev = JSON.parse(res)
        // {"otherData":123}
        return prev
      })
      
    }else{
      setRow1(Seter(crntQustion.rows[0]))
    }
    })
    
    AsyncStorage.getItem('row2').then((res) => {
      if(res !== null) {
        setRow2(prev => {
          prev = JSON.parse(res)
          // {"otherData":123}
          return prev
        })
      
      }else{
        setRow2(Seter(crntQustion.rows[1]))
      }
    })
    AsyncStorage.getItem('row3').then((res) => {
      if(res !== null) {
        setRow3(prev => {
          prev = JSON.parse(res)
          return prev
        })
        
      }else{
        setRow3(Seter(crntQustion.rows[2]))
      }
    })
  };
  const Seter = (arr) => {
    let ar =[]
    arr.map((block, i) => {
      let blk=[]
      block.map((row, i) => {
        row.cells.map((cell, i) => {
          cell === true || cell === false ? row.cells[i] = 'emty' : undefined
        })
        row.checked = false
        blk.push(row)
      })
      ar.push(blk)
    })
    return ar
  }
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [row3, setRow3] = useState([]);

  
  const cellValSeter = (vl, arToSet, i1, i2, i3) => {
    if (vl == "emty") {
      return (
        <View style={{ width: "100%", height: "100%" }}>
          <Text
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
            onPress={() => clickHandler(arToSet, i1, i2, i3)}
          ></Text>
        </View>
      );
    }
    if (vl === "hint") {
      return (
        <View
          style={{
            width: "100%",
            backgroundColor: "#777",
            justifyContent: "center",
            alignItems: "center",
            margin: 1,
          }}
        >
          <Entypo name="cross" size={19} color="white" />
        </View>
      );
    }
    if (vl) {
      return (
        <Entypo
          name="check"
          size={22}
          color="#00675b"
          onPress={() => clickHandler(arToSet, i1, i2, i3)}
        />
      );
    } else {
      return (
        <Entypo
          name="cross"
          size={22}
          color="#00675b"
          onPress={() => clickHandler(arToSet, i1, i2, i3)}
        />
      );
    }
  };
  const cellGenerator = (ar, arToSet) => {
    let nA = [];
    ar.map((item, i1) => {
      let arr = [];
      item.map((it2, i2) => {
        let arr2 = [];
        it2.cells.map((it3, i3) => {
          arr2.push(<El i1={i1} i2={i2} i3={i3} val={it3} arToSet={arToSet} />);
        });
        arr.push(arr2);
      });
      nA.push(arr);
    });
    return nA;
  };
  const [row1Cels, setRow1Cels] = useState([]);
  const [row2Cels, setRow2Cels] = useState([]);
  const [row3Cels, setRow3Cels] = useState([]);
  const [solbox, setSolbox] = useState([]);

  const head = ["الاسم الثاني", "الاسم الثالث", "اسم الديوان"];
  const name = ["الاسم الاول", "الاسم الثاني", "الاسم الثالث"];
  let dewan = crntQustion.dewan;
  let nam1 = crntQustion.names.nam1;
  let nam2 = crntQustion.names.nam2;
  let nam3 = crntQustion.names.nam3;

  useEffect(() => {
    Perssesting()
  }, [modle])
  
  useEffect(() => {
    if (slect) {
      slect.unloadAsync()
    }
    if (click) {
      click.unloadAsync()
    }
    
    setCrntQustion(Data[active])
    setRow1Cels((prev) => {
      prev = cellGenerator(row1, 1);
      return prev;
    });
    setRow2Cels((prev) => {
      prev = cellGenerator(row2, 2);
      return prev;
    });
    setRow3Cels((prev) => {
      prev = cellGenerator(row3, 3);
      return prev;
    });
  }, [curntstate, active, row1,row2, row3,solbox]);

  


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Table style={{ paddingHorizontal: 5 }}>
        {/* Table Header ------START----- */}
        <TableWrapper
          style={{
            height: 140,
            flexDirection: "row",
          }}
        >
          <TableWrapper style={{ width: 100 }}>
            <Cell data={""} />
          </TableWrapper>
          <TableWrapper style={{ flex: 1 }}>
            {/* First Row */}
            <TableWrapper style={{ flexDirection: "row-reverse", height: 20 }}>
              {head.map((item, i) => (
                <Cell key={i} data={item} textStyle={styles.text} />
              ))}
            </TableWrapper>
            {/* Second Row */}
            <TableWrapper
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <TableWrapper style={styles.rotatedWraper}>
                {nam2.map((item, i) => (
                  <Cell
                    key={i}
                    data={item}
                    style={{}}
                    textStyle={styles.headerCell}
                  />
                ))}
              </TableWrapper>
              <TableWrapper style={styles.rotatedWraper}>
                {nam3.map((item, i) => (
                  <Cell key={i} data={item} textStyle={styles.headerCell} />
                ))}
              </TableWrapper>
              <TableWrapper style={styles.rotatedWraper}>
                {dewan.reverse().map((item, i) => (
                  <Cell key={i} data={item} textStyle={styles.headerCell} />
                ))}
              </TableWrapper>
            </TableWrapper>
          </TableWrapper>
        </TableWrapper>
        {/* Table Header ------END------ */}

        {/* Table Body ------START-------  */}
        <TableWrapper>
          {/* The Frist Row ----START---- */}
          <TableWrapper style={styles.ro1Wrapper}>
            <TableWrapper style={{ flexDirection: "row-reverse" }}>
              <TableWrapper style={{ width: 70 }}>
                {nam1.map((item, i) => (
                  <Cell
                    data={item}
                    key={i}
                    textStyle={styles.horcell}
                    style={{ flex: 1 }}
                  />
                ))}
              </TableWrapper>
              <TableWrapper style={styles.hor}>
                <Cell
                  data={name[0]}
                  style={{ flex: 1 }}
                  textStyle={{ fontSize: 10, width: 30, textAlign: "center" }}
                />
              </TableWrapper>
            </TableWrapper>
            <TableWrapper style={{ flex: 1, flexDirection: "row" }}>
              {row1Cels.map((item, i) => (
                <TableWrapper
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    borderTopWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderBottomWidth: i == row1Cels.length - 1 ? 1 : 0.5,
                    borderRightWidth: i == row1Cels.length - 1 ? 1 : 0.5,
                    borderColor: "#00675b",
                  }}
                  key={i}
                >
                  <Rows
                    data={item}
                    flexArr={[1, 1, 1, 1]}
                    style={{ flex: 1 }}
                    borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
                  />
                </TableWrapper>
              ))}
            </TableWrapper>
          </TableWrapper>
          {/* The Frist Row ----END---- */}

          {/* The Second Row ----START---- */}
          <TableWrapper style={styles.Wrapper}>
            <TableWrapper style={{ flexDirection: "row-reverse" }}>
              <TableWrapper style={{ width: 70 }}>
                {nam2.map((item, i) => (
                  <Cell
                    data={item}
                    key={i}
                    textStyle={styles.horcell}
                    style={{ flex: 1 }}
                  />
                ))}
              </TableWrapper>
              <TableWrapper style={styles.hor}>
                <Cell
                  data={name[1]}
                  style={{ flex: 1 }}
                  textStyle={{ fontSize: 10, width: 30, textAlign: "center" }}
                />
              </TableWrapper>
            </TableWrapper>
            {/* Cell --- START --- */}
            <TableWrapper style={{ flex: 2 / 3, flexDirection: "row" }}>
              {row2Cels.map((item, i) => (
                <TableWrapper
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    borderTopWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderBottomWidth: i == row2Cels.length - 1 ? 1 : 0.5,
                    borderRightWidth: i == row2Cels.length - 1 ? 1 : 0.5,
                    borderColor: "#00675b",
                  }}
                  key={i}
                >
                  <Rows
                    data={item}
                    flexArr={[1, 1, 1, 1]}
                    textStyle={{ alignItems: "center", textAlign: "center" }}
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItem: "center",
                    }}
                    borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
                  />
                </TableWrapper>
              ))}
            </TableWrapper>
            {/* Cell --- START --- */}
          </TableWrapper>
          {/* The Second Row ----END---- */}

          {/* The Third Row ----START---- */}
          <TableWrapper style={styles.Wrapper}>
            <TableWrapper style={{ flexDirection: "row-reverse" }}>
              <TableWrapper style={{ width: 70 }}>
                {nam3.map((item, i) => (
                  <Cell
                    data={item}
                    key={i}
                    textStyle={styles.horcell}
                    style={{ flex: 1 }}
                  />
                ))}
              </TableWrapper>
              <TableWrapper style={styles.hor}>
                <Cell
                  data={name[2]}
                  style={{ flex: 1 }}
                  textStyle={{ fontSize: 10, width: 30, textAlign: "center" }}
                />
              </TableWrapper>
            </TableWrapper>
            {/* Cells ---START--- */}
            <TableWrapper style={{ flex: 1 / 3 }}>
              {row3Cels.map((item, i) => (
                <TableWrapper
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    borderTopWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderBottomWidth: i == row3Cels.length - 1 ? 1 : 0.5,
                    borderRightWidth: i == row3Cels.length - 1 ? 1 : 0.5,
                    borderColor: "#00675b",
                  }}
                  key={i}
                >
                  <Rows
                    data={item}
                    flexArr={[1, 1, 1, 1]}
                    style={{ flex: 1 }}
                    borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
                  />
                </TableWrapper>
              ))}
            </TableWrapper>
            {/* Cells ---END--- */}
          </TableWrapper>
          {/* The Third Row ----END---- */}
        </TableWrapper>
        {/* Table Body ------END-------  */}
      </Table>

      <View style={styles.selectBox}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            setCurntstate(true)
            settingslct()
          }}
        >
          <View
            style={[
              styles.bullets,
              { backgroundColor: curntstate === true ? "red" : "transparent" },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              { opacity: curntstate === true ? 1 : 0.5, marginLeft: 6 },
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
          onPress={() =>{
              setCurntstate(false)
              settingslct()
            }}
        >
          <View
            style={[
              styles.bullets,
              {
                backgroundColor: curntstate === false ? "red" : "transparent",
              },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              { opacity: curntstate === false ? 1 : 0.5, marginLeft: 6 },
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
          onPress={() => {
            setCurntstate("delete")
            settingslct()
          }}
        >
          <View
            style={[
              styles.bullets,
              {
                backgroundColor:
                  curntstate === "delete" ? "red" : "transparent",
              },
            ]}
          ></View>
          <View
            style={[
              styles.box,
              {
                opacity: curntstate === "delete" ? 1 : 0.5,
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
        tableData={solbox}
        tableTitle={dewan.reverse()}
      />
      {modle && <Modle
        stats={win}
        active={active}
        setActive={setActive}
        setModle={setModle}
        length={Data.length}
      />}

      <TouchableOpacity
        style={styles.button}
        onPress={() => submtHandler()}
      >
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
  rotatedWraper: {
    transform: [{ rotate: "-90deg" }],
    flex: 1,
  },
  text: {
    borderWidth: 1,
    textAlign: "center",
    fontSize: 12,
    borderColor: "#00675b",
    borderLeftColor: "#00675b",
    borderBottomColor: "transparent",
  },
  cell: {
    borderWidth: 1,
    textAlign: "center",
    fontSize: 12,
    borderColor: "#00675b",
    borderTopColor: "#00675b",
  },
  headerCell: {
    borderWidth: 1,
    textAlign: "center",
    fontSize: 12,
    borderColor: "#00675b",
    borderRightColor: "transparent",
    // borderBottomColor: "transparent",
    // borderTopColor: "transparent",
    borderLeftColor: "transparent",
    width: 120
  },
  chexBoxcel: {
    borderWidth: 1,
    fontSize: 12,
    borderColor: "#00675b",
    borderTopColor: "#00675b",
    flex: 1,
  },
  chexBox: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#00675b",
    justifyContent: "center",
    alignItems: "center",
  },
  horcell: {
    borderWidth: 1,
    textAlign: "center",
    fontSize: 11,
    borderColor: "#00675b",
    borderTopColor: "#00675b",
    flex: 1,
  },
  ro1Wrapper: {
    flexDirection: "row",
    height: 100,
    borderColor: "#00675b",
  },
  Wrapper: {
    flexDirection: "row",
    height: 100,
    borderColor: "#00675b",
  },
  hor: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#00675b",
    width: 30,
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
