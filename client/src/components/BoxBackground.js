import { Container, Paper, Box } from '@material-ui/core';

const BoxBackground = ({ children }) => {
    return (
        <Container>
            <Paper elevation={1}>
                <Box p={2} mt={4}>
                    {children}
                </Box>
            </Paper>
        </Container>
    );
}

export default BoxBackground;