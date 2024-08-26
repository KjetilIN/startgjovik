import { fetchImageByCategory } from '@/backend/sanity-utils';
import AboutHeroContent from '@/components/aboutStart/aboutHeroContent';
import { AboutStart } from '@/components/aboutStart/aboutstartText';
import Hero from '@/components/hero/hero';
import BoardMembers from '@/components/startMembers/startBoardList';

const aboutHeroProps = {
    title: 'Om oss',
    color: '#132D4E',
    textColor: '#',
    logo: false,
    content: <AboutHeroContent />,
    contentBackground: '/images/hero-background-blue.png',
};

export default async function AboutUsPage() {
    const teamPic = await fetchImageByCategory('TEAM_PIC');
    return (
        <main className='bg-gray-900 min-h-screen text-white'>
            <Hero {...aboutHeroProps} imageSrc={teamPic?.asset.url || ''} />
            <AboutStart />
            <BoardMembers />
        </main>
    );
}
