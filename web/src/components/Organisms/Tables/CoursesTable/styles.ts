import styled from "styled-components";

export const ButtonsDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
`

export const Button = styled.button`
    background-color: var(--color-primary);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
`
export const ActionButton = styled.div`
  color: var(--color-primary);
  width: 100%;
  text-align: center;
  padding: 10px;
`

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: rgba(0,0,0,0.8);
  z-index: 1;
  opacity: 1;
  -webkit-transition: opacity 400ms ease-in;
  -moz-transition: opacity 400ms ease-in;
  transition: opacity 400ms ease-in;
`

export const Modal = styled.div`
width: 30%;
position: fixed;
top: 0px;
left: 35%;
margin: 10% auto;
padding: 15px 20px;
background: #fff;
z-index: 3;

@media (max-width: 1100px) {
  width: 40%;
  left: 30%;
}

@media (max-width: 700px) {
  width: 60%;
  left: 20%;
}

@media (max-width: 500px) {
  width: 80%;
  left: 10%;
}
` 

export const Container = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 2.5rem;

  > header {
    margin-top: 1rem;
  }
`;

export const SubmitButton = styled.button`
    width: 50%;
    background-color: var(--color-primary);
    color: #fff;
    margin: 40px auto;
    padding: 10px 0;
    font-size: 1.3rem;
    font-weight: bold,
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Label = styled.label`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`

export const Select = styled.select`
  font-size: 0.8rem;
  margin: 30px 0;
  text-align: center;
`



