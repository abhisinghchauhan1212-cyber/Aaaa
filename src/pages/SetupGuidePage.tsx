import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Server, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/initialData';

export const SetupGuidePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
          {t('प्रशासक गाइड (Hindi Guide)', 'Deployment & Domain Setup Guide')}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
          {t('वेबसाइट चलाने, डोमेन जोड़ने व मोबाइल ऐप (PWA/APK) की पूरी प्रक्रिया', 'Website Deployment, Custom Domain & Mobile App Guide')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t(
            'Abhishek Chauhan जी के लिए Health UK07 को कम खर्च में लाइव करने और फोन पर चलाने की संपूर्ण हिंदी गाइड।',
            'Step-by-step guide in Hindi to publish the website, attach a custom domain, and install as an Android app.'
          )}
        </p>
      </div>

      {/* Guide Cards */}
      <div className="space-y-6">
        
        {/* Step 1: Website Running & Publishing */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-teal-700">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              वेबसाइट को लाइव (Publish) कैसे करें? (Zero / Minimal Cost)
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed pl-13">
            <p>
              यह वेबसाइट एक आधुनिक React & Tailwind एप्लिकेशन है। इसे आप इंटरनेट पर पूरी दुनिया के लिए <strong>निःशुल्क (Free)</strong> या बहुत कम खर्च में होस्ट कर सकते हैं:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>
                <strong>Vercel (अनुशंसित - सबसे आसान):</strong> Vercel.com पर जाकर GitHub से एक क्लिक में जोड़ें। यह बिल्कुल फ्री है और SSL (https) अपने आप मिलता है।
              </li>
              <li>
                <strong>Google Cloud Run:</strong> Google Cloud पर कंटेनर बनाकर भी यह तुरंत लाइव हो जाती है।
              </li>
              <li>
                <strong>Netlify / Cloudflare Pages:</strong> यह भी निःशुल्क वैश्विक CDN और तेज़ स्पीड प्रदान करता है।
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2: Custom Domain Mapping */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-teal-700">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              अपना खुद का डोमेन (उदा. www.healthuk07.com) कैसे जोड़ें?
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed pl-13">
            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
              <li>
                <strong>डोमेन खरीदें:</strong> GoDaddy, Hostinger या Namecheap से अपना पसंदीदा डोमेन जैसे <code>healthuk07.com</code> या <code>healthuk07.in</code> खरीदें (लगभग ₹499 - ₹899 प्रति वर्ष)।
              </li>
              <li>
                <strong>Vercel / Hosting में डोमेन जोड़ें:</strong> अपनी होस्टिंग के Settings → Domains में जाकर अपना डोमेन नाम दर्ज करें।
              </li>
              <li>
                <strong>DNS रिकॉर्ड सेट करें:</strong> GoDaddy/Hostinger के DNS मैनेजमेंट में जाएँ और:
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-xs my-1.5 space-y-1">
                  <p>Type: <strong>A</strong> | Name: <strong>@</strong> | Value: <strong>76.76.21.21</strong></p>
                  <p>Type: <strong>CNAME</strong> | Name: <strong>www</strong> | Value: <strong>cname.vercel-dns.com</strong></p>
                </div>
              </li>
              <li>
                15 से 30 मिनट के भीतर आपकी वेबसाइट आपके डोमेन पर लाइव हो जाएगी!
              </li>
            </ol>
          </div>
        </div>

        {/* Step 3: Mobile PWA / APK Conversion */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-teal-700">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              मोबाइल में ऐप (App) की तरह कैसे चलाएँ और APK कैसे बनाएँ?
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed pl-13">
            <p>
              यह वेबसाइट <strong>100% मोबाइल-फ्रेंडली PWA (Progressive Web App)</strong> तैयार की गई है:
            </p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <span className="font-bold text-teal-950 block mb-1">तरीका 1: मोबाइल होमस्क्रीन पर 'Add to Home Screen' (तत्काल)</span>
                <p className="text-xs text-slate-700">
                  जब कोई मरीज या आप अपने एंड्रॉइड फोन (Chrome) में वेबसाइट खोलेंगे, तो ऊपर 3 डॉट्स पर क्लिक करके <strong>"Install App" या "Add to Home Screen"</strong> दबाएँ। Health UK07 का लोगो आपके फोन के होम स्क्रीन पर असली ऐप की तरह आ जाएगा!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">तरीका 2: Google Play Store हेतु APK बनाना (PWABuilder)</span>
                <p className="text-xs text-slate-700">
                  वेबसाइट लाइव होने के बाद <strong>PWABuilder.com</strong> पर अपनी वेबसाइट का लिंक डालें। यह एक क्लिक में Google Play Store के लिए तैयार <code>.apk</code> और <code>.aab</code> फाइल जेनरेट कर देता है जिसे आप सीधे प्ले स्टोर पर पब्लिश कर सकते हैं।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: WhatsApp Integration */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-3 text-teal-700">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              WhatsApp बुकिंग और डेटाबेस बैकअप
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-2.5 leading-relaxed pl-13">
            <p>
              सिस्टम में आपका WhatsApp नंबर <strong>7906131879 (Abhishek Chauhan)</strong> पहले से पूरी तरह इंटीग्रेटेड है। मरीज जब भी कोई बुकिंग सबमिट करता है, "WhatsApp पर भेजें" बटन से मरीज का नाम, पता, फोन नंबर और बुकिंग आईडी तुरंत आपके WhatsApp पर पहुँच जाती है।
            </p>
            <p>
              साथ ही, सभी बुकिंग और पूछताछ आपके <strong>एडमिन पैनल</strong> में सुरक्षित रहती हैं जिसे आप फोन या कंप्यूटर से कभी भी मैनेज कर सकते हैं।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
