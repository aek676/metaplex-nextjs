// Nombre de archivo de ejemplo: TransferSolComponent.tsx
"use client";

import React, { useState } from "react";
import transferSolToDestination from "@/lib/transferSol";
import umiUploadFile from "@/lib/umi/umiUploadFile";
import MetaplexLogo from "@/assets/logos/metaplex-logo.png";

const TransferSolComponent: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransferSol = async () => {
    setStatus(null);
    setError(null);

    try {
      await transferSolToDestination({
        destination,
        amount,
      });
      setStatus("¡Transferencia exitosa!");
    } catch (err: any) {
      console.error(err);
      setError(`Error al transferir SOL: ${err.message || err}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Transferencia de SOL</h2>

      <label htmlFor="destination">Dirección de destino:</label>
      <input
        id="destination"
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Ej. 3Rq...LSv"
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />

      <label htmlFor="amount">Cantidad (SOL):</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Ej. 0.5"
        style={{ display: "block", width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={handleTransferSol} style={{ marginRight: "1rem" }}>
        Transferir
      </button>

      <button></button>

      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TransferSolComponent;
