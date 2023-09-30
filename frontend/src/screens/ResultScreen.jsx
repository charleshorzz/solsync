import React from 'react'
import ResultBox from '../components/ResultBox'

const ResultScreen = () => {
  return (
    <div>
        <ResultBox numTx={1} useDelay={true} initialDelay={13000}/>
    </div>
  )
}

export default ResultScreen

