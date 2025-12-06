'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function BestPriceWidget() {
  useEffect(() => {
    // Attendre que jQuery soit chargé
    const initWidget = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery) {
        const jQuery = (window as any).jQuery;

        // Configuration du widget
        (window as any).reservitHotelId = '254654';
        (window as any).reservitCustdId = '2';
        (window as any).paramsWidget = {
          'fromdate': '',
          'nbOccupancy': 2,
          'bDisplayBestPrice': true,
          'langcode': 'FR',
          'divContainerWidth': '250px',
          'partid': '',
          'bDisplayDistrib': false,
          'partidDistrib': 'd',
          'partidDistrib01': '',
          'partidDistrib02': '',
          'langunavail_FR': '',
          'showDistribEqual': 'false',
          'version': '2',
          'bookingUrl': window.location.origin + '/reservation'
        };

        // Fonctions core
        (window as any).buildWidgetUrl = function() {
          const paramsWidget = (window as any).paramsWidget;
          let urlToCall = 'https://secure.reservit.com/front254654/front.do?m=widget&mode=init&custid=2&hotelid=254654';
          for (const key in paramsWidget) {
            urlToCall += '&' + key + '=' + paramsWidget[key];
          }
          if (typeof (window as any)._gaq != 'undefined' && typeof (window as any)._gat != 'undefined') {
            const pageTracker = (window as any)._gat._getTrackerByName();
            const linkerUrl = pageTracker._getLinkerUrl(urlToCall);
            urlToCall = linkerUrl;
          }
          return urlToCall;
        };

        (window as any).getWidgetInIframe = function(iframeReservitBestPriceWidget: string) {
          const iframe = document.getElementById(iframeReservitBestPriceWidget) as HTMLIFrameElement;
          if (iframe) {
            iframe.src = (window as any).buildWidgetUrl();
          }
        };

        // Initialisation
        setTimeout(function() {
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            jQuery('#rsvit_btn').show('swing');
          } else {
            jQuery('#ReservitBestPriceWidget').show('swing');
            setTimeout(function() {
              jQuery("#rsvit_btn").trigger("click");
            }, 1000);
          }
        }, 2000);

        jQuery(function() {
          (window as any).getWidgetInIframe('iframeReservitBestPriceWidget');
          jQuery('#box_btn').click(function() {
            jQuery('#rsvit_btn').show('swing');
            jQuery('#ReservitBestPriceWidget').hide('swing');
          });
          jQuery('#rsvit_btn').click(function() {
            jQuery('#rsvit_btn').hide('swing');
            jQuery('#ReservitBestPriceWidget').show('swing');
          });
        });
      }
    };

    // Vérifier périodiquement si jQuery est chargé
    const checkJQuery = setInterval(() => {
      if ((window as any).jQuery) {
        clearInterval(checkJQuery);
        initWidget();
      }
    }, 100);

    return () => clearInterval(checkJQuery);
  }, []);

  return (
    <>
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        id="rsvit_fontawsome-css"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css?ver=4.8.1"
        type="text/css"
        media="all"
      />

      {/* jQuery */}
      <Script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        strategy="afterInteractive"
      />

      {/* CSS du widget */}
      <style jsx global>{`
        #rsvit_btn {
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
          display: none;
          transition: background-color 0.3s ease;
        }
        #rsvit_btn:hover {
          background-color: #3B322C;
        }
        #iframeReservitBestPriceWidget {
          margin: auto;
          border: none;
          max-width: initial;
          text-align: center;
          width: 100%;
          height: 100%;
          padding-top: 5px;
        }
        #btn_bed_ico {
          font-size: 1.3em;
          border: 2px solid;
          border-radius: 3px;
          padding: 2px 3px 2px 3px;
          margin-right: 5px;
        }
        #rsvit_btn > span {
          font-weight: normal;
        }
        #ReservitBestPriceWidgetbox {
          border: 0;
          position: relative;
          z-index: 999998;
          background-color: transparent;
          text-align: center;
          overflow: hidden;
          width: 250px;
          height: 100%;
        }
        #ReservitBestPriceWidget {
          position: fixed;
          top: 50%;
          display: none;
          text-align: center;
          width: 250px;
          height: 450px;
          right: 0;
          transform: translateX(0);
          transform: translateY(-50%);
          left: initial;
          z-index: 9999;
        }
        #box_btn_close {
          font-size: 14px;
          color: black;
          transition: transform 0.5s ease;
          margin: auto;
        }
        #box_btn_close:hover {
          -webkit-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        #box_btn {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          position: absolute;
          vertical-align: middle;
          top: -5px;
          left: -5px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          padding-top: 3px;
          text-align: center;
          cursor: pointer;
          background-color: white;
          z-index: 1000000;
        }
        /* DEBUT RESPONSIVE */
        @media (max-width: 790px) {
          #rsvit_btn {
            padding: 8px 15px;
            font-size: 13px;
            top: 250px;
          }
          #ReservitBestPriceWidget {
            width: 250px;
            height: 80%;
            max-height: 500px;
          }
        }
        @media screen and (max-width: 450px) and (orientation: portrait) {
          #rsvit_btn {
            padding: 6px 12px;
            font-size: 11px;
            top: 200px;
          }
          #ReservitBestPriceWidget {
            width: 220px;
            height: 75%;
            max-height: 450px;
          }
        }
        @media screen and (max-width: 750px) and (orientation: landscape) {
          #ReservitBestPriceWidget {
            width: 240px;
            height: 85%;
            max-height: 400px;
          }
        }
        /* FIN RESPONSIVE */
      `}</style>

      {/* HTML du widget */}
      <button id="rsvit_btn" style={{ display: 'none' }}>
        <i id="btn_bed_ico" className="fa fa-bed" aria-hidden="true"></i>
        Meilleur tarif garanti
      </button>
      <div id="ReservitBestPriceWidget" style={{ display: 'none' }}>
        <div id="box_btn">
          <i id="box_btn_close" className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div id="ReservitBestPriceWidgetbox">
          <iframe id="iframeReservitBestPriceWidget"></iframe>
        </div>
      </div>
    </>
  );
}
