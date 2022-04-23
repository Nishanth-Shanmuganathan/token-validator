import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './App.scss';
import './styles/main.scss';

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
