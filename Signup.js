import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack , useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';

const Signup = () => {

    const history = useHistory();
    const toast = useToast()

    const[name,setName] = useState();
    const[email,setEmail] = useState();

    const[password,setPassword] = useState();
    const[confirmpassword,setconfirmpassword] = useState();

    const[pic,setPic] = useState();
    const [loading, setLoading] = useState(false);

    const[show1,setshow1] = useState(false);
    const[show2,setshow2] = useState(false);

    const handleClick1 = ()=> setshow1(!show1);
    const handleClick2 = ()=> setshow2(!show2);

    const postDetails = (pics) => {
        if(pics===undefined){
            toast({
                title: 'Please select an image',
                description: "Warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
              });
            return;
        }
        console.log(pics);
        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","TALK-A-TIVE");
            data.append("cloud_name","dbejvricz");
            fetch("https://api.cloudinary.com/v1_1/dbejvricz/image/upload",{
                method:'post',
                body:data,
            }).then((res)=> res.json())
            .then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString());
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            });
        }else{
            toast({
                title: 'Please select an image',
                description: "Warning",
                duration: 9000,
                isClosable: true,
                position:"bottom",
              });
              return;
        }
     };
    const submitHandler = async () => { 
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: 'Please Fill all the feilds',
                description: "Warning",
                duration: 9000,
                isClosable: true,
                position:"bottom",
              });
              console.log(name, email, password,confirmpassword, pic);
              setLoading(false);
              return;
        }
        if(password !== confirmpassword){
            toast({
                title: 'Password do not match',
                description: "Warning",
                duration: 9000,
                isClosable: true,
                position:"bottom",
              });
              setLoading(false);
              return;
        }

        try{
            const config = {
                headers:{
                    "Content-type":"application/json",
                },
            };
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user`,{name,email,password,pic},
            config
            );
            toast({
                title: 'Account created Successfully',
                description: "Success",
                duration: 9000,
                isClosable: true,
                position:"bottom",
              });
              
              localStorage.setItem(`userInfo`,JSON.stringify(data));

              setLoading(false);
              history.push("/chats");
        }catch(err){
            toast({
                title: 'Error Occured!',
                description: err.response.data.message,
                status:"error",
                duration: 9000,
                isClosable: true,
                position:"bottom",
              });
              setLoading(false);
              return;
        }
    };

  return (
    <VStack spacing='5px' color="white">
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
                <Input  placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input  placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input  type={show1 ? "text":"password"} placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick1}>
                        {show1 ? "Hide":"show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input  type={show2 ? "text":"password"} placeholder='confirm your password' onChange={(e)=>setconfirmpassword(e.target.value)}/>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick2}>
                        {show2 ? "Hide":"show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic' isRequired>
            <FormLabel>Upload your Picture</FormLabel>
                <Input  type="file" p={1.5} accept="image/*" placeholder='select file' onChange={(e)=> postDetails(e.target.files[0])}/>
        </FormControl>

        <Button colorScheme='blue' width='100%' style={{ marginTop:15 }} onClick={submitHandler} isLoading={loading}>sign Up</Button>

    </VStack>
  )
}

export default Signup;
