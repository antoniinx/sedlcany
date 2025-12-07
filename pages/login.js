import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(email, password);
            router.push('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-accent-primary/5 rounded-b-[50%] blur-3xl pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8 rounded-2xl w-full max-w-md relative z-10"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Přihlášení</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-2 block">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-2 block">Heslo</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-accent-primary text-white rounded-xl font-bold uppercase shadow-lg shadow-accent-primary/25 hover:bg-red-500 transition-all active:scale-95 mt-4"
                    >
                        Přihlásit se
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    Ještě nemáš účet?{' '}
                    <Link href="/signup">
                        <span className="text-accent-primary font-bold cursor-pointer hover:underline">Zaregistruj se</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
