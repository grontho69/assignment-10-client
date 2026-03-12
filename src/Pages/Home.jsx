import React, { useMemo, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import IssueCard from '../components/IssueCard';
import { Search, ArrowRight, Leaf, Shield, Heart } from 'lucide-react';
import MyContainer from '../components/MyContainer';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const loaderData = useLoaderData();
    const recentIssues = Array.isArray(loaderData?.result) ? loaderData.result : (Array.isArray(loaderData) ? loaderData : []);
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dotsClass: "slick-dots custom-dots",
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        pauseOnHover: false,
        initialSlide: 0
    };

    const carouselItems = [
        {
            image: "/assets/images/hero_1.png",
            title: "Heal Your City. Together.",
            subtitle: "Join the verified network of 8,000+ citizens revitalizing our urban spaces.",
            accent: "Citizen Action Network"
        },
        {
            image: "/assets/images/hero_2.png",
            title: "Community First Approach.",
            subtitle: "Directly impact your local environment with rapid reporting and collaborative cleanup.",
            accent: "Urban Revitalization"
        },
        {
            image: "/assets/images/hero_3.png",
            title: "Clean Technology Future.",
            subtitle: "Leveraging smart data to build safer, greener, and more sustainable city infrastructure.",
            accent: "Sustainable Infrastructure"
        }
    ];

    return (
        <div className="bg-slate-50 dark:bg-gray-950 min-h-screen transition-colors">
            
            <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
                <Slider {...sliderSettings} className="h-full">
                    {carouselItems.map((item, index) => (
                        <div key={index} className="relative h-[80vh] md:h-[90vh] outline-none">
                            <div className="absolute inset-0">
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-slate-900/40 dark:bg-gray-950/60 backdrop-blur-[2px]"></div>
                            </div>
                            
                            <div className="relative h-full flex items-center">
                                <MyContainer>
                                    <div className="max-w-4xl pt-20">
                                        <AnimatePresence mode="wait">
                                            {currentSlide === index && (
                                                <motion.div 
                                                    key={`slide-${index}`}
                                                    initial={{ opacity: 0, y: 30 }} 
                                                    animate={{ opacity: 1, y: 0 }} 
                                                    exit={{ opacity: 0, y: -30 }}
                                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                                >
                                                    <div className="flex items-center gap-3 text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
                                                        <span className="w-12 h-px bg-emerald-400"></span>
                                                        {item.accent}
                                                    </div>
                                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-2xl">
                                                        {item.title.split('.').map((part, i) => (
                                                            <span key={i} className={part.includes('City') || part.includes('Approach') || part.includes('Future') ? 'text-emerald-400' : ''}>
                                                                {part}{i === 0 && item.title.includes('.') ? '.' : ''}
                                                                {i === 0 && <br />}
                                                            </span>
                                                        ))}
                                                    </h1>
                                                    <p className="text-xl lg:text-2xl text-slate-100 font-medium leading-relaxed max-w-2xl mb-12 drop-shadow-lg">
                                                        {item.subtitle}
                                                    </p>
                                                    <div className="flex flex-col sm:row gap-6">
                                                        <Link to="/all-issues" className="h-16 px-10 bg-emerald-600 text-white flex items-center justify-center gap-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95">
                                                            Explore Active Issues <ArrowRight size={18} />
                                                        </Link>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </MyContainer>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Custom Dot Styles */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .custom-dots {
                        bottom: 40px !important;
                    }
                    .custom-dots li button:before {
                        color: white !important;
                        font-size: 12px !important;
                        opacity: 0.3 !important;
                    }
                    .custom-dots li.slick-active button:before {
                        color: #10b981 !important;
                        opacity: 1 !important;
                    }
                `}} />
            </section>

            {}
            <section className="py-24 bg-white dark:bg-gray-900">
                <MyContainer>
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 dark:text-white tracking-tight mb-4 text-center sm:text-left">Recent Incidents</h2>
                            <p className="text-slate-500 font-medium text-lg text-center sm:text-left">Latest environmental reports from your community.</p>
                        </div>
                        <Link to="/all-issues" className="text-emerald-600 font-black uppercase text-xs tracking-widest hover:mr-2 transition-all flex items-center gap-2 group">
                            View all issues <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {recentIssues
                            .filter(i => (i.status || 'Pending').toLowerCase() === 'pending')
                            .slice(0, 6)
                            .map(issue => (
                            <IssueCard key={issue._id} issue={issue} />
                        ))}
                    </div>
                </MyContainer>
            </section>
        </div>
    );
};
export default Home;
