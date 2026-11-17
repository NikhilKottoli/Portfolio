import FeaturedInfo from './components/FeaturedInfo';
import HeroSection from './components/HeroSection';
import Skills from './components/Skills';

export default function Home() {
    return (
        <main className="flex flex-col">
            <HeroSection />
            <FeaturedInfo />
            <Skills />
        </main>
    );
}
