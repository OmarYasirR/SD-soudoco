import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Col,
  Row,
  Rows,
  Table,
  TableWrapper,
} from "react-native-table-component";

const solTable = ({ tableHead, tableData, tableTitle }) => {
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1.4, borderColor: '#00675b',borderRadius: 3  }}>
        <Row
          data={tableHead}
          flexArr={[1, 1, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={tableTitle}
            style={styles.title}
            heightArr={[38, 38]}
            textStyle={styles.text}
          />
          <Rows
            data={tableData}
            flexArr={[1, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};

export default solTable;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 5,
  },
  head: { height: 38, backgroundColor: "#c2e7ff"},
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#c2e7ff", width: 100 },
  row: { height: 38 },
  text: { textAlign: "center", fontSize: 12 },
});
