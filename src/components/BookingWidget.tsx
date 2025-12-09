'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingWidget() {
  const { t, language } = useLanguage();
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    if (!arrival || !departure) {
      e.preventDefault();
      alert(t('booking.fillDates'));
      return;
    }

    // Convert dates to Reservit format
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);

    // Update hidden fields before form submits naturally
    (form.elements.namedItem('fday') as HTMLInputElement).value = arrivalDate.getDate().toString();
    (form.elements.namedItem('fmonth') as HTMLInputElement).value = (arrivalDate.getMonth() + 1).toString();
    (form.elements.namedItem('fyear') as HTMLInputElement).value = arrivalDate.getFullYear().toString();

    (form.elements.namedItem('tday') as HTMLInputElement).value = departureDate.getDate().toString();
    (form.elements.namedItem('tmonth') as HTMLInputElement).value = (departureDate.getMonth() + 1).toString();
    (form.elements.namedItem('tyear') as HTMLInputElement).value = departureDate.getFullYear().toString();
  };

  return (
    <div className="bg-cygne-cream/95 border-t border-cygne-brown/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <form
          action="https://secure.reservit.com/reservit/reserhotel.php"
          method="GET"
          target="_blank"
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-3 items-end"
        >
          {/* Hidden inputs for Reservit */}
          <input type="hidden" name="hotelid" value="254654" />
          <input type="hidden" name="lang" value={language === 'fr' ? 'FR' : language === 'de' ? 'DE' : language === 'zh' ? 'ZH' : 'EN'} />
          <input type="hidden" name="action" value="resa" />
          <input type="hidden" name="fday" defaultValue="" />
          <input type="hidden" name="fmonth" defaultValue="" />
          <input type="hidden" name="fyear" defaultValue="" />
          <input type="hidden" name="tday" defaultValue="" />
          <input type="hidden" name="tmonth" defaultValue="" />
          <input type="hidden" name="tyear" defaultValue="" />

          {/* Arrival Date */}
          <div className="flex-1 w-full">
            <label className="block text-xs uppercase tracking-wider text-cygne-brown/70 mb-1 font-bold">
              <Calendar className="inline mr-1" size={12} />
              {t('booking.arrival')}
            </label>
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-stone-200 rounded-sm focus:border-cygne-gold focus:outline-none focus:ring-1 focus:ring-cygne-gold transition-all text-cygne-brown text-sm bg-white"
            />
          </div>

          {/* Departure Date */}
          <div className="flex-1 w-full">
            <label className="block text-xs uppercase tracking-wider text-cygne-brown/70 mb-1 font-bold">
              <Calendar className="inline mr-1" size={12} />
              {t('booking.departure')}
            </label>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              min={arrival || new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-stone-200 rounded-sm focus:border-cygne-gold focus:outline-none focus:ring-1 focus:ring-cygne-gold transition-all text-cygne-brown text-sm bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-cygne-gold text-white uppercase tracking-[0.15em] text-xs font-bold hover:bg-cygne-brown transition-all duration-300 rounded-sm shadow-sm whitespace-nowrap"
          >
            {t('booking.bookNow')}
          </button>
        </form>
      </div>
    </div>
  );
}
