import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${(props) => (props.styleToast === "warning" ? "var(--red-500)" : "var(--green-500)")};

  color: var(--white);
  padding: 1rem;
  border-radius: 4px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 999;
`;

function Toast({ message, duration = 3000, setMessage, setShowToast, styleToast }) {


  const [show, setShow] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      const removeTimer = setTimeout(() => {
        setRender(false);
        setMessage(""); // Limpa a mensagem quando o componente é desmontado
        setShowToast(false);
      }, 500); // espera a transição terminar
      return () => {
        clearTimeout(removeTimer);
        clearTimeout(timer);
      };
    }, duration);
  }, [duration, setMessage, setShowToast]);

  return render ? <ToastContainer show={show} styleToast={styleToast}>{message}</ToastContainer> : null;
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  setMessage: PropTypes.func,
  setShowToast: PropTypes.func.isRequired,
  styleToast: PropTypes.string.isRequired,
};

export default Toast;