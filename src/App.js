import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/r/:subreddit" element={<Main />} />
                        <Route path="/search" element={<Main />} />
                        <Route path="/" element={<Main />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;