'use client';
import React from "react";

import { useDroppable } from '@dnd-kit/core';
import styles from './DragContainer.module.css';

function DragContainer({ children, title, id }) {
  // dragging
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    // color: isOver ? 'green' : undefined,
    outline: isOver? '2px solid var(--primary)' : undefined,
  };

  // input
  const [cardValue, setCardValue] = React.useState('');

  return (
    <div className={styles.wrapper}>

      <h2 className={styles.title}>{title}</h2>

      <form
        onSubmit={event => {
          event.preventDefault()
          // handle submit
          setCardValue('')
        }}
        className={styles.addCardWrapper}
      >
        <input
          type="text"
          placeholder="Add a card..."
          value={cardValue}
          onChange={event => {
            setCardValue(event.target.value)
          }}
          className={styles.addInput}
        />
        <button
          type="submit"
          className={styles.addSubmit}
        >Add</button>
      </form>

      <div
        className={styles.itemWrapper}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

export default DragContainer;
