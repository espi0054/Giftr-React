import './App.css';
import AddPeople from './components/AddPeople'
import addGifts from './components/AddGift'
import Gifts from './components/Gifts'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/people/add" element={<AddPeople />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
