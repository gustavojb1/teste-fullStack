import { forwardRef, useState } from "react";
import styled from "styled-components";
import Toast from "./Toast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const ContainerForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 0.2fr 0.2fr 0.2fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid var(--gray-300);
  outline: none;
  transition: border-color 0.5s ease;
  width: 100%;
  font-size: 1rem;

  &:focus {
    border-color: var(--blue-400);
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: var(--blue-500);
  color: var(--white);
  font-weight: bold;
  transition: background-color 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-600);
  }
`;

const NewClient = forwardRef((props, ref) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pontoX, setPontoX] = useState("");
  const [pontoY, setPontoY] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [styleToast, setStyleToast] = useState("warning");

  const addClient = async () => {
    try {
        const response = await fetch(
            `http://${import.meta.env.VITE_SERVER_HOST}:${
              import.meta.env.VITE_SERVER_PORT
            }/clients`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone,
                x: Number(pontoX),
                y: Number(pontoY),
              }),
            }
        );

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }
        setNome("");
        setEmail("");
        setTelefone("");
        setPontoX("");
        setPontoY("");
        setToastMessage("Cliente adicionado com sucesso");
        setStyleToast("success");
        setShowToast(true);
        ref.current.getDados();
    } catch (error) {
        setStyleToast("warning");
        setToastMessage(error.message);
        setShowToast(true);
        // console.log(error.message);
    }
};
  const handleSubmit = (e) => {
    e.preventDefault();

      addClient();

  };

  return (
    <Container>
      {showToast && (
        <Toast
          message={toastMessage}
          setShowToast={setShowToast}
          setMessage={setToastMessage}
          styleToast={styleToast}  
        />
      )}
      <Title>Adicionar Cliente</Title>
      <ContainerForm onSubmit={handleSubmit}>

        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <Input
          type="text"
          placeholder="X"
          value={pontoX}
          onChange={(e) => setPontoX(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Y"
          value={pontoY}
          onChange={(e) => setPontoY(e.target.value)}
        />
        <Button type="submit">Adicionar</Button>
      </ContainerForm>
    </Container>
  );
});

NewClient.displayName = "NewClient";

export default NewClient;
