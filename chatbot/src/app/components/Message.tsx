import styles from "../styles/Message.module.css";


interface MessageType {
    id: string;
    text: string;
    sender: 'user' | 'bot';
  }
  
interface Props {
message: MessageType;
}

const Message: React.FC<Props> = ({message}) => {
  return (
    <div className={
        message.sender == "user" ? styles.userMsg: styles.botMsg
      }>
        {message.text}
    </div>
  )
}

export default Message
