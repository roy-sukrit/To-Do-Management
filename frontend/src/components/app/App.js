import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CategoryProvider } from "../../contexts/CategoryContext";
import { TodoProvider } from "../../contexts/TodoConext";
import { UserProvider } from "../../contexts/UserContext";
import { PathStateProvider } from '../../contexts/PathContext';
import Home from './Home';
import All from './All';
import Hero from '../../components/Hero';

function App() {
  return (
    <TodoProvider>
      <UserProvider>
        <CategoryProvider>
          <PathStateProvider>
            <Router>
              <Routes>
                {/* Hero component as the landing page */}
                <Route path="/" element={<All /> } />
                {/* Home component for /home route */}
                <Route path="/home" element={<Home />} />
                {/* Additional route for All component if needed */}
                <Route path="/all" element={<All />} />
              </Routes>
            </Router>
          </PathStateProvider>
        </CategoryProvider>
      </UserProvider>
    </TodoProvider>
  );
}

export default App;