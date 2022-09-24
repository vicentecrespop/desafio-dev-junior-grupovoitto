import styled from "styled-components";

export const Form = styled.form`
    width: 60%;
    max-width: 400px;
    min-width: 100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    text-align: left;
`

export const Label = styled.label`
    margin-bottom: 10px;
    color: #555;
`

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #e8e8e8;
    &focus: {
        outline: 0;
        border: 2px solid #25282E;
        box-shadow: 0 0 0 0 ;
    }
`

export const Button = styled.button`
    width: 200px;
    margin: 0 auto;
    text-transform: uppercase;
    color: #FFF;
    background-color: #25282E;
    border: 0;
    padding: 12px;
    cursor: pointer;
    &:hover {
        background-color: #141619;
    }
`

export const OptionsButton = styled.button`
    width: 100%;
    text-align: center;
    background: none;
    &:hover {
        text-decoration: underline;
    }
`