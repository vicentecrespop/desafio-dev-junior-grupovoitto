import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 2.5rem;

  > header {
    margin-top: 1rem;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  border: solid 1px #aaa;
  border-left: none;
  border-bottom: none;

  @media (max-width: 700px) {
    display: none;
  }

`;

export const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

export const TableMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1.5rem;
  border: solid 1px #aaa;
  border-left: none;
  border-bottom: none;
  background: transparent;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const BodyLine = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background: transparent;

  & > div {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: #eee;
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;

export const Item = styled.div`
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  min-width: 80px;
  border-left: solid 1px #aaa;
  border-bottom: solid 1px #aaa;
  background: transparent;
  display: flex;
  

  
  @media (max-width: 1140px) {
    font-size: 0.7rem;
    min-width: 70px
  }
  
  @media (max-width: 1040px) {
    font-size: 0.5rem;
    min-width: 50px
  }

  @media (max-width: 700px) {
    :nth-last-child(1) {
      border-bottom: solid 1px #aaa;
    }
    border-bottom: none;
    text-align: center;
    min-width: 100%;
    font-size: 0.9rem;
  }
  `;

export const Message = styled.div`
  font-size: 1.3rem;
  text-align: center;
  width: 100%;
  padding-top: 15px;
  display: flex;
  justify-content: center;

  p {
    border: 1px solid #cccccc;
    border-radius: 10px;
    width: 45%;
    padding: 1rem 0rem;
  }

  @media (max-width: 700px) {
    font-size: 16px;

    p {
      width: 100%;
    }
  }
`;

export const Separator = styled.div`
  width: 100%;
  height: 1rem;

  @media (min-width: 700px) {
    display: none;
  }
`;

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

export const ActionButton = styled.button`
    background: transparent;
    color: var(--color-primary);
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 20px;
    margin: 0 auto;

    @media (max-width: 1230px) {
      font-size: 0.6rem;
      padding: 0 5px;
    }
`

export const MobileButton = styled.button`
    color: var(--color-primary);
    padding: 0 5px;
`


