import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Toast from "./Toast";

const Container = styled.div`
  display: ${(props) => (props.openModal ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  @media (max-width: 1000px) {
    justify-content: flex-start;
    padding-top: 2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 80vh;
  width: 80vw;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  overflow-x: auto;

  @media (max-width: 1000px) {
    height: auto;
    width: 95vw;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 1rem;
  min-width: 700px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-weight: 900;
  cursor: pointer;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
`;

const Table = styled.div`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    font-size: 1rem;
  }
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1.5fr 1fr 0.3fr 0.3fr;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-right: 1px solid var(--gray-300);
  border-top: 1px solid var(--gray-300);
  border-left: 1px solid var(--gray-300);
  min-width: 700px;

  &:hover {
    background-color: var(--gray-100);
  }
`;

const TableHeadItem = styled.div`
  padding: 0.75rem;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid var(--gray-300);
  border-right: 1px solid var(--gray-300);
  transition: background-color 0.5s ease;

  &:last-child {
    border-right: none;
  }
`;

const TableItem = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 1.5fr 1fr 0.3fr 0.3fr;
  background-color: var(--white);
  transition: background-color 0.5s ease;
  border-bottom: 1px solid var(--gray-300);
  border-right: 1px solid var(--gray-300);
  border-left: 1px solid var(--gray-300);
  min-width: 700px;

  &:nth-child(2n) {
    background-color: var(--gray-050);
  }

  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  &:hover {
    background-color: var(--gray-100);
  }
`;

const TableItemData = styled.div`
  padding: 0.75rem 0rem;
  text-align: center;
  border-right: 1px solid var(--gray-300);
  overflow: auto;
  &:last-child {
    border-right: none;
  }
`;

const ModalRota = ({ openModal, setOpenModal }) => {
  const [bruteForce, setBruteForce] = useState([]);
  const [heuristic, setHeuristic] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [styleToast, setStyleToast] = useState("warning");

  const getRotaBruteForce = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/clients/brute-force`
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      const data = await response.json();
      setBruteForce(data);
    } catch (error) {
      setStyleToast("warning");
      setToastMessage(error.message);
      setShowToast(true);
      // console.error(error);
    }
  };

  const getRotaHeuristic = async () => {
    try {
      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/clients/heuristic`
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      const data = await response.json();
      setHeuristic(data);
    } catch (error) {
      setStyleToast("warning");
      setToastMessage(error.message);
      setShowToast(true);
      // console.error(error);
    }
  };

  useEffect(() => {
    if (openModal) {
      Promise.all([getRotaBruteForce(), getRotaHeuristic()])
        .then(() => console.log("Ambas as requisições foram concluídas."))
        .catch((error) =>
          console.error(`Erro em uma ou ambas as requisições: ${error}`)
        );
    }
  }, [openModal]);
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Container openModal={openModal} onClick={closeModal}>
      {showToast && (
        <Toast
          message={toastMessage}
          setShowToast={setShowToast}
          setMessage={setToastMessage}
          styleToast={styleToast}
        />
      )}
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>
          <span>
            Cálculo da rota mais rápida utilizando dois algorítimos diferentes,
            o Força Bruta e o Heurístico
          </span>
          <CloseButton onClick={closeModal}>X</CloseButton>
        </Title>
        <DataContainer>
          <SubTitle>Força Bruta</SubTitle>
          <Table>
            <TableHead>
              <TableHeadItem></TableHeadItem>
              <TableHeadItem>Nome</TableHeadItem>
              <TableHeadItem>Email</TableHeadItem>
              <TableHeadItem>Telefone</TableHeadItem>
              <TableHeadItem>X</TableHeadItem>
              <TableHeadItem>Y</TableHeadItem>
            </TableHead>
            {bruteForce.rota &&
              bruteForce.rota.map((cliente, index) => {
                return (
                  <TableItem key={index}>
                    <TableItemData>{index + 1}º</TableItemData>
                    <TableItemData>{cliente.nome}</TableItemData>
                    <TableItemData>{cliente.email}</TableItemData>
                    <TableItemData>{cliente.telefone}</TableItemData>
                    <TableItemData>{cliente.x}</TableItemData>
                    <TableItemData>{cliente.y}</TableItemData>
                  </TableItem>
                );
              })}
          </Table>
        </DataContainer>
        <DataContainer>
          <SubTitle>Heuristica</SubTitle>
          <Table>
            <TableHead>
              <TableHeadItem></TableHeadItem>
              <TableHeadItem>Nome</TableHeadItem>
              <TableHeadItem>Email</TableHeadItem>
              <TableHeadItem>Telefone</TableHeadItem>
              <TableHeadItem>X</TableHeadItem>
              <TableHeadItem>Y</TableHeadItem>
            </TableHead>
            {heuristic.rota &&
              heuristic.rota.map((cliente, index) => {
                return (
                  <TableItem key={index}>
                    <TableItemData>{index + 1}º</TableItemData>
                    <TableItemData>{cliente.nome}</TableItemData>
                    <TableItemData>{cliente.email}</TableItemData>
                    <TableItemData>{cliente.telefone}</TableItemData>
                    <TableItemData>{cliente.x}</TableItemData>
                    <TableItemData>{cliente.y}</TableItemData>
                  </TableItem>
                );
              })}
          </Table>
        </DataContainer>
        {/* 
        <h2>Heuristic</h2>
        {heuristic.rota && heuristic.rota.map((item, index) => (
          <div key={index}>
            <p>Nome: {item.nome}</p>
            <p>Email: {item.email}</p>
            <p>Telefone: {item.telefone}</p>
            <p>Coordenadas: ({item.x}, {item.y})</p>
          </div>
        ))} */}
      </Content>
    </Container>
  );
};

ModalRota.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default ModalRota;
