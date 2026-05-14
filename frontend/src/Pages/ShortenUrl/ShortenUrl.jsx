import React, { useState } from 'react'
import Response from '../../Components/UrlShortener/Response'
import Input from '../../Components/UrlShortener/Input'


export default function ShortenUrl() {
 const [response, setResponse] = useState(null)

 const handleCreateAnother = () => {
   setResponse(null)
 }

 return (
   <div>
     {
       response ? <Response response={response} onCreateAnother={handleCreateAnother} /> : <Input setResponse={setResponse} />
     }
   </div>
 )
}
