
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import useStockSocket from "./StockSocketService";

export default function StockWebSocketDemo() {

  console.log("called ");
  
  const { stocks } = useStockSocket([
    "AAPL",
    "MSFT",
    "BINANCE:BTCUSDT",
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.symbol}>{item.s}</Text>
      <Text style={styles.price}>Price: ${item.p}</Text>
      <Text style={styles.volume}>Volume: {item.v}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Live Stock Prices</Text>
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.s}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    borderRadius: 8,
  },
  symbol: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "green" },
  volume: { fontSize: 14, color: "gray" },
});
