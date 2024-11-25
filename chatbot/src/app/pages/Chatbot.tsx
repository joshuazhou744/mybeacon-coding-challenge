import Container from "../components/Container";
import Input from "../components/Input";


export default function Chatbot() {
  const description = "This is a simple AI chatbot that can help you with your queries regarding immigration. Ask anything and it will try to help you with the best possible answer.";

  return (
    <Container title="AI Chatbot" description={description}>
      
      <Input />
    </Container>
  )
}
