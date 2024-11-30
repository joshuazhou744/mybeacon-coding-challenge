// Container.tsx
import styles from '../styles/Container.module.css';

interface Props {
    title: string;
    description: string;
    children?: React.ReactNode;
    isSidebarOpen?: boolean;
}

const Container = ({title, description, children, isSidebarOpen}: Props): JSX.Element => {
  return (
    <div className={`${styles.container} ${isSidebarOpen ? styles.sidebarOpen: styles.sidebarClosed}`}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Container;
