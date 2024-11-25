// Container.tsx
import styles from '../styles/Container.module.css';

interface Props {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const Container: React.FC<Props> = ({title, description, children}) => {
  return (
    <div className={styles.container}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Container;
