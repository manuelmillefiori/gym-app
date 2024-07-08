import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../css/course-details.module.css";

import { fetchCourse, delCourse } from "../services/api";

export default function CourseDetails() {
   const params = useParams();
   const [course, setCourse] = useState(null);

   // Handle to navigate
   const navigate = useNavigate();

   /**
    * Function to format a ISO 8601 date in
    * a dd/mm/yyyy date
    */
   function formatDate(isoDate) {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
   }

   // Obtain the course at every course id change
   useEffect(() => {
      const loadCourse = async () => {
         try {
            // Fetch the course data
            const data = await fetchCourse(params._id);

            setCourse(data);
         } catch (error) {
            console.error("Error: ", error);
         }
      };

      loadCourse();
   }, [params._id]);

   // Handle the delete of the course
   const handleDelete = async () => {
      try {
         // Request to delete the course
         await delCourse(params._id);

         // Redirect to the courses main page
         navigate("/courses");
      } catch (error) {
         console.error("Error deleting course: ", error);
      }
   };

   const handleEdit = () => {
      navigate("/courses/" + course._id + "/edit")
   };

   return (
      <div className={styles.container}>
         {course ? (
            <div className={styles.courseInfo}>
               <h2 className={styles.titleForm}>{course.title}</h2>
               <div className={styles.detailsContainer}>
                  <div className={styles.courseData}>
                     <p><b>Instructor:</b> {course.instructorName + " " + course.instructorSurname}</p>
                     <p><b>Description:</b> {course.description}</p>
                     <p><b>Schedule:</b> {formatDate(course.schedule)}</p>
                  </div>
               </div>
            </div>
         ) : (
            null
         )}
         <div className={styles.buttonContainer}>
            <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
            <button onClick={handleEdit} className={styles.editButton}>Edit</button>
         </div>
      </div>
   );
}
