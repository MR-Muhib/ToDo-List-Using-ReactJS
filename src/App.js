import react, { useState } from "react";
import "./App.css";

function App() {
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([
    // { id: 1, title: "hello" },
    // { id: 5, title: "name" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editableNode, setEditableNode] = useState(null);

  const changeTitleHandler = (e) => {
    setNoteTitle(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // The trim() method removes whitespace from both sides of a string.
    if (noteTitle.trim() === "") {
      return alert("Please provete a title..");
    }
    editMode ? updateHandler() : createHandler();
  };

  const createHandler = () => {
    const newNode = {
      id: Date.now() + "",
      title: noteTitle,
    };

    setNotes([newNode, ...notes]);
    setNoteTitle("");
  };

  const reamoveHandler = (noteId) => {
    const updateNode = notes.filter((note) => note.id !== noteId);
    setNotes(updateNode);
  };

  const editHandler = (note) => {
    setEditMode(true);
    setEditableNode(note);
    setNoteTitle(note.title);
  };

  const updateHandler = () => {
    const updatalNodes = notes.map((item) => {
      if (item.id === editableNode.id) {
        return { ...item, title: noteTitle };
      }
      return item;
    });
    setNotes(updatalNodes);
    setEditMode(false);
    setNoteTitle("");
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <>
          <input
            className="input-fild"
            placeholder="Enter Today List...."
            tyep="text"
            value={noteTitle}
            onChange={changeTitleHandler}
          ></input>
          <button type="submit">{editMode ? "Update Node" : "Add Note"}</button>
        </>
      </form>
      <div className="note-list">
        <h2>Note List</h2>
        {/* প্রথমে notes কে ধটি. তারপর ্এর ্ুউপর map() note name ekti function create kori  */}
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <span>{note.title}</span>
              <button onClick={() => editHandler(note)}>Edit</button>
              <button onClick={() => reamoveHandler(note.id)}>Delate</button>
              <hr></hr>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

// const [] = useState();
