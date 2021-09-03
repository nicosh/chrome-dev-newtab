import React, { useState, useEffect } from "react";
import Board from '@asseinfo/react-kanban'
import SimpleBar from 'simplebar-react';

import '@asseinfo/react-kanban/dist/styles.css'

const defaultBoard = {
  columns: [
    {
      id: 1,
      title: 'Todo',
      cards: []
    },
    {
      id: 2,
      title: 'In progress',
      cards: []
    },
    {
      id: 3,
      title: 'Done',
      cards: []
    }
  ]
}

const Todo = () => {
  const [board, setBoard] = useState(false)

  useEffect(() => {
    let savedBoard = localStorage.getItem("board") ? localStorage.getItem("board") : defaultBoard;
    setBoard(JSON.parse(savedBoard))
  }, [])

  const handleCardMove = (board) => {
    let newBoard = JSON.stringify(board)
    localStorage.setItem('board', newBoard);
  }

  const onCardNew = (newCard) => {
    const NewCard = { id: new Date().getUTCMilliseconds(), ...newCard }
    return NewCard
  }



  return (
    <>
      {board &&
          <Board
            onCardNew={handleCardMove}
            onCardRemove={handleCardMove}
            allowRemoveCard
            onNewCardConfirm={onCardNew}
            allowAddCard={{ on: 'top' }}
            onCardDragEnd={handleCardMove}
            initialBoard={board}
          />
      }
    </>

  );
}

export default Todo