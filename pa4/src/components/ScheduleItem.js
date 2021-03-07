import React from "react";

export default function ScheduleItem(props) {
  let { schedule, deleteMeeting, editMeeting, index } = props;

  return (
    <div className="schedule-item" onDoubleClick={() => editMeeting(index)}>
      <div className={(schedule[index].important && schedule[index].important) ? "schedule-important" : ""} />
      <div className="schedule-text">
        <div className="schedule-title"><b>{schedule[index].title}</b></div>
        <div className="schedule-date">{schedule[index].date}</div>
        <div className="schedule-zoom-link">{schedule[index].zoomLink}</div>
      </div>
      <div className="schedule-delete">
        <div className="schedule-edit-button" onClick={() => editMeeting(index)}>Edit</div>
        <div className="schedule-delete-button" onClick={() => deleteMeeting(index)}>Delete</div>
      </div>
    </div>
  )
}