import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../css/member-details.module.css";

export default function MemberDetails() {
   const params = useParams();
   const [member, setMember] = useState(null);

   // Handle to navigate
   const navigate = useNavigate();

   // Obtain the member at every member id change
   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/members/" + params._id;

         try {
            const response = await axios.get(url);
            setMember(response.data);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params._id]);

   // Handle the delete of the member
   const handleDelete = async () => {
      const url = import.meta.env.VITE_PATH_REQ + "/members/" + params._id;
      try {
         // Request to delete
         await axios.delete(url);

         // Redirect to the members main page
         navigate("/members");
      } catch (error) {
         console.error('Error deleting member:', error);
      }
   };

   const handleEdit = () => {
      navigate("/members/" + member._id + "/edit")
   };

   return (
      <div className={styles.container}>
         {member ? (
            <div className={styles.memberInfo}>
               <h2 className={styles.titleForm}>{member.name} {member.surname}</h2>
               <div className={styles.detailsContainer}>
                  <div className={styles.imageContainer}>
                     <img src={member.picture} alt="Member" className={styles.memberImage} />
                  </div>
                  <div className={styles.memberData}>
                     <p><b>Email:</b> {member.email}</p>
                     <p><b>Age:</b> {member.age}</p>
                     <p><b>Membership Type:</b> {member.membershipType}</p>
                  </div>
               </div>
            </div>
         ) : (
            null
         )}
         <div className={styles.buttonContainer}>
            <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
            <button onClick={handleEdit} className={styles.editButton}>Edit</button>
         </div>
      </div>
   );
}
