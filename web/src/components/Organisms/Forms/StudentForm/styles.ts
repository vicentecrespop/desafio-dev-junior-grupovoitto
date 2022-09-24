import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 15px;
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;
`

export const Input = styled.input`
    width: 100%;
    text-align: center;
    margin: 10px 0;
`

export const SubmitButton = styled.input`
    width: 50%;
    background-color: var(--color-primary);
    color: #fff;
    margin: 40px auto;
    padding: 10px 0;
    font-size: 1.3rem;
    font-weight: bold,
`