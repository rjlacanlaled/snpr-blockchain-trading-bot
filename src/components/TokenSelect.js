import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useBlockchain from './hooks/useBlockchain';
import { fetchTokenDetails, getTokenDatabase } from '../services/pancakeswap';

const TokenSelect = ({ onTokenChange, onFinish }) => {
    const { isValidAddress } = useBlockchain();
    const [searchResult, setSearchResult] = useState('Search');
    const [search, setSearch] = useState('');
    const [symbol, setSymbol] = useState('');
    const [name, setName] = useState('');
    const [contract, setContract] = useState('');

    const handleSearchConfirm = e => {
        e.preventDefault();
        onTokenChange({ symbol, name, contract });
    };


    useEffect(() => {
        const findToken = async () => {
            try {
                const tokenDetails = await fetchTokenDetails(search);
                setSearchResult(tokenDetails.symbol);
                setSymbol(tokenDetails.symbol);
                setName(tokenDetails.name);
                setContract(tokenDetails.contract);
            } catch (err) {
                console.log(err);
                setSearchResult('Invalid');
            }
        };

        if (search === '') return setSearchResult('Search');
        if (!isValidAddress(search)) return setSearchResult('Invalid');

        findToken();
    }, [search]);

    const handleTokenClick = (e, { name, symbol, contract }) => {
        e.preventDefault();
        onTokenChange({ symbol, name, contract });
        onFinish(false);
    };

    return (
        <Container>
            <TitleContainer>
                <Title>Select a token</Title>
                <StyledAiOutlineClose onClick={() => onFinish(false)} />
            </TitleContainer>
            <SelectionContainer>
                <SearchContainer>
                    <ContractAddress
                        placeholder='Search name or paste address'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <SearchResult
                        onClick={handleSearchConfirm}
                        disabled={!searchResult || searchResult === 'Search' || searchResult === 'Invalid'}
                    >
                        {searchResult}
                    </SearchResult>
                </SearchContainer>
                <CommonTokensContainer></CommonTokensContainer>
            </SelectionContainer>
            <TokenList>
                <TokenListLabel>Token List</TokenListLabel>
                {getTokenDatabase().map(token => {
                    return (
                        <TokenButton
                            key={token.contract}
                            value={token.contract}
                            onClick={(e) => handleTokenClick(e, token)}
                        >
                            {token.symbol}
                        </TokenButton>
                    );
                })}
            </TokenList>
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

const TokenListLabel = styled.p`
    width: 100%;
    color: white;
    padding: 20px;
    text-align: center;
    border-bottom: 0.1px solid rgb(180, 180, 180, 0.4);
    position: sticky;
    top: 0;
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
const TokenList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    overflow: auto;
`;

const TokenButton = styled.button`
    cursor: pointer;

    background-color: transparent;
    border: 0.5px solid rgb(180, 180, 180, 0.2);
    border-radius: 10px;
    padding: 20px;

    text-overflow: ellipsis;
    color: white;
    max-width: 100%;

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

export default TokenSelect;
