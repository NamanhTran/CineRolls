import { TextField, withStyles } from "@material-ui/core";

const CustomTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#fff',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#fff',
        },
      },
    }
})(TextField);

export default CustomTextField;