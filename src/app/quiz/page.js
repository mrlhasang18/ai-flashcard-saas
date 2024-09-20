'use client'

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSearchParams } from "next/navigation";
import {
  Paper,
  Typography,
  Container,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
} from "@mui/material";

export default function Quiz() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getQuiz() {
      if (!search || !user) return;
      if (!search.match(/^[a-zA-Z0-9-_]+$/)) {
        console.error("Invalid quiz ID:", search);
        return;
      }
      try {
        const colRef = collection(doc(collection(db, "users"), user.id), search);
        const docs = await getDocs(colRef);
        const quizQuestions = [];
        docs.forEach((doc) => {
          quizQuestions.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(quizQuestions);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    }
    getQuiz();
  }, [user, search]);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  if (showScore) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h4">Quiz Completed!</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            You scored {score} out of {questions.length}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
              setSelectedAnswer('');
            }}
          >
            Retake Quiz
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      {questions.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {questions[currentQuestion].question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={selectedAnswer}
              onChange={handleAnswerChange}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Paper>
      )}
    </Container>
  );
}