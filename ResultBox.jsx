import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import './ResultBox.css';

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
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Fetching transaction data...</p>
      </div>
    );
  } else if (!transactionData.length) {
    // Render empty state when no transactions are found
    return (
      <div className="text-center">
        <p>No transactions found.</p>
      </div>
    );
  }

  return (
  <Container>
    {useDelay ? <h1>Transaction Results</h1> : <h2>Transaction History</h2>}
    
    {/* Apply the container style to the transaction history */}
    <div className="transaction-history-container">
      {transactionData.map((tx, index) => {
        const matchingRecord = records.find((record) => record.signature === tx.signature);

        const transactionStatus = tx.confirmationStatus === 'confirmed' ? 'success' : 'warning';

        return (
          <Card key={index} className={`mb-3 transaction-card ${transactionStatus}`}>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <strong>Transaction Signature:</strong> {tx?.signature}
                </Col>
                <Col md={4}>
                  <strong>Status:</strong> {tx.confirmationStatus}
                </Col>
                <Col md={4}>
                  <strong>Timestamp:</strong> {new Date(tx.blockTime * 1000).toLocaleString()}
                </Col>
                {matchingRecord && (
                  <>
                    <Col md={4}>
                      <strong>Amount:</strong> {matchingRecord.amount} sol
                    </Col>
                    <Col md={8}>
                      <strong>Description:</strong> {matchingRecord.description}
                    </Col>
                  </>
                )}
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  </Container>
);
}  

export default ResultBox;




