import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../css/new-member.module.css";

export default function NewMember() {
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [email, setEmail] = useState("");
   const [age, setAge] = useState("");
   const [membershipType, setMembershipType] = useState("");

   // Handle to navigate
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      // Stop from reloading the page
      event.preventDefault();

      // Define the member structure
      const newMember = { name, surname, email, age, membershipType };
      
      // Send data to the server
      try {
         const url = import.meta.env.VITE_PATH_REQ + "/members";
         const response = await axios.post(url, newMember);
         
         // Redirect to /members
         navigate("/members");

         // Manage the errors
      } catch (error) {
         console.error('Error adding member:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h1>New Member</h1>
         <form onSubmit={handleSubmit} className={styles.form}>
            <label>
               Name:
               <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
               />
            </label>
            <label>
               Surname:
               <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
               />
            </label>
            <label>
               Email:
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </label>
            <label>
               Age:
               <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
               />
            </label>
            <label>
               Membership Type:
               <input
                  type="text"
                  value={membershipType}
                  onChange={(e) => setMembershipType(e.target.value)}
                  required
               />
            </label>
            <button type="submit">Add Member</button>
         </form>
      </div>
   );
}
