import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../css/members.module.css";

export default function Members() {
   // State to memorize members details
   const [members, setMembers] = useState([]);

   // Location to trigger the members refresh
   const location = useLocation(); // to check location state

   // Get data from server
   // Every time location changes
   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/members";

         try {
            // Wait the response
            const response = await axios.get(url);

            // Set all the members obtained
            setMembers(response.data);
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
         <h2 className={styles.titleForm}>Members List</h2>
         {/* Componente per visualizzare la lista delle membere */}
         <MemberList members={members} />
      </div>
   );
}

// Componente per visualizzare la lista delle membere in una tabella
function MemberList({ members, setLastRow, lastRow }) {
   // Handle to navigate
   const navigate = useNavigate();

   // Function to manage the clicks from a single row
   function handleRowClick(index) {
      navigate("/members/" + members[index]._id + "/");
   }
   

   return (
      <table className={styles.membersList}>
         <thead>
         <tr>
            <th>Name</th>
            <th>Surname</th>
         </tr>
         </thead>
         <tbody>
         {members.map((member, index) => (
            <tr
               key={index}
               onClick={() => handleRowClick(index)}
            >
               <td>{member.name}</td>
               <td>{member.surname}</td>
            </tr>
         ))}
         </tbody>
      </table>
   );
}
