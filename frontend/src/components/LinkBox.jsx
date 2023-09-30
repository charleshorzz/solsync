import React, { useState } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/animatedbutton';
import "../components/ResultBox.css";

const SendOneLamportToRandomAddress = () => {
  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('')

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const navigate = useNavigate();

  const options = ['NFT', 'Funds Transfer', 'Staking', 'Subscriptions', 'Donations']

  const recipients = JSON.parse(localStorage.getItem('recipients') || '[]')

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
        description: selectedOption,
        amount: amount,
      })

      localStorage.setItem("records", JSON.stringify(records))
      navigate('/result');
    } catch (error) {
      console.error(error);
      // Handle errors appropriately
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'block', margin: '4rem auto 0 auto', width: '40%' }}>
      <h1>Transfer To</h1>
      
      <Form onSubmit={submitHandler}>
        {recipients.length === 0 ? (  
          <FormGroup controlId='targetAddress' className='my-3'>
            <FormLabel>
              Wallet Address
            </FormLabel>
            <a href='/recipients' className='mx-2'>Add Recipients Here</a>
            <FormControl type='text' placeholder='Enter Wallet Address' value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)}></FormControl>
          </FormGroup>
        ) : (
          <FormControl
            as='select'
            value={targetAddress}
            onChange={(e) => setTargetAddress(e.target.value)}
          >
            <option value=''>Select Recipient</option>
            {recipients.map((recipientOp) => (
              <option key={recipientOp.recipientAddress} value={recipientOp.recipientAddress}>
                {recipientOp.recipientName}
              </option>
            ))}
          </FormControl>
        )}
        

        <FormGroup controlId='amount' className='my-3'>
          <FormLabel>
            Amount
          </FormLabel>
          <FormControl type='text' placeholder='Enter Amount of Sol ' value={amount} onChange={(e) => setAmount(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='description' className='my-3'>
          <FormLabel>
            Description
          </FormLabel>
          <FormControl
              as='select'
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value=''>Select Description</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </FormControl>
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
    </div>
  );
};

const LinkBox = () => {
  return <SendOneLamportToRandomAddress />;
};

export default LinkBox;
