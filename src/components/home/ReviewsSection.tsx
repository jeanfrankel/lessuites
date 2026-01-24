'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const clientReviews = [
    {
        author: "Fortunato",
        country: "Suisse",
        source: "Booking.com",
        rating: 10,
        text: {
            fr: "Excellent emplacement, proche du centre névralgique de Colmar, parking public à 5' à pieds. Appartement très spacieux, parfaitement équipé, accès simple par soi-même.",
            en: "Excellent location, close to the heart of Colmar, public parking 5 min walk away. Very spacious apartment, perfectly equipped, easy self check-in.",
            de: "Ausgezeichnete Lage, nahe dem Zentrum von Colmar, öffentlicher Parkplatz 5 Gehminuten entfernt. Sehr geräumige Wohnung, perfekt ausgestattet, einfacher Selbst-Check-in.",
            zh: "位置极佳，靠近科尔马中心，步行5分钟即可到达公共停车场。公寓非常宽敞，设备齐全，自助入住简单方便。"
        }
    },
    {
        author: "Renee",
        country: "10 ans sur Airbnb",
        source: "Airbnb",
        rating: 5,
        text: {
            fr: "Cet appartement a dépassé mes attentes. C'était juste dans les marchés de Noël, donc si mes enfants plus âgés étaient fatigués, ils pouvaient simplement rentrer à pied à l'appartement. Les propriétaires sont si sympathiques et si serviables. J'ai même pu les appeler pour m'aider à résoudre un problème de voyage. L'appartement est magnifique. Nous étions une famille de six personnes et nous avions beaucoup d'espace. Je ne saurais trop de bonnes choses sur ce logement. L'un de mes endroits préférés où j'ai jamais séjourné.",
            en: "This apartment exceeded my expectations. It was right in the Christmas markets, so if my older children were tired, they could just walk back to the apartment. The owners are so friendly and helpful. I was even able to call them to help resolve a travel issue. The apartment is beautiful. We were a family of six and had plenty of space. I cannot say enough good things about this accommodation. One of my favorite places I have ever stayed.",
            de: "Diese Wohnung hat meine Erwartungen übertroffen. Es war direkt an den Weihnachtsmärkten, so dass meine älteren Kinder, wenn sie müde waren, einfach zur Wohnung zurücklaufen konnten. Die Besitzer sind so freundlich und hilfsbereit. Ich konnte sie sogar anrufen, um ein Reiseproblem zu lösen. Die Wohnung ist wunderschön. Wir waren eine sechsköpfige Familie und hatten viel Platz. Ich kann nicht genug Gutes über diese Unterkunft sagen. Einer meiner Lieblingsorte, an denen ich je übernachtet habe.",
            zh: "这间公寓超出了我的预期。就在圣诞市场里，所以如果我的大孩子累了，他们可以直接走回公寓。房东非常友好和乐于助人。我甚至可以打电话给他们帮忙解决旅行问题。公寓非常漂亮。我们要了六个人的家庭，空间很大。我对这个住宿赞不绝口。这是我住过的最喜欢的地方之一。"
        }
    },
    {
        author: "Quentin",
        country: "Suisse",
        source: "Booking.com",
        rating: 10,
        text: {
            fr: "Emplacement parfait (entrée du vieux centre de Colmar, 15 min à pied de la gare, 2 min à pied du parking Rapp). Logement bien équipé avec un grand espace de vie pour un agréable séjour entre amis ou en famille.",
            en: "Perfect location (entrance to old Colmar, 15 min walk from station, 2 min from Rapp parking). Well-equipped accommodation with large living space for a pleasant stay with friends or family.",
            de: "Perfekte Lage (Eingang zur Altstadt von Colmar, 15 Min. Fußweg vom Bahnhof, 2 Min. vom Parkplatz Rapp). Gut ausgestattete Unterkunft mit großem Wohnbereich für einen angenehmen Aufenthalt mit Freunden oder Familie.",
            zh: "位置完美（科尔马老城入口，距火车站步行15分钟，距Rapp停车场2分钟）。设备齐全的住宿，宽敞的生活空间，适合与朋友或家人愉快度假。"
        }
    },
    {
        author: "Mikhail",
        country: "10 ans sur Airbnb",
        source: "Airbnb",
        rating: 5,
        text: {
            fr: "Nous avons passé un séjour incroyable. L'appartement est bien situé, très propre, spacieux et pratique pour accueillir un grand groupe de voyageurs. Merci pour votre hospitalité.",
            en: "We had an incredible stay. The apartment is well located, very clean, spacious and convenient for hosting a large group of travelers. Thank you for your hospitality.",
            de: "Wir hatten einen unglaublichen Aufenthalt. Die Wohnung ist gut gelegen, sehr sauber, geräumig und praktisch für eine große Gruppe von Reisenden. Danke für Ihre Gastfreundschaft.",
            zh: "我们度过了一段不可思议的时光。公寓位置很好，非常干净，宽敞，方便接待一大群旅客。谢谢您的款待。"
        }
    },
    {
        author: "Perrier",
        country: "France",
        source: "Booking.com",
        rating: 10,
        text: {
            fr: "Échanges préalables réguliers, bonnes recommandations et équipements de l'appartement très complets. Notre hôte a été facilitatrice pour nous accueillir en avance. Merci Adeline !",
            en: "Regular prior exchanges, good recommendations and very complete apartment equipment. Our host was helpful in welcoming us early. Thank you Adeline!",
            de: "Regelmäßiger vorheriger Austausch, gute Empfehlungen und sehr vollständige Wohnungsausstattung. Unsere Gastgeberin war hilfreich und hat uns früher empfangen. Danke Adeline!",
            zh: "事先沟通顺畅，推荐很好，公寓设备非常齐全。房东很贴心，提前接待了我们。谢谢Adeline！"
        }
    },
    {
        author: "Marilen",
        country: "Lucerne, Suisse",
        source: "Airbnb",
        rating: 5,
        text: {
            fr: "L'emplacement du logement est vraiment génial, avec beaucoup de magasins et la vieille ville à proximité. Nous étions un groupe de 9 personnes et l'appartement avait assez de place pour nous tous. Le salon-salle à manger est très grand et adapté pour de nombreuses personnes. En outre, l'appartement dispose de deux toilettes et de deux douches.",
            en: "The location of the accommodation is really great, with lots of shops and the old town nearby. We were a group of 9 people and the apartment had enough space for all of us. The living-dining room is very large and suitable for many people. In addition, the apartment has two toilets and two showers.",
            de: "Die Lage der Unterkunft ist wirklich toll, mit vielen Geschäften und der Altstadt in der Nähe. Wir waren eine Gruppe von 9 Personen und die Wohnung hatte genug Platz für uns alle. Das Wohn-Esszimmer ist sehr groß und für viele Personen geeignet. Außerdem verfügt die Wohnung über zwei Toiletten und zwei Duschen.",
            zh: "住宿的位置真的很棒，附近有很多商店和老城区。我们要了9个人的团体，公寓有足够的空间容纳我们所有人。客厅餐厅非常大，适合很多人。此外，公寓有两间厕所和两间淋浴。"
        }
    }
];

