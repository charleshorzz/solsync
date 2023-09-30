import React, { useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Form, Button, FormGroup, FormLabel, FormControl, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/animatedbutton';
import "./style.css";
import "../components/ResultBox.css";

const SendOneLamportToRandomAddress = () => {
  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const navigate = useNavigate();

  const records = JSON.parse(localStorage.getItem("records") || "[]")

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      if (!publicKey) throw new WalletNotConnectedError();

      const targetAddressKey = new PublicKey(targetAddress);

      const floatAmount = parseFloat(amount);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: targetAddressKey,
          lamports: LAMPORTS_PER_SOL * floatAmount,
        })
      );

      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'processed');

      records.push({
        signature: signature,
        description: description,
        amount: amount
      })

      localStorage.setItem("records", JSON.stringify(records))
      navigate('/result');
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mt-4">
            <h1>Transfer To</h1>
          </div>
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='targetAddress' className='my-3'>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl type='text' placeholder='Enter Wallet Address' value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} />
            </FormGroup>

            <FormGroup controlId='amount' className='my-3'>
              <FormLabel>Amount</FormLabel>
              <FormControl type='text' placeholder='Enter Amount of Sol' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </FormGroup>

            <FormGroup controlId='description' className='my-3'>
              <FormLabel>Description</FormLabel>
              <FormControl type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>

            <div className="text-center">
              <AnimatedButton
                type="submit"
                link={publicKey ? "/publickey" : ""}
                firstText="Confirm"
                secondText="Transfer"
                className={`w-100 my-3 ${!publicKey ? 'disabled' : ''}`}
                disabled={!publicKey}
              />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const LinkBox = () => {
  return <SendOneLamportToRandomAddress />;
};

export default LinkBox;
