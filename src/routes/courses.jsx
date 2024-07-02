import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../css/courses.module.css";

export default function Courses() {
   // State to memorize courses details
   const [courses, setCourses] = useState([]);

   // Location to trigger the courses refresh
   const location = useLocation(); // to check location state

   // Get data from server
   // Every time location changes
   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/courses";

         try {
            // Wait the response
            const response = await axios.get(url);

            // Set all the courses obtained
            setCourses(response.data);
         } catch (error) {
            // DEBUG
            // Print the error
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [location]);


   return (
      <div>
         <h2 className={styles.titleForm}>Courses List</h2>
         {/* Componente per visualizzare la lista delle membere */}
         <CoursesList courses={courses} />
      </div>
   );
}

// Componente per visualizzare la lista delle membere in una tabella
function CoursesList({ courses, setLastRow, lastRow }) {
   // Handle to navigate
   const navigate = useNavigate();

   // Function to manage the clicks from a single row
   function handleRowClick(index) {
      navigate("/courses/" + courses[index]._id + "/");
   }
   

   return (
      <table className={styles.coursesList}>
         <thead>
         <tr>
            <th>Title</th>
            <th>Instructor</th>
         </tr>
         </thead>
         <tbody>
         {courses.map((course, index) => (
            <tr
               key={index}
               onClick={() => handleRowClick(index)}
            >
               <td>{course.title}</td>
               <td>{course.instructorName + " " + course.instructorSurname}</td>
            </tr>
         ))}
         </tbody>
      </table>
   );
}
