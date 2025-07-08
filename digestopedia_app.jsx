import React, { useState, useMemo } from 'react';
import { BookOpen, Search, BrainCircuit, Microscope, Stethoscope, Pill, TestTube, Languages, Users, HeartPulse, Dna, Bug, Video, Image as ImageIcon, HelpCircle } from 'lucide-react';

// --- DATA STORE ---
// All app content is stored here, organized by language.
const content = { ... };

// --- HELPER COMPONENTS ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const IconButton = ({ Icon, onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${className}`}
    >
        <Icon className="w-5 h-5" />
        <span>{children}</span>
    </button>
);

// --- PAGE COMPONENTS ---

const HomePage = ({ setPage, content }) => { ... };

const OverviewPage = ({ content }) => { ... };

const AnatomyPage = ({ content }) => { ... };

const QuizPage = ({ content }) => { ... };

const SearchResultsPage = ({ results, query, setPage, langContent }) => { ... };

// --- MAIN APP COMPONENT ---

export default function App() {
    const [page, setPage] = useState('home');
    const [language, setLanguage] = useState('es');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const langContent = content[language];

    const handleSearch = (query) => { ... };

    const renderPage = () => {
        switch (page) {
            case 'overview': return <OverviewPage content={langContent.overview} />;
            case 'anatomy': return <AnatomyPage content={langContent.anatomy} />;
            case 'quiz': return <QuizPage content={langContent.quiz} />;
            case 'search': return <SearchResultsPage results={searchResults} query={searchQuery} setPage={setPage} langContent={langContent} />;
            case 'home':
            default:
                return <HomePage setPage={setPage} content={langContent.home} />;
        }
    };

    const navItems = ['home', 'overview', 'anatomy', 'physiology', 'microbiota', 'conditions', 'quiz'];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPage('home')}>
                            <BrainCircuit className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                            <span className="text-2xl font-bold text-gray-800 dark:text-white">{langContent.appName}</span>
                        </div>
                        <div className="hidden lg:flex items-center space-x-2">
                             {navItems.map(item => (
                                <button key={item} onClick={() => setPage(item)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${page === item ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    {langContent.nav[item]}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={langContent.nav.search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 w-40 md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <div className="relative">
                                <select 
                                    value={language} 
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="bg-gray-100 dark:bg-gray-700 rounded-md py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="es">ES</option>
                                    <option value="en">EN</option>
                                </select>
                                <Languages className="w-5 h-5 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {renderPage()}
            </main>
            
            <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; 2024 {langContent.appName}. Todos los derechos reservados.</p>
                    <p className="text-sm mt-2">Una herramienta educativa para explorar las maravillas del cuerpo humano.</p>
                </div>
            </footer>
        </div>
    );
}
