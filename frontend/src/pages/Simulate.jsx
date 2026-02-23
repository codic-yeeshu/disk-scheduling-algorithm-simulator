import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import InputForm from '../components/InputForm';
import ChartDisplay from '../components/ChartDisplay';
import { runAlgorithm } from '../api/algorithms';

const algorithmInfo = {
    fcfs: {
        name: 'FCFS',
        fullName: 'First Come First Serve',
        description: 'The simplest disk scheduling algorithm. Requests are addressed in the order they arrive in the disk queue.',
        complexity: 'O(n)',
        needsDirection: false
    },
    sstf: {
        name: 'SSTF',
        fullName: 'Shortest Seek Time First',
        description: 'Requests with the shortest seek time from the current head position are executed first.',
        complexity: 'O(n²)',
        needsDirection: false
    },
    scan: {
        name: 'SCAN',
        fullName: 'SCAN (Elevator Algorithm)',
        description: 'The disk arm moves in one direction servicing requests until it reaches the end, then reverses direction.',
        complexity: 'O(n log n)',
        needsDirection: true
    },
    cscan: {
        name: 'C-SCAN',
        fullName: 'Circular SCAN',
        description: 'The disk arm moves in a circular fashion, jumping to the other end after reaching one end.',
        complexity: 'O(n log n)',
        needsDirection: true
    },
    look: {
        name: 'LOOK',
        fullName: 'LOOK Algorithm',
        description: 'Similar to SCAN, but the arm only goes as far as the last request in each direction.',
        complexity: 'O(n log n)',
        needsDirection: true
    },
    clook: {
        name: 'C-LOOK',
        fullName: 'Circular LOOK',
        description: 'Combines C-SCAN and LOOK approaches. The arm goes to the last request and jumps to the other end.',
        complexity: 'O(n log n)',
        needsDirection: true
    }
};

