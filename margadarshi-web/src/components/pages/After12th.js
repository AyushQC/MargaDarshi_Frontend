import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecommendedCareers from './RecommendedCareers';
import UserProfileCard from './UserProfileCard';

const TabButton = ({ isActive, onClick, children }) => (
    <button 
        onClick={onClick} 
        className={`w-full sm:w-auto text-md font-semibold p-3 border-b-2 rounded-t-lg transition ${
            isActive 
                ? 'border-green-500 text-green-600 bg-green-50 dark:bg-slate-700 dark:text-green-400' 
                : 'border-transparent hover:bg-gray-100 dark:hover:bg-slate-700'
        }`}
    >
        {children}
    </button>
);

const ResourceLink = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-100 dark:bg-slate-700 rounded-md hover:bg-green-100 dark:hover:bg-slate-600 transition">
        <strong>{title}:</strong> {description}
    </a>
);

const TabContent = ({ title, description, roadmap, resources, onSuggest, examName }) => (
    <div className="grid md:grid-cols-2 gap-6">
        <div>
            <h4 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">{title}</h4>
            <p className="mb-4 text-sm">{description}</p>
            <h5 className="font-bold mb-2 text-sm">Roadmap:</h5>
            <ul className="list-disc list-inside mb-4 space-y-1 text-sm">
                {roadmap.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            {onSuggest && (
                <div className="mt-6">
                    <button onClick={() => onSuggest(examName)} className="ai-button inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">
                        ✨ Generate AI Study Plan
                    </button>
                </div>
            )}
        </div>
        <div>
            <h5 className="font-bold mb-2 text-sm">Top Resources:</h5>
            <div className="grid grid-cols-1 gap-3">
                {resources.map((r, i) => <ResourceLink key={i} {...r} />)}
            </div>
        </div>
    </div>
);

const After12th = () => {
    const [activeTab, setActiveTab] = useState('eng');

    const tabs = {
        eng: {
            title: "Exams: JEE, CET, COMEDK",
            description: "These exams are the primary gateways to engineering. JEE for IITs/NITs, State CETs, and COMEDK for private colleges in Karnataka.",
            roadmap: [
                "Master 11th & 12th PCM concepts.",
                "Solve previous year papers relentlessly.",
                "Take mock tests to improve speed and accuracy.",
            ],
            resources: [
                { href: "https://jeemain.nta.nic.in/", title: "NTA JEE Website", description: "Official source for JEE Main." },
                { href: "https://cetonline.karnataka.gov.in/kea/", title: "KEA Website", description: "For Karnataka CET." },
            ],
            examName: "JEE/CET Engineering"
        },
        med: {
            title: "Exam: NEET-UG",
            description: "The single gateway for admission to MBBS, BDS, AYUSH, and Veterinary courses. It tests in-depth knowledge of Biology, Chemistry, and Physics.",
            roadmap: [
                "Master NCERT textbooks for classes 11 & 12.",
                "Focus heavily on Biology (highest weightage).",
                "Practice MCQs daily and take regular mock tests.",
            ],
            resources: [
                { href: "https://neet.nta.nic.in/", title: "NTA NEET Website", description: "Official announcements and results." },
                { href: "https://www.youtube.com/@UnacademyNEET", title: "Unacademy NEET", description: "Live classes from top educators." },
            ],
            examName: "NEET-UG Medical"
        },
        ca: {
            title: "Paths: CA, B.Com, BBA",
            description: "After 12th Commerce, students can aim for professional courses like CA, CS, or pursue versatile degrees like B.Com and BBA.",
            roadmap: [
                "Register for CA Foundation after 12th.",
                "Clear Foundation, Intermediate, and Final exams.",
                "Complete 3 years of mandatory articleship.",
            ],
            resources: [
                { href: "https://www.icai.org/", title: "ICAI Website", description: "For syllabus, registration, and material." },
                { href: "https://www.icsi.edu/", title: "ICSI Website", description: "For Company Secretary course info." },
            ],
            examName: "CA Foundation"
        },
        law: {
            title: "Paths: Law & Civil Services",
            description: "For students aiming for a career in law (via CLAT, AILET) or civil services (IAS/IPS via UPSC).",
            roadmap: [
                "Prepare for entrance exams like CLAT/AILET.",
                "For Law: Pursue a 5-year integrated LLB degree.",
                "For Civil Services: Pursue any degree (B.A. preferred) and prepare for the UPSC CSE exam.",
            ],
            resources: [
                { href: "https://consortiumofnlus.ac.in/", title: "CLAT Consortium", description: "Official website for the CLAT exam." },
                { href: "https://www.visionias.in/", title: "Vision IAS", description: "A leading resource for UPSC preparation." },
            ],
            examName: "CLAT/Law Entrance"
        },
        design: {
            title: "Paths: Design (NID/NIFT/UCEED)",
            description: "For creative students interested in fields like Fashion, Product, or Graphic Design. Admission is through design entrance exams.",
            roadmap: [
                "Build a strong portfolio showcasing your creativity.",
                "Prepare for exams like NID DAT, NIFT, or UCEED.",
                "Pursue a Bachelor of Design (B.Des) from a top institute.",
            ],
            resources: [
                { href: "https://admissions.nid.edu/", title: "NID Admissions", description: "Official portal for National Institute of Design." },
                { href: "https://www.behance.net/", title: "Behance", description: "For inspiration and building a portfolio." },
            ],
            examName: "NID/NIFT Design"
        }
    };

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <section id="after-12th-section" className="page page-visible">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold border-l-4 border-green-500 pl-3 text-green-600 dark:text-green-400">Guidance After 12th Grade</h3>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                                <nav className="flex flex-wrap -mb-px">
                                    <TabButton isActive={activeTab === 'eng'} onClick={() => setActiveTab('eng')}>Engineering</TabButton>
                                    <TabButton isActive={activeTab === 'med'} onClick={() => setActiveTab('med')}>Medical</TabButton>
                                    <TabButton isActive={activeTab === 'ca'} onClick={() => setActiveTab('ca')}>Commerce</TabButton>
                                    <TabButton isActive={activeTab === 'law'} onClick={() => setActiveTab('law')}>Law/Arts</TabButton>
                                    <TabButton isActive={activeTab === 'design'} onClick={() => setActiveTab('design')}>Design</TabButton>
                                </nav>
                            </div>
                            <div>
                                <TabContent {...tabs[activeTab]} onSuggest={(exam) => alert(`AI study plan for ${exam}`)} />
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

export default After12th;
