import Link from 'next/link';

export default function CityInfo() {
    return (
        <div className="min-h-screen bg-dark-bg pb-32 pt-32 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-0 right-0 w-[300px] h-[300px] bg-accent-secondary/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 left-0 w-[200px] h-[200px] bg-accent-primary/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-2xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                        O Sedlčanech
                    </h1>
                    <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary mx-auto rounded-full" />
                </div>

                {/* Info Cards */}
                <div className="space-y-6">

                    <section className="glass-card p-6 rounded-2xl border-l-4 border-accent-primary">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            Srdce regionu
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Sedlčany jsou přirozeným centrem středního Povltaví. Město s bohatou historií sahající do 11. století nabízí unikátní kombinaci památek, sportovního vyžití a krásné přírody Sedlčanské kotliny.
                        </p>
                    </section>

                    <section className="glass-card p-6 rounded-2xl border-l-4 border-accent-secondary">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-3 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Příroda a okolí
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            Okolí města je rájem pro cyklisty a turisty. Kopcovitá krajina, hluboké lesy a meandry Vltavy vytvářejí ideální podmínky pro aktivní odpočinek. Naše aplikace vás provede těmi nejzajímavějšími místy.
                        </p>
                    </section>

                    <section className="glass-card p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-white mb-3">Sportovní tradice</h2>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-accent-primary">Autodrom</span>
                                <span className="text-[10px] uppercase text-gray-500 font-bold">Rallycross</span>
                            </div>
                            <div className="w-[1px] bg-white/10" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-white">Tatran</span>
                                <span className="text-[10px] uppercase text-gray-500 font-bold">Fotbal</span>
                            </div>
                            <div className="w-[1px] bg-white/10" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-accent-secondary">Kanoistika</span>
                                <span className="text-[10px] uppercase text-gray-500 font-bold">Vltava</span>
                            </div>
                        </div>
                    </section>

                    <Link href="/">
                        <button className="w-full py-4 mt-8 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold uppercase transition-all tracking-wider">
                            Zpět na trasy
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}