function Simulate() {
    const { algorithm } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Playback state
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [visualizationState, setVisualizationState] = useState('idle'); // idle, running, paused, completed
    const playbackRef = useRef(null);

    const info = algorithmInfo[algorithm];

    // Playback control functions
    const stepForward = useCallback(() => {
        if (result && currentStep < result.finalOrder.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    }, [result, currentStep]);

    const stepBackward = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            setIsPlaying(false);
            setVisualizationState('paused');
        } else {
            if (result && currentStep >= result.finalOrder.length - 1) {
                setCurrentStep(0);
            }
            setIsPlaying(true);
            setVisualizationState('running');
        }
    }, [isPlaying, result, currentStep]);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setIsPlaying(false);
        setVisualizationState('idle');
    }, []);

    // Auto-play effect
    useEffect(() => {
        if (isPlaying && result) {
            playbackRef.current = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev >= result.finalOrder.length - 1) {
                        setIsPlaying(false);
                        setVisualizationState('completed');
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000 / playbackSpeed);
        }
        return () => {
            if (playbackRef.current) {
                clearInterval(playbackRef.current);
            }
        };
    }, [isPlaying, result, playbackSpeed]);

    // Check completion
    useEffect(() => {
        if (result && currentStep >= result.finalOrder.length - 1 && !isPlaying) {
            setVisualizationState('completed');
        }
    }, [currentStep, result, isPlaying]);

    if (!info) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                <h1>Algorithm Not Found</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-lg)' }}>
                    The algorithm "{algorithm}" is not recognized.
                </p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)', display: 'inline-flex' }}>
                    ← Go Home
                </Link>
            </div>
        );
    }

    const handleSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);
        setCurrentStep(0);
        setIsPlaying(false);
        setVisualizationState('idle');

        try {
            const response = await runAlgorithm(algorithm, data);
            setResult(response);
            setVisualizationState('idle');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred while processing');
        } finally {
            setLoading(false);
        }
    };

    // Calculate metrics up to current step
    const calculateCurrentMetrics = () => {
        if (!result) return { seekDistance: 0, currentPosition: 0, completedRequests: 0 };

        let seekDistance = 0;
        for (let i = 1; i <= currentStep; i++) {
            seekDistance += Math.abs(result.finalOrder[i] - result.finalOrder[i - 1]);
        }

        return {
            seekDistance,
            currentPosition: result.finalOrder[currentStep],
            completedRequests: currentStep,
            totalRequests: result.finalOrder.length - 1
        };
    };

    const metrics = calculateCurrentMetrics();

    return (
        <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <h1>{info.fullName}</h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-md)',
                    maxWidth: '600px',
                    margin: 'var(--space-md) auto 0',
                    lineHeight: '1.8'
                }}>
                    {info.description}
                </p>
                <div style={{
                    marginTop: 'var(--space-lg)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    padding: 'var(--space-sm) var(--space-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem'
                }}>
                    <span style={{ color: 'var(--text-muted)' }}>Time Complexity:</span>
                    <span style={{ color: 'var(--text-accent)', fontWeight: '600' }}>
                        {info.complexity}
                    </span>
                </div>
            </div>

            {/* Input Form */}
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <InputForm
                    onSubmit={handleSubmit}
                    showDirection={info.needsDirection}
                    loading={loading}
                    buttonText={`Run ${info.name}`}
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
                        marginBottom: 'var(--space-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-sm)'
                    }}>
                        Simulation Results
                        <span className={`status-indicator ${visualizationState}`}>
                            <span className="status-dot"></span>
                            {visualizationState.charAt(0).toUpperCase() + visualizationState.slice(1)}
                        </span>
                    </h2>

                    {/* Metrics Panel */}
                    <div className="metrics-panel">
                        <div className="metric-item">
                            <div className="metric-label">Current Position</div>
                            <div className="metric-value highlight">{metrics.currentPosition}</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">Seek Distance</div>
                            <div className="metric-value">{metrics.seekDistance}</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">Progress</div>
                            <div className="metric-value">{metrics.completedRequests} / {metrics.totalRequests}</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">Total Seek Time</div>
                            <div className="metric-value">{result.totalSeekCount}</div>
                        </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="playback-controls">
                        <button
                            className="playback-btn"
                            onClick={reset}
                            title="Reset"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M9 3V1L5 4l4 3V5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5H2c0 3.87 3.13 7 7 7s7-3.13 7-7-3.13-7-7-7z" />
                            </svg>
                        </button>
                        <button
                            className="playback-btn"
                            onClick={stepBackward}
                            disabled={currentStep === 0}
                            title="Step Backward"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M11 4L5 9l6 5V4z" />
                                <rect x="4" y="4" width="2" height="10" />
                            </svg>
                        </button>
                        <button
                            className={`playback-btn ${isPlaying ? 'active' : ''}`}
                            onClick={togglePlay}
                            title={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                    <rect x="4" y="3" width="3" height="12" />
                                    <rect x="11" y="3" width="3" height="12" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                    <path d="M5 3l10 6-10 6V3z" />
                                </svg>
                            )}
                        </button>
                        <button
                            className="playback-btn"
                            onClick={stepForward}
                            disabled={result && currentStep >= result.finalOrder.length - 1}
                            title="Step Forward"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                <path d="M7 4l6 5-6 5V4z" />
                                <rect x="12" y="4" width="2" height="10" />
                            </svg>
                        </button>

                        <div className="speed-control">
                            <label>Speed:</label>
                            <select
                                value={playbackSpeed}
                                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                            >
                                <option value={0.5}>0.5x</option>
                                <option value={1}>1x</option>
                                <option value={2}>2x</option>
                                <option value={4}>4x</option>
                            </select>
                        </div>

                        <div className="step-indicator">
                            Step {currentStep + 1} of {result.finalOrder.length}
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="results-section">
                        <div className="result-item">
                            <span className="result-label">Total Seek Time</span>
                            <span className="result-value result-highlight">{result.totalSeekCount}</span>
                        </div>

                        <div className="result-item">
                            <span className="result-label">Average Seek Time</span>
                            <span className="result-value">{result.averageSeekCount}</span>
                        </div>

                        <div className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                            <span className="result-label">Execution Sequence</span>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 'var(--space-xs)',
                                marginTop: 'var(--space-sm)'
                            }}>
                                {result.finalOrder.map((pos, idx) => (
                                    <span key={idx} style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            background: idx === currentStep
                                                ? 'var(--primary-color)'
                                                : idx < currentStep
                                                    ? 'rgba(37, 99, 235, 0.2)'
                                                    : 'var(--bg-elevated)',
                                            border: `1px solid ${idx === currentStep ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.875rem',
                                            fontWeight: idx === currentStep ? '600' : '400',
                                            color: idx === currentStep ? 'white' : idx < currentStep ? 'var(--text-accent)' : 'var(--text-secondary)'
                                        }}>
                                            {pos}
                                        </span>
                                        {idx < result.finalOrder.length - 1 && (
                                            <span style={{ color: 'var(--text-muted)' }}>→</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <ChartDisplay data={result.finalOrder} title={`${info.name} Disk Head Movement`} />
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
                <Link to="/compare" className="btn btn-secondary">Compare All →</Link>
            </div>
        </div>
    );
}

export default Simulate;
