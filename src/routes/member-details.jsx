import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/member-details.module.css";

export default function MemberDetails() {
   const params = useParams();
   const [member, setMember] = useState(null);

   useEffect(() => {
      fetch('http://localhost:5000/members/' + params.id)
         .then(response => response.json())
         .then(data => setMember(data))
         .catch(error => console.error('Errore nel recupero del membro:', error));
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
