import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "../css/members.module.css";

import { fetchMembers, filterMembers } from "../services/api";

export default function Members() {
   // State to memorize members details
   const [members, setMembers] = useState([]);

   // Location to trigger the members refresh
   const location = useLocation(); // to check location state

   // Get data from server
   // Every time location changes
   useEffect(() => {
      const loadMembers = async () => {
         try {
            // Fetch the members
            const data = await fetchMembers();
            setMembers(data);
         } catch (error) {
            // Print the error
            console.error('Error:', error);
         }
      }

      loadMembers();
   }, [location]);


   return (
      <div>
         <h2 className={styles.titleForm}>Members List</h2>
         {/* Componente per visualizzare la lista delle membere */}
         <MemberList members={members} setMembers={setMembers} />
      </div>
   );
}

// Componente per visualizzare la lista delle membere in una tabella
function MemberList({ members, setMembers, setLastRow, lastRow }) {
   // Handle to navigate
   const navigate = useNavigate();

   // Function to manage the clicks from a single row
   function handleRowClick(index) {
      navigate("/members/" + members[index]._id + "/");
   }

   // Function to filter the members list
   async function filterSearch(search) {
      // Verifico che il campo non sia vuota
      // per poter filtrare
      if (search != null) {
         // Trim della stringa
         search = search.trim();

         try {
            // Ottengo la lista dei membri filtrata
            // e la aggiorno
            const data = await filterMembers(search);
            setMembers(data);
         } catch (error) {
            console.error("Error filtering members: ", error);
         }
      }
   }
   

   return (
      <div className={styles.membersBox}>
         <input
            type="text"
            className={styles.searchField}
            onChange={(e) => filterSearch(e.target.value)}
         ></input>
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
      </div>
   );
}
