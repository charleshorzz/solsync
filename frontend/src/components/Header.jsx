import React from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'



const Header = () => {
  return (
    <header>
        {/* Expand set to lg for hamburger menu to show up */}
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            {/* Put in a container so the inner element dont go to the edge of browser */}
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        Solsync
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                    <LinkContainer to='/recipients' className='px-4'>
                        <Nav.Link>
                           Add Recipients
                        </Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to='/dashboard' className='px-4'>
                        <Nav.Link>
                           Tracker
                        </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/about' className='px-4'>
                        <Nav.Link>
                            About Us
                        </Nav.Link>
                        </LinkContainer>

                        <WalletMultiButton className='px-4'/>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
