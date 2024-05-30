import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import styles from "../css/members.module.css"; // Importo il modulo CSS

// Member class definition
class Member {
   constructor(id, name, surname, email, age, membershipType) {
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.age = age;
      this.membershipType = membershipType;
   }
}

export default function Members() {
   // State to memorize members details
   const [members, setMembers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   // Old Style
   /*
   useEffect(() => {
      fetch('http://localhost:5000/members')
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(error => console.error('Error fetching members:', error));
   }, []);
   */

   useEffect(() => {
      const fetchData = async () => {
         const url = "http://localhost:5000/members";

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
   }, []);


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
            <NavLink to="/members/new">+</NavLink>
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
