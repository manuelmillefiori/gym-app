import { useState, useEffect } from "react";
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
         const url = "http://localhost:5000/members/" + params.id;

         try {
            const response = await axios.get(url);
            setMember(response.data);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params.id]);

   // Handle the delete of the member
   const handleDelete = async () => {
      const url = "http://localhost:5000/members/" + params.id;
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
      // Handle edit logic, e.g., redirect to an edit form
   };

   return (
      <div className={styles.container}>
         {member ? (
            <div className={styles.memberInfo}>
               <h1>{member.name} {member.surname}</h1>
               <p><b>Email:</b> {member.email}</p>
               <p><b>Age:</b> {member.age}</p>
               <p><b>Membership Type:</b> {member.membershipType}</p>
               {/* Aggiungi altre proprietà del membro qui */}
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
