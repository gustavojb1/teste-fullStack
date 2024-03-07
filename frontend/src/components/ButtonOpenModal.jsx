import styled from 'styled-components';
import PropTypes from "prop-types";



const Button = styled.button`
    /* background-color: var(--blue-600); */
    background-color: #9BCF53;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    border: none;
    color: black;
    padding: 0px 15px;
    text-align: center;
    text-decoration: none;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: 600;

    &:hover {
        background-color: #7F9D35;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 15px 20px;
        font-size: 2rem;
        align-self: flex-end;
    }
    `;

const ButtonOpenModal = ({setOpenModal}) => {

    const handleClick = () => {
        setOpenModal(true)
    }

  return (
    <Button onClick={handleClick}>Calcular Rota</Button>
  )
}

ButtonOpenModal.propTypes = {
    setOpenModal: PropTypes.func.isRequired
}


export default ButtonOpenModal