import styles from "../styles/Message.module.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}
  
interface Props {
  message: MessageType;
}

const Message = ({message}: Props): JSX.Element => {
  return (
    <div className={
        message.sender == "user" ? styles.userMsg: styles.botMsg
      }>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          className={styles.message}
        >
          {message.text}
        </ReactMarkdown>
    </div>
  )
}

export default Message
