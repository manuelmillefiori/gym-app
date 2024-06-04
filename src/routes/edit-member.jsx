import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import styles from "../css/edit-member.module.css";

export default function EditMember() {
   // Obtain the params to get the member id
   const params = useParams();

   // Handle to navigate
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         // Compose the url
         const url = "https://my-json-server.typicode.com/manuelmillefiori/gym-app/members/" + params.id;

         try {
            const response = await axios.get(url);

            // Save the member data
            const member = response.data;

            // Obtain the ref at the form
            const editForm = document.getElementById("editForm");

            // Set all the data
            editForm.name.value = member.name;
            editForm.surname.value = member.surname;
            editForm.email.value = member.email;
            editForm.age.value = member.age;
            editForm.membershipType.value = member.membershipType;

         } catch (error) {
            console.error('Error:', error);
         }
      };

      // Fetch the member data
      fetchData();
   }, [params.id]);

   // Lambda to send a req to edit the member data
   const handleSubmit = async (event) => {
      // Stop from reloading the page
      event.preventDefault();

      // Req to edit the member data
      try {
         // Obtain the ref at the form
         const editForm = document.getElementById("editForm");

         // Compose the member to update
         const member = {
            id: params.id,
            name: editForm.name.value,
            surname: editForm.surname.value,
            email: editForm.email.value,
            age: editForm.age.value,
            membershipType: editForm.membershipType.value,
         };

         const url = "https://my-json-server.typicode.com/manuelmillefiori/gym-app/members/" + member.id;
         const response = await axios.put(url, member);
         
         // Redirect to /members/:id
         navigate("/members/" + member.id);

         // Manage the errors
      } catch (error) {
         console.error('Error adding member:', error);
      }
   };

   return (
      <div className={styles.container}>
         <h1>Edit Member</h1>
         <form id="editForm" onSubmit={handleSubmit} className={styles.form}>
            <label>
               Name:
               <input
                  name="name"
                  type="text"
                  required
               />
            </label>
            <label>
               Surname:
               <input
                  name="surname"
                  type="text"
                  required
               />
            </label>
            <label>
               Email:
               <input
                  name="email"
                  type="email"
                  required
               />
            </label>
            <label>
               Age:
               <input
                  name="age"
                  type="number"
                  required
               />
            </label>
            <label>
               Membership Type:
               <input
                  name="membershipType"
                  type="text"
                  required
               />
            </label>
            <button type="submit">Edit Member</button>
         </form>
      </div>
   );
}
