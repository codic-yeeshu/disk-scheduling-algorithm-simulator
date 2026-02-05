import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Simulate from './pages/Simulate';
import About from './pages/About';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/simulate/:algorithm" element={<Simulate />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
