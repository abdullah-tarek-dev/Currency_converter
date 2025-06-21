// import React, { useEffect, useState } from 'react';
// import '../styles/main.css';

// const CurrencyConverter = () => {
//   const [currencyList, setCurrencyList] = useState([]);
//   const [fromCurrency, setFromCurrency] = useState('JPY');
//   const [toCurrency, setToCurrency] = useState('USD');
//   const [amount, setAmount] = useState(1);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

// useEffect(() => {
//   fetch('https://api.exchangerate.host/symbols')
//     .then((res) => res.json())
//     .then((data) => {
//         console.log("API Response:", data); // دي علشان نشوف شكل الداتا
//       if (data && data.symbols) {
//         const symbols = Object.keys(data.symbols);
//         setCurrencyList(symbols);
//       } else {
//         alert("Failed to load currency symbols.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching symbols:", error);
//       alert("Network error while loading symbols.");
//     });
// }, []);


//   const handleConvert = async () => {
//     if (!amount || isNaN(amount)) {
//       alert("Please enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
//       );
//       const data = await res.json();
//       setResult(data.result.toFixed(2));
//     } catch (error) {
//       alert("Error fetching conversion data. Please try again later.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Currency Converter</h1>
//       <div className="converter">
//         <h2 className="from">From</h2>
//         <select
//           className="select_from"
//           value={fromCurrency}
//           onChange={(e) => setFromCurrency(e.target.value)}
//         >
//           {currencyList.map((currency) => (
//             <option key={currency} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           className="amount"
//           placeholder="Enter your Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <h2 className="from">To</h2>
//         <select
//           className="select_to"
//           value={toCurrency}
//           onChange={(e) => setToCurrency(e.target.value)}
//         >
//           {currencyList.map((currency) => (
//             <option key={currency} value={currency}>
//               {currency}
//             </option>
//           ))}
//         </select>

//         <button className="convert-button" onClick={handleConvert}>
//           {loading ? 'Loading...' : 'Convert'}
//         </button>

//         <input
//           type="text"
//           className="result"
//           value={result !== null ? result : ''}
//           readOnly
//         />
//       </div>
//     </div>
//   );
// };

// export default CurrencyConverter;
import React, { useEffect, useState } from 'react';
import '../styles/main.css';

const CurrencyConverter = () => {
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        const symbols = Object.keys(data.rates);
        setCurrencyList(symbols);
      })
      .catch((error) => {
        console.error("Error fetching symbols:", error);
        alert("Network error while loading symbols.");
      });
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid amount");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amount);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await res.json();
      const rate = data.rates[toCurrency];
      setResult((amount * rate).toFixed(2));
    } catch (error) {
      alert("Error fetching conversion data. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Currency Converter</h1>
      <div className="converter">
        <h2 className="from">From</h2>
        <select className="select_from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="amount"
          placeholder="Enter your amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <h2 className="from">To</h2>
        <select className="select_to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <button className="convert-button" onClick={handleConvert}>
          Convert
        </button>

        <input
          type="text"
          className="result"
          readOnly
          value={loading ? 'Loading...' : result}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;

