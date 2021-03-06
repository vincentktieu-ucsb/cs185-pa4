import React from "react";

export default function FullSchedule(props) {
  let { schedule, handleDeleteScheduleItem } = props;
  let displaySchedule = []
  for (let i=0; i < schedule.length; i++) {
    displaySchedule.push(
      <ScheduleItem schedule={schedule} handleDeleteScheduleItem={handleDeleteScheduleItem} id={i} key={i} />
    );
  }

  return (
    <div>
      <div className="section-title"><b>Full Schedule</b></div>
      <br/>
      {/* <pre>{JSON.stringify(schedule, null, 2)}</pre> */}
      {displaySchedule}
    </div>
  );
}

function ScheduleItem(props) {
  let { schedule, handleDeleteScheduleItem, id } = props;

  return (
    <div className="schedule-item">
      <div className={(schedule[id].important && schedule[id].important) ? "schedule-important" : ""} />
      <div className="schedule-text">
        <div className="schedule-title"><b>{schedule[id].title}</b></div>
        <div className="schedule-date">{schedule[id].date}</div>
        <div className="schedule-zoom-link">{schedule[id].zoomLink}</div>
      </div>
      <div className="schedule-delete" onClick={() => handleDeleteScheduleItem(id)}>
        <div className="schedule-delete-button">Delete</div>
      </div>
    </div>
  )
}