// Sidebar.tsx
"use client";

import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa'; 
import styles from '../styles/Sidebar.module.css';
import {clearLogs} from '../services/api';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// sidebar animation variants: open and closed
const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 175,
      damping: 30,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const Sidebar = ({isOpen, toggleSidebar}: Props): JSX.Element => {
  // api call to clear messages and reload page to start a new session
  const clearMessages = async () => {
    try {
      await clearLogs();
      window.location.reload();
    } catch (error) {
      console.error('Error clearing messages: ', error);
    }
  }

  return (
    <motion.div
      className={styles.sidebar}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <div className={styles.header}>
        <h2>Menu</h2>
        <button onClick={toggleSidebar} className={styles.closeButton} aria-label="Close Sidebar">
          <FaTimes size={20} />
        </button>
      </div>

      {/*<button 
      onClick={() => window.open('https://mybeacon.ca', '_blank')} 
      className={styles.button}>
        MyBeacon
      </button>*/}

      <a
        href="https://mybeacon.ca"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        MyBeacon
      </a>

      <button onClick={clearMessages} className={styles.button}>
        New Session
      </button>

    </motion.div>
  )
}

export default Sidebar;