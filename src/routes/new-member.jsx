import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../css/new-member.module.css";

import { addMember } from "../services/api";

export default function NewMember() {
   const [name, setName] = useState("");
   const [surname, setSurname] = useState("");
   const [email, setEmail] = useState("");
   const [age, setAge] = useState("");
   const [membershipType, setMembershipType] = useState("");
   const [picture, setPicture] = useState(""); // Added state for picture

   // Handle to navigate
   const navigate = useNavigate();

   const handleSubmit = async (event) => {
      event.preventDefault();

      // Define the member structure
      const newMember = { name, surname, email, age, membershipType, picture }; // Included picture
      
      try {
         // Add a member
         await addMember(newMember);
         
         navigate("/members");
      } catch (error) {
         // Print the error
         console.error('Error adding member:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.titleForm}>New Member</h2>
         <form onSubmit={handleSubmit} className={styles.form}>
            <label>Name:</label>
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />
            <label>Surname:</label>
            <input
               type="text"
               value={surname}
               onChange={(e) => setSurname(e.target.value)}
               required
            />
            <label>Email:</label>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <label>Age:</label>
            <input
               type="number"
               value={age}
               onChange={(e) => setAge(e.target.value)}
               required
            />
            <label>Membership Type:</label>
            <input
               type="text"
               value={membershipType}
               onChange={(e) => setMembershipType(e.target.value)}
               required
            />
            <label>Picture URL:</label>
            <input
               type="text"
               value={picture}
               onChange={(e) => setPicture(e.target.value)}
               required
            />
            <button type="submit">Add Member</button>
         </form>
      </div>
   );
}
