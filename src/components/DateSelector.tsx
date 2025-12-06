'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DateSelector() {
  const router = useRouter();
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  // Obtenir la date d'aujourd'hui au format YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (arrivalDate && departureDate) {
      // Rediriger vers la page de réservation avec les dates
      router.push(`/reservation?arrival=${arrivalDate}&departure=${departureDate}`);
    }
  };

  return (
    <>
      {/* CSS du sélecteur */}
      <style jsx global>{`
        #dateSelector_btn {
          justify-content: center;
          align-items: center;
          transform: initial;
          padding: 10px 20px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          background-color: #C9A961;
          color: #fff;
          border: 0;
          top: 335px;
          bottom: initial;
          cursor: pointer;
          right: 0;
          position: fixed;
          z-index: 999999;
          display: flex;
          transition: background-color 0.3s ease;
        }
        #dateSelector_btn:hover {
          background-color: #3B322C;
        }
        #btn_calendar_ico {
          font-size: 1.3em;
          margin-right: 8px;
        }
        #dateSelectorPanel {
          position: fixed;
          top: 50%;
          display: none;
          text-align: center;
          width: 320px;
          right: 0;
          transform: translateY(-50%);
          z-index: 9999;
          background: white;
          border-radius: 8px 0 0 8px;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          padding: 30px 25px;
        }
        #dateSelectorPanel.show {
          display: block;
        }
        #dateSelector_close {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f5f5f5;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #333;
          transition: all 0.3s ease;
        }
        #dateSelector_close:hover {
          background: #C9A961;
          color: white;
          transform: rotate(90deg);
        }
        .date-input-group {
          margin-bottom: 20px;
          text-align: left;
        }
        .date-input-group label {
          display: block;
          color: #3B322C;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .date-input-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #EAE5D9;
          border-radius: 4px;
          font-size: 14px;
          color: #3B322C;
          transition: border-color 0.3s ease;
        }
        .date-input-group input:focus {
          outline: none;
          border-color: #C9A961;
        }
        .submit-btn {
          width: 100%;
          padding: 15px;
          background-color: #C9A961;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }
        .submit-btn:hover {
          background-color: #3B322C;
        }
        .submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .panel-title {
          color: #3B322C;
          font-size: 18px;
          font-weight: 300;
          margin-bottom: 25px;
          text-align: center;
          font-family: serif;
        }

        /* RESPONSIVE */
        @media (max-width: 790px) {
          #dateSelector_btn {
            padding: 8px 15px;
            font-size: 13px;
            top: 250px;
          }
          #dateSelectorPanel {
            width: 280px;
            padding: 25px 20px;
          }
        }
        @media screen and (max-width: 450px) and (orientation: portrait) {
          #dateSelector_btn {
            padding: 6px 12px;
            font-size: 11px;
            top: 200px;
          }
          #dateSelectorPanel {
            width: 90%;
            max-width: 300px;
            right: 50%;
            transform: translate(50%, -50%);
          }
        }
      `}</style>

      {/* Bouton fixe */}
      <button
        id="dateSelector_btn"
        onClick={() => {
          const panel = document.getElementById('dateSelectorPanel');
          if (panel) {
            panel.classList.toggle('show');
          }
        }}
      >
        <span id="btn_calendar_ico">📅</span>
        Meilleur tarif garanti
      </button>

      {/* Panneau de sélection */}
      <div id="dateSelectorPanel">
        <button
          id="dateSelector_close"
          onClick={() => {
            const panel = document.getElementById('dateSelectorPanel');
            if (panel) {
              panel.classList.remove('show');
            }
          }}
        >
          ×
        </button>

        <h3 className="panel-title">Réservez votre suite</h3>

        <form onSubmit={handleSubmit}>
          <div className="date-input-group">
            <label htmlFor="arrival">Date d'arrivée</label>
            <input
              type="date"
              id="arrival"
              min={today}
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              required
            />
          </div>

          <div className="date-input-group">
            <label htmlFor="departure">Date de départ</label>
            <input
              type="date"
              id="departure"
              min={arrivalDate || today}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={!arrivalDate || !departureDate}
          >
            Voir les tarifs
          </button>
        </form>
      </div>
    </>
  );
}
