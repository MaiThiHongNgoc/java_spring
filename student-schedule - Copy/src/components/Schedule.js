import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import scheduleService from '../services/scheduleService';
import './Schedule.css';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [newClassScheduleId, setNewClassScheduleId] = useState('');
  const [newClassToUpdate, setNewClassToUpdate] = useState('');

  useEffect(() => {
    if (studentId) {
      scheduleService.getStudentSchedules(studentId).then(response => {
        setSchedules(response.data);
      }).catch(error => {
        console.error('Error fetching schedules:', error);
      });
    }
  }, [studentId]);

  const handleRegisterClass = () => {
    if (studentId && newClassScheduleId) {
      scheduleService.registerClass(studentId, newClassScheduleId).then(response => {
        alert('Class registered successfully!');
        setSchedules([...schedules, response.data]);
      }).catch(error => {
        console.error('Error registering class:', error);
      });
    }
  };

  const handleUpdateSchedule = (scheduleId) => {
    if (newClassToUpdate) {
      scheduleService.updateSchedule(scheduleId, newClassToUpdate).then(response => {
        alert('Class updated successfully!');
        setSchedules(schedules.map(schedule => (schedule.id === scheduleId ? response.data : schedule)));
      }).catch(error => {
        console.error('Error updating schedule:', error);
      });
    }
  };

  const handleDeleteSchedule = (scheduleId) => {
    scheduleService.deleteSchedule(scheduleId).then(() => {
      alert('Class deleted successfully!');
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    }).catch(error => {
      console.error('Error deleting schedule:', error);
    });
  };

  return (
    <div className="schedule-container">
      <h2>Student Class Schedule</h2>
      
      <div>
        <input 
          className="schedule-search-box"
          type="text" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          placeholder="Enter Student ID" 
        />
      </div>
      
      <div>
        <h3>Your Schedules</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Class Schedule ID</th>
              <th>Class Name</th>
              <th>Can Edit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.classSchedule.id}</td>
                <td>{schedule.classSchedul}</td>
                <td>{schedule.canEdit ? 'Yes' : 'No'}</td>
                <td>
                  {schedule.canEdit && (
                    <>
                      <button className="schedule-edit-btn" onClick={() => handleUpdateSchedule(schedule.id)}>
                        <FiEdit /> Update
                      </button>
                      <button className="schedule-delete-btn" onClick={() => handleDeleteSchedule(schedule.id)}>
                        <FiTrash2 /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="schedule-form">
        <input 
          type="text" 
          className="schedule-input"
          value={newClassScheduleId} 
          onChange={(e) => setNewClassScheduleId(e.target.value)} 
          placeholder="Enter Class Schedule ID to Register" 
        />
        <button className="schedule-submit-btn" onClick={handleRegisterClass}>Register Class</button>
      </div>

      <div className="schedule-form">
        <input 
          type="text" 
          className="schedule-input"
          value={newClassToUpdate} 
          onChange={(e) => setNewClassToUpdate(e.target.value)} 
          placeholder="Enter new Class Schedule ID for Update" 
        />
        <button className="schedule-submit-btn" onClick={() => handleUpdateSchedule(newClassToUpdate)}>Update Schedule</button>
      </div>
    </div>
  );
};

export default Schedule;
