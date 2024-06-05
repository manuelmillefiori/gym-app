import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../css/members.module.css";

export default function Members() {
   // State to memorize members details
   const [members, setMembers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   // Location to trigger the members refresh
   const location = useLocation(); // to check location state

   // Old Style
   /*
   useEffect(() => {
      fetch('http://localhost:5000/members')
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(error => console.error('Error fetching members:', error));
   }, []);
   */

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


   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredMembers = members.filter((member) =>
      `${member.name} ${member.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return(
      <div className={styles.container}>
         <div className={styles.sidebar}>
            <h1 className={styles.title}>Gym App</h1>
            <NavLink to="/members/new" className={styles.addButton}>+</NavLink>
            <input
               type="text"
               placeholder="Search members..."
               value={searchTerm}
               onChange={handleSearch}
               className={styles.searchInput}
            />
            <ul className={styles.memberList}>
               {filteredMembers.map((member) => (
                  <li key={member.id} className={styles.memberListItem}>
                     <NavLink
                     to={"/members/" + member.id}
                     className={styles.memberLink}>
                        {member.name + " " + member.surname}
                     </NavLink>
                  </li>
               ))}
            </ul>
         </div>
         <div className={styles.mainContent}>
            {/* Show the children node */}
            <Outlet />
         </div>
      </div>
   );
}
