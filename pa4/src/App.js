import React, { useState } from "react";
import CreateMeeting from "./components/CreateMeeting";
import FullSchedule from "./components/FullSchedule";

export default function App() {
  let [schedule, setSchedule] = useState(
    [
      {
        "title": "CS 185 Misha's Office Hour",
        "date": "2021-03-05T19:00",
        "zoomLink": "https://ucsb.zoom.us/j/86623368970",
        "important": true
      },
      {
        "title": "CS 185 Wenda's Office Hour",
        "date": "2021-03-05T09:00",
        "zoomLink": "https://ucsb.zoom.us/j/8311826784",
        "important": true
      },
      {
        "title": "Game Night",
        "date": "2021-03-05T23:00",
        "zoomLink": "https://ucsb.zoom.us/j/8311826784",
        "important": false
      },
      {
        "title": "new meeting",
        "date": "2021-02-27T00:30",
        "zoomLink": "https://ucsb.zoom.us/j/8311826784",
        "important": false
      }
    ]
  );

  function handleDeleteScheduleItem(id) {
    let newSchedule = [...schedule];
    newSchedule.splice(id,1);
    setSchedule(newSchedule);
  }

  function handleAddScheduleItem(item) {
    let newSchedule = [...schedule];
    newSchedule.push(item)
    setSchedule(newSchedule);
  }

  return (
    <div className="container">
      <header>
        <h3 className="nav-brand">Vincent Tieu's PA4</h3>
      </header>
      <div className="dual-section-display">
        <div className="dual-section">
          <FullSchedule schedule={schedule} handleDeleteScheduleItem={handleDeleteScheduleItem} />
        </div>
        <div className="dual-section">
          <CreateMeeting handleAddScheduleItem={handleAddScheduleItem} />
        </div>
      </div>
    </div>
  );
}
