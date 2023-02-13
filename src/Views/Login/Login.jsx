import React, {
    useState
} from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const onChangeEmail = (e) => {
        // console.log(e.target.value);
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        // console.log(e.target.value);
        setPassword(e.target.value)
    }

    // Handle Login 
    const handleLogIn = () => {
        const email_val = 'admin@gmail.com';
        const password_val = '123456';
        try {
            if(email === email_val && password === password_val) {
                navigate('/product-orders')
            } else {
                alert('Incorrect email or password');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <img
                src="https://cdn-icons-png.flaticon.com/512/3787/3787917.png"
                alt=""
                width={40}
                />
                <h3>Login</h3>
            </div>
            <Box className="">
                <TextField id="standard-basic" label="Email" variant="standard" onChange={onChangeEmail}/>
            </Box>
            <Box className="mb-4 mt-2">
                <TextField id="standard-basic" label="Pasword" variant="standard" onChange={onChangePassword}/>
        
            </Box>
            <Box>
                <Button variant="contained" onClick={handleLogIn}>Login</Button>
            </Box>
        </div>
    );
};

export default Login;
