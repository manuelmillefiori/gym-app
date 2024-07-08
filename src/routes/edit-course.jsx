import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../css/edit-course.module.css";

import { fetchCourse, updateCourse } from "../services/api";

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

   /**
    * Function to format a ISO 8601 date in
    * a yyyy-mm-dd date
    */
   function formatDate(isoDate) {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${year}-${month}-${day}`;
   }

   useEffect(() => {
      const loadCourse = async () => {
         try {
            // Fetch the course
            const data = await fetchCourse(params._id);
            setCourse(data);
         } catch (error) {
            console.error('Error: ', error);
         }
      };

      loadCourse();
   }, [params._id]);

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
         // Update the course
         await updateCourse(params._id, course);

         navigate("/courses/" + params._id);
      } catch (error) {
         console.error('Error editing course: ', error);
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
            <input name="schedule" type="date" value={formatDate(course.schedule)} onChange={handleChange} required />
            <button type="submit">Edit Course</button>
         </form>
      </div>
   );
}
