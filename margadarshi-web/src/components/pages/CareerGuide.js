import React, { useEffect, useState, useRef } from 'react';
import './CareerGuide.css';

const CareerGuide = () => {
    const [activePage, setActivePage] = useState('path-selection');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [activeTabs, setActiveTabs] = useState({
        '10th': 'science-10th',
        '12th': 'eng-12th',
    });

    const showPage = (pageId) => {
        setActivePage(pageId);
        window.scrollTo(0, 0);
    };

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        if (targetId) {
            if (targetId === 'after-10th' || targetId === 'after-12th') {
                targetId = targetId + '-section'; // Match section IDs
            }
            showPage(targetId);
        }
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    };

    const setupTabs = (tabType, tabId) => {
        setActiveTabs(prev => ({ ...prev, [tabType]: tabId }));
    };

    // Dummy state and handlers for modals
    const [careerModalOpen, setCareerModalOpen] = useState(false);
    const [planModalOpen, setPlanModalOpen] = useState(false);
    const [careerModalTitle, setCareerModalTitle] = useState('');
    const [planModalTitle, setPlanModalTitle] = useState('');

    const openCareerModal = (stream) => {
        setCareerModalTitle(`AI Suggestions for ${stream}`);
        setCareerModalOpen(true);
    };

    const openPlanModal = (exam) => {
        setPlanModalTitle(`AI Plan for ${exam}`);
        setPlanModalOpen(true);
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#path-selection" onClick={(e) => handleNavClick(e, 'path-selection')} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">One-Stop Advisor</a>
                    <nav className="hidden md:flex space-x-8">
                        <a href="#path-selection" onClick={(e) => handleNavClick(e, 'path-selection')} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Start Here</a>
                        <a href="#after-10th" onClick={(e) => handleNavClick(e, 'after-10th')} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">After 10th</a>
                        <a href="#after-12th" onClick={(e) => handleNavClick(e, 'after-12th')} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">After 12th</a>
                    </nav>
                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className={`${mobileMenuOpen ? '' : 'hidden'} md:hidden px-6 pt-2 pb-4 space-y-2 bg-white dark:bg-slate-900`}>
                    <a href="#path-selection" onClick={(e) => handleNavClick(e, 'path-selection')} className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Start Here</a>
                    <a href="#after-10th" onClick={(e) => handleNavClick(e, 'after-10th')} className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">After 10th</a>
                    <a href="#after-12th" onClick={(e) => handleNavClick(e, 'after-12th')} className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">After 12th</a>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                {/* Path Selection Page */}
                <section id="path-selection" className={`page ${activePage === 'path-selection' ? 'page-visible' : ''} text-center mb-20`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Your Complete Career & Education Roadmap</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16">
                        Navigate your academic journey with confidence. We provide a clear roadmap, resources, and guidance for every step after your 10th and 12th grade exams.
                    </p>
                    <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-500 dark:from-indigo-300 dark:to-teal-300">Begin Your Journey</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <button onClick={() => showPage('after-10th-section')} className="path-button bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left flex items-start space-x-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4l6 3-6 3-6-3v6l6 3 6-3"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">After 10th Grade</h4>
                                <p className="text-gray-600 dark:text-gray-400">Explore streams like Science, Commerce, Arts, and Diploma. Understand subject combinations and future opportunities for your PU studies.</p>
                            </div>
                        </button>
                        <button onClick={() => showPage('after-12th-section')} className="path-button bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left flex items-start space-x-4">
                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <svg className="h-6 w-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">After 12th Grade</h4>
                                <p className="text-gray-600 dark:text-gray-400">Get detailed guides on exams like CET, NEET, CA, CLAT, NID/NIFT and explore various degree paths in Engineering, Medicine, Law, Design and more.</p>
                            </div>
                        </button>
                    </div>
                </section>

                {/* After 10th Page */}
                <section id="after-10th-section" className={`page ${activePage === 'after-10th-section' ? 'page-visible' : ''} mb-16`}>
                    <div className="flex justify-between items-center mb-8">
                        <h3 id="after-10th" className="text-3xl font-bold border-l-4 border-indigo-500 pl-4 text-indigo-600 dark:text-indigo-400">Guidance After 10th Grade</h3>
                        <a href="#path-selection" onClick={(e) => handleNavClick(e, 'path-selection')} className="change-path-btn text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">Change Path</a>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex flex-wrap -mb-px">
                                <button onClick={() => setupTabs('10th', 'science-10th')} className={`tab-10th ${activeTabs['10th'] === 'science-10th' ? 'tab-active' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Science</button>
                                <button onClick={() => setupTabs('10th', 'commerce-10th')} className={`tab-10th ${activeTabs['10th'] === 'commerce-10th' ? 'tab-active' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Commerce</button>
                                <button onClick={() => setupTabs('10th', 'arts-10th')} className={`tab-10th ${activeTabs['10th'] === 'arts-10th' ? 'tab-active' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Arts</button>
                                <button onClick={() => setupTabs('10th', 'diploma-10th')} className={`tab-10th ${activeTabs['10th'] === 'diploma-10th' ? 'tab-active' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Diploma</button>
                            </nav>
                        </div>
                        <div>
                            {/* Science Content */}
                            <div id="science-10th" className={activeTabs['10th'] === 'science-10th' ? '' : 'hidden'}>
                                <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">The Science Stream</h4>
                                <p className="mb-4">Focuses on fostering logical, analytical, and problem-solving skills. It is the gateway to careers in Engineering, Medicine, Information Technology, and Scientific Research.</p>
                                <h5 className="font-bold mb-2">Popular Combinations:</h5>
                                <ul className="list-disc list-inside mb-4 space-y-1">
                                    <li><strong>PCMB:</strong> Physics, Chemistry, Mathematics, Biology. Keeps options open for both Engineering and Medical fields.</li>
                                    <li><strong>PCMC/S:</strong> Physics, Chemistry, Mathematics, Computer Science. Ideal for aspiring software and hardware engineers.</li>
                                    <li><strong>PCME:</strong> Physics, Chemistry, Mathematics, Electronics. Focuses on electronic circuits and devices.</li>
                                </ul>
                                <h5 className="font-bold mt-6 mb-2">Future Career Paths:</h5>
                                <p>B.E/B.Tech, MBBS, BDS, B.Pharm, B.Arch, B.Sc, National Defence Academy (NDA), Pilot Training, Research.</p>
                                <div className="my-6">
                                    <button onClick={() => openCareerModal('Science')} className="career-suggester-btn ai-button inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-5 rounded-lg transition">
                                        ✨ Get AI Career Suggestions
                                    </button>
                                </div>
                                <h5 className="font-bold mt-6 mb-2">Recommended Study Resources:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="https://www.youtube.com/@PhysicsWallah" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>Physics Wallah:</strong> Comprehensive lectures for PCM & B.</a>
                                    <a href="https://www.youtube.com/@khanacademy" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>Khan Academy:</strong> For strong foundational concepts.</a>
                                    <a href="https://phet.colorado.edu/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>PhET Simulations:</strong> Interactive science and math simulations.</a>
                                    <a href="https://byjus.com/ncert-solutions/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>NCERT Solutions:</strong> Essential for board exam preparation.</a>
                                </div>
                            </div>
                            {/* Commerce Content */}
                            <div id="commerce-10th" className={activeTabs['10th'] === 'commerce-10th' ? '' : 'hidden'}>
                                <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">The Commerce Stream</h4>
                                <p className="mb-4">Deals with the world of business, trade, and finance. It is perfect for students aiming for careers in Accounting, Management, Finance, and Entrepreneurship.</p>
                                <h5 className="font-bold mb-2">Popular Combinations:</h5>
                                <ul className="list-disc list-inside mb-4 space-y-1">
                                    <li><strong>BASM/BACS:</strong> Business Studies, Accountancy, Statistics, Mathematics / Computer Science.</li>
                                    <li><strong>BAEC:</strong> Business Studies, Accountancy, Economics, Computer Science.</li>
                                </ul>
                                <h5 className="font-bold mt-6 mb-2">Future Career Paths:</h5>
                                <p>Chartered Accountancy (CA), Company Secretary (CS), CMA, B.Com, BBA, Banking, Financial Analyst.</p>
                                <div className="my-6">
                                    <button onClick={() => openCareerModal('Commerce')} className="career-suggester-btn ai-button inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-5 rounded-lg transition">
                                        ✨ Get AI Career Suggestions
                                    </button>
                                </div>
                                <h5 className="font-bold mt-6 mb-2">Recommended Study Resources:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="https://www.icai.org/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>ICAI Website:</strong> Official source for all CA-related material.</a>
                                    <a href="https://www.youtube.com/@CaNareshAggarwals" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>CA Naresh Aggarwal:</strong> Quality lectures on Accountancy.</a>
                                    <a href="https://www.zerodha.com/varsity/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>Zerodha Varsity:</strong> Excellent for learning about stock markets.</a>
                                    <a href="https://economictimes.indiatimes.com/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>The Economic Times:</strong> Stay updated with business news.</a>
                                </div>
                            </div>
                            {/* Arts Content */}
                            <div id="arts-10th" className={activeTabs['10th'] === 'arts-10th' ? '' : 'hidden'}>
                                <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">The Arts / Humanities Stream</h4>
                                <p className="mb-4">A very broad and diverse field that focuses on human society, culture, and its expressions. It opens doors to careers in Law, Journalism, Civil Services, Design, Academia, and much more.</p>
                                <h5 className="font-bold mb-2">Popular Combinations:</h5>
                                <ul className="list-disc list-inside mb-4 space-y-1">
                                    <li><strong>HEPS:</strong> History, Economics, Political Science, Sociology. A classic combination for Civil Services aspirants.</li>
                                    <li><strong>HEPP:</strong> History, Economics, Political Science, Psychology. Focuses on human behavior.</li>
                                </ul>
                                <h5 className="font-bold mt-6 mb-2">Future Career Paths:</h5>
                                <p>Law (LLB), Journalism, Fashion/Interior Design, Civil Services (IAS/IPS), Hotel Management, Professor.</p>
                                <div className="my-6">
                                    <button onClick={() => openCareerModal('Arts and Humanities')} className="career-suggester-btn ai-button inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-5 rounded-lg transition">
                                        ✨ Get AI Career Suggestions
                                    </button>
                                </div>
                                <h5 className="font-bold mt-6 mb-2">Recommended Study Resources:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="https://www.youtube.com/@crashcourse" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>CrashCourse:</strong> Engaging videos on History, Sociology, etc.</a>
                                    <a href="https://www.thehindu.com/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>The Hindu Newspaper:</strong> Essential for Civil Services and Law prep.</a>
                                    <a href="https://www.drishtiias.com/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>Drishti IAS:</strong> Comprehensive material for UPSC aspirants.</a>
                                    <a href="https://www.ted.com/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>TED Talks:</strong> For public speaking and diverse knowledge.</a>
                                </div>
                            </div>
                            {/* Diploma Content */}
                            <div id="diploma-10th" className={activeTabs['10th'] === 'diploma-10th' ? '' : 'hidden'}>
                                <h4 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Diploma / Vocational Courses</h4>
                                <p className="mb-4">Job-oriented technical courses designed to equip students with practical skills. They offer a quicker path to employment and can also provide lateral entry into degree programs.</p>
                                <h5 className="font-bold mb-2">Key Fields:</h5>
                                <ul className="list-disc list-inside mb-4">
                                    <li><strong>Polytechnic:</strong> Diploma in Civil, Mechanical, Electrical, Computer Science, etc. (3 years)</li>
                                    <li><strong>Industrial Training Institute (ITI):</strong> Courses for trades like Fitter, Electrician, Welder. (1-2 years)</li>
                                    <li><strong>Paramedical:</strong> Diploma in Medical Lab Technology (DMLT), Diploma in Pharmacy (D.Pharm).</li>
                                </ul>
                                <h5 className="font-bold mt-6 mb-2">Future Career Paths:</h5>
                                <p>Junior Engineer, Technician, Lab Assistant. A Diploma is also a great pathway for lateral entry into the 2nd year of a B.E/B.Tech program.</p>
                                <h5 className="font-bold mt-4 mb-2">Recommended Resources:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <a href="https://dtek.karnataka.gov.in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>DTE Karnataka:</strong> Official info on Diploma admissions in Karnataka.</a>
                                    <a href="https://ncvtmis.gov.in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition"><strong>NCVT MIS Portal:</strong> For ITI courses and information across India.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* After 12th Page */}
                <section id="after-12th-section" className={`page ${activePage === 'after-12th-section' ? 'page-visible' : ''} mb-16`}>
                    <div className="flex justify-between items-center mb-8">
                        <h3 id="after-12th" className="text-3xl font-bold border-l-4 border-green-500 pl-4 text-green-600 dark:text-green-400">Guidance After 12th Grade</h3>
                        <a href="#path-selection" onClick={(e) => handleNavClick(e, 'path-selection')} className="change-path-btn text-green-600 dark:text-green-400 hover:underline font-semibold">Change Path</a>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
                        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                            <nav className="flex flex-wrap -mb-px">
                                <button onClick={() => setupTabs('12th', 'eng-12th')} className={`tab-12th ${activeTabs['12th'] === 'eng-12th' ? 'tab-active-12th' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Engineering</button>
                                <button onClick={() => setupTabs('12th', 'med-12th')} className={`tab-12th ${activeTabs['12th'] === 'med-12th' ? 'tab-active-12th' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Medical</button>
                                <button onClick={() => setupTabs('12th', 'ca-12th')} className={`tab-12th ${activeTabs['12th'] === 'ca-12th' ? 'tab-active-12th' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Commerce</button>
                                <button onClick={() => setupTabs('12th', 'law-12th')} className={`tab-12th ${activeTabs['12th'] === 'law-12th' ? 'tab-active-12th' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Law/Arts</button>
                                <button onClick={() => setupTabs('12th', 'design-12th')} className={`tab-12th ${activeTabs['12th'] === 'design-12th' ? 'tab-active-12th' : ''} w-full sm:w-auto text-lg font-semibold p-4 border-b-2 border-transparent rounded-t-lg`}>Design</button>
                            </nav>
                        </div>
                        <div>
                            {/* Engineering Content */}
                            <div id="eng-12th" className={`${activeTabs['12th'] === 'eng-12th' ? 'grid' : 'hidden'} md:grid-cols-2 gap-8`}>
                                <div>
                                    <h4 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Exams: JEE, CET, COMEDK</h4>
                                    <p className="mb-4">Exams like <strong>JEE (Main & Adv)</strong> for IITs/NITs, <strong>State CETs</strong>, and <strong>COMEDK</strong> for private colleges in Karnataka are the primary gateways to engineering.</p>
                                    <div className="my-6">
                                        <button onClick={() => openPlanModal('JEE/CET Engineering')} className="study-plan-btn ai-button inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-5 rounded-lg transition">
                                            ✨ Generate AI Study Plan
                                        </button>
                                    </div>
                                    <h5 className="font-bold mb-2">Roadmap:</h5>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Master 11th & 12th PCM concepts.</li>
                                        <li>Solve previous year papers relentlessly.</li>
                                        <li>Take mock tests to improve speed and accuracy.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-bold mt-0 mb-2">Top Resources:</h5>
                                    <div className="grid grid-cols-1 gap-4">
                                        <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>NTA JEE Website:</strong> Official source for JEE Main.</a>
                                        <a href="https://cetonline.karnataka.gov.in/kea/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>KEA Website:</strong> For Karnataka CET.</a>
                                        <a href="https://www.comedk.org/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>COMEDK Website:</strong> For private engineering colleges.</a>
                                        <a href="https://nptel.ac.in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>NPTEL:</strong> Free courses from IITs/IISc.</a>
                                    </div>
                                </div>
                            </div>
                            {/* Medical Content */}
                            <div id="med-12th" className={`${activeTabs['12th'] === 'med-12th' ? 'grid' : 'hidden'} md:grid-cols-2 gap-8`}>
                                <div>
                                    <h4 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">Exam: NEET-UG</h4>
                                    <p className="mb-4">The <strong>NEET</strong> is the single gateway for admission to MBBS, BDS, AYUSH, and Veterinary courses. It tests in-depth knowledge of Biology, Chemistry, and Physics.</p>
                                    <div className="my-6">
                                        <button onClick={() => openPlanModal('NEET-UG Medical')} className="study-plan-btn ai-button inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-5 rounded-lg transition">
                                            ✨ Generate AI Study Plan
                                        </button>
                                    </div>
                                    <h5 className="font-bold mb-2">Roadmap:</h5>
                                    <ul className="list-disc list-inside mb-4">
                                        <li>Master NCERT textbooks for classes 11 & 12.</li>
                                        <li>Focus heavily on Biology (highest weightage).</li>
                                        <li>Practice MCQs daily and take regular mock tests.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-bold mt-0 mb-2">Top Resources:</h5>
                                    <div className="grid grid-cols-1 gap-4">
                                        <a href="https://neet.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>NTA NEET Website:</strong> Official announcements and results.</a>
                                        <a href="https://www.youtube.com/@UnacademyNEET" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>Unacademy NEET:</strong> Live classes from top educators.</a>
                                        <a href="https://www.youtube.com/channel/UCiT4sDCa22_eP6w_N3-nL-g" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>Dr. Vani Sood (Vedantu):</strong> Popular for Biology preparation.</a>
                                        <a href="https://apps.ankiweb.net/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition"><strong>Anki Flashcards:</strong> Excellent for spaced repetition and memorization.</a>
                                    </div>
                                </div>
                            </div>
                            {/* ... other 12th tabs ... */}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2024 One-Stop Personalized Career & Education Advisor. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Modals (basic structure) */}
            {careerModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">{careerModalTitle}</h3>
                        {/* Modal content goes here */}
                        <button onClick={() => setCareerModalOpen(false)} className="py-2 px-4 bg-gray-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-500 transition">Close</button>
                    </div>
                </div>
            )}

            {planModalOpen && (
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
                        <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">{planModalTitle}</h3>
                        {/* Modal content goes here */}
                        <button onClick={() => setPlanModalOpen(false)} className="py-2 px-4 bg-gray-200 dark:bg-slate-600 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-500 transition">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerGuide;
