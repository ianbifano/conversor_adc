import React, { useState, useEffect } from "react";

function App() {
  const [type, setType] = useState("sinusoidal");
  const [freq, setFreq] = useState(500);
  const [amp, setAmp] = useState(1);
  const [rate, setRate] = useState(8000);
  const [bits, setBits] = useState(1);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          frequency: freq,
          amplitude: amp,
          sample_rate: rate,
          bits,
        }),
      });
      const blob = await res.blob();
      setImgSrc(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Error al simular:", err);
      setImgSrc(null);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar simulación automática al cambiar cualquier parámetro
  useEffect(() => {
    simulate();
  }, [type, freq, amp, rate, bits]);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Simulador ADC</h1>

      <div className="row g-3 justify-content-center">
        <div className="col-md-6">
          <label className="form-label">Tipo de señal</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="sinusoidal">Sinusoidal</option>
            <option value="square">Cuadrada</option>
            <option value="triangle">Triangular</option>
            <option value="noise">Ruido</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Bits</label>
          <input
            type="number"
            className="form-control"
            value={bits}
            min={1}
            max={16}
            onChange={(e) => setBits(+e.target.value)}
          />
        </div>

        {/* Frecuencia */}
        <div className="col-12 mb-3">
          <label className="form-label">Frecuencia (Hz)</label>
          <div className="row align-items-center">
            <div className="col-md-8">
              <input
                type="range"
                className="form-range"
                min="1"
                max="2000"
                step="1"
                value={freq}
                onChange={(e) => setFreq(+e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                value={freq}
                min="1"
                max="2000"
                onChange={(e) => setFreq(+e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Amplitud */}
        <div className="col-12 mb-3">
          <label className="form-label">Amplitud</label>
          <div className="row align-items-center">
            <div className="col-md-8">
              <input
                type="range"
                className="form-range"
                min="0.1"
                max="5"
                step="0.1"
                value={amp}
                onChange={(e) => setAmp(+e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                value={amp}
                min="0.1"
                max="5"
                step="0.1"
                onChange={(e) => setAmp(+e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tasa de muestreo */}
        <div className="col-12 mb-3">
          <label className="form-label">Tasa de muestreo (Hz)</label>
          <div className="row align-items-center">
            <div className="col-md-8">
              <input
                type="range"
                className="form-range"
                min="100"
                max="20000"
                step="100"
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                value={rate}
                min="100"
                max="20000"
                step="100"
                onChange={(e) => setRate(+e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="mt-4 text-center">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        ) : (
          imgSrc && <img src={imgSrc} alt="Resultado" className="img-fluid mt-2" />
        )}
      </div>
    </div>
  );
}

export default App;
