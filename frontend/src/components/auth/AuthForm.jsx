import { useState } from 'react';

function AuthForm({ mode, onLogin, onSignup, onToggleMode }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password || (mode === "signup" && !name)) {
            alert("Please fill all fields");
            return;
        }

        if (mode === "login") {
            onLogin(email, password);
        }
        else if (mode === "signup") {
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            onSignup(name, email, password);
        }
    }

    const inputClassName = `
        w-full mb-4 px-4 py-2
        bg-[var(--bg-primary)]
        border border-[var(--bg-border)]
        rounded text-[var(--text-primary)]
        focus:outline-none
        focus:border-transparent
        focus:ring-1 focus:ring-[var(--accent)]/70
    `;

    return (
        <div className="bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-xl border-2 border-[var(--bg-border)] w-full max-w-md p-6">
            <h1 className="text-xl font-semibold mb-4 text-center">
                {mode === "login" ? "Login" : "Create Account"}
            </h1>
            <form onSubmit={handleSubmit}>
                {mode === "signup" && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClassName}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClassName}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName}
                />
                {mode === "signup" && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClassName}
                    />
                )}
                <button
                    type="submit"
                    disabled={!email || !password || (mode === "signup" && (!name || password !== confirmPassword))}
                    className="w-full bg-[var(--accent)] text-white py-2 rounded hover:bg-[var(--accent-hover)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mode === "login" ? "Login" : "Sign Up"}
                </button>
                <p className="text-sm text-center mt-4">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                    <span
                        className="text-[var(--accent)] cursor-pointer hover:underline"
                        onClick={onToggleMode}
                    >
                        {mode === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    )
}

export default AuthForm;
