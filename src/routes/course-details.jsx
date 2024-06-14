import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../css/course-details.module.css";

export default function CourseDetails() {
   const params = useParams();
   const [course, setCourse] = useState(null);

   // Handle to navigate
   const navigate = useNavigate();

   // Obtain the course at every course id change
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

   // Handle the delete of the course
   const handleDelete = async () => {
      const url = import.meta.env.VITE_PATH_REQ + "/courses/" + params.id;
      try {
         // Request to delete
         await axios.delete(url);

         // Redirect to the courses main page
         navigate("/courses");
      } catch (error) {
         console.error('Error deleting course:', error);
      }
   };

   const handleEdit = () => {
      navigate("/courses/" + course.id + "/edit")
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
                     <p><b>Schedule:</b> {course.schedule}</p>
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
