import { isSignedIn } from "../../database";
import React, { useState } from "react";
import NoteItem from "../NoteItem";
import { AutoSizer } from "react-virtualized";
import { List } from "react-virtualized";
import styles from "./Notes.css";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

function Notes() {
  const [notes] = useState(null);

  const onNoteUpdate = () => {};

  const onNoteCreate = () => {};

  const onNoteDelete = (id) => {};

  const NoteRenderer = ({ index, key, style }) => {
    const row = notes[index];
    return (
      <div key={key} className={styles.row} style={style}>
        <NoteItem
          noteObj={row}
          onNoteUpdate={onNoteUpdate}
          onNoteDelete={onNoteDelete}
        />
      </div>
    );
  };

  const RenderedList = () => {
    if (!Array.isArray(notes)) return <span>Loading notes</span>;

    return (
      //   Placing this inline CSS here is necessary since it does not work when placed in the Component's CSS external file (56px is the App Bar height)
      <div className={styles.AutoSizerWrapper}>
        <AutoSizer>
          {({ width, height }) => (
            <List
              className={styles.List}
              height={height}
              rowCount={notes.length}
              rowHeight={73}
              rowRenderer={NoteRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  };

  if (!isSignedIn) return <h5>Please sign in to access your notes.</h5>;

  return (
    <div className="Notes">
      <RenderedList />
      <Fab aria-label="Add" className="fab" color="primary">
        <AddIcon onClick={onNoteCreate} />
      </Fab>
    </div>
  );
}

export default Notes;
