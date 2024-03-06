import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import Toast from "./Toast";
import TrashSvg from '/public/trash.svg';

const TableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem 0.5rem 0rem 0.5rem;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const TableContainer = styled.div`
  overflow: auto;
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
  grid-template-columns: 1fr 1.5fr 1fr 0.3fr 0.3fr 0.2fr;

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
  grid-template-columns: 1fr 1.5fr 1fr 0.3fr 0.3fr 0.2fr; 
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

const ContentFilterAndSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TableFilter = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 900px) {
    gap: 0.5rem;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding-inline: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background-color: var(--blue-500);
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: var(--blue-600);
  }

  &:disabled {
    background-color: var(--gray-300);
    cursor: not-allowed;
  }
`;

const TableSort = styled.div`
  display: flex;
  gap: 1rem;
`;

const SelectColumn = styled.select`
  padding-left: 0.5rem;
  padding-block: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
`;

const SelectOrder = styled.select`
  padding-left: 0.5rem;
  padding-block: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  padding-top: 1rem;
  min-width: 700px;
  padding-bottom: 1rem;

`;

const ItemPerPage = styled.select`
  padding-left: 0.5rem;
  padding-block: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
`;

const ActualPage = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--gray-300);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SVG = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;



const TableClientes = forwardRef((props, ref) => {
  const [clientes, setClientes] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 9,
    nome: "",
    email: "",
    telefone: "",
    columToOrder: "nome",
    asc: true,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [styleToast, setStyleToast] = useState("warning");


  const getDados = async () => {
    try {
      const params = new URLSearchParams(filter);

      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_HOST}:${
          import.meta.env.VITE_SERVER_PORT
        }/clients?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
  }
        const data = await response.json();
      setClientes(data);
} catch (error) {
  setStyleToast("warning");
  setToastMessage(error.message);
  setShowToast(true);
  
}

    
  };

  useEffect(() => {
    getDados();
    return () => {
      setShowToast(false);
    };
  }, [filter]);

  const handleClickReset = () => {
    setFilter({
      page: 1,
      pageSize: 10,
      nome: "",
      email: "",
      telefone: "",
      columToOrder: "nome",
      asc: true,
    });
  };

  const handleClickNextPage = () => {
    if (filter.page >= clientes.totalPages) return;
    setFilter({ ...filter, page: filter.page + 1 });
  };

  const handleClickPreviousPage = () => {
    if (filter.page === 1) return;
    setFilter({ ...filter, page: filter.page - 1 });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
          `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/clients/${id}`,
          {
            method: "DELETE",
          }
      );
      if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
      }
      setToastMessage("Cliente deletado com sucesso");
      setStyleToast("success");
      setShowToast(true);
      getDados();
  } catch (error) {
      setStyleToast("warning");
      setToastMessage(error.message);
      setShowToast(true);
      
  }
  }

  useImperativeHandle(ref, () => ({
    getDados,
  }));

  return (
    <TableContent>
      <ContentFilterAndSort>
        <TableFilter>
          <Input
            type="text"
            placeholder="Nome"
            value={filter.nome}
            onChange={(e) => setFilter({ ...filter, nome: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Email"
            value={filter.email}
            onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Telefone"
            value={filter.telefone}
            onChange={(e) => setFilter({ ...filter, telefone: e.target.value })}
          />
          <Button onClick={handleClickReset}>Resetar</Button>
        </TableFilter>
        <TableSort>
          <SelectColumn
            value={filter.columToOrder}
            onChange={(e) =>
              setFilter({ ...filter, columToOrder: e.target.value })
            }
          >
            <option value="nome">Nome</option>
            <option value="email">Email</option>
            <option value="telefone">Telefone</option>
            <option value="x">Ponto X</option>
            <option value="y">Ponto Y</option>
          </SelectColumn>
          <SelectOrder
            value={filter.asc}
            onChange={(e) => setFilter({ ...filter, asc: e.target.value })}
          >
            <option value={true}>Crescente</option>
            <option value={false}>Decrescente</option>
          </SelectOrder>
        </TableSort>
      </ContentFilterAndSort>

      {showToast && (
        <Toast
          message={toastMessage}
          setShowToast={setShowToast}
          setMessage={setToastMessage}
          styleToast={styleToast}
        />
      )}
      <TableContainer>

      <Table>
        <TableHead>
          <TableHeadItem>Nome</TableHeadItem>
          <TableHeadItem>Email</TableHeadItem>
          <TableHeadItem>Telefone</TableHeadItem>
          <TableHeadItem>X</TableHeadItem>
          <TableHeadItem>Y</TableHeadItem>
          <TableHeadItem></TableHeadItem>
        </TableHead>
        {clientes.data?.map((cliente) => {
          return (
            <TableItem key={cliente.id}>
              <TableItemData>{cliente.nome}</TableItemData>
              <TableItemData>{cliente.email}</TableItemData>
              <TableItemData>{cliente.telefone}</TableItemData>
              <TableItemData>{cliente.x}</TableItemData>
              <TableItemData>{cliente.y}</TableItemData>
              <TableItemData><SVG src={TrashSvg} alt="Trash" onClick={()=>{handleDelete(cliente.id)}}/></TableItemData>
            </TableItem>
          );
        })}

      </Table>
        <TableFooter>
          <ItemPerPage
            value={filter.pageSize}
            onChange={(e) =>
              setFilter({ ...filter, pageSize: e.target.value, page: 1 })
            }
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </ItemPerPage>
          <ActualPage>Pagina {filter.page}</ActualPage>
          <Button
            onClick={handleClickPreviousPage}
            disabled={filter.page === 1}
          >
            Anterior
          </Button>
          <Button
            onClick={handleClickNextPage}
            disabled={filter.page >= clientes.totalPages}
          >
            Próximo
          </Button>
        </TableFooter>
      </TableContainer>

    </TableContent>
  );
});

TableClientes.displayName = 'TableClientes';

export default TableClientes;
