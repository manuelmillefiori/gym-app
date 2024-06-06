import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import styles from "../css/edit-member.module.css";

export default function EditMember() {
   const params = useParams();
   const navigate = useNavigate();
   const [member, setMember] = useState({
      name: "",
      surname: "",
      email: "",
      age: "",
      membershipType: "",
      picture: ""
   });

   useEffect(() => {
      const fetchData = async () => {
         const url = import.meta.env.VITE_PATH_REQ + "/members/" + params.id;

         try {
            const response = await axios.get(url);
            setMember(response.data);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, [params.id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setMember(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const url = import.meta.env.VITE_PATH_REQ + "/members/" + params.id;
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
            <input name="name" type="text" value={member.name} onChange={handleChange} required />
            <label>Surname:</label>
            <input name="surname" type="text" value={member.surname} onChange={handleChange} required />
            <label>Email:</label>
            <input name="email" type="email" value={member.email} onChange={handleChange} required />
            <label>Age:</label>
            <input name="age" type="number" value={member.age} onChange={handleChange} required />
            <label>Membership Type:</label>
            <input name="membershipType" type="text" value={member.membershipType} onChange={handleChange} required />
            <label>Picture URL:</label>
            <input name="picture" type="text" value={member.picture} onChange={handleChange} required />
            <button type="submit">Edit Member</button>
         </form>
      </div>
   );
}
