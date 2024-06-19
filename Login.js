import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
    const[name,setName] = useState();
    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    const[show1,setshow1] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick1 = ()=> setshow1(!show1)

    const updatePassword = () => {}

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/user/login`,
            { email, password },
            config
          );
    
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        //   setUser(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };

  return (
    <VStack spacing='5px' color="white">
        {/* <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input  placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
        </FormControl> */}

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input  placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input  type={show1 ? "text":"password"} placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick1}>
                        {show1 ? "Hide":"show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button colorScheme='blue' width='100%' style={{ marginTop:15 }} onClick={submitHandler}>Login</Button>
        <Button variant='solid' colorScheme='red' width='100%' onClick={()=>{
            setEmail('guest@example.com');
            setPassword("123456");
        }}>Get Guest User Credentials</Button>
        <Button  width='50%' style={{ marginTop:15 }} onClick={updatePassword}>Forget Password</Button>

    </VStack>
  )
}


export default Login
