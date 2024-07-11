import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../css/courses.module.css";

import { fetchCourses, filterCourses } from "../services/api";

export default function Courses() {
   // State to memorize courses details
   const [courses, setCourses] = useState([]);

   // Location to trigger the courses refresh
   const location = useLocation(); // to check location state

   // Get data from server
   // Every time location changes
   useEffect(() => {
      const loadCourses = async () => {
         try {
            // Fetch the courses
            const data = await fetchCourses();
            setCourses(data);
         } catch (error) {
            // Print the error
            console.error('Error:', error);
         }
      };

      loadCourses();
   }, [location]);

   return (
      <div>
         <h2 className={styles.titleForm}>Courses List</h2>
         {/* Componente per visualizzare la lista delle membere */}
         <CoursesList courses={courses} setCourses={setCourses} />
      </div>
   );
}

// Componente per visualizzare la lista delle membere in una tabella
function CoursesList({ courses, setCourses, setLastRow, lastRow }) {
   // Handle to navigate
   const navigate = useNavigate();

   // Function to manage the clicks from a single row
   function handleRowClick(index) {
      navigate("/courses/" + courses[index]._id + "/");
   }
   
   // Function to filter the courses list
   async function filterSearch(search) {
      // Verifico che il campo non sia vuota
      // per poter filtrare
      if (search != null) {
         // Trim della stringa
         search = search.trim();

         try {
            // Ottengo la lista dei corsi filtrata
            // e la aggiorno
            const data = await filterCourses(search);
            setCourses(data);
         } catch (error) {
            console.error("Error filtering courses: ", error);
         }
      }
   }

   return (
      <div className={styles.coursesBox}>
         <input
            type="text"
            className={styles.searchField}
            onChange={(e) => filterSearch(e.target.value)}
         ></input>
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
      </div>
   );
}
