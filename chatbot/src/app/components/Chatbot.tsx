// Chatbox.tsx
import Container from "./Container";
import Input from "./Input";


const Chatbot = (): JSX.Element => {
  const description = "This simple AI chatbot will help you with your queries regarding immigration to Canada. Ask away!";

  return (
    <Container title="BeaconBot" description={description}>
      <Input />
    </Container>
  )
}

export default Chatbot;
