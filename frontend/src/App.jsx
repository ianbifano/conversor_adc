
import React, { useState } from "react";

function App() {
  const [type, setType] = useState("sinusoidal");
  const [freq, setFreq] = useState(50);
  const [amp, setAmp] = useState(1);
  const [rate, setRate] = useState(8000);
  const [bits, setBits] = useState(8);
  const [imgSrc, setImgSrc] = useState(null);

  const simulate = async () => {
    const res = await fetch("http://127.0.0.1:5000/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type, frequency: freq, amplitude: amp, sample_rate: rate, bits
      }),
    });
    const blob = await res.blob();
    setImgSrc(URL.createObjectURL(blob));
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Simulador ADC</h1>
      <div>
        <label>Tipo de señal: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="sinusoidal">Sinusoidal</option>
          <option value="square">Cuadrada</option>
          <option value="triangle">Triangular</option>
          <option value="noise">Ruido</option>
        </select>
      </div>
      <div>
        <label>Frecuencia (Hz): </label>
        <input type="number" value={freq} onChange={(e) => setFreq(+e.target.value)} />
      </div>
      <div>
        <label>Amplitud: </label>
        <input type="number" value={amp} onChange={(e) => setAmp(+e.target.value)} />
      </div>
      <div>
        <label>Tasa de muestreo (Hz): </label>
        <input type="number" value={rate} onChange={(e) => setRate(+e.target.value)} />
      </div>
      <div>
        <label>Bits: </label>
        <input type="number" value={bits} onChange={(e) => setBits(+e.target.value)} />
      </div>
      <button onClick={simulate} style={{ marginTop: 10 }}>Simular</button>
      {imgSrc && <div><img src={imgSrc} alt="Resultado" style={{ marginTop: 20, maxWidth: "100%" }} /></div>}
    </div>
  );
}

export default App;
