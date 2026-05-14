import { Avatar, Container, Text, Stack } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Service from '../utils/http'


export default function Profile() {
   const service = new Service()
   const [data , setData ] = useState(null)
   const getProfile = async ()=>{
       const response = await service.get("user/me");
       setData(response)
   }
   useEffect( ()=>{
       getProfile()
   } , [] )


   return (<Container size={"md"}  >
       <Stack


           h={300}
           bg="var(--mantine-color-body)"
           align="center"
           justify="center"
           gap="md"
       >
           {data ? (
               <>
                   <Avatar src={data.avatar} size="xl" alt="it's me" />
                   <Text  color='red' fw={700}> {data.name}</Text>
                   <Text> {data._id}</Text>
                   <Text> {data.email}</Text>
               </>
           ) : (
               <Text>Loading...</Text>
           )}
       </Stack>


   </Container>)
}
// https://url-shortener-bootcamp.onrender.com/url/shortener

