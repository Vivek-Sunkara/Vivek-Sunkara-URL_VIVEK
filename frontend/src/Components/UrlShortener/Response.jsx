import React, { useState } from 'react'
import { Container, Card, Text, Group, Button, CopyButton, Stack, Paper } from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons-react'

export default function Response({response, onCreateAnother}) {
   const shortUrl = `https://url-shortener-bootcamp.onrender.com/api/s/${response.shortCode}`
   const [copied, setCopied] = useState(false)

   return (
       <Container size="md" py="xl">
           <Card withBorder shadow="lg" p="lg" radius="md" bg="green.0">
               <Stack gap="lg">
                   <div>
                       <Text size="lg" fw={700} c="green" mb="xs">✓ URL Successfully Shortened!</Text>
                       <Text size="sm" c="dimmed">Your short URL is ready to share</Text>
                   </div>

                   <Paper p="md" radius="md" bg="white" withBorder>
                       <Text size="sm" c="dimmed" mb="xs" fw={500}>Original URL:</Text>
                       <Text 
                           size="sm" 
                           style={{wordBreak: 'break-all'}}
                           mb="md"
                       >
                           {response.originalUrl}
                       </Text>

                       <Text size="sm" c="dimmed" mb="xs" fw={500}>Shortened URL:</Text>
                       <Group justify="space-between" mb="md">
                           <Text 
                               size="sm" 
                               style={{wordBreak: 'break-all', flex: 1}}
                               fw={600}
                               c="blue"
                           >
                               {shortUrl}
                           </Text>
                           <CopyButton value={shortUrl} timeout={2000}>
                               {({ copied }) => (
                                   <Button 
                                       color={copied ? 'teal' : 'blue'} 
                                       variant="light"
                                       size="sm"
                                       leftSection={copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                   >
                                       {copied ? 'Copied' : 'Copy'}
                                   </Button>
                               )}
                           </CopyButton>
                       </Group>

                       {response.title && (
                           <>
                               <Text size="sm" c="dimmed" mb="xs" fw={500}>Title:</Text>
                               <Text size="sm" mb="md">{response.title}</Text>
                           </>
                       )}

                       {response.expiresAt && (
                           <>
                               <Text size="sm" c="dimmed" mb="xs" fw={500}>Expires On:</Text>
                               <Text size="sm" mb="md">{new Date(response.expiresAt).toLocaleDateString()}</Text>
                           </>
                       )}

                       <Text size="sm" c="dimmed" mb="xs" fw={500}>Short Code:</Text>
                       <Text size="sm" fw={600}>{response.shortCode}</Text>
                   </Paper>

                   <Button 
                       variant="outline" 
                       color="blue" 
                       fullWidth
                       onClick={onCreateAnother}
                   >
                       Create Another URL
                   </Button>
               </Stack>
           </Card>
       </Container>
   )
}
