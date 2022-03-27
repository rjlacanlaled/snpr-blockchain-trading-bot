// All pascal case props are components

const DataTable = ({
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeader,
    TableData,
    data,
    headers,
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableHeader>{header}</TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => {
                        return (
                            <TableRow>
                                {headers.map(key => (
                                    <TableData>{item[key]}</TableData>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
