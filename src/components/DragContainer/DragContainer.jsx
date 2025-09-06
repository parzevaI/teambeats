'use client';
import React from "react";

import { useDroppable } from '@dnd-kit/core';
import styles from './DragContainer.module.css';

function DragContainer({ children, title, id }) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    // color: isOver ? 'green' : undefined,
    outline: isOver? '3px solid var(--primary)' : undefined,
  };

  return (
    <div
      className={styles.wrapper}
      ref={setNodeRef}
      style={style}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default DragContainer;
