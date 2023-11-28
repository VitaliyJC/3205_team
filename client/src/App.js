import React, { useState } from 'react';
import axios from 'axios';
import Mask from 'react-input-mask';

const App = () => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorInput, setErrorInput] = useState(null);

  const handleSearch = async () => {
    try {
      setSearchResult([]);
      setErrorInput(null);
      setLoading(true);
      const response = await axios.get(`http://localhost:4444/search`, {
        params: { email, number: number.replace(/-/g, '') },
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error:', error);
      setErrorInput(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  console.log(searchResult);

  return (
    <div
      style={{
        display: 'grid',
        flexDirection: 'column',
        gap: 10,
        justifyItems: 'center',
      }}
    >
      <div>
        <label>Email:</label>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Number:</label>
        <Mask
          mask='99-99-99'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'delay 5 seconds' : 'submit'}
        </button>
      </div>
      <div>
        <h2>Search Result:</h2>

        {errorInput && <p style={{ color: 'red' }}>{errorInput}</p>}

        {/* {!searchResult.length && <p>Not Found</p>} */}

        <ul>
          {searchResult.map((entry, index) => (
            <li key={index}>{`${entry.email}, ${entry.number}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

