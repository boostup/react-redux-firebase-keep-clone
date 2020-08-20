import React, { useState, useRef } from "react";
import { TextField, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ReactMarkdown from "react-markdown";
import "./NoteItem.css";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  NoteItem: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
});

const NoteItem = ({
  noteObj,
  onNoteUpdate,
  onNoteDelete,
  options,
  classes,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const tfRef = useRef();

  const handleEdit = (e) => {
    setIsEditMode(true);
    tfRef.current.focus();
  };

  const handleChange = (e) => {
    const tmp = { ...noteObj };
    console.log(tmp);
  };

  const saveNote = (e) => {
    setIsEditMode(false);
    console.log(noteObj.id);
    // onNoteUpdate(noteObj, e.target.value);
    // setNote({ ...note, ...note.data });
  };

  const handleSave = (e) => {
    if (!e.shiftKey && isEditMode && e.key === "Enter") {
      saveNote(e);
      e.preventDefault();
    }
  };

  const handleOnBlur = (e) => {
    saveNote(e);
  };

  const handleDelete = (e) => onNoteDelete(noteObj.id);

  const formatForHtml = (textString) => {
    return options.markdown ? (
      <ReactMarkdown source={textString} linkTarget="_blank" />
    ) : (
      textString
    );
  };

  return (
    <div className={`${classes.NoteItem} NoteItem`}>
      <div
        className={
          isEditMode ? "NoteItem_text editMode" : "NoteItem_text readMode"
        }
      >
        <div style={isEditMode ? { display: "block" } : { display: "none" }}>
          <TextField
            variant="filled"
            type="text"
            multiline={options.multiline}
            fullWidth
            value={noteObj.data().contents}
            onChange={handleChange}
            onKeyPress={handleSave}
            disabled={isEditMode ? false : true}
            inputProps={{
              ref: tfRef,
              onBlur: handleOnBlur,
            }}
          />
        </div>
        <div style={isEditMode ? { display: "none" } : { display: "block" }}>
          <div onClick={handleEdit}>
            <Typography component="div">
              {formatForHtml(noteObj.data().contents)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="NoteItem_icons">
        <IconButton
          color="primary"
          aria-label="edit note"
          component="span"
          onClick={handleEdit}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="archive"
          component="span"
          onClick={null}
        >
          <CheckCircleOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="Delete note"
          component="span"
          onClick={handleDelete}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};
NoteItem.defaultProps = {
  //Some string with /r/n encoded for HTML
  options: { markdown: false, multiline: false },
};

export default withStyles(styles)(NoteItem);
