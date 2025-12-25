import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const navigate=useNavigate();
  const [user, setUser]=useState({
        uname:"",
        uemail:"",
        upassword:"",
        uphoneno:"", // 🎯 FIXED: Changed from 'uphone' to 'uphoneno'
        uaddress:""
    });

    // to handle updateas in state
    const handleChange=(e)=>{
      setUser({ ...user, [e.target.name]: e.target.value });
       console.log({[e.target.name]:e.target.value});

    }

    const handleSubmit=()=>{
        console.log(user)
        axios.post('http://localhost:8000/api/user/Adduser', user)
        .then((res)=>{
            console.log("User details",res.data)
            alert("user registered successfully")
            navigate('/Login')

        })
        .catch((err)=>{
console.log(err)
alert("server error")
        })
    
    }
  return (
    <div>
      <Box style={{display:"flex" , justifyContent:"center", margin:"30px"}}>
        <Paper elevation={4} style={{width:"600px" ,padding:"20px"}}>
            
            <Typography variant='h4' sx={{mb:4}}>Registration Form </Typography>
            <TextField variant='outlined' label='Name' type='text' name='uname' value={user.uname} fullWidth   sx={{mb:4}} onChange={handleChange}/>
            <TextField variant='outlined' label='Email' type='text' name='uemail' value={user.uemail} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Password' type='password' name='upassword' value={user.upassword} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Phone' type='number' name='uphoneno' value={user.uphoneno} fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <TextField variant='outlined' label='Address' type='text' name='uaddress'value={user.uaddress}fullWidth  sx={{mb:3}} onChange={handleChange}/>
            <Button variant='contained' onClick={handleSubmit} color='error'>REGISTER</Button>
          
        </Paper>
      </Box>
    </div>
  )
}