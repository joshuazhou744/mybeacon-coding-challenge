// Chatbox.tsx
"use client";

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Container from "./Container";
import Input from "./Input";
import Sidebar from "./Sidebar";
import styles from '../styles/Chatbot.module.css';


const Chatbot = (): JSX.Element => {
  const description = "This AI chatbot will help you with your queries regarding immigration to Canada. Ask away!";
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Container title="BeaconBot" description={description} isSidebarOpen={isSidebarOpen}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      <button onClick={toggleSidebar} className={styles.sidebarButton}>
            <FaBars size={24} />
      </button>
      <Input />
    </Container>
  )
}

export default Chatbot;
