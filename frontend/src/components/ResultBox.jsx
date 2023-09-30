import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { Row, Col } from 'react-bootstrap'

const ResultBox = ({ numTx, useDelay, initialDelay }) => {
  const endpoint = 'https://stylish-restless-sheet.solana-devnet.discover.quiknode.pro/4785d23d03f566851f11e97f29b5787cb6b048e8/';
  const solanaConnection = new Connection(endpoint);
  const { publicKey } = useWallet();

  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const records = JSON.parse(localStorage.getItem("records") || "[]");

  const fetchData = async () => {
    try {
      if (!publicKey) {
        throw new Error('Wallet not connected.');
      }

      const pubKey = publicKey;
      const transactionList = await solanaConnection.getSignaturesForAddress(pubKey, { limit: numTx });
      setTransactionData(transactionList);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      // Handle errors here
    } finally {
      setIsLoading(false); // Set loading state to false after data is fetched
    }
  };

  useEffect(() => {
    const fetchWithDelay = () => {
      setTimeout(() => {
        
        if (numTx !== transactionData?.length) {
          fetchData();
        }
      }, useDelay ? initialDelay : 0);
    };

    fetchWithDelay();

  }, [publicKey, numTx, solanaConnection, initialDelay]);

  if (isLoading && useDelay) {
    // Render loading state while data is being fetched
    return <div>Deploying Smart Contracts to Solana blockchain...</div>;
  } else {
    <div>Loading Transaction History...</div>
  }

  return (
    <div>
      {useDelay ? <h1>Transaction Results</h1> : <h2>Transaction History</h2>}
      {transactionData.map((tx, index) => {
        const matchingRecord = records.find((record) => record.signature === tx.signature);

        return (
          <Row className='my-2' key={index}>
            <Col md={10}>
            <strong>Transaction Signature: </strong> {tx?.signature}
            </Col>
            <Col className='my-2' md={2}>
              <strong>Status: </strong> {tx.confirmationStatus}
            </Col>
            <Col className='my-2' md={2}>
              <strong>Timestamp: </strong> {new Date(tx.blockTime * 1000).toLocaleString()}
            </Col>
            {matchingRecord && (
              <>
              <Col className='my-2' md={2}>
              <strong>Amount: </strong> {matchingRecord.amount} sol
              </Col>
              <Col className='my-2' md={2}>
                <strong>Description: </strong> {matchingRecord.description}
              </Col>
              </>
            )}
          </Row>
        );
      })}
    </div>
  );
};

export default ResultBox;


