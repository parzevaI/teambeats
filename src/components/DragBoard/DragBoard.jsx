'use client';
import React from "react";

import { DndContext, DragOverlay } from '@dnd-kit/core';

import DragItem from '../../components/DragItem';
import DragContainer from '../../components/DragContainer';
import { produce } from 'immer';

import styles from './DragBoard.module.css';
import dragItemStyles from '../DragItem/DragItem.module.css';

// initial board data: two containers and a few items
const initialBoard = [
  {
    title: "things",
    id: crypto.randomUUID(),
    items: [
      { id: crypto.randomUUID(), label: "hello" },
      { id: crypto.randomUUID(), label: "world" },
    ],
  },
  {
    title: "stuff",
    id: crypto.randomUUID(),
    items: [],
  },
];

function DragBoard() {
  const [board, dispatch] = React.useReducer(reducer, initialBoard);
  const [activeId, setActiveId] = React.useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    // clear the active state so the overlay disappears
    setActiveId(null);

    if (!event.over) return; // not dropped in a container

    const toContainerId = event.over.id;
    const itemId = event.active.id;

    if (isItemInContainer(board, itemId, toContainerId)) return;

    dispatch({ type: 'MOVE_ITEM', itemId, toContainerId });
  }

  // move the active item out of overflow container
  const activeItem = React.useMemo(() => {
    if (!activeId) return null;
    for (let container of board) {
      const found = container.items.find((it) => it.id === activeId);
      if (found) return found;
    }
    return null;
  }, [activeId, board]);

  return (
    <DndContext
      autoScroll={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <main className={styles.main}>
        {board.map(({ title, id, items }) => (
          <DragContainer key={id} title={title} id={id}>
            {items.map((item) => (
              <DragItem key={item.id} id={item.id} label={item.label} containerId={id} />
            ))}
          </DragContainer>
        ))}
      </main>
      <DragOverlay>
        {activeItem ? (
          <div className={dragItemStyles.wrapper} style={{ cursor: 'grabbing' }}>
            {activeItem.label}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'MOVE_ITEM': {
      return produce(state, (draft) => {

        // locate the source container
        let fromContainerIndex;
        let itemInd;

        for (let containerInd in draft) {
          itemInd = draft[containerInd].items.findIndex((item) => item.id == action.itemId);
          if (itemInd != -1) {
            fromContainerIndex = containerInd;
            break;
          }
        }

        // get item
        let item = draft[fromContainerIndex].items[itemInd];


        // remove from source
        draft[fromContainerIndex].items.splice(itemInd, 1);

        // add to destination
        const dest = draft.find((container) => container.id == action.toContainerId);
        dest.items.push(item);
      });
    }
  }
}

function isItemInContainer(board, itemId, containerId) {
  for (let container of board) {
    if (container.id != containerId) {
      continue
    }
    for (let item of container.items) {
      if (item.id == itemId) {
        return true
      }
    }
  }
  return false
}

export default DragBoard
