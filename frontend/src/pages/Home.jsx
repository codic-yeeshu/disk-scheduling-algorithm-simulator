import { Link } from 'react-router-dom';
import AlgorithmCard from '../components/AlgorithmCard';

const algorithms = [
    {
        name: 'FCFS',
        algorithm: 'fcfs',
        description: 'First Come First Serve - The simplest disk scheduling algorithm. Requests are addressed in the order they arrive in the disk queue.'
    },
    {
        name: 'SSTF',
        algorithm: 'sstf',
        description: 'Shortest Seek Time First - Requests with the shortest seek time are executed first, minimizing arm movement.'
    },
    {
        name: 'SCAN',
        algorithm: 'scan',
        description: 'Elevator Algorithm - The disk arm moves in one direction, servicing requests until the end, then reverses direction.'
    },
    {
        name: 'C-SCAN',
        algorithm: 'cscan',
        description: 'Circular SCAN - The disk arm moves in a circular fashion, going to the other end of the disk after reaching one end.'
    },
    {
        name: 'LOOK',
        algorithm: 'look',
        description: 'LOOK Algorithm - Similar to SCAN, but the arm only goes as far as the last request in each direction.'
    },
    {
        name: 'C-LOOK',
        algorithm: 'clook',
        description: 'Circular LOOK - Combines C-SCAN and LOOK, preventing extra delay due to traversal to disk ends.'
    }
];

function Home() {
    return (
        <div className="container">
            {/* Hero Section */}
            <section className="hero">
                <h1>Disk Scheduling Algorithm Visualizer</h1>
                <p>
                    Explore and understand how different disk scheduling algorithms work.
                    Visualize the head movement patterns and compare performance across
                    FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK algorithms.
                </p>
                <div className="hero-actions">
                    <Link to="/compare" className="btn btn-primary" style={{
                        padding: 'var(--space-md) var(--space-2xl)'
                    }}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                            <path d="M2 14V4h3v10H2zm5.5 0V7h3v7h-3zM13 14V2h3v12h-3z" />
                        </svg>
                        Compare All Algorithms
                    </Link>
                    <Link to="/about" className="btn btn-secondary" style={{
                        padding: 'var(--space-md) var(--space-2xl)'
                    }}>
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Algorithm Cards */}
            <section>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: 'var(--space-sm)'
                }}>
                    Select an Algorithm
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    marginBottom: 'var(--space-lg)'
                }}>
                    Choose any algorithm below to simulate disk head movement
                </p>
                <div className="cards-grid">
                    {algorithms.map((algo) => (
                        <AlgorithmCard key={algo.algorithm} {...algo} />
                    ))}
                </div>
            </section>

            {/* What is Disk Scheduling Section */}
            <section className="glass-card" style={{
                marginTop: 'var(--space-2xl)',
                marginBottom: 'var(--space-2xl)'
            }}>
                <h2 style={{ marginBottom: 'var(--space-md)' }}>
                    What is Disk Scheduling?
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8'
                }}>
                    Disk scheduling is done by operating systems to schedule I/O requests
                    arriving for the disk. Disk scheduling is also known as I/O scheduling.
                    The main goal is to reduce seek time and increase the throughput of the
                    disk operations. Different algorithms provide different trade-offs between
                    throughput, fairness, and response time.
                </p>
                <div style={{
                    marginTop: 'var(--space-xl)',
                    display: 'flex',
                    gap: 'var(--space-md)',
                    flexWrap: 'wrap'
                }}>
                    <Link to="/compare" className="btn btn-primary">
                        Compare Performance
                    </Link>
                    <Link to="/about" className="btn btn-secondary">
                        Read More
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
