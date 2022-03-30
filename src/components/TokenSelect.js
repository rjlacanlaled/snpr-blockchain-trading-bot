import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const TokenSelect = ({ onTokenSelect, onFinish }) => {
    const [searchResult, setSearchResult] = useState('');
    const [search, setSearch] = useState('');

    const handleSearch = e => {
        e.preventDefault();
    };

    return (
        <Container>
            <TitleContainer>
                <Title>Select a token</Title>
                <StyledAiOutlineClose onClick={() => onFinish(false)} />
            </TitleContainer>
            <SelectionContainer>
                <SearchContainer>
                    <ContractAddress placeholder='Search name or paste address' />
                    <SearchResult onClick={handleSearch} disabled={!searchResult}>
                        {searchResult || 'Search'}
                    </SearchResult>
                </SearchContainer>
                <CommonTokensContainer></CommonTokensContainer>
            </SelectionContainer>
            <TokenList></TokenList>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: 500px;
    width: 400px;

    border-radius: 15px;
    border: 0.1px solid rgb(180, 180, 180, 0.4);
    background-color: hsl(216, 41%, 10%, 0.3);
`;
const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
`;
const Title = styled.p`
    margin: 15px;
    font-size: 2rem;
    font-weight: 200;
    color: hsl(0, 0%, 100%);
`;

const StyledAiOutlineClose = styled(AiOutlineClose)`
    cursor: pointer;
    padding: 8px;
    font-size: 2rem;
    border-radius: 20px;
    border: 1px solid rgb(180, 180, 180, 0.3);
    opacity: 0.5;
    color: white;

    margin: 15px;

    &:hover {
        opacity: 1;
    }
`;
const SelectionContainer = styled.div`
    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
`;
const SearchContainer = styled.div`
    display: flex;
    gap: 5px;
    margin: 15px;
`;
const SearchResult = styled.button`
    flex: 1 25%;
    overflow: hidden;
    cursor: pointer;

    background-color: transparent;
    border: 0.5px solid rgb(180, 180, 180, 0.2);
    border-radius: 10px;
    padding: 5px;

    text-overflow: ellipsis;
    color: white;

    &:hover {
        background-color: rgb(180, 180, 180, 0.4);
    }

    &:disabled {
        background-color: rgb(180, 180, 180, 0.3);
        color: hsl(0, 0%, 60%);
        cursor: not-allowed;

        &:hover {
            background-color: rgb(180, 180, 180, 0.1);
        }
    }
`;
const ContractAddress = styled.input`
    flex: 1 80%;
    padding: 15px;
    font-size: 1.1rem;
    font-weight: 200;
    flex-shrink: 0;

    border-radius: 10px;
    border: 0.1px solid rgb(180, 180, 180, 0.5);
    background-color: transparent;
    color: white;
    outline: none;

    &:focus {
        border: 1px solid hsl(194, 81%, 46%);
    }
`;
const CommonTokensContainer = styled.div``;
const TokenList = styled.div``;

export default TokenSelect;
