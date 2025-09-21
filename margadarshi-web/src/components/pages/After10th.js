import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Assuming you have these components. If not, you can comment them out.
// import RecommendedCareers from './RecommendedCareers'; 
// import UserProfileCard from './UserProfileCard';

// --- SVG Icons for Visual Appeal ---
const CombinationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const CareerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const ResourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

// --- Reusable Components ---
const TabButton = ({ isActive, onClick, children }) => (
    <button onClick={onClick} className={`w-full sm:w-auto text-lg font-bold p-4 rounded-t-lg transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-800 text-indigo-500 scale-105' : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-indigo-500'}`}>
        {children}
    </button>
);

const ResourceCard = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white">
                <LinkIcon />
            </div>
            <div>
                <strong className="font-semibold text-slate-800 dark:text-slate-100">{title}</strong>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
            </div>
        </div>
    </a>
);

const TabContent = ({ title, description, combinations, careers, resources, onSuggest }) => (
    <div className="p-2">
        <h4 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">{title}</h4>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">{description}</p>
        
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-xl shadow-inner">
                <h5 className="font-bold text-2xl mb-5 flex items-center gap-3 text-slate-800 dark:text-slate-100"><CombinationIcon />Popular Combinations</h5>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                    {combinations.map((c, i) => <li key={i} className="flex items-start gap-3"><span className="text-indigo-500 mt-1 font-bold text-2xl">&#10003;</span><span>{c}</span></li>)}
                </ul>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-xl shadow-inner">
                <h5 className="font-bold text-2xl mb-5 flex items-center gap-3 text-slate-800 dark:text-slate-100"><CareerIcon />Future Career Paths</h5>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{careers}</p>
            </div>
        </div>
        
        <div className="mt-10">
            <h5 className="font-bold text-2xl mb-5 flex items-center gap-3 text-slate-800 dark:text-slate-100"><ResourceIcon />Top Resources</h5>
            <div className="grid md:grid-cols-2 gap-4">
                {resources.map((r, i) => <ResourceCard key={i} {...r} />)}
            </div>
        </div>
        
        {onSuggest && (
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                <button onClick={onSuggest} className="ai-button inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    Get AI Career Suggestions
                </button>
            </div>
        )}
    </div>
);

const CareerModal = ({ isOpen, onClose, stream, onGenerate }) => {
    const [interests, setInterests] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!interests.trim()) { alert('Please enter your interests.'); return; }
        setIsLoading(true); setError(''); setResults(null);
        try {
            const suggestions = await onGenerate(stream, interests);
            setResults(suggestions);
        } catch (err) {
            setError('Failed to get suggestions. Please check your API key and try again.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const handleClose = () => { setInterests(''); setResults(null); setIsLoading(false); setError(''); onClose(); };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden border-t-4 border-indigo-500">
                <div className="p-8">
                    <h3 className="text-3xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-400">AI Suggestions for {stream}</h3>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center min-h-[150px]"><div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div><p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold">Finding careers for you...</p></div>
                    ) : error ? (
                         <div className="text-center min-h-[150px] flex flex-col justify-center"><p className="text-red-500 font-medium text-lg">{error}</p></div>
                    ) : results ? (
                        <div className="space-y-4">
                            {results.map((s, i) => ( <div key={i} className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border-l-4 border-indigo-500"><h4 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">{s.career}</h4><p className="text-slate-700 dark:text-slate-300 mt-1">{s.description}</p></div> ))}
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <label htmlFor="user-interests" className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">What subjects or activities do you enjoy most?</label>
                            <input type="text" id="user-interests" value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition" placeholder="e.g., solving puzzles, creative writing, biology" />
                        </div>
                    )}
                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={handleClose} className="py-2 px-5 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition">Close</button>
                        {!results && !isLoading && !error && ( <button onClick={handleSubmit} className="py-2 px-5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">Generate</button> )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main After10th Component ---
const After10th = () => {
    const [activeTab, setActiveTab] = useState('science');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleGenerateSuggestions = async (stream, interests) => {
        const apiKey = "AIzaSyDMsxxcgOufRGYsGV0n7Ee1xoyldctmKKs"; // Key you provided
        if (!apiKey) { console.error("API key is missing!"); throw new Error("API key is missing."); }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const userQuery = `Based on the ${stream} stream and an interest in ${interests}, suggest 3 niche or interesting career paths. For each career, provide a brief, one-sentence description of what it involves.`;
        const systemPrompt = "You are a helpful career advisor for students. Return the response as a valid JSON array of objects, where each object has 'career' and 'description' keys.";
        const payload = { contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] }, generationConfig: { responseMimeType: "application/json", responseSchema: { type: "ARRAY", items: { type: "OBJECT", properties: { "career": { "type": "STRING" }, "description": { "type": "STRING" } }, } } } };
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) { const errorBody = await response.text(); throw new Error(`API Error: ${response.statusText} - ${errorBody}`); }
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        return JSON.parse(text);
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900">
        <Container className="py-10">
            <Row>
                <Col md={12}>
                    <section id="after-10th-section">
                        <div className="text-center mb-8">
                            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Guidance After 10th Grade</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <nav className="flex flex-wrap -mb-px justify-center">
                                    <TabButton isActive={activeTab === 'science'} onClick={() => setActiveTab('science')}>Science</TabButton>
                                    <TabButton isActive={activeTab === 'commerce'} onClick={() => setActiveTab('commerce')}>Commerce</TabButton>
                                    <TabButton isActive={activeTab === 'arts'} onClick={() => setActiveTab('arts')}>Arts</TabButton>
                                    <TabButton isActive={activeTab === 'diploma'} onClick={() => setActiveTab('diploma')}>Diploma</TabButton>
                                </nav>
                            </div>
                            <div className="p-6 md:p-8">
                                <TabContent {...tabsData[activeTab]} onSuggest={() => setIsModalOpen(true)} />
                            </div>
                        </div>
                    </section>
                </Col>
            </Row>
            <CareerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} stream={tabsData[activeTab].title} onGenerate={handleGenerateSuggestions}/>
        </Container>
        </div>
    );
};