export default function ReviewsSection({ data }: { data: any }) {
    const { language, t: tContext } = useLanguage();

    return (
        <section className="py-20 md:py-28 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-cygne-gold text-xs uppercase tracking-widest-xl mb-4 block font-bold">
                        {data?.label?.[language] || data?.label?.fr || tContext('reviews.label')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-cygne-brown font-light mb-8">
                        {data?.title?.[language] || data?.title?.fr || tContext('reviews.title')}
                    </h2>

                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16">
                        {/* Booking */}
                        <div className="flex flex-col items-center justify-between bg-white p-6 md:p-8 rounded-lg shadow-md w-full md:w-auto min-w-[280px] md:min-w-[320px] border border-gray-100 flex-1 max-w-sm">
                            <div className="flex flex-col items-center w-full">
                                <Image
                                    src="/images/booking_custom.svg"
                                    alt="Booking.com"
                                    width={180}
                                    height={54}
                                    className="mb-6 object-contain h-10 w-auto shadow-sm rounded"
                                />
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-6xl font-serif text-[#003580]">{data?.bookingRating || '9.1'}</span>
                                    <span className="text-2xl text-gray-400">/10</span>
                                </div>
                                <div className="text-base text-gray-500 font-medium">{data?.bookingReviewCount?.[language] || data?.bookingReviewCount?.fr || tContext('reviews.bookingReviews')}</div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#003580] mt-2 bg-[#003580]/10 px-3 py-1 rounded-full text-center whitespace-normal md:whitespace-nowrap">
                                    {data?.bookingLabel?.[language] || data?.bookingLabel?.fr || tContext('reviews.fabulous')}
                                </span>
                            </div>

                            <a
                                href="https://www.booking.com/hotel/fr/les-suites-du-cygne.fr.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-[#003580] text-[#003580] rounded hover:bg-[#003580] hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest mt-6"
                            >
                                {data?.viewOnBooking?.[language] || data?.viewOnBooking?.fr || tContext('reviews.viewOnBooking')}
                            </a>
                        </div>

                        {/* Separator for mobile/desktop */}
                        <div className="hidden md:block w-px bg-gray-200 my-4"></div>

                        {/* Airbnb */}
                        <div className="flex flex-col items-center justify-between bg-white p-6 md:p-8 rounded-lg shadow-md w-full md:w-auto min-w-[280px] md:min-w-[320px] border border-gray-100 flex-1 max-w-sm">
                            <div className="flex flex-col items-center w-full">
                                <Image
                                    src="/images/Airbnb-Logo.png"
                                    alt="Airbnb"
                                    width={160}
                                    height={50}
                                    className="mb-6 object-contain h-12 w-auto"
                                />
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-6xl font-serif text-[#FF385C]">{data?.airbnbRating || '4.89'}</span>
                                    <span className="text-2xl text-gray-400">/5</span>
                                </div>
                                <div className="text-base text-gray-500 font-medium mb-1">{data?.airbnbReviewCount?.[language] || data?.airbnbReviewCount?.fr || tContext('reviews.airbnbReviews')}</div>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#FF385C] mb-8">
                                    Superhost
                                </span>
                            </div>

                            <div className="flex flex-row justify-between w-full pt-6 border-t border-gray-100 px-2 gap-4">
                                <a
                                    href="https://www.airbnb.fr/rooms/29922119"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center text-xs font-medium text-gray-600 hover:text-[#FF385C] hover:underline transition-colors flex-1"
                                >
                                    Baudelaire
                                </a>
                                <a
                                    href="https://www.airbnb.fr/rooms/29980345"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center text-xs font-medium text-gray-600 hover:text-[#FF385C] hover:underline transition-colors flex-1 border-l border-r border-gray-200"
                                >
                                    Schubert
                                </a>
                                <a
                                    href="https://www.airbnb.fr/rooms/29981721"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center text-xs font-medium text-gray-600 hover:text-[#FF385C] hover:underline transition-colors flex-1"
                                >
                                    Asselin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grille des avis */}
                <div className="grid md:grid-cols-3 gap-6">
                    {(data?.reviews || clientReviews).map((review: any, index: number) => (
                        <div
                            key={index}
                            className="bg-cygne-cream p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-medium text-cygne-brown text-lg">{review.author}</p>
                                    <p className="text-xs text-cygne-brown/60 uppercase tracking-wider">{review.country}</p>
                                </div>
                                <div className="w-24 flex justify-end">
                                    <Image
                                        src={review.source === 'Airbnb' ? "/images/Airbnb-Logo.png" : "/images/booking_custom.svg"}
                                        alt={review.source}
                                        width={review.source === 'Airbnb' ? 80 : 100}
                                        height={40}
                                        className={`object-contain ${review.source === 'Airbnb' ? 'h-8' : 'h-6'} w-auto`}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-1 mb-4">
                                <span className={`font-serif font-bold text-xl ${review.source === 'Airbnb' ? 'text-[#FF385C]' : 'text-[#003580]'
                                    }`}>
                                    {review.rating}
                                </span>
                                <span className="text-xs text-black/30 pt-1">
                                    /{review.source === 'Airbnb' ? '5' : '10'}
                                </span>
                            </div>

                            <p className="text-cygne-brown/80 italic leading-relaxed text-sm">
                                "{review.text[language as keyof typeof review.text]}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
