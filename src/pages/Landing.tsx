import { Link } from 'react-router-dom';

export function Landing() {
    return (
        <main>
            <div>
                <img src="/logo.svg" alt="Logo" className="w-32 h-32 mb-8" />
                <h1>Welcome to GDSC@WM.</h1>
                <p>Start applying for our Fall 2025 recruitment today.</p>
                <Link to="/login">
                    Get Started
                </Link>
            </div>
        </main>
    );
}

export default Landing;