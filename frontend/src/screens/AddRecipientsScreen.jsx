import React, { useState } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddRecipientsScreen = () => {
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const navigate = useNavigate();

  // Fetch recipients from localStorage or initialize as an empty array
  const recipientsString = localStorage.getItem('recipients') || '[]';
  const recipients = JSON.parse(recipientsString);

  const submitHandler = (e) => {
    e.preventDefault();
    recipients.push({
      recipientName: recipientName,
      recipientAddress: recipientAddress
    });

    // Update the recipients in localStorage
    localStorage.setItem("recipients", JSON.stringify(recipients));
    navigate('/');
  }

  return (
    <div style={{ textAlign: 'center', display: 'block', margin: '4rem auto 0 auto', width: '40%' }}>
      <h1>Add Recipients</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='recipientName' className='my-3'>
          <FormLabel>
            Recipient Name
          </FormLabel>
          <FormControl type='text' placeholder='Enter Recipient Name' value={recipientName} onChange={(e) => setRecipientName(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='recipientAddress' className='my-3'>
          <FormLabel>
            Recipient Address
          </FormLabel>
          <FormControl type='text' placeholder='Enter Recipient Address' value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)}></FormControl>
        </FormGroup>

        <Button type='submit' className='w-60 my-3'>
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddRecipientsScreen;

