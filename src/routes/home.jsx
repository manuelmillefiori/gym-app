import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../css/home.module.css";

export default function Home() {
   return(
      <div className={styles.container}>
         <div className={styles.sidebar}>
            <h2 className={styles.title}>Gym App</h2>
            <ul className={styles.navList}>
               <li key="1" className={styles.navListItem}>
                  <NavLink
                  to="/"
                  className={styles.memberLink}>
                     Home
                  </NavLink>
               </li>
               <li key="2" className={styles.navListItem}>
                  <NavLink
                  to="/members"
                  className={styles.memberLink}>
                     Members List
                  </NavLink>
               </li>
               <li key="3" className={styles.navListItem}>
                  <NavLink
                  to="/members/new"
                  className={styles.memberLink}>
                     Add Members
                  </NavLink>
               </li>
               <li key="4" className={styles.navListItem}>
                  <NavLink
                  to="/courses"
                  className={styles.memberLink}>
                     Courses List
                  </NavLink>
               </li>
               <li key="5" className={styles.navListItem}>
                  <NavLink
                  to="/courses/new"
                  className={styles.memberLink}>
                     Add Courses
                  </NavLink>
               </li>
            </ul>
         </div>
         <div className={styles.mainContent}>
            <Outlet />
         </div>
      </div>
   );
}
