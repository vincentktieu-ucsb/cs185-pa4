import React, { useState, useEffect } from "react";
import CreateMeeting from "./components/CreateMeeting";
import FullSchedule from "./components/FullSchedule";

export default function App() {
  let [schedule, setSchedule] = useState([]);
  let [editIndex, setEditIndex] = useState(-1);

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
    setSchedule([...schedule, item]);
  }

  async function editMeeting(index, item) {
    const res = await fetch(
      `http://localhost:5000/schedule/${index+1}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    const data = await res.json();
    let newSchedule = [...schedule];
    newSchedule[index] = item;
    setSchedule(newSchedule);
  }

  async function deleteMeeting(id) {
    console.log(id+1);
    const res = await fetch(
      `http://localhost:5000/schedule/${id+1}`, { 
        method: "DELETE"
      }
    );
    schedule.splice(id,1);
    setSchedule([...schedule]);
  }

  return (
    <div className="container">
      <header>
        <h3 className="nav-brand">Vincent Tieu's PA4</h3>
      </header>
      <div className="dual-section-display">
        <div className="dual-section">
          <FullSchedule schedule={schedule} setEditIndex={setEditIndex} deleteMeeting={deleteMeeting} />
        </div>
        <div className="dual-section">
          <CreateMeeting schedule={schedule} addMeeting={addMeeting} editIndex={editIndex} setEditIndex={setEditIndex} editMeeting={editMeeting} />
        </div>
      </div>
    </div>
  );
}
