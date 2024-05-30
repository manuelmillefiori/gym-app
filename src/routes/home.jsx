import React from 'react';
import { Link } from "react-router-dom";
import styles from "../css/home.module.css"; // Importa il file CSS come modulo

export default function Home() {
   return (
      <div>
         <nav className={styles.navbar}>
            <ul className={styles.navList}>
               <li className={styles.navListItem}><Link to="/">Home</Link></li>
               <li className={styles.navListItem}><Link to="/members">Members List</Link></li>
            </ul>
         </nav>
         <div className={styles.mainContent}>
            <h1>Welcome to the Gym App</h1>
            {/* Additional content for the home page */}
         </div>
      </div>
   );
}
