import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../css/member-details.module.css";

import { delMember, fetchMember } from "../services/api";

export default function MemberDetails() {
   const params = useParams();
   const [member, setMember] = useState(null);

   // Handle to navigate
   const navigate = useNavigate();

   // Obtain the member at every member id change
   useEffect(() => {
      const loadMember = async () => {
         try {
            // Fetch the member data
            const data = await fetchMember(params._id);
            setMember(data);
         } catch (error) {
            console.error("Error: ", error);
         }
      };

      loadMember();
   }, [params._id]);

   // Handle the delete of the member
   const handleDelete = async () => {
      try {
         // Request to delete the member
         await delMember(params._id);

         // Redirect to the members main page
         navigate("/members");
      } catch (error) {
         console.error("Error deleting member: ", error);
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
