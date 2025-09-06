'use client';
import React from "react";

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities'
import styles from './DragItem.module.css';

function DragItem({ id, label, containerId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { containerId },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: 'none',
    userSelect: 'none',
    cursor: 'grab',
  };

  return (
    <div
      className={styles.wrapper}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {label}
    </div>
  );
}

export default DragItem;
