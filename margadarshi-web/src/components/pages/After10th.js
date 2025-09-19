import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecommendedCareers from './RecommendedCareers';
import UserProfileCard from './UserProfileCard';

const TabButton = ({ isActive, onClick, children }) => (
    <button 
        onClick={onClick} 
        className={`w-full sm:w-auto text-md font-semibold p-3 border-b-2 rounded-t-lg transition ${
            isActive 
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-slate-700 dark:text-indigo-400' 
                : 'border-transparent hover:bg-gray-100 dark:hover:bg-slate-700'
        }`}
    >
        {children}
    </button>
);

const ResourceLink = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-indigo-100 dark:hover:bg-slate-600 transition">
        <strong>{title}:</strong> {description}
    </a>
);

const TabContent = ({ title, description, combinations, careers, resources, onSuggest }) => (
    <div>
        <h4 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">{title}</h4>
        <p className="mb-4 text-sm">{description}</p>
        
        <div className="md:grid md:grid-cols-2 gap-6">
            <div>
                <h5 className="font-bold mb-2 text-sm">Popular Combinations:</h5>
                <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                    {combinations.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
                <h5 className="font-bold mt-4 mb-2 text-sm">Future Career Paths:</h5>
                <p className="text-sm">{careers}</p>
            </div>
            <div>
                <h5 className="font-bold mb-2 text-sm">Recommended Resources:</h5>
                <div className="grid grid-cols-1 gap-3">
                    {resources.map((r, i) => <ResourceLink key={i} {...r} />)}
                </div>
            </div>
        </div>
        
        {onSuggest && (
            <div className="mt-6 text-center">
                <button onClick={onSuggest} className="ai-button inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">
                    ✨ Get AI Career Suggestions
                </button>
            </div>
        )}
    </div>
);

const After10th = () => {
    const [activeTab, setActiveTab] = useState('science');

    const tabs = {
        science: {
            title: "The Science Stream",
            description: "Focuses on fostering logical, analytical, and problem-solving skills. It is the gateway to careers in Engineering, Medicine, IT, and Scientific Research.",
            combinations: [
                "PCMB: Physics, Chemistry, Mathematics, Biology",
                "PCMC/S: Physics, Chemistry, Mathematics, Computer Science",
                "PCME: Physics, Chemistry, Mathematics, Electronics",
            ],
            careers: "B.E/B.Tech, MBBS, BDS, B.Pharm, B.Arch, B.Sc, NDA, Pilot Training, Research.",
            resources: [
                { href: "https://www.youtube.com/@PhysicsWallah", title: "Physics Wallah", description: "Comprehensive lectures for PCM & B." },
                { href: "https://www.youtube.com/@khanacademy", title: "Khan Academy", description: "For strong foundational concepts." },
            ]
        },
        commerce: {
            title: "The Commerce Stream",
            description: "Deals with business, trade, and finance. It is perfect for careers in Accounting, Management, Finance, and Entrepreneurship.",
            combinations: [
                "BASM/BACS: Business Studies, Accountancy, Statistics, Mathematics / CS",
                "BAEC: Business Studies, Accountancy, Economics, Computer Science",
            ],
            careers: "Chartered Accountancy (CA), Company Secretary (CS), CMA, B.Com, BBA, Banking, Financial Analyst.",
            resources: [
                { href: "https://www.icai.org/", title: "ICAI Website", description: "Official source for all CA-related material." },
                { href: "https://www.zerodha.com/varsity/", title: "Zerodha Varsity", description: "Excellent for learning about stock markets." },
            ]
        },
        arts: {
            title: "The Arts / Humanities Stream",
            description: "A broad field focusing on human society, culture, and expressions. It opens doors to Law, Journalism, Civil Services, Design, and more.",
            combinations: [
                "HEPS: History, Economics, Political Science, Sociology",
                "HEPP: History, Economics, Political Science, Psychology",
            ],
            careers: "Law (LLB), Journalism, Fashion/Interior Design, Civil Services (IAS/IPS), Hotel Management, Professor.",
            resources: [
                { href: "https://www.youtube.com/@crashcourse", title: "CrashCourse", description: "Engaging videos on History, Sociology, etc." },
                { href: "https://www.thehindu.com/", title: "The Hindu", description: "Essential for Civil Services and Law prep." },
            ]
        },
        diploma: {
            title: "Diploma / Vocational Courses",
            description: "Job-oriented technical courses for practical skills, offering a quicker path to employment or lateral entry into degree programs.",
            combinations: [
                "Polytechnic: Diploma in Civil, Mechanical, Electrical, CS, etc. (3 years)",
                "ITI: Courses for trades like Fitter, Electrician, Welder. (1-2 years)",
                "Paramedical: DMLT, D.Pharm",
            ],
            careers: "Junior Engineer, Technician, Lab Assistant. Also a pathway for lateral entry into B.E/B.Tech programs.",
            resources: [
                { href: "https://dtek.karnataka.gov.in/", title: "DTE Karnataka", description: "Official info on Diploma admissions in Karnataka." },
                { href: "https://ncvtmis.gov.in/", title: "NCVT MIS Portal", description: "For ITI courses and information across India." },
            ]
        }
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <section id="after-10th-section" className="page page-visible">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 text-indigo-600 dark:text-indigo-400">Guidance After 10th Grade</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                <nav className="flex flex-wrap -mb-px">
                                    <TabButton isActive={activeTab === 'science'} onClick={() => setActiveTab('science')}>Science</TabButton>
                                    <TabButton isActive={activeTab === 'commerce'} onClick={() => setActiveTab('commerce')}>Commerce</TabButton>
                                    <TabButton isActive={activeTab === 'arts'} onClick={() => setActiveTab('arts')}>Arts</TabButton>
                                    <TabButton isActive={activeTab === 'diploma'} onClick={() => setActiveTab('diploma')}>Diploma</TabButton>
                                </nav>
                            </div>
                            <div>
                                <TabContent {...tabs[activeTab]} onSuggest={() => alert(`AI suggestions for ${activeTab}`)} />
                            </div>
                        </div>
                    </section>
                </Col>
                <Col md={4}>
                    <RecommendedCareers />
                    <UserProfileCard />
                </Col>
            </Row>
        </Container>
    );
};

export default After10th;
