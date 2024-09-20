'use client'

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, Container, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function Generate() {
  const [content, setContent] = useState('');
  const [generationType, setGenerationType] = useState('flashcard');
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!content) return;

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, type: generationType }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate content: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const id = uuidv4();

    const userDocRef = doc(collection(db, 'users'), user.id);
    const setRef = collection(userDocRef, id);

    for (let i = 0; i < data.length; i++) {
      await setDoc(doc(setRef), data[i]);
    }

    router.push(`/${generationType}?id=${id}`);
  } catch (error) {
    console.error('Error:', error);
    setError(`Failed to generate content: ${error.message}`);
  }
};

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate {generationType === 'flashcard' ? 'Flashcards' : 'Quiz'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            aria-label="generation-type"
            name="generation-type"
            value={generationType}
            onChange={(e) => setGenerationType(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="flashcard" control={<Radio />} label="Flashcards" />
            <FormControlLabel value="quiz" control={<Radio />} label="Quiz" />
          </RadioGroup>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder={`Enter content to generate ${generationType === 'flashcard' ? 'flashcards' : 'quiz'} from`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Generate
          </Button>
        </form>
      </Box>
    </Container>
  );
}