'use client';

import { getEventCards } from '@/backend/sanity-utils';
import Logo from '@/components/UI/logo';
import NoEvents from '@/components/UI/noEventsFound';
import EventCard from '@/components/events/eventCard';
import EventCardList from '@/components/events/eventCardList';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/page';
import FrontPage from '@/components/frontPage/frontPage';
import Hero from '@/components/heroSection/hero';
import HeaderJumbotron from '@/components/jumbotron/jumbotron';
import LoadingPage from '@/components/loadingPage/loadingPage';
import MiddleSection from '@/components/middleSection/middleSection';
import { EventCardType } from '@/types/EventCardType';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { useEffect, useState } from 'react';
import ErrorPage from './feilside/page';

export default function Home() {
    const [events, setEvents] = useState<EventCardType[]>();
    const router = useRouter();

    useEffect(() => {
        if (!events) {
            getEventCards()
                .then((data) => {
                    console.log(data);
                    setEvents(data);
                })
                .catch((error) => {
                    router.push('/feilside');
                });
        }
    }, [events, router]);
    if (!events) {
        return <LoadingPage />;
    }

    return (
        <div className='flex flex-col overflow-y-auto min-h-screen bg-gradient-to-tl from-gradient-end via-gradient-mid to-gradient-start'>
            {/** Header */}
            <Header />
            <main className='min-h-screen'>
                <FrontPage />
                {/**List of events */}
                <div className='bg-white'>
                    <div className='flex justify-center items-center'>
                        <h3 className='text-[#132D4E] font-bold text-[58px] mt-8'>
                            Kommende Arrangementer
                        </h3>
                    </div>

                    {/** Listing all events if there are any  */}
                    <div
                        id='allEvents'
                        className='flex flex-wrap justify-center gap-6 p-8  '>
                        {events && events.length > 0 ? (
                            <>
                                <EventCardList events={events} />
                            </>
                        ) : (
                            <NoEvents />
                        )}
                    </div>
                </div>
                <MiddleSection />
            </main>

            <Footer />
        </div>
    );
}
