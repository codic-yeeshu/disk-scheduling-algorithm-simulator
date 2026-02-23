import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import ChartDisplay from '../components/ChartDisplay';
import { compareAlgorithms } from '../api/algorithms';

const algorithms = ['fcfs', 'sstf', 'scan', 'cscan', 'look', 'clook'];

const algorithmColors = {
    fcfs: '#3b82f6',
    sstf: '#8b5cf6',
    scan: '#06b6d4',
    cscan: '#10b981',
    look: '#f59e0b',
    clook: '#ec4899'
};

function Compare() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await compareAlgorithms(data);
            setResult(response);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred while processing');
        } finally {
            setLoading(false);
        }
    };

    // Find best algorithm
    const getBestAlgorithm = () => {
        if (!result) return null;
        return algorithms.find(algo => result[algo]?.totalSeekCount === result.minimumSeekCount);
    };

    return (
        <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <h1>Compare All Algorithms</h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-md)',
                    maxWidth: '600px',
                    margin: 'var(--space-md) auto 0',
                    lineHeight: '1.8'
                }}>
                    Enter your request sequence and compare the performance of all disk scheduling algorithms side by side.
                </p>
            </div>

            {/* Input Form */}
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <InputForm
                    onSubmit={handleSubmit}
                    showDirection={true}
                    loading={loading}
                    buttonText="Compare All"
                />
            </div>

            {/* Error Display */}
            {error && (
                <div className="glass-card" style={{
                    marginTop: 'var(--space-xl)',
                    maxWidth: '500px',
                    margin: 'var(--space-xl) auto 0',
                    borderColor: 'var(--error-color)',
                    background: 'rgba(220, 38, 38, 0.1)'
                }}>
                    <p style={{
                        color: 'var(--error-color)',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-sm)'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}

            {/* Results */}
            {result && (
                <div style={{ marginTop: 'var(--space-2xl)' }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-xl)'
                    }}>
                        Comparison Results
                    </h2>

                    {/* Best Algorithm Highlight */}
                    <div className="glass-card" style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-xl)',
                        background: 'rgba(37, 99, 235, 0.1)',
                        borderColor: 'var(--primary-color)'
                    }}>
                        <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-sm)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Best Performance
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-md)',
                            flexWrap: 'wrap'
                        }}>
                            <span style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: algorithmColors[getBestAlgorithm()] || 'var(--text-primary)'
                            }}>
                                {getBestAlgorithm()?.toUpperCase()}
                            </span>
                            <span style={{
                                padding: '8px 16px',
                                background: 'var(--primary-color)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '1.125rem'
                            }}>
                                {result.minimumSeekCount} seeks
                            </span>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="glass-card" style={{ overflow: 'auto', padding: 0 }}>
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '35%' }}>Algorithm</th>
                                    <th style={{ width: '35%' }}>Total Seek Time</th>
                                    <th style={{ width: '30%' }}>Average Seek Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {algorithms.map(algo => {
                                    const data = result[algo];
                                    const isMinimum = data.totalSeekCount === result.minimumSeekCount;
                                    return (
                                        <tr key={algo} className={isMinimum ? 'highlight' : ''}>
                                            <td>
                                                <Link to={`/simulate/${algo}`} style={{
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-sm)'
                                                }}>
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: algorithmColors[algo]
                                                    }}></span>
                                                    {algo.toUpperCase()}
                                                </Link>
                                            </td>
                                            <td style={{ fontWeight: isMinimum ? 600 : 400 }}>
                                                {data.totalSeekCount}
                                                {isMinimum && (
                                                    <span className="best-badge" style={{ marginLeft: 'var(--space-sm)' }}>
                                                        BEST
                                                    </span>
                                                )}
                                            </td>
                                            <td>{data.averageSeekCount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Chart */}
                    <ChartDisplay
                        data={result}
                        title="Algorithm Comparison"
                        multiLine={true}
                    />
                </div>
            )}

            {/* Navigation */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'var(--space-md)',
                marginTop: 'var(--space-2xl)'
            }}>
                <Link to="/" className="btn btn-secondary">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Compare;
