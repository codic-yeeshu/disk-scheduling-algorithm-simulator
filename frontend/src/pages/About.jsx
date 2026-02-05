import { Link } from 'react-router-dom';

const algorithmData = [
    {
        name: 'FCFS',
        fullName: 'First Come First Serve',
        description: 'The simplest disk scheduling algorithm. Requests are addressed in the order they arrive. While fair, it doesn\'t provide the fastest service and can result in high seek times.',
        color: '#3b82f6'
    },
    {
        name: 'SSTF',
        fullName: 'Shortest Seek Time First',
        description: 'Selects the request with minimum seek time from the current head position. This results in less average response time but can cause starvation for some requests.',
        color: '#8b5cf6'
    },
];

const techStack = [
    { name: 'React', description: 'Frontend UI Library' },
    { name: 'Express.js', description: 'Backend Framework' },
    { name: 'Chart.js', description: 'Data Visualization' },
    { name: 'Vite', description: 'Build Tool' },
    { name: 'Node.js', description: 'Runtime Environment' }
];

const goals = [
    { title: 'Minimize Seek Time', desc: 'Time to locate the disk arm to a specified track' },
    { title: 'Maximize Throughput', desc: 'Number of I/O requests served per unit time' },
    { title: 'Minimize Latency', desc: 'Time for disk to rotate and bring sector under head' }
];

function About() {
    return (
        <div className="container" style={{ paddingBottom: 'var(--space-3xl)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                <h1>About This Project</h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-md)',
                    maxWidth: '600px',
                    margin: 'var(--space-md) auto 0',
                    lineHeight: '1.8'
                }}>
                    Learn about disk scheduling algorithms and how they optimize disk I/O operations.
                </p>
            </div>

            {/* What is Disk Scheduling */}
            <section className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                    What is Disk Scheduling?
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    Disk scheduling is done by operating systems to schedule I/O requests arriving for the disk.
                    Disk scheduling is also known as I/O scheduling. The main goals of disk scheduling are:
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 'var(--space-md)',
                    marginTop: 'var(--space-xl)'
                }}>
                    {goals.map((item, idx) => (
                        <div key={idx} style={{
                            padding: 'var(--space-lg)',
                            background: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <h4 style={{ color: 'var(--text-accent)', marginBottom: 'var(--space-xs)', fontSize: '1rem' }}>{item.title}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Algorithms Overview */}
            <section className="glass-card" style={{ marginBottom: 'var(--space-xl)' }}>
                <h2 style={{ marginBottom: 'var(--space-xl)' }}>
                    Algorithms Overview
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    {algorithmData.map((algo, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: 'var(--space-lg)',
                                background: 'var(--bg-primary)',
                                border: '1px solid var(--border-color)',
                                borderLeft: `4px solid ${algo.color}`,
                                borderRadius: 'var(--radius-md)'
                            }}
                        >
                            <h3 style={{
                                color: algo.color,
                                margin: 0,
                                marginBottom: 'var(--space-sm)',
                                fontSize: '1.125rem'
                            }}>
                                {algo.fullName}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontSize: '0.9375rem' }}>
                                {algo.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;
