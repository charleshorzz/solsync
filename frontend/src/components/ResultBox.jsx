import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { Row, Col } from 'react-bootstrap'
import AnikiHamster from "../assets/AnikiHamster.json"
import Lottie from 'lottie-react'
import Success from "../assets/Success.json"
import '../App.css'
import './ResultBox.css';
import { Container, Card} from 'react-bootstrap';

const ResultBox = ({ numTx, useDelay, initialDelay }) => {
  const endpoint = 'https://muddy-multi-emerald.solana-devnet.quiknode.pro/3633fac1243fbb34b7ed486e1a60052a36ec74be/';
  const solanaConnection = new Connection(endpoint);
  const { publicKey } = useWallet();

  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const records = JSON.parse(localStorage.getItem("records") || "[]");
  const style = {
    height: 400,
    width: 600
  }  

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
    return (
    <Row className='flex align-center'>
        <Col md={12}>
          <Lottie animationData={AnikiHamster} loop={true}className='hamster' style={style}/>
          <h1 className='deploying'>Deploying Smart Contracts to Solana blockchain...</h1>
        </Col>
    </Row>
    )
  } else {
    // Render empty state when no transactions are found
      <div className="text-center">
        <p>No transactions found.</p>
      </div>
  }

  return (
    <Container>
      {useDelay ? (<>
        <Lottie animationData={Success} loop={false}className='hamster' style={style}/>
      <h1>Transaction Results</h1>
        <div className="transaction-history-container">
        {transactionData.map((tx, index) => {
          const matchingRecord = records.find((record) => record.signature === tx.signature);
          const transactionStatus = tx.confirmationStatus === 'finalized' ? 'success' : 'warning';
          return (
            <Card key={index} className={`mb-3 transaction-card ${transactionStatus}`}>
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <a href={`https://explorer.solana.com/tx/${tx?.signature}?cluster=devnet`}>
                    <strong>Transaction Signature:</strong> {tx?.signature}
                    </a>
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
      </>
      ) : (
      <>
      <h2>Transaction History</h2>
      <div className="transaction-history-container">
      {transactionData.map((tx, index) => {
        const matchingRecord = records.find((record) => record.signature === tx.signature);
        const transactionStatus = tx.confirmationStatus === 'finalized' ? 'success' : 'warning';
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
      </>)}
  </Container>
  );
};

export default ResultBox;


