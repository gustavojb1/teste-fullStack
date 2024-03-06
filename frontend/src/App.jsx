import GlobalStyle from './components/GlobalStyle'
import styled from 'styled-components';
import TableClientes from './components/TableClientes';
import { useRef } from 'react';
import NewClient from './components/NewClient';

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
    padding:  0.75rem
  }
`

const Title = styled.h1`
  position: relative;
  display: flex;


  @media (max-width: 768px) {
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
  }
`;

const Text = styled.span`
  position: relative;
  background-color: var(--blue-300);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

function App() {

  const tableRef = useRef(null);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title><Text>Teste FullStack Facilita Jurídico</Text></Title>
        <TableClientes ref={tableRef}/>
        {/* <button onClick={() => tableRef.current.getDados()}>Adicionar Cliente</button> */}
        <NewClient ref={tableRef}/>

      </Container>
    </>
  )
}

export default App;