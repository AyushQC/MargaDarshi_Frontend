import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// Assuming you have these components. If not, you can comment them out.
// import RecommendedCareers from './RecommendedCareers'; 
// import UserProfileCard from './UserProfileCard';

// --- SVG Icons for Visual Appeal ---
const RoadmapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const ResourceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    <button onClick={onClick} className={`w-full sm:w-auto text-lg font-bold p-4 rounded-t-lg transition-all duration-300 ${isActive ? 'bg-white dark:bg-slate-800 text-cyan-500 scale-105' : 'bg-transparent text-slate-500 dark:text-slate-400 hover:text-cyan-500'}`}>
        {children}
    </button>
);

const ResourceCard = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-cyan-50 dark:bg-slate-800 flex items-center justify-center text-cyan-500 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                <LinkIcon />
            </div>
            <div>
                <strong className="font-semibold text-slate-800 dark:text-slate-100">{title}</strong>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
            </div>
        </div>
    </a>
);

const TabContent = ({ title, description, roadmap, resources, onSuggest, examName }) => (
    <div className="p-2">
        <h4 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-lime-500">{title}</h4>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">{description}</p>
        
        <div className="grid lg:grid-cols-2 gap-10 mt-8">
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 p-6 rounded-xl shadow-inner">
                <h5 className="font-bold text-2xl mb-5 flex items-center gap-3 text-slate-800 dark:text-slate-100"><RoadmapIcon />Your Roadmap to Success</h5>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                    {roadmap.map((r, i) => <li key={i} className="flex items-start gap-3"><span className="text-cyan-500 mt-1 font-bold text-2xl">&#10003;</span><span>{r}</span></li>)}
                </ul>
            </div>
            <div>
                <h5 className="font-bold text-2xl mb-5 flex items-center gap-3 text-slate-800 dark:text-slate-100"><ResourceIcon />Top Resources</h5>
                <div className="space-y-4">
                    {resources.map((r, i) => <ResourceCard key={i} {...r} />)}
                </div>
            </div>
        </div>
        
        {onSuggest && (
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                <button onClick={() => onSuggest(examName)} className="ai-button inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:from-cyan-600 hover:to-teal-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    Generate AI Study Plan
                </button>
            </div>
        )}
    </div>
);

const StudyPlanModal = ({ isOpen, onClose, examName, onGenerate }) => {
    const [prepTime, setPrepTime] = useState('6');
    const [challengingSubject, setChallengingSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!challengingSubject.trim()) { alert('Please enter your most challenging subject.'); return; }
        setIsLoading(true); setError(''); setResults('');
        try {
            const planText = await onGenerate(examName, prepTime, challengingSubject);
            setResults(planText);
        } catch (err) {
            setError('Failed to generate plan. Please check your API key and try again.');
            console.error(err);
        }
        setIsLoading(false);
    };

    const handleClose = () => { setChallengingSubject(''); setPrepTime('6'); setResults(''); setIsLoading(false); setError(''); onClose(); };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg relative overflow-hidden border-t-4 border-cyan-400">
                <div className="p-8">
                    <h3 className="text-3xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-400">AI Plan for {examName}</h3>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center min-h-[200px]"><div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div><p className="mt-4 text-slate-600 dark:text-slate-400 font-semibold">Building your personalized plan...</p></div>
                    ) : error ? (
                         <div className="text-center min-h-[200px] flex flex-col justify-center"><p className="text-red-500 font-medium text-lg">{error}</p></div>
                    ) : results ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: results }} />
                    ) : (
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="prep-time" className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">How many months to prepare?</label>
                                <select id="prep-time" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition">
                                    <option value="1">1 Month</option><option value="3">3 Months</option><option value="6">6 Months</option><option value="12">12 Months</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="challenging-subject" className="block mb-2 font-semibold text-slate-700 dark:text-slate-300">Most challenging subject?</label>
                                <input type="text" id="challenging-subject" value={challengingSubject} onChange={(e) => setChallengingSubject(e.target.value)} className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="e.g., Organic Chemistry, Calculus"/>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-4 mt-8">
                        <button onClick={handleClose} className="py-2 px-5 bg-slate-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition">Close</button>
                        {!results && !isLoading && !error && ( <button onClick={handleSubmit} className="py-2 px-5 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition">Generate Plan</button> )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main After12th Component ---
const After12th = () => {
    const [activeTab, setActiveTab] = useState('eng');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentExam, setCurrentExam] = useState('');

    const handleOpenModal = (examName) => { setCurrentExam(examName); setIsModalOpen(true); };

    const handleGenerateStudyPlan = async (examName, prepTime, challengingSubject) => {
        const apiKey = "AIzaSyDMsxxcgOufRGYsGV0n7Ee1xoyldctmKKs"; // Key you provided
        if (!apiKey) { console.error("API key is missing!"); throw new Error("API key is missing."); }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const userQuery = `Create a high-level, 4-week sample study plan for a student preparing for the ${examName} exam with ${prepTime} months left. They find ${challengingSubject} difficult. The plan should outline key topics to cover each week and suggest one study tip for tackling the challenging subject. Format the response as a simple, easy-to-read text with clear weekly headings. Use markdown for formatting like bold headings.`;
        const payload = { contents: [{ parts: [{ text: userQuery }] }], };
        const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) { const errorBody = await response.text(); throw new Error(`API Error: ${response.statusText} - ${errorBody}`); }
        const result = await response.json();
        let planText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No plan generated.";
        planText = planText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-500 dark:text-cyan-400">$1</strong>').replace(/\n/g, '<br>').replace(/\*/g, '&bull; ');
        return planText;
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900">
        <Container className="py-10">
            <Row>
                <Col md={12}>
                    <section id="after-12th-section">
                        <div className="text-center mb-8">
                            <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-teal-500 to-lime-400">Guidance After 12th Grade</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-4 bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                                <nav className="flex flex-wrap -mb-px justify-center">
                                    <TabButton isActive={activeTab === 'eng'} onClick={() => setActiveTab('eng')}>Engineering</TabButton>
                                    <TabButton isActive={activeTab === 'med'} onClick={() => setActiveTab('med')}>Medical</TabButton>
                                    <TabButton isActive={activeTab === 'ca'} onClick={() => setActiveTab('ca')}>Commerce</TabButton>
                                    <TabButton isActive={activeTab === 'law'} onClick={() => setActiveTab('law')}>Law/Arts</TabButton>
                                    <TabButton isActive={activeTab === 'design'} onClick={() => setActiveTab('design')}>Design</TabButton>
                                </nav>
                            </div>
                            <div className="p-6 md:p-8">
                                <TabContent {...tabsData[activeTab]} onSuggest={handleOpenModal} />
                            </div>
                        </div>
                    </section>
                </Col>
            </Row>
            <StudyPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} examName={currentExam} onGenerate={handleGenerateStudyPlan} />
        </Container>
        </div>
    );
};

