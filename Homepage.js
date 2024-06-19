import {React , useEffect} from 'react'
import { Container , Box , Text , Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from "react-router";
const Homepage = () => {

  const history = useHistory();

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if(user) history.push('/chats');
    },[history]);

  return (
    <Container maxW="xl" centerContent fontFamily={"Work Sans"} fontSize={'3xl'} color="white">
      <Box
        display="flex"
        justifyContent={"center"}
        p={3}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Text fontSize="3xl" justifyContent={"center"}>
          Talk-A-Tive
        </Text>
      </Box>
      <Box w="100%" p={4} borderRadius="1g" borderWidth="1px">
        <Tabs variant="soft-rounded" colorScheme="blue" >
          <TabList mb="1em">
            <Tab width="50%" color="white">Login</Tab>
            <Tab width="50%" color="white">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><Signup/></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage

