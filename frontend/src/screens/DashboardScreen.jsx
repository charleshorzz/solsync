import React, { useState } from 'react';
import ResultBox from '../components/ResultBox';
import { MDBInput } from 'mdb-react-ui-kit';
import Graph from '../components/Graph';
import '../index.css';

const DashboardScreen = () => {
  const [numTx, setNumTx] = useState(0);

  return (
    <>
      <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Expenses Tracker</h1>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="numTx">Number of Transactions:</label>
          <MDBInput
            style={{ width: '40%' }}
            type="number"
            id="numTx"
            name="numTx"
            value={numTx}
            onChange={(e) => setNumTx(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <Graph style={{ position: 'absolute', top: 0, left: 0 }} />
        <ResultBox numTx={numTx} useDelay={false} style={{ position: 'absolute', top: '20%', left: 0 }} />
      </div>
    </>
  );
};

export default DashboardScreen;

