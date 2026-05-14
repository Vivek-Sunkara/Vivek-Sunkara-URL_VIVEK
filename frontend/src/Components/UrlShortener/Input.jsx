import { Button, TextInput, Container, Paper, Stack, Text, Group, Card } from '@mantine/core'
import React, { useState } from 'react'
import Service from '../../utils/http.js'


export default function Input({setResponse}) {
   const service = new Service();
   const [payload, setPayload] = useState(
       {
           "originalUrl": "",
           "expiresAt": "",
           "title": "",
           "customUrl": ""
       }
   )
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)


   const generateShortCode = async ()=>{
       try {
           setLoading(true)
           setError(null)
           const response = await service.post("s",payload)
           setResponse(response)
       } catch (err) {
           setError(err.response?.data?.message || "Failed to create short URL")
       } finally {
           setLoading(false)
       }
   }
  
   return (
       <Container size="md" py="xl">
           <Card withBorder shadow="md" p="lg" radius="md">
               <Text size="xl" fw={700} mb="lg" c="blue">Create Your Short URL</Text>
               
               <Stack gap="md">
                   <div>
                       <TextInput
                           label="Original URL"
                           withAsterisk
                           description="Enter the long URL you want to shorten"
                           placeholder="https://example.com/very/long/url"
                           value={payload.originalUrl}
                           onChange={(e) => {
                               setPayload({ ...payload, originalUrl: e.target.value })
                           }}
                           error={error}
                       />
                   </div>

                   <div>
                       <TextInput
                           label="Title (Optional)"
                           description="Give your shortened URL a name"
                           placeholder="My awesome link"
                           value={payload.title}
                           onChange={(e) => {
                               setPayload({ ...payload, title: e.target.value })
                           }}
                       />
                   </div>

                   <div>
                       <TextInput
                           label="Custom URL (Optional)"
                           description="Create a custom short code instead of random one"
                           placeholder="my-custom-code"
                           value={payload.customUrl}
                           onChange={(e) => {
                               setPayload({ ...payload, customUrl: e.target.value })
                           }}
                       />
                   </div>

                   <div>
                       <TextInput
                           label="Expiration Date (Optional)"
                           type="date"
                           description="When should this link expire?"
                           value={payload.expiresAt}
                           onChange={(e) => {
                               setPayload({ ...payload, expiresAt: e.target.value })
                           }}
                       />
                   </div>

                   <Button 
                       disabled={payload.originalUrl === "" || loading} 
                       onClick={generateShortCode} 
                       variant="filled" 
                       color="blue"
                       fullWidth
                       size="md"
                       loading={loading}
                   >
                       {loading ? "Creating..." : "Shorten URL"}
                   </Button>

                   {error && (
                       <Paper p="md" radius="md" bg="red.1" c="red">
                           {error}
                       </Paper>
                   )}
               </Stack>
           </Card>
       </Container>
   )
}
