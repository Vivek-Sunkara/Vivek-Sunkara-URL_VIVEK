import React, { useEffect, useState } from 'react'
import Service from '../../utils/http'
import { Table, Container, Paper, Button, Group, Text, Modal, TextInput, Stack, ActionIcon, CopyButton, Card } from '@mantine/core';
import { IconCopy, IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';


export default function MyUrls() {
   const [data, setData] = useState(null)
   const [loading, setLoading] = useState(true)
   const [editingId, setEditingId] = useState(null)
   const [editTitle, setEditTitle] = useState("")
   const [editModalOpen, setEditModalOpen] = useState(false)
   const service = new Service();


   async function getData() {
       try {
           const response = await service.get("user/my/urls?page=1&limit=50")
           setData(response)
       } finally {
           setLoading(false)
       }
   }

   useEffect(() => {
       getData()
   }, [])

   const handleDelete = async (id) => {
       if (window.confirm("Are you sure you want to delete this URL?")) {
           try {
               await service.delete(`s/${id}`)
               setData({
                   ...data,
                   shortURLs: data.shortURLs.filter(item => item._id !== id)
               })
           } catch (err) {
               console.error("Delete failed:", err)
           }
       }
   }

   const handleEditClick = (id, title) => {
       setEditingId(id)
       setEditTitle(title || "")
       setEditModalOpen(true)
   }

   const handleUpdateTitle = async () => {
       try {
           await service.patch(`s/${editingId}`, { title: editTitle })
           setData({
               ...data,
               shortURLs: data.shortURLs.map(item =>
                   item._id === editingId ? { ...item, title: editTitle } : item
               )
           })
           setEditModalOpen(false)
       } catch (err) {
           console.error("Update failed:", err)
       }
   }

   const rows = data?.shortURLs?.map((element) => (
       <Table.Tr key={element._id}>
           <Table.Td>
               <Text size="sm" style={{wordBreak: 'break-word', maxWidth: '200px'}}>
                   {element.originalUrl.length > 50 ? element.originalUrl.slice(0, 50) + "..." : element.originalUrl}
               </Text>
           </Table.Td>
           <Table.Td>
               <Group gap="xs">
                   <Text fw={600} size="sm" c="blue">
                       {element.shortCode}
                   </Text>
                   <CopyButton value={`https://url-shortener-bootcamp.onrender.com/api/s/${element.shortCode}`} timeout={1500}>
                       {({ copied }) => (
                           <ActionIcon 
                               color={copied ? "teal" : "gray"} 
                               variant="subtle"
                               size="sm"
                           >
                               {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                           </ActionIcon>
                       )}
                   </CopyButton>
               </Group>
           </Table.Td>
           <Table.Td>
               <Text size="sm">{element.title || "-"}</Text>
           </Table.Td>
           <Table.Td>
               <Text size="sm">
                   {element.expiresAt 
                       ? new Date(element.expiresAt).toLocaleDateString() 
                       : "-"
                   }
               </Text>
           </Table.Td>
           <Table.Td>
               <Text size="sm" fw={500} c="blue">{element.clickCount || 0}</Text>
           </Table.Td>
           <Table.Td>
               <Group gap={4}>
                   <ActionIcon 
                       color="blue" 
                       variant="light"
                       onClick={() => handleEditClick(element._id, element.title)}
                   >
                       <IconEdit size={16} />
                   </ActionIcon>
                   <ActionIcon 
                       color="red" 
                       variant="light"
                       onClick={() => handleDelete(element._id)}
                   >
                       <IconTrash size={16} />
                   </ActionIcon>
               </Group>
           </Table.Td>
       </Table.Tr>
   ));

   if (loading) {
       return (
           <Container size="lg" py="xl">
               <Text>Loading your URLs...</Text>
           </Container>
       )
   }

   return (
       <Container size="lg" py="xl">
           <Card withBorder shadow="md" p="lg" radius="md" mb="lg">
               <Text size="xl" fw={700} mb="md" c="blue">Your Shortened URLs</Text>
               <Text size="sm" c="dimmed">
                   Total URLs: {data?.shortURLs?.length || 0}
               </Text>
           </Card>

           <Paper withBorder radius="md" overflow="hidden">
               {data?.shortURLs?.length > 0 ? (
                   <Table striped highlightOnHover>
                       <Table.Thead>
                           <Table.Tr>
                               <Table.Th>Original URL</Table.Th>
                               <Table.Th>Short Code</Table.Th>
                               <Table.Th>Title</Table.Th>
                               <Table.Th>Expires</Table.Th>
                               <Table.Th>Clicks</Table.Th>
                               <Table.Th>Actions</Table.Th>
                           </Table.Tr>
                       </Table.Thead>
                       <Table.Tbody>{rows}</Table.Tbody>
                   </Table>
               ) : (
                   <Paper p="lg" ta="center">
                       <Text c="dimmed">No shortened URLs yet. Create your first one!</Text>
                   </Paper>
               )}
           </Paper>

           <Modal
               opened={editModalOpen}
               onClose={() => setEditModalOpen(false)}
               title="Edit URL Title"
               centered
           >
               <Stack>
                   <TextInput
                       label="Title"
                       placeholder="Enter a title for this URL"
                       value={editTitle}
                       onChange={(e) => setEditTitle(e.currentTarget.value)}
                   />
                   <Group justify="flex-end">
                       <Button variant="default" onClick={() => setEditModalOpen(false)}>
                           Cancel
                       </Button>
                       <Button onClick={handleUpdateTitle}>
                           Save Changes
                       </Button>
                   </Group>
               </Stack>
           </Modal>
       </Container>
   )
}





