import { Container, Paper, Box } from '@material-ui/core';

const BoxBackground = ({ maxWidth, children }) => {
    return (
        <Container maxWidth={maxWidth}>
            <Paper elevation={2}>
                <Box p={2} mt={4}>
                    {children}
                </Box>
            </Paper>
        </Container>
    );
};

export default BoxBackground;