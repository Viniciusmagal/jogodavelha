import { useState } from 'react';
import { calculateWinner } from './utils/calculateWinner';
import './App.css';
import { Container, Button } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handleClick(i) {
    if (currentSquares[i] || calculateWinner(currentSquares)) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);
  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo: ${xIsNext ? 'X' : 'O'}`;

  return (
    <Container className="game-container">
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" color="primary">
          <i className="bi bi-controller"></i> Jogo da Velha
        </Typography>
      </Box>
      <Box textAlign="center" mb={3}>
        <Typography variant="h5">{status}</Typography>
      </Box>
      <div className="game-board">
        {Array(3).fill().map((_, rowIndex) => (
          <div key={rowIndex} className="board-row d-flex justify-content-center mb-2">
            {Array(3).fill().map((_, colIndex) => {
              const index = rowIndex * 3 + colIndex;
              return (
                <Button
                  key={index}
                  variant="outline-dark"
                  className="square"
                  style={{ width: 64, height: 64, fontSize: 28 }}
                  onClick={() => handleClick(index)}
                >
                  {currentSquares[index]}
                </Button>
              );
            })}
          </div>
        ))}
      </div>
      <Box textAlign="center" mt={3}>
        <div className="game-info">
          <Typography variant="h6">Histórico</Typography>
          <ul>
            {history.map((_, move) => (
              <li key={move}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => jumpTo(move)}
                >
                  {move ? `Voltar para movimento #${move}` : 'Ir para início'}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Box>
    </Container>
  );
}
