import React,{useEffect} from "react";
import { Button, Grid, Card, CardContent } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from "react-redux";
import { loginAuth } from "../loginAuthenticaton/loginAuthReducer";
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const LoginPage = () => {
  const [values, setValues] = React.useState({
    userId: '',
    password: '',
    repeatPassword: '',
    showPassword: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    ValidatorForm.addValidationRule('required', (values) => {
      if (!values.password || !values.userId) {
          return false;
      }
      return true;
  });
  },[])

  const handleLogin = () => {

    dispatch(loginAuth(values));
    navigate("/book-library", { replace: true })

  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <br />
      <Card style={{ maxWidth: 350, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <ValidatorForm onSubmit={handleLogin}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextValidator
                  label="user name"
                  id="outlined-start-adornment"
                  value={values.userId}
                  onChange={handleChange('userId')}
                  name="userId"
                  type="text"
                  validators={['required']}
                  errorMessages={['this field is required']}
                  sx={{ m: 1, width: '35ch' }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end' ><PersonIcon /></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid xs={12} item >
                <FormControl variant="outlined">
                  <TextValidator
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    sx={{ m: 1, width: '35ch' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="password"
                    />
                </FormControl>
              </Grid>
              <Grid xs={12} item>
                <Button variant="contained" type='submit'>Login</Button>
              </Grid>
            </Grid>
            </ValidatorForm>
        </CardContent>
      </Card>
    </div>
  )
}
export default LoginPage