// --- EXPANDED Data for Tabs ---
const tabsData = {
    eng: {
        title: "Engineering: JEE, CET, COMEDK",
        description: "These competitive exams are the gateways to prestigious engineering colleges. Success requires a strong command of Physics, Chemistry, and Mathematics, along with consistent practice and strategic preparation.",
        roadmap: [ "Build a rock-solid foundation in 11th & 12th PCM concepts.", "Solve at least 10 years of previous question papers for each exam.", "Regularly take full-length mock tests to simulate exam conditions and manage time.", "Focus on high-weightage chapters during revision." ],
        resources: [
            { href: "https://jeemain.nta.ac.in/", title: "NTA JEE Website", description: "Official source for JEE Main syllabus, dates, and results." },
            { href: "https://cetonline.karnataka.gov.in/kea/", title: "KEA Website", description: "Official portal for Karnataka CET information and applications." },
            { href: "https://www.comedk.org/", title: "COMEDK Website", description: "For admissions to private engineering colleges in Karnataka." },
            { href: "https://www.youtube.com/@AmanDhattarwal", title: "Aman Dhattarwal", description: "Motivation and strategic preparation tips for JEE." }
        ],
        examName: "JEE/CET Engineering"
    },
    med: {
        title: "Medical: NEET-UG",
        description: "The National Eligibility cum Entrance Test (NEET) is the sole gateway for admission to MBBS, BDS, AYUSH, and Veterinary courses across India. The exam heavily emphasizes Biology, followed by Chemistry and Physics.",
        roadmap: [ "Thoroughly master the NCERT textbooks for Biology, Chemistry, and Physics.", "Prioritize Biology as it constitutes 50% of the exam.", "Practice thousands of MCQs to improve speed and accuracy.", "Analyze mock test results to identify and rectify weak areas." ],
        resources: [
            { href: "https://neet.nta.nic.in/", title: "NTA NEET Website", description: "The official source for all NEET-UG announcements." },
            { href: "https://www.youtube.com/@UnacademyNEET", title: "Unacademy NEET", description: "High-quality live classes and lectures from top educators." },
            { href: "https://www.youtube.com/@DoctorAnandMani", title: "Dr. Anand Mani", description: "Excellent resource for NEET Biology preparation." },
            { href: "https://www.amazon.in/Concepts-Physics-Vol-H-Verma/dp/8177091875", title: "Concepts of Physics by H.C. Verma", description: "A highly recommended book for building a strong physics foundation." }
        ],
        examName: "NEET-UG Medical"
    },
    ca: {
        title: "Commerce: CA, B.Com, BBA",
        description: "After 12th Commerce, students can pursue professional courses like Chartered Accountancy (CA) or versatile degrees like B.Com (for accounting/taxation) and BBA (for management roles).",
        roadmap: [ "For CA, register for the CA Foundation course with ICAI after your board exams.", "Clear the three levels: Foundation, Intermediate, and Final.", "Complete a mandatory 3-year articleship (internship) under a practicing CA.", "For B.Com/BBA, apply to universities based on 12th marks or entrance exams like CUET." ],
        resources: [
            { href: "https://www.icai.org/", title: "ICAI Website", description: "Official portal for CA course registration, syllabus, and study material." },
            { href: "https://www.icsi.edu/", title: "ICSI Website", description: "Official portal for the Company Secretary (CS) professional course." },
            { href: "https://www.youtube.com/@UnacademyCA", title: "Unacademy CA", description: "A popular channel for CA preparation across all levels." },
            { href: "https://cuet.samarth.ac.in/", title: "CUET Samarth", description: "Official portal for the Common University Entrance Test." },
        ],
        examName: "CA Foundation"
    },
    law: {
        title: "Law & Arts: CLAT, AILET, UPSC",
        description: "Students from any stream can aim for a career in law through exams like CLAT and AILET, or prepare for Civil Services (UPSC) after their undergraduate degree. These paths require strong general awareness, logical reasoning, and command over English.",
        roadmap: [ "For Law, prepare for Legal Aptitude, Logical Reasoning, English, and Current Affairs sections.", "Join a 5-year integrated LLB program (like B.A. LLB) at a National Law University (NLU).", "For Civil Services, choose a relevant undergraduate degree and start reading newspapers and NCERTs diligently.", "Develop a consistent habit of answer writing for mains preparation." ],
        resources: [
            { href: "https://consortiumofnlus.ac.in/", title: "CLAT Consortium", description: "The official website for the Common Law Admission Test (CLAT)." },
            { href: "https://nationallawuniversitydelhi.in/", title: "AILET Website", description: "For admission to National Law University, Delhi." },
            { href: "https://www.livelaw.in/", title: "Live Law", description: "Stay updated with the latest legal news and judgements." },
            { href: "https://www.visionias.in/", title: "Vision IAS", description: "A leading resource for UPSC Civil Services preparation." }
        ],
        examName: "CLAT/Law Entrance"
    },
    design: {
        title: "Design: NID, NIFT, UCEED",
        description: "For creative students with an artistic flair, a career in design offers immense opportunities. Admission to top institutes like NID, NIFT, and the design programs at IITs is through competitive entrance exams.",
        roadmap: [ "Develop strong sketching and visualization skills.", "Build a diverse and creative portfolio that showcases your original ideas.", "Practice solving previous years' papers for NID-DAT, NIFT, and UCEED.", "Stay updated with the latest trends in art and design." ],
        resources: [
            { href: "https://admissions.nid.edu/", title: "NID Admissions", description: "Official portal for the prestigious National Institute of Design." },
            { href: "https://www.nift.ac.in/admissions", title: "NIFT Admissions", description: "For the National Institutes of Fashion Technology." },
            { href: "https://www.uceed.iitb.ac.in/", title: "UCEED Website", description: "For undergraduate design (B.Des) programs at IITs." },
            { href: "https://www.youtube.com/user/ProkoTV", title: "Proko", description: "An excellent YouTube channel for learning figure drawing and anatomy." }
        ],
        examName: "NID/NIFT Design"
    }
};

export default After12th;

