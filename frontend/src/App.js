import React from 'react';
import { WalletConnectProvider } from './components/WalletConnectProvider';
import '@solana/wallet-adapter-react-ui/styles.css'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return(
    <WalletConnectProvider>
      <Header />
        <main className='py-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
      <Footer />
    </WalletConnectProvider>
  )
}

export default App;