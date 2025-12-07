import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { routes } from '../data/routes';
import Link from 'next/link';

export default function Profile() {
    const { currentUser, logout, loading } = useAuth();
    const router = useRouter();

    // Protect route
    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login');
        }
    }, [currentUser, loading, router]);

    if (loading || !currentUser) return null; // Or a loading spinner

    const completedRouteIds = Object.keys(currentUser.completedRoutes || {});

    // Calculate stats from completedRoutes object which has { completed: true, points: X, ... }
    // Actually, points are stored as a total in currentUser.points, but let's re-verify from list if we want detailed view.
    // The 'points' field in currentUser object is the single source of truth for total score.

    return (
        <div className="min-h-screen bg-dark-bg pb-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-[300px] bg-accent-primary/5 rounded-b-[50%] blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto px-4 pt-24 relative z-10">

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-glow">
                        {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">{currentUser.name}</h1>
                    <p className="text-gray-400 text-sm mb-4">{currentUser.email}</p>

                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors"
                    >
                        Odhlásit se
                    </button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-4 mb-10"
                >
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-4xl font-bold text-accent-primary mb-1">{currentUser.points}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Celkem bodů</div>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <div className="text-4xl font-bold text-white mb-1">{completedRouteIds.length}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest">Dokončené trasy</div>
                    </div>
                </motion.div>

                {/* Completed Routes List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-white mb-6 px-2 border-l-4 border-accent-secondary">Moje úspěchy</h2>

                    {completedRouteIds.length === 0 ? (
                        <div className="text-center py-10 bg-white/5 rounded-2xl">
                            <p className="text-gray-400 mb-4">Zatím jsi nedokončil žádnou trasu.</p>
                            <Link href="/">
                                <button className="text-accent-primary font-bold hover:underline">Jít na trasy</button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {completedRouteIds.map((id) => {
                                const routeData = routes.find(r => r.id === parseInt(id));
                                const completionData = currentUser.completedRoutes[id];
                                if (!routeData) return null;

                                return (
                                    <div key={id} className="glass-card p-4 rounded-xl flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-white">{routeData.name}</h3>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Splněno: {new Date(completionData.completedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-accent-secondary">+{completionData.points} b</div>
                                            <div className="text-xs text-gray-500">{completionData.successRate}% úspěšnost</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}
