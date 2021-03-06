import React, { useState, useEffect } from "react";
import ScheduleItem from "./components/ScheduleItem";

export default function App() {
  let [schedule, setSchedule] = useState([]);
  let [editIndex, setEditIndex] = useState(-1);

  let [title, setTitle] = useState("");
  let [date, setDate] = useState("");
  let [zoomLink, setZoomLink] = useState("");
  let [important, setImportant] = useState(false);

  useEffect(() => {
    async function getSchedule() {
      const scheduleFromServer = await fetchSchedule();
      setSchedule(scheduleFromServer);
    };
    getSchedule();
  }, [])

  async function fetchSchedule() {
    const res = await fetch(
      "http://localhost:5000/schedule", {
        method: "GET"
      }
    );
    return await res.json();
  }

  async function addMeeting(item) {
    const res = await fetch(
      "http://localhost:5000/schedule", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    const data = await res.json();
    data.id = schedule.length + 1;
    setSchedule([...schedule, data]);
  }

  async function updateMeeting(index, item) {
    const res = await fetch(
      `http://localhost:5000/schedule/${schedule[index].id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    schedule[index] = item;
    setSchedule([...schedule]);
  }

  async function deleteMeeting(index) {
    const res = await fetch(
      `http://localhost:5000/schedule/${index}`, { 
        method: "DELETE"
      }
    );
    schedule.splice(index,1);
    setSchedule([...schedule]);
  }

  function editMeeting(index) {
    setEditIndex(index);
    
    setTitle(schedule[index].title);
    setDate(schedule[index].date);
    setZoomLink(schedule[index].zoomLink);
    setImportant(schedule[index].important);
  }

  function submitForm(e) {
    e.preventDefault();

    if (editIndex !== -1) {
      updateMeeting(editIndex, {
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

  let displaySchedule = []
  for (let i=0; i < schedule.length; i++) {
    displaySchedule.push(
      <ScheduleItem schedule={schedule} editMeeting={editMeeting} deleteMeeting={deleteMeeting} index={i} key={i} />
    );
  }

  return (
    <div className="container">
      <header>
        <h3 className="nav-brand">Vincent Tieu's PA4</h3>
      </header>
      <div className="dual-section-display">
        <div className="dual-section">
          <div className="section-title"><b>Full Schedule</b></div>
          <br/>
          {/* <pre>{JSON.stringify(schedule, null, 2)}</pre> */}
          {displaySchedule}
        </div>
        <div className="dual-section">
          {
            editIndex === -1 ? 
            <div className="section-title">
              <b>Create Meeting</b>
            </div> :
            <div className="section-title">
              <button onClick={() => setEditIndex(-1)}>{"< "}Create Meeting</button>
              <br/>
              <b>Edit Meeting</b>
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
              <button onClick={(e) => submitForm(e)}>Create!</button> :
              <button onClick={(e) => submitForm(e)}>Save Edit!</button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}
