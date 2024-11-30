// page.tsx
import Chatbot from './components/Chatbot';
import './styles/globals.css';

const Home: React.FC = () => {
  return (
    <div className="main">
      <Chatbot />
    </div>
  );
}

export default Home;