import { useEffect, useState } from "react";
import { getSocket } from "../services/socket";

export default function AuctionPage({ auctionId, user }) {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidCount, setBidCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    // =======================
    // CONNECT EVENT
    // =======================
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setSocketConnected(true);

      // join auction room
      socket.emit("joinAuction", auctionId);
    });

    // =======================
    // LIVE BID UPDATES
    // =======================
    socket.on("bidUpdated", (data) => {
      if (data.auctionId !== auctionId) return;

      setCurrentPrice(data.currentPrice);
      setBidCount(data.bidCount);
    });

    // =======================
    // ERROR HANDLING
    // =======================
    socket.on("bidError", (msg) => {
      alert(msg);
    });

    // =======================
    // CLEANUP
    // =======================
    return () => {
      socket.off("bidUpdated");
      socket.off("bidError");
    };
  }, [auctionId]);

  // =======================
  // PLACE BID FUNCTION
  // =======================
  const placeBid = (amount) => {
    const socket = getSocket();

    socket.emit("placeBid", {
      auctionId,
      userId: user._id,
      bidAmount: amount
    });
  };

  return (
    <div>
      <h2>Auction Live</h2>

      <p>Current Price: ${currentPrice}</p>
      <p>Total Bids: {bidCount}</p>

      <button onClick={() => placeBid(currentPrice + 100)}>
        Place Bid +100
      </button>

      <p>
        Socket: {socketConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </p>
    </div>
  );
}
