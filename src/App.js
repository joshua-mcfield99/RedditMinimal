import './App.css';
import Header from './components/header';
import Main from './components/main';
import SideBar from './components/sideBar';

function App() {
  return (
    <div className="App">
        <Header />
        <SideBar />
        <Main />
    </div>
  );
}

export default App;
