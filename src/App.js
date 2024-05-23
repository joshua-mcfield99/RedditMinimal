import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';
import SideBar from './components/sideBar';


function App() {
  return (
    <Router>
        <div className="App">
            <Header />
            <div>
                <SideBar />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/r/:subreddit' element={<Main />} />
                </Routes>
                <Main />
            </div>
        </div>
    </Router>
  );
}

export default App;
