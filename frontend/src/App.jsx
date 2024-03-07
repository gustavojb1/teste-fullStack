import GlobalStyle from './components/GlobalStyle'
import styled from 'styled-components';
import TableClientes from './components/TableClientes';
import { useRef, useState } from 'react';
import NewClient from './components/NewClient';
import ButtonOpenModal from './components/ButtonOpenModal';
import ModalRota from './components/ModalRota';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  height: 100vh;
  padding: 2rem 5rem;

  @media (max-width: 1000px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding:  0.75rem;
    row-gap: 1rem;
  }
`

const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;


  @media (max-width: 768px) {
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
    flex-direction:  column;
  }
`;

const Text = styled.h1`
  position: relative;
  background-color: var(--blue-300);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

function App() {

  const tableRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);


  return (
    <>
      <GlobalStyle />
      <ModalRota openModal={openModal} setOpenModal={setOpenModal} />
      <Container>
        <Title>
          <Text>Teste FullStack Facilita Jurídico</Text>
          <ButtonOpenModal setOpenModal={setOpenModal} />
        </Title>
        <TableClientes ref={tableRef}/>
        <NewClient ref={tableRef}/>
      </Container>
    </>
  )
}

export default App;