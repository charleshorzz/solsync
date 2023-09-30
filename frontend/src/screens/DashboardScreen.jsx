import React, { useState } from 'react'
import ResultBox from '../components/ResultBox'
import { MDBInput } from 'mdb-react-ui-kit'

const DashboardScreen = () => {
  const [numTx, setNumTx] = useState(0)
  
  return (
    <>
      <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'space-between'}}>
        <h1>Dashboard </h1>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="numTx">Number of Transactions:</label>
        <MDBInput
        style={{ width: '40%'}}
          type="number"
          id="numTx"
          name="numTx"
          value={numTx}
          onChange={(e) => setNumTx(Number(e.target.value))}
        />
        </div>
      </div>

      

      <ResultBox numTx={numTx} useDelay={false}/>

    </>
  )
}

export default DashboardScreen