// --- EXPANDED Data for Tabs ---
const tabsData = {
    science: {
        title: "The Science Stream",
        description: "Focuses on fostering a deep understanding of the natural world through logical, analytical, and problem-solving skills. It is the primary gateway to high-demand careers in Engineering, Medicine, Technology, and fundamental Scientific Research.",
        combinations: [
            "PCMB (Physics, Chemistry, Maths, Biology): The most versatile option, keeping doors open for both Engineering and Medical fields.",
            "PCMC (Physics, Chemistry, Maths, Computer Science): Ideal for aspiring software developers, data scientists, and hardware engineers.",
            "PCME (Physics, Chemistry, Maths, Electronics): A specialized path for those interested in electronics, circuits, and communication technology.",
            "PCBH (Physics, Chemistry, Biology, Home Science): A combination focusing on life sciences and nutrition."
        ],
        careers: "Software Engineer, Doctor (MBBS), Data Scientist, Biotechnologist, Architect, Pharmacist, Commercial Pilot, Forensic Scientist, Research Scientist (ISRO/DRDO).",
        resources: [
            { href: "https://www.youtube.com/@PhysicsWallah", title: "Physics Wallah", description: "Comprehensive video lectures for PCM & Biology." },
            { href: "https://www.youtube.com/@khanacademy", title: "Khan Academy", description: "Excellent for building strong foundational concepts in all subjects." },
            { href: "https://phet.colorado.edu/", title: "PhET Simulations", description: "Interactive simulations to visualize complex science and math topics." },
            { href: "https://www.vedantu.com/olympiad", title: "Vedantu Olympiad School", description: "Resources for competitive exams like NSO, IMO." },
        ]
    },
    commerce: {
        title: "The Commerce Stream",
        description: "This stream immerses students in the world of business, trade, finance, and economics. It is the perfect launchpad for future Chartered Accountants, business managers, financial analysts, and entrepreneurs.",
        combinations: [
            "BACS (Business Studies, Accountancy, Computer Science, Statistics): A modern combination for finance and tech-focused roles.",
            "BAEM (Business Studies, Accountancy, Economics, Maths): Strong foundation for finance, economics, and analytical careers.",
            "BASP (Business Studies, Accountancy, Statistics, Political Science): Blends business principles with an understanding of public policy.",
        ],
        careers: "Chartered Accountant (CA), Investment Banker, Marketing Manager, Financial Planner, Company Secretary (CS), Actuary, Entrepreneur, Human Resources Manager.",
        resources: [
            { href: "https://www.icai.org/post/students-services", title: "ICAI Students Portal", description: "The official source for all CA-related material and announcements." },
            { href: "https://www.zerodha.com/varsity/", title: "Zerodha Varsity", description: "An outstanding, free resource for learning about stock markets and finance." },
            { href: "https://www.investopedia.com/", title: "Investopedia", description: "A vast resource for financial terms, concepts, and news." },
            { href: "https://www.livemint.com/", title: "Livemint", description: "Quality business news and analysis to stay updated with the market." },
        ]
    },
    arts: {
        title: "The Arts & Humanities Stream",
        description: "A diverse and expansive field that explores human society, culture, history, and creative expression. It builds critical thinking and communication skills, opening doors to careers in Law, Journalism, Civil Services, Design, and academia.",
        combinations: [
            "HEPS (History, Economics, Political Science, Sociology): The classic combination for Civil Services (UPSC) aspirants.",
            "Psychology, Sociology, Economics: For careers in clinical psychology, social work, and market research.",
            "Fine Arts, History, English: A creative path for careers in design, curation, and media.",
            "Journalism, Political Science, English: Ideal for aspiring journalists and media professionals."
        ],
        careers: "Lawyer (LLB), Journalist, UX/UI Designer, Clinical Psychologist, Civil Servant (IAS/IPS), Hotel Manager, Graphic Designer, Archaeologist, Professor.",
        resources: [
            { href: "https://www.youtube.com/@crashcourse", title: "CrashCourse", description: "Highly engaging, well-produced videos on History, Sociology, Psychology, etc." },
            { href: "https://www.thehindu.com/", title: "The Hindu Newspaper", description: "Essential reading for building vocabulary and general awareness for Civil Services and Law prep." },
            { href: "https://www.drishtiias.com/daily-updates/daily-news-analysis", title: "Drishti IAS", description: "Comprehensive news analysis and study material for UPSC aspirants." },
            { href: "https://www.behance.net/", title: "Behance", description: "A leading platform to explore creative work and build a design portfolio." },
        ]
    },
    diploma: {
        title: "Diploma & Vocational Courses",
        description: "These are highly practical, job-oriented technical courses designed to equip students with specific skills for the industry. They offer a faster path to employment and can provide lateral entry into degree programs.",
        combinations: [
            "Polytechnic Diploma (Civil, Mechanical, Electrical, Computer Science): A 3-year course equivalent to Pre-University.",
            "ITI (Industrial Training Institute): 1-2 year courses for technical trades like Fitter, Electrician, Welder.",
            "Diploma in Animation & VFX: For creative students aiming for the media and entertainment industry.",
            "Diploma in Hotel Management: A practical course for the hospitality sector.",
        ],
        careers: "Junior Engineer in government (e.g., PWD, Railways) or private sectors, Technician, Lab Assistant, Hotel Manager. A key benefit is 'Lateral Entry'—joining the 2nd year of a B.E/B.Tech program directly after a 3-year diploma.",
        resources: [
            { href: "https://dtek.karnataka.gov.in/", title: "DTE Karnataka", description: "Official information on Diploma (Polytechnic) admissions in Karnataka." },
            { href: "https://ncvtmis.gov.in/", title: "NCVT MIS Portal", description: "The central portal for ITI courses and information across India." },
            { href: "https://www.nsdcindia.org/", title: "NSDC India", description: "National Skill Development Corporation for various vocational courses." },
            { href: "https://www.coursera.org/certificates/professional-certificates", title: "Coursera Professional Certificates", description: "Entry-level professional training from top companies." }
        ]
    }
};

export default After10th;

