import styled from 'styled-components';
import DataTable from './DataTable';
import { Table, TableBody, TableContainer, TableData, TableHead, TableHeader, TableRow } from './styles/Table.styled';

const TransactionHistory = ({ tradeHistory, headers }) => {
    return (
        <Container>
            <StyledTableContainer>
                <StyledTable>
                    <StyledTableHead>
                        <TableRow>{headers && headers.map(header => <TableHeader key={header}>{header}</TableHeader>)}</TableRow>
                    </StyledTableHead>

                    <StyledTableBody></StyledTableBody>
                </StyledTable>
            </StyledTableContainer>
        </Container>
    );
};

const Container = styled.div`
    font-size: 0.5rem;
`;
const StyledTableContainer = styled(TableContainer)``;
const StyledTable = styled(Table)``;
const StyledTableHead = styled(TableHead)``;
const StyledTableBody = styled(TableBody)``;
const StyledTableHeader = styled(TableHeader)``;
const StyledTableRow = styled(TableRow)``;
const StyledTableData = styled(TableData)``;

export default TransactionHistory;
