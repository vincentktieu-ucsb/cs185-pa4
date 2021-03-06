import React, { useState } from "react";

export default function CreateMeeting(props) {
  let { handleAddScheduleItem } = props;
  let [title, setTitle] = useState("");
  let [date, setDate] = useState("");
  let [zoomLink, setZoomLink] = useState("");
  let [important, setImportant] = useState(false);

  function submitCreateMeeting(e) {
    e.preventDefault();
    handleAddScheduleItem({
      "title": title,
      "date": date,
      "zoomLink": zoomLink,
      "important": important
    });
    setTitle("");
    setDate("");
    setZoomLink("");
    setImportant("");
  }

  return (
    <div>
      <div className="section-title"><b>Create Meeting</b></div>
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
        <button onClick={(e) => submitCreateMeeting(e)}>Submit</button>
      </form>
    </div>
  );
}