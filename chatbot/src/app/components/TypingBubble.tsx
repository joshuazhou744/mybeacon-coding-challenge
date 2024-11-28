"use client";
import { motion } from 'framer-motion'
import styles from "../styles/TypingBubble.module.css"

const opacities = {
    hidden: {opacity: 0.3},
    visible: {opacity: 1},
}

const TypingBubble = (): JSX.Element => {
    return (
        <div className={styles.typingContainer}>
            <motion.div
                className={styles.dot}
                variants={opacities}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0,
                }}
            />
            <motion.div
                className={styles.dot}
                variants={opacities}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.2,
                }}
            />
            <motion.div
                className={styles.dot}
                variants={opacities}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.4,
                }}
            />
        </div>
    )
}

export default TypingBubble;
