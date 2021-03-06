import React, { useState } from "react";

export default function CreateMeeting(props) {
  let { schedule, addMeeting, editIndex, setEditIndex, editMeeting } = props;

  let meeting = {
    "title": "",
    "date": "",
    "zoomLink": "",
    "important": false
  }

  if (editIndex !== -1) {
    console.log("swag")
    meeting = schedule[editIndex];
    console.log(schedule[editIndex]);
  }

  let [title, setTitle] = useState("");
  let [date, setDate] = useState("");
  let [zoomLink, setZoomLink] = useState("");
  let [important, setImportant] = useState(false);

  function submitForm(e) {
    e.preventDefault();

    if (editIndex !== -1) {
      editMeeting(editIndex, {
        title,
        date,
        zoomLink,
        important
      })
    } else {
      addMeeting({
        title,
        date,
        zoomLink,
        important
      });
    }

    setTitle("");
    setDate("");
    setZoomLink("");
    setImportant("");

    setEditIndex(-1);
  }

  return (
    <div>
      {
        editIndex === -1 ? 
        <div className="section-title">
          <b>Create Meeting</b>
        </div> :
        <div className="section-title">
          <button onClick={() => setEditIndex(-1)}>{"< "}Create Meeting</button>
          <br/>
          <b>Edit Meeting: {schedule[editIndex].title}</b>
        </div>
      }
      <br/>
      <form>
        <label htmlFor="title">Title</label><br/>
        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} value={title} /><br/><br/>
        <label htmlFor="date">Date</label><br/>
        <input type="text" id="date" onChange={(e) => setDate(e.target.value)} value={date} /><br/><br/>
        <label htmlFor="zoom-link">Zoom Link</label><br/>
        <input type="text" id="zoom-link" onChange={(e) => setZoomLink(e.target.value)} value={zoomLink} /><br/><br/>
        <label htmlFor="important">Important</label>{" "}
        <input className="important-radio" type="radio" id="important" onClick={() => setImportant(!important)} checked={important} /><br/><br/>
        {
          editIndex === -1 ? 
          <button onClick={(e) => submitForm(e)}>Create</button> :
          <button onClick={(e) => submitForm(e)}>Edit</button>
        }
      </form>
    </div>
  );
}