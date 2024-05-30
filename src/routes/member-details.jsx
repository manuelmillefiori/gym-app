import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../css/member-details.module.css";

export default function MemberDetails() {
   const params = useParams();
   const [member, setMember] = useState(null);

   // Old style
   /*
   useEffect(() => {
      fetch('http://localhost:5000/members/' + params.id)
         .then(response => response.json())
         .then(data => setMember(data))
         .catch(error => console.error('Errore nel recupero del membro:', error));
   }, [params.id]);
   */

   useEffect(() => {
      const fetchData = async () => {
         const url = "http://localhost:5000/members/" + params.id;

         try {
            // Wait the response
            const response = await axios.get(url);

            // Set the member data
            setMember(response.data);
         } catch (error) {
            // DEBUG
            // Print the error
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params.id]);

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
      </div>
   );
}
