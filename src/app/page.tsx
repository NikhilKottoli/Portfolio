import HeroSection from './components/HeroSection';
import Skills from './components/Skills';
import Achievements from './components/Achievements';

export default function Home() {
    return (
        <main className="flex flex-col">
            <HeroSection />
            <Skills />
            <Achievements />
        </main>
    );
}
