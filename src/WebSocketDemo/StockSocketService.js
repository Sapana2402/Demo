// useStockSocket.js
import { useEffect, useRef, useState } from "react";

export default function useStockSocket(symbols = []) {
  const ws = useRef(null);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(
      "wss://ws.finnhub.io?token=d1vn8u1r01qqgeemgch0d1vn8u1r01qqgeemgchg"
    );

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      symbols.forEach((sym) => {
        subscribe(sym);
      });
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.data) {
        setStocks((prevStocks) => {
          const updatedStocks = [...prevStocks];
          data.data.forEach((stock) => {
            const index = updatedStocks.findIndex((s) => s.s === stock.s);
            if (index > -1) {
              updatedStocks[index] = stock; 
            } else {
              updatedStocks.push(stock); 
            }
          });
          return updatedStocks;
        });
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    ws.current.onclose = () => {
      console.log("🔌 WebSocket Closed");
    };

    return () => {
      symbols.forEach((sym) => unsubscribe(sym));
      ws.current?.close();
    };
  }, [symbols]);

  const subscribe = (symbol) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "subscribe", symbol }));
    }
  };

  const unsubscribe = (symbol) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "unsubscribe", symbol }));
    }
  };

  return { stocks, subscribe, unsubscribe };
}
