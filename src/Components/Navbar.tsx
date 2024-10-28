import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wallet from "./Wallet-Button";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
    faqRef?: React.RefObject<HTMLElement>;
    howItWorksRef?: React.RefObject<HTMLElement>;
    switchNetRef?: React.RefObject<HTMLElement>;
    // This prop will be passed conditionally
}

const Navbar: React.FC<NavbarProps> = ({ faqRef, howItWorksRef, switchNetRef }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    // Sidebar animation variants
    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    // Scroll to section handlers
    const handleScrollToFaq = () => {
        faqRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };

    const handleScrollToHowItWorks = () => {
        howItWorksRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };

    const handleScrollToSwitchNet = () => {
        switchNetRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };
    const navigateToAboutUs = () => {
        navigate('/about'); // Navigates to /aboutus
      };
      const navigateToFaucets = () => {
        navigate('/faucets'); // Navigates to /aboutus
      };

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === "/") { // Only track scroll position if on "/"
                const sections = [
                    { id: "howItWorks", ref: howItWorksRef },
                    { id: "faq", ref: faqRef },
                    { id: "switchNet", ref: switchNetRef },
                ];

                const scrollPosition = window.scrollY + window.innerHeight / 2;

                sections.forEach((section) => {
                    const sectionTop = section.ref?.current?.offsetTop || 0;
                    const sectionBottom = sectionTop + (section.ref?.current?.offsetHeight || 0);

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveSection(section.id);
                    }
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [faqRef, howItWorksRef, switchNetRef, location.pathname]);

    return (
        <motion.div className="sticky top-0 z-50 bg-black text-white flex  text-2xl justify-between items-center border border-[#66686e] rounded-lg p-6 w-[90%] lg:w-[85%]">
            <div className="flex items-center">
                <div className="w-12">
                    <img src={logo} alt="Logo" />
                </div>
                <p className="hidden lg:block ml-2 cursor-pointer" onClick={() => navigate("/")}>
                    SENTIO
                </p>
            </div>

            {/* Hamburger for smaller devices */}
            <div className="lg:hidden">
                <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer" />
            </div>

            {/* Full Navbar for larger screens */}
            <div className="hidden lg:flex gap-4 text-lg">
                {location.pathname === "/" && (
                    <>
                        <button
                            className={`text-left `}
                            onClick={handleScrollToHowItWorks}
                            aria-label="Scroll to How it Works section"
                        >
                            How it works
                        </button>
                        <button
                            className={`text-left`}
                            onClick={handleScrollToFaq}
                            aria-label="Scroll to FAQ section"
                        >
                            FAQ
                        </button>
                        <button
                            className={`text-left`}
                            onClick={navigateToAboutUs} 
                            aria-label="Scroll to FAQ section"
                            
                        >
                            About Us
                        </button>
                        <button
                            className={`text-left `}
                            onClick={handleScrollToSwitchNet}
                            aria-label="Scroll to Features section"
                        >
                            Features
                        </button>
                        <button
                            className={`text-left `}
                            onClick={navigateToFaucets}
                            aria-label="Scroll to Features section"
                        >
                            Air-Drop
                        </button>
                    </>
                )}
                <Wallet />
            </div>

            {isSidebarOpen && (
                <motion.div
                    className="fixed top-0 right-0 h-full w-2/3 bg-[#333] p-6 z-50 flex flex-col gap-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={sidebarVariants}
                >
                    <div className="flex justify-end mb-4">
                        <FaTimes
                            className="text-white text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(false)}
                            aria-label="Close sidebar"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <img src={logo} alt="Logo" className="w-12" />
                    </div>

                    {location.pathname === "/" && (
                        <>
                            <button
                                className={`text-left ${activeSection === 'howItWorks' ? 'font-bold' : ''}`}
                                onClick={handleScrollToHowItWorks}
                                aria-label="Scroll to How it Works section"
                            >
                                How it works
                            </button>
                            <button
                                className={`text-left ${activeSection === 'howItWorks' ? 'font-bold' : ''}`}
                                onClick={navigateToAboutUs}
                                aria-label="Scroll to How it Works section"
                            >
                                About Us
                            </button>
                            <button
                                className={`text-left ${activeSection === 'faq' ? 'font-bold' : ''}`}
                                onClick={handleScrollToFaq}
                                aria-label="Scroll to FAQ section"
                            >
                                FAQ
                            </button>
                            <button
                                className={`text-left ${activeSection === 'switchNet' ? 'font-bold' : ''}`}
                                onClick={handleScrollToSwitchNet}
                                aria-label="Scroll to Features section"
                            >
                                Features
                            </button>
                        </>
                    )}

                    <Wallet />
                </motion.div>
            )}
        </motion.div>
    );
};

export default Navbar;
