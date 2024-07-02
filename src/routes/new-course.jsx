import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../css/new-course.module.css";

export default function NewCourse() {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [instructorName, setInstructorName] = useState("");
   const [instructorSurname, setInstructorSurname] = useState("");
   const [schedule, setSchedule] = useState("");

   // Handle to navigate
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();

      // Define the course structure
      const newCourse = { title, description, instructorName, instructorSurname, schedule };
      
      try {
         const url = import.meta.env.VITE_PATH_REQ + "/courses";
         const response = await axios.post(url, newCourse);
         
         navigate("/courses");
      } catch (error) {
         console.error('Error adding member:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.titleForm}>New Course</h2>
         <form onSubmit={handleSubmit} className={styles.form}>
            <label>Title:</label>
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               required
            />
            <label>Description:</label>
            <input
               type="text"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
            />
            <label>Instructor Name:</label>
            <input
               type="text"
               value={instructorName}
               onChange={(e) => setInstructorName(e.target.value)}
               required
            />
            <label>Instructor Surname:</label>
            <input
               type="text"
               value={instructorSurname}
               onChange={(e) => setInstructorSurname(e.target.value)}
               required
            />
            <label>Schedule:</label>
            <input
               type="date"
               value={schedule}
               onChange={(e) => setSchedule(e.target.value)}
               required
            />
            <button type="submit">Add Course</button>
         </form>
      </div>
   );
}
