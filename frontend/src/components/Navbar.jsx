import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const algorithms = ['fcfs', 'sstf'];

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <Link to="/" className="navbar-brand">
                    Disk Scheduler
                </Link>

                <ul className="navbar-nav">
                    <li>
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                            Home
                        </Link>
                    </li>

                    <li className="dropdown">
                        <span className="nav-link" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Simulate
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M2 4L6 8L10 4" />
                            </svg>
                        </span>
                        <div className="dropdown-menu">
                            {algorithms.map(algo => (
                                <Link
                                    key={algo}
                                    to={`/simulate/${algo}`}
                                    className="dropdown-item"
                                >
                                    {algo.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                    </li>

                    <li>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
