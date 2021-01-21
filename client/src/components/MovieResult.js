import { Grid, Typography } from '@material-ui/core';

const MovieResult = ({ poster, title }) => {
    return (
    <Grid container spacing={2} alignItems="center" direction="row" className="image-result">
        <Grid item xs={1}>
            <img src={`${poster ? "https://image.tmdb.org/t/p/w500" + poster : 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/s150x150/119710013_177484657221030_7662811337725111718_n.jpg?_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_ohc=aiWg0C1jny0AX_UZYIC&tp=1&oh=116956072e4d080ea7c3664a0261e7bc&oe=60327946'}`} alt={title}/>
        </Grid>
        <Grid item xs>
            <Typography variant="h6">{title}</Typography>
        </Grid>
    </Grid>);
};

export default MovieResult;