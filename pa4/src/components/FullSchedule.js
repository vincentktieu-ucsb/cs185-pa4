import React from "react";

export default function FullSchedule(props) {
  let { schedule, setEditIndex, deleteMeeting } = props;
  let displaySchedule = []
  for (let i=0; i < schedule.length; i++) {
    displaySchedule.push(
      <ScheduleItem schedule={schedule} setEditIndex={setEditIndex} deleteMeeting={deleteMeeting} index={i} key={i} />
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
  let { schedule, deleteMeeting, setEditIndex, index } = props;

  return (
    <div className="schedule-item">
      <div className={(schedule[index].important && schedule[index].important) ? "schedule-important" : ""} />
      <div className="schedule-text">
        <div className="schedule-title"><b>{schedule[index].title}</b></div>
        <div className="schedule-date">{schedule[index].date}</div>
        <div className="schedule-zoom-link">{schedule[index].zoomLink}</div>
      </div>
      <div className="schedule-delete">
        <div className="schedule-edit-button" onClick={() => setEditIndex(index)}>Edit</div>
        <div className="schedule-delete-button" onClick={() => deleteMeeting(index)}>Delete</div>
      </div>
    </div>
  )
}