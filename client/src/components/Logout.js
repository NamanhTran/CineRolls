import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Logout = ({ setLoggedIn, setUser }) => {
    const history = useHistory();

    useEffect(() => {
        console.log('logout');
        const logout = async () => {
            try {
                await axios.post('https://localhost:3100/logout');
                setUser('');
                setLoggedIn(false);
                history.push('/');
                
            } catch (error) {
                console.log(error);
            }
        }
        
        logout();
    });

    return (
        "Logout"
    );
}

export default Logout;