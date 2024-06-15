import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import styles from "../css/edit-course.module.css";

export default function EditCourse() {
   const params = useParams();
   const navigate = useNavigate();
   const [course, setCourse] = useState({
      title: "",
      description: "",
      instructorName: "",
      instructorSurname: "",
      schedule: "",
   });

   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/courses/" + params.id;

         try {
            const response = await axios.get(url);
            setCourse(response.data);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params.id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setCourse(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const url = import.meta.env.VITE_PATH_REQ + "/courses/" + params.id;
         await axios.put(url, course);

         navigate("/courses/" + course.id);
      } catch (error) {
         console.error('Error editing course:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.titleForm}>Edit Course</h2>
         <form id="editForm" onSubmit={handleSubmit} className={styles.form}>
            <label>Title:</label>
            <input name="title" type="text" value={course.title} onChange={handleChange} required />
            <label>Description:</label>
            <input name="description" type="text" value={course.description} onChange={handleChange} required />
            <label>Instructor Name:</label>
            <input name="instructorName" type="text" value={course.instructorName} onChange={handleChange} required />
            <label>Instructor Surname:</label>
            <input name="instructorSurname" type="text" value={course.instructorSurname} onChange={handleChange} required />
            <label>Schedule:</label>
            <input name="schedule" type="date" value={course.schedule} onChange={handleChange} required />
            <button type="submit">Edit Course</button>
         </form>
      </div>
   );
}
