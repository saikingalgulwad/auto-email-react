

import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react'


function App() {

const[emailContent,setEmailContent] = useState('');
const[tone,setTone] = useState('');
const[generatedReply,setGeneratedReply] = useState('');
const[loading,setLoading] = useState(false);
const handleSubmit = async ()=>{
 setLoading(true);
 try{
  const res = await axios.post("http://localhost:8080/api/email/generate",{
    emailContent,
    tone
  });
  setGeneratedReply(typeof res.data==="string"?res.data:JSON.stringify(res.data))
 } catch(error){
    console.log(error);
 } finally{
  setLoading(false);
 }
};

  return (
    <Container maxWidth="md" sx={{py:4}}>
<Typography variant='h3' component="h1" gutterBottom>
   Email Reply Gererator
</Typography>
<Box sx={{mx:3}}>
  <TextField
  fullWidth
  multiline
  rows={6}
  variant='outlined'
  label="Original Email Content"
  value={emailContent || ''}
  onChange={(e)=>setEmailContent(e.target.value)}
  sx={{mb:2}}
  />
</Box>

<FormControl fullWidth sx={{mb:2}}>
  <InputLabel >Tone (Optional)</InputLabel>
  <Select
    
    value={tone||''}
    label="Tone (Optional)"
    onChange={(e)=>setTone(e.target.value)}
    
  >
    <MenuItem value="">None</MenuItem>
    <MenuItem value="Professional">Professional</MenuItem>
    <MenuItem value="Casual">Thirty</MenuItem>
    <MenuItem value="friendly">Friendly</MenuItem>
  </Select>
</FormControl>
<Button variant="contained" onClick={handleSubmit} disabled={!emailContent ||loading}  sx={{mb:2}}>
{
  loading? <CircularProgress size={24} /> :"Generate Reply"
}
</Button>

<Box sx={{mx:3}}>
  <TextField
  fullWidth
  multiline
  rows={6}
  variant='outlined'
  
  value={generatedReply || ''}
   inputProps={{readonly:true}}
  sx={{mb:2}}
  />
</Box>
<Button variant='outlined'
onClick={()=>navigator.clipboard.write(generatedReply)}
>
Copy to ClipBoard
</Button>

    </Container>
  )
}

export default App
