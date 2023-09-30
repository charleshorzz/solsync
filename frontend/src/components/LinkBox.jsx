import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { useState } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ textAlign: 'center', display: 'block', margin: '4rem auto 0 auto', width: '40%' }}>
      <h1>Transfer To</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='targetAddress' className='my-3'>
          <FormLabel>
            Wallet Address
          </FormLabel>
          <FormControl type='text' placeholder='Enter Wallet Address' value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)}></FormControl>
        </FormGroup>

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
          <FormControl type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></FormControl>
        </FormGroup>

        <Button type='submit' disabled={!publicKey} className='w-60 my-3'>
          Confirm Transfer
        </Button>
      </Form>
    </div>
  );
};

const LinkBox = () => {
  return <SendOneLamportToRandomAddress />;
};

export default LinkBox;
