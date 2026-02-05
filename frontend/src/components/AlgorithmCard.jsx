import { Link } from 'react-router-dom';

const algorithmColors = {
    fcfs: '#3b82f6',
    sstf: '#8b5cf6',
    scan: '#06b6d4',
    cscan: '#10b981',
    look: '#f59e0b',
    clook: '#ec4899'
};

function AlgorithmCard({ name, description, algorithm }) {
    return (
        <div className="algorithm-card" style={{ borderLeftColor: algorithmColors[algorithm] || 'var(--primary-color)', borderLeftWidth: '4px' }}>
            <h3 style={{ marginBottom: 'var(--space-sm)' }}>{name}</h3>
            <p>{description}</p>
            <div className="card-actions">
                <Link to={`/simulate/${algorithm}`} className="btn btn-primary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 2L12 8L4 14V2Z" />
                    </svg>
                    Simulate
                </Link>
            </div>
        </div>
    );
}

export default AlgorithmCard;
