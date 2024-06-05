import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import styles from "../css/edit-member.module.css";

export default function EditMember() {
   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/members/" + params.id;

         try {
            const response = await axios.get(url);
            const member = response.data;
            const editForm = document.getElementById("editForm");
            editForm.name.value = member.name;
            editForm.surname.value = member.surname;
            editForm.email.value = member.email;
            editForm.age.value = member.age;
            editForm.membershipType.value = member.membershipType;
            editForm.picture.value = member.picture; // Added line for picture

         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params.id]);

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const editForm = document.getElementById("editForm");

         const member = {
            id: params.id,
            name: editForm.name.value,
            surname: editForm.surname.value,
            email: editForm.email.value,
            age: editForm.age.value,
            membershipType: editForm.membershipType.value,
            picture: editForm.picture.value, // Added line for picture
         };

         const url = import.meta.env.VITE_PATH_REQ + "/members/" + member.id;
         await axios.put(url, member);
         
         navigate("/members/" + member.id);

      } catch (error) {
         console.error('Error editing member:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h2 className={styles.titleForm}>Edit Member</h2>
         <form id="editForm" onSubmit={handleSubmit} className={styles.form}>
            <label>Name:</label>
            <input name="name" type="text" required />
            <label>Surname:</label>
            <input name="surname" type="text" required />
            <label>Email:</label>
            <input name="email" type="email" required />
            <label>Age:</label>
            <input name="age" type="number" required />
            <label>Membership Type:</label>
            <input name="membershipType" type="text" required />
            <label>Picture URL:</label> {/* Added label for picture */}
            <input name="picture" type="text" required /> {/* Added input for picture */}
            <button type="submit">Edit Member</button>
         </form>
      </div>
   );
}
