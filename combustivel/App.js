import { useState } from 'react';
import './App.css'; // Supondo que você vai criar um CSS semelhante ao estilo da imagem

function App() {
  const [alcool, setAlcool] = useState('');
  const [gasolina, setGasolina] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    const precoAlcool = parseFloat(alcool);
    const precoGasolina = parseFloat(gasolina);

    if (!precoAlcool || !precoGasolina || precoGasolina === 0) {
      alert('Por favor, insira valores válidos!');
      return;
    }

    const proporcao = precoAlcool / precoGasolina;

    if (proporcao < 0.7) {
      setResultado('Álcool');
    } else {
      setResultado('Gasolina');
    }
  };

  const limpar = () => {
    setAlcool('');
    setGasolina('');
    setResultado(null);
  };

  return (
    <div className="container">
      <h1>Qual melhor opção?</h1>

      {!resultado ? (
        <div className="form">
          <label>Álcool (preço por litro):</label>
          <input
            type="number"
            value={alcool}
            onChange={(e) => setAlcool(e.target.value)}
            placeholder="Ex: 4.60"
          />

          <label>Gasolina (preço por litro):</label>
          <input
            type="number"
            value={gasolina}
            onChange={(e) => setGasolina(e.target.value)}
            placeholder="Ex: 7.30"
          />

          <button onClick={calcular}>Calcular</button>
        </div>
      ) : (
        <div className="resultado">
          <h2>Compensa usar <strong>{resultado}</strong></h2>
          <p>Com os preços:</p>
          <p>Álcool: R$ {parseFloat(alcool).toFixed(2)}</p>
          <p>Gasolina: R$ {parseFloat(gasolina).toFixed(2)}</p>
          <button onClick={limpar}>Calcular novamente</button>
        </div>
      )}
    </div>
  );
}

export default App;
