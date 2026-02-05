import { useState } from 'react';

function InputForm({ onSubmit, showDirection = false, loading = false, buttonText = 'Run' }) {
    const [sequence, setSequence] = useState('');
    const [head, setHead] = useState('');
    const [direction, setDirection] = useState('Right');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Parse sequence
        const parsedSequence = sequence
            .split(/[,\s]+/)
            .filter(s => s !== '')
            .map(s => parseInt(s, 10));

        if (parsedSequence.length === 0 || parsedSequence.some(isNaN)) {
            alert('Please enter valid integer values for the request sequence');
            return;
        }

        const parsedHead = parseInt(head, 10);
        if (isNaN(parsedHead) || parsedHead < 0) {
            alert('Please enter a valid head position');
            return;
        }

        // Validate range
        if ([...parsedSequence, parsedHead].some(n => n < 0 || n > 199)) {
            alert('All values must be between 0 and 199');
            return;
        }

        onSubmit({
            sequence: parsedSequence,
            head: parsedHead,
            direction
        });
    };

    return (
        <form onSubmit={handleSubmit} className="glass-card">
            <div className="form-group">
                <label className="form-label">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
                        <rect x="1" y="3" width="14" height="2" rx="1" />
                        <rect x="1" y="7" width="10" height="2" rx="1" />
                        <rect x="1" y="11" width="12" height="2" rx="1" />
                    </svg>
                    Request Sequence
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., 98, 183, 37, 122, 14, 124, 65, 67"
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                    required
                />
                <small style={{ color: 'var(--text-muted)', marginTop: 'var(--space-xs)', display: 'block', fontSize: '0.8rem' }}>
                    Enter comma or space separated values (0-199)
                </small>
            </div>

            <div className="form-group">
                <label className="form-label">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-muted)' }}>
                        <circle cx="8" cy="8" r="6" />
                        <circle cx="8" cy="8" r="2" fill="currentColor" />
                    </svg>
                    Initial Head Position
                </label>
                <input
                    type="number"
                    className="form-input"
                    placeholder="e.g., 53"
                    min="0"
                    max="199"
                    value={head}
                    onChange={(e) => setHead(e.target.value)}
                    required
                />
            </div>

            {showDirection && (
                <div className="form-group">
                    <label className="form-label">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-muted)' }}>
                            <path d="M2 8H12M12 8L8 4M12 8L8 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Direction
                    </label>
                    <select
                        className="form-select"
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                    >
                        <option value="Left">Left (Toward 0)</option>
                        <option value="Right">Right (Toward 199)</option>
                    </select>
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary"
                style={{
                    width: '100%',
                    padding: 'var(--space-md) var(--space-xl)',
                    marginTop: 'var(--space-md)'
                }}
                disabled={loading}
            >
                {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="spinner"></span>
                        Processing...
                    </span>
                ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4 2L12 8L4 14V2Z" />
                        </svg>
                        {buttonText}
                    </span>
                )}
            </button>
        </form>
    );
}

export default InputForm;
