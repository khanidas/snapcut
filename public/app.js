const translations = {
    en: {
        // Nav
        navYt: "🎬 YouTube Cutter",
        navTk: "📱 TikTok Saver",
        navGuide: "💡 How To",
        navFaq: "❓ FAQ",

        // Main Card
        qualityLabel: "Video Quality",
        opt720: "⚡ 720p HD (Fast & Recommended)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (Small Size)",
        subtitle: "Cut and download media from YouTube & TikTok in seconds.",
        urlLabel: "Media Link (YouTube, TikTok)",
        tiktokModeLabel: "Download Option",
        tkFull: "Full Video",
        tkCut: "Cut Section",
        startLabel: "Start Time",
        endLabel: "End Time",
        submitBtnDefault: "Start Process",
        submitBtnYoutube: "Cut & Download",
        submitBtnTiktok: "Download TikTok",
        submitBtnSpotify: "Download MP3",
        playBtn: "▶ Play",
        pauseBtn: "⏸ Pause",
        setStartBtn: "⏱️ Set as Start",
        setEndBtn: "⏱️ Set as End",
        badgeYoutube: "YouTube Detected (Cut)",
        badgeTiktok: "TikTok Detected (No Watermark)",
        badgeSpotify: "Spotify Detected (MP3)",
        success: "Success! Your file is downloading...",
        errorGeneral: "An error occurred.",
        processDurationHint: "⏱️ Video cutting and downloading process may take about 15 seconds.",
        processingNotice: "⏳ Processing video... This may take about 15 seconds. Please do not close the page.",

        // Main Index Guide
        guideTitle: "⚡ How to Cut Videos & Download Media with SnapCut",
        guideSubtitle: "Follow these 3 simple steps to trim any YouTube video or download watermark-free TikTok clips in seconds:",
        step1Title: "1. Paste Video URL",
        step1Desc: "Copy your YouTube or TikTok link and paste it into the search box above. SnapCut will instantly load and preview the video.",
        step2Title: "2. Select Time & Quality",
        step2Desc: "Pick exact start and end times with our interactive timeline slider. Choose your preferred quality: 1080p Full HD, 720p HD, or 480p.",
        step3Title: "3. Instant Download",
        step3Desc: "Click 'Start Process'. Our lightning-fast cloud renderer slices the clip and delivers your clean MP4 file immediately without watermarks.",

        // Cross Promo
        promoYtTitle: "🎬 Dedicated YouTube Video Cutter",
        promoYtDesc: "Need precise millisecond trimming for YouTube podcasts, music, and highlights? Use our specialized tool.",
        promoYtBtn: "Open YouTube Cutter →",
        promoTkTitle: "📱 TikTok Video Downloader (No Watermark)",
        promoTkDesc: "Save viral TikTok videos in original HD quality without logo or creator usernames with one single click.",
        promoTkBtn: "Open TikTok Downloader →",

        // Why Choose
        whyTitle: "🚀 Why Choose SnapCut Over Traditional Software?",
        whyDesc: "SnapCut is built for content creators, TikTokers, YouTubers, meme editors, and casual users who value time. You no longer need heavy editing software like Premiere Pro, CapCut, or desktop tools just to cut a 15-second snippet from an hour-long podcast.",
        feat1Title: "✂️ Millisecond Precision",
        feat1Desc: "Set exact timestamps down to the second. Download the best moments without wasting bandwidth on full videos.",
        feat2Title: "🎯 100% Watermark-Free",
        feat2Desc: "We never inject ads, logos, or intrusive watermarks into your rendered clips. Clean, professional MP4 output.",
        feat3Title: "⚡ Cloud-Based Speed",
        feat3Desc: "Heavy rendering is handled on our ultra-fast cloud servers. It won't overheat your phone or slow down your PC.",

        // FAQ
        faqTitle: "❓ Frequently Asked Questions (FAQ)",
        faq1Q: "How do I cut a YouTube video online with SnapCut?",
        faq1A: "Copy the YouTube video URL, paste it into SnapCut, choose your start and end times using the timeline slider or input boxes, pick your resolution (1080p, 720p), and click 'Start Process'. Your trimmed MP4 will download automatically in seconds.",
        faq2Q: "Does SnapCut remove TikTok watermarks?",
        faq2A: "Yes! SnapCut automatically removes watermarks and usernames from TikTok videos, saving original HD MP4 videos directly to your mobile phone or computer.",
        faq3Q: "Is SnapCut free and safe to use?",
        faq3A: "SnapCut is 100% free with no hidden subscriptions, credit cards, or accounts required. We respect user privacy: files are temporarily processed and purged automatically.",
        faq4Q: "Can I use SnapCut on iPhone and Android?",
        faq4A: "Yes, SnapCut is completely responsive and optimized for Safari on iOS (iPhone/iPad), Chrome on Android, and all major desktop browsers (Chrome, Edge, Firefox, Brave).",

        // Subpage: YouTube Cutter
        ytPageTitle: "YouTube Video <span class=\"gradient-text\">Cutter</span>",
        ytPageSubtitle: "Paste any YouTube URL, set start and end timestamps, and download your trimmed clip instantly in 1080p Full HD.",
        ytBreadcrumbHome: "Home",
        ytBreadcrumbCurrent: "YouTube Video Cutter",
        ytGuideTitle: "✂️ How to Cut YouTube Videos Online Step-by-Step",
        ytStep1Title: "1. Copy YouTube Link",
        ytStep1Desc: "Find any video, podcast, or song on YouTube and copy its share link or browser address.",
        ytStep2Title: "2. Set Start & End Timestamps",
        ytStep2Desc: "Use the built-in video player or interactive timeline slider to set exact cutting points.",
        ytStep3Title: "3. Save 1080p MP4",
        ytStep3Desc: "Click 'Trim & Download MP4'. The cut video will download automatically with high audio & video quality.",
        ytPromoTkTitle: "📱 Want to Download TikTok Videos Without Watermark?",
        ytPromoTkDesc: "Save high-definition TikTok videos without watermark or cut highlights with our TikTok tool.",
        ytPromoTkBtn: "Try TikTok Downloader →",
        ytFaqTitle: "❓ YouTube Video Cutter FAQ",
        ytFaq1Q: "How do I trim YouTube video clips on iPhone or Android?",
        ytFaq1A: "Open Safari or Chrome on your mobile phone, navigate to snapcut.tech/youtube-cutter, paste the YouTube video link, select start and end timestamps, and download the MP4 straight to your phone's gallery or files.",
        ytFaq2Q: "What video quality can I download?",
        ytFaq2A: "SnapCut offers 1080p Full HD, 720p HD, 480p SD, and 360p lightweight video options, ensuring high quality audio and video sync.",
        ytFaq3Q: "Are there any limitations or file size caps?",
        ytFaq3A: "No! SnapCut is free for everyone. You can cut clips from short videos or multi-hour livestreams and podcasts without paying anything.",

        // Subpage: TikTok Downloader
        tkPageTitle: "TikTok Video <span class=\"gradient-text\">Downloader</span> (No Watermark)",
        tkPageSubtitle: "Save high-definition TikTok MP4 videos without watermark or logos directly to your device.",
        tkBreadcrumbHome: "Home",
        tkBreadcrumbCurrent: "TikTok Video Downloader",
        tkGuideTitle: "📱 How to Download TikTok Videos Without Watermark",
        tkStep1Title: "1. Copy TikTok Link",
        tkStep1Desc: "Open TikTok, tap Share on any video, and choose 'Copy Link'.",
        tkStep2Title: "2. Choose Download Mode",
        tkStep2Desc: "Select 'Full Video' for the complete clip or 'Cut Section' to trim a specific part.",
        tkStep3Title: "3. Download Clean MP4",
        tkStep3Desc: "Click 'Download TikTok' and save original HD video without any logos or watermarks.",
        tkPromoYtTitle: "🎬 Need to Trim YouTube Videos?",
        tkPromoYtDesc: "Cut and trim YouTube videos with millisecond precision using our specialized YouTube cutter.",
        tkPromoYtBtn: "Try YouTube Cutter →",
        tkFaqTitle: "❓ TikTok Video Downloader FAQ",
        tkFaq1Q: "How do I save TikTok videos on iPhone (iOS)?",
        tkFaq1A: "Open Safari, visit snapcut.tech/tiktok-downloader, paste the copied TikTok URL and tap Download. Safari will prompt you to download the file directly into your Files or Camera Roll.",
        tkFaq2Q: "Do I need to install any app or browser extension?",
        tkFaq2A: "No! SnapCut is 100% web-based. You don't need any third-party apps, APKs, or browser extensions. It works entirely in your web browser.",
        tkFaq3Q: "Can I download private TikTok videos?",
        tkFaq3A: "No, SnapCut only downloads publicly accessible TikTok videos to protect privacy and adhere to platform terms.",

        // Footer
        footerDesc: "The fastest free online YouTube video cutter and TikTok watermark-free downloader. Cut, trim and save HD media anywhere.",
        footerTools: "Online Tools",
        footerFeatures: "Popular Features",
        footerSitemap: "Sitemap & Info",
        footerRights: "© 2026 SnapCut.tech — All rights reserved. Fast & Free Online Media Downloader & Video Cutter."
    },
    tr: {
        // Nav
        navYt: "🎬 YouTube Kesici",
        navTk: "📱 TikTok İndirici",
        navGuide: "💡 Rehber",
        navFaq: "❓ SSS",

        // Main Card
        qualityLabel: "Video Çözünürlüğü",
        opt720: "⚡ 720p HD (En Hızlı & Önerilen)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (Düşük Boyut)",
        subtitle: "YouTube ve TikTok medyalarını saniyeler içinde kesin ve indirin.",
        urlLabel: "Medya Linki (YouTube, TikTok)",
        tiktokModeLabel: "İndirme Seçeneği",
        tkFull: "Tamamı",
        tkCut: "Kesit Al",
        startLabel: "Başlangıç",
        endLabel: "Bitiş",
        submitBtnDefault: "İşlemi Başlat",
        submitBtnYoutube: "Videoyu Kes & İndir",
        submitBtnTiktok: "Videoyu İndir",
        submitBtnSpotify: "Müziği İndir",
        playBtn: "▶ Başlat",
        pauseBtn: "⏸ Durdur",
        setStartBtn: "⏱️ Süreyi 'Başlangıç' Yap",
        setEndBtn: "⏱️ Süreyi 'Bitiş' Yap",
        badgeYoutube: "YouTube Algılandı (Kesit Alınacak)",
        badgeTiktok: "TikTok Algılandı (Filigransız İndirilecek)",
        badgeSpotify: "Spotify Algılandı (MP3 Olarak İndirilecek)",
        success: "İşlem başarılı! Dosyanız iniyor...",
        errorGeneral: "Bir hata oluştu.",
        processDurationHint: "⏱️ Video kesme ve indirme işlemi yaklaşık 15 saniye sürebilir.",
        processingNotice: "⏳ Video işleniyor... Bu işlem yaklaşık 15 saniye sürebilir. Lütfen sayfayı kapatmayın.",

        // Main Index Guide
        guideTitle: "⚡ SnapCut ile Video Kesme ve İndirme Rehberi",
        guideSubtitle: "YouTube videolarını kırpmak veya TikTok videolarını filigransız indirmek için 3 basit adım:",
        step1Title: "1. Video Linkini Yapıştırın",
        step1Desc: "YouTube veya TikTok video bağlantısını kopyalayıp yukarıdaki kutucuğa yapıştırın. SnapCut videoyu anında algılar.",
        step2Title: "2. Süre ve Kaliteyi Belirleyin",
        step2Desc: "Başlangıç ve bitiş saniyelerini ayarlayın. 1080p Full HD, 720p HD veya 480p kalitesini seçin.",
        step3Title: "3. Anında İndirin",
        step3Desc: "'İşlemi Başlat' butonuna tıklayın. Bulut sunucumuz videoyu saniyeler içinde kesip filigransız MP4 olarak indirir.",

        // Cross Promo
        promoYtTitle: "🎬 Özel YouTube Video Kesici",
        promoYtDesc: "YouTube videolarında saniye ve milisaniye hassasiyetiyle kesit almak için özel aracımızı kullanın.",
        promoYtBtn: "YouTube Kesiciyi Aç →",
        promoTkTitle: "📱 TikTok Filigransız Video İndirici",
        promoTkDesc: "TikTok videolarını logo veya kullanıcı adı olmadan orijinal HD kalitede tek tıkla indirin.",
        promoTkBtn: "TikTok İndiriciyi Aç →",

        // Why Choose
        whyTitle: "🚀 Neden SnapCut Kullanmalısınız?",
        whyDesc: "SnapCut; içerik üreticileri, editörler ve zamandan tasarruf etmek isteyenler için tasarlandı. 15 saniyelik bir kesit için Premiere Pro, CapCut veya saatlerce dosya indirme zahmetine katlanmanıza gerek yok.",
        feat1Title: "✂️ Saniye Hassasiyetinde Kesim",
        feat1Desc: "Videonun tam istediğiniz kısmını kesin, gereksiz GB'larca video indirmekle uğraşmayın.",
        feat2Title: "🎯 %100 Filigransız & Temiz",
        feat2Desc: "İndirilen videolara asla reklam, logo veya filigran eklenmez. Orijinal kalitede MP4 çıktısı alırsınız.",
        feat3Title: "⚡ Bulut Tabanlı Yüksek Hız",
        feat3Desc: "Video işleme tamamen güçlü sunucularımızda yapılır; telefonunuz ısınmaz, bilgisayarınız kasmaz.",

        // FAQ
        faqTitle: "❓ Sıkça Sorulan Sorular (SSS)",
        faq1Q: "SnapCut ile YouTube videosu nasıl kesilir?",
        faq1A: "YouTube video bağlantısını kopyalayıp SnapCut'a yapıştırın, kesmek istediğiniz başlangıç ve bitiş sürelerini belirleyin, çözünürlüğü seçip 'İşlemi Başlat'a tıklayın. Kırpılmış MP4 videonuz saniyeler içinde otomatik olarak cihazınıza inecektir.",
        faq2Q: "TikTok videoları filigransız (yazısız) indirilir mi?",
        faq2A: "Evet! SnapCut TikTok videolarındaki kullanıcı adlarını ve hareketli logoları otomatik olarak temizler. Videonun tamamını indirebilir veya sadece istediğiniz bölümü keserek kaydedebilirsiniz.",
        faq3Q: "SnapCut ücretsiz ve güvenli mi?",
        faq3A: "Evet, SnapCut %100 ücretsizdir. Kayıt olma, kredi kartı veya abonelik gerekmez. Kullanıcı gizliliğine önem verilir; işlenen geçici dosyalar sunucudan otomatik olarak silinir.",
        faq4Q: "iPhone ve Android telefonlarda çalışır mı?",
        faq4A: "Evet, SnapCut tüm mobil cihazlarla tam uyumludur. iPhone'da Safari, Android'de Chrome ile doğrudan tarayıcınızdan program yüklemeden kullanabilirsiniz.",

        // Subpage: YouTube Cutter
        ytPageTitle: "YouTube Video <span class=\"gradient-text\">Kesici</span>",
        ytPageSubtitle: "Herhangi bir YouTube linkini yapıştırın, başlangıç ve bitiş sürelerini seçin ve 1080p Full HD olarak hemen indirin.",
        ytBreadcrumbHome: "Ana Sayfa",
        ytBreadcrumbCurrent: "YouTube Video Kesici",
        ytGuideTitle: "✂️ YouTube Videosu Nasıl Kesilir? Adım Adım Rehber",
        ytStep1Title: "1. YouTube Linkini Kopyalayın",
        ytStep1Desc: "YouTube'da istediğiniz videoyu, podcast'i veya şarkıyı açıp bağlantısını kopyalayın.",
        ytStep2Title: "2. Başlangıç ve Bitiş Sürelerini Ayarlayın",
        ytStep2Desc: "Gömülü video oynatıcıyı veya zaman çizelgesi kaydırıcısını kullanarak tam kesim noktalarını belirleyin.",
        ytStep3Title: "3. 1080p MP4 Olarak İndirin",
        ytStep3Desc: "'Videoyu Kes & İndir' butonuna tıklayın. Kırpılan video yüksek kalitede otomatik olarak cihazınıza indirilecektir.",
        ytPromoTkTitle: "📱 TikTok Videolarını Filigransız İndirmek İster misiniz?",
        ytPromoTkDesc: "TikTok aracımızla filigransız ve orijinal HD kalitede TikTok videoları indirin veya kesin.",
        ytPromoTkBtn: "TikTok İndiriciyi Dene →",
        ytFaqTitle: "❓ YouTube Video Kesici SSS",
        ytFaq1Q: "Telefonda (iPhone veya Android) YouTube videosu kesebilir miyim?",
        ytFaq1A: "Evet! iPhone'da Safari veya Android'de Chrome ile snapcut.tech/youtube-cutter adresini açın, linki yapıştırıp süreleri seçin ve MP4 videoyu doğrudan galerinize indirin.",
        ytFaq2Q: "Hangi video kalitelerinde indirebilirim?",
        ytFaq2A: "SnapCut; 1080p Full HD, 720p HD, 480p SD ve 360p seçenekleri sunar; ses ve görüntü senkronizasyonu bozulmaz.",
        ytFaq3Q: "Herhangi bir süre veya dosya boyutu sınırı var mı?",
        ytFaq3A: "Hayır! SnapCut herkes için tamamen ücretsizdir. Kısa videolardan veya saatler süren yayınlardan dilediğiniz kesitleri alabilirsiniz.",

        // Subpage: TikTok Downloader
        tkPageTitle: "TikTok Filigransız Video <span class=\"gradient-text\">İndirici</span>",
        tkPageSubtitle: "TikTok videolarını logo veya filigran olmadan orijinal HD kalitede doğrudan cihazınıza indirin.",
        tkBreadcrumbHome: "Ana Sayfa",
        tkBreadcrumbCurrent: "TikTok Video İndirici",
        tkGuideTitle: "📱 TikTok Videosu Filigransız Nasıl İndirilir?",
        tkStep1Title: "1. TikTok Linkini Kopyalayın",
        tkStep1Desc: "TikTok uygulamasını açın, istediğiniz videoda 'Paylaş'a basıp 'Bağlantıyı Kopyala' seçeneğini seçin.",
        tkStep2Title: "2. İndirme Modunu Seçin",
        tkStep2Desc: "Videonun tamamı için 'Tamamı'nı, belirli bir bölümü almak için 'Kesit Al'ı seçin.",
        tkStep3Title: "3. Filigransız MP4 İndirin",
        tkStep3Desc: "'Videoyu İndir' butonuna tıklayın ve filigransız orijinal videoyu anında kaydedin.",
        tkPromoYtTitle: "🎬 YouTube Videolarını Kırpmak mı İstiyorsunuz?",
        tkPromoYtDesc: "Özel YouTube kesicimizle YouTube videolarından saniyeler içinde klip alın.",
        tkPromoYtBtn: "YouTube Kesiciyi Dene →",
        tkFaqTitle: "❓ TikTok Video İndirici SSS",
        tkFaq1Q: "iPhone'a (iOS) filigransız TikTok videosu nasıl indirilir?",
        tkFaq1A: "Safari tarayıcısını açıp linki yapıştırın ve İndir'e basın. Safari videoyu doğrudan Dosyalar veya Galerinize kaydetmenizi sağlar.",
        tkFaq2Q: "Herhangi bir uygulama veya eklenti yüklemem gerekiyor mu?",
        tkFaq2A: "Hayır! SnapCut %100 web tabanlıdır. Hiçbir harici program, APK veya eklenti kurmanıza gerek yoktur.",
        tkFaq3Q: "Gizli hesapların TikTok videoları indirilebilir mi?",
        tkFaq3A: "Hayır, gizlilik politikaları gereğince yalnızca herkese açık TikTok videoları indirilebilir.",

        // Footer
        footerDesc: "En hızlı ücretsiz çevrim içi YouTube video kesici ve TikTok filigransız indirici. HD medyaları dilediğiniz yerde kesin ve kaydedin.",
        footerTools: "Çevrim İçi Araçlar",
        footerFeatures: "Popüler Özellikler",
        footerSitemap: "Site Haritası & Bilgi",
        footerRights: "© 2026 SnapCut.tech — Tüm hakları saklıdır. Hızlı & Ücretsiz Çevrim İçi Medya Kesici ve İndirici."
    },
    es: {
        qualityLabel: "Calidad de video",
        opt720: "⚡ 720p HD (Rápido y recomendado)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (Tamaño reducido)",
        subtitle: "Corta y descarga medios de YouTube y Spotify en segundos.",
        urlLabel: "Enlace (YouTube, TikTok)",
        tiktokModeLabel: "Opción de descarga",
        tkFull: "Video completo",
        tkCut: "Cortar sección",
        startLabel: "Inicio",
        endLabel: "Fin",
        submitBtnDefault: "Iniciar",
        submitBtnYoutube: "Cortar y Descargar",
        submitBtnTiktok: "Descargar TikTok",
        submitBtnSpotify: "Descargar MP3",
        playBtn: "▶ Reproducir",
        pauseBtn: "⏸ Pausa",
        setStartBtn: "⏱️ Establecer Inicio",
        setEndBtn: "⏱️ Establecer Fin",
        badgeYoutube: "YouTube Detectado",
        badgeTiktok: "TikTok Detectado",
        badgeSpotify: "Spotify Detectado",
        success: "¡Éxito! Tu archivo se está descargando...",
        errorGeneral: "Ocurrió un error."
    },
    fr: {
        qualityLabel: "Qualité vidéo",
        opt720: "⚡ 720p HD (Rapide et recommandé)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (Taille réduite)",
        subtitle: "Coupez et téléchargez des médias depuis YouTube et TikTok en quelques secondes.",
        urlLabel: "Lien média (YouTube, TikTok)",
        tiktokModeLabel: "Option de téléchargement",
        tkFull: "Vidéo complète",
        tkCut: "Couper la section",
        startLabel: "Début",
        endLabel: "Fin",
        submitBtnDefault: "Démarrer",
        submitBtnYoutube: "Couper et Télécharger",
        submitBtnTiktok: "Télécharger TikTok",
        submitBtnSpotify: "Télécharger MP3",
        playBtn: "▶ Lecture",
        pauseBtn: "⏸ Pause",
        setStartBtn: "⏱️ Définir Début",
        setEndBtn: "⏱️ Définir Fin",
        badgeYoutube: "YouTube Détecté",
        badgeTiktok: "TikTok Détecté",
        badgeSpotify: "Spotify Détecté",
        success: "Succès! Votre fichier est en cours de téléchargement...",
        errorGeneral: "Une erreur est survenue."
    },
    de: {
        qualityLabel: "Videoqualität",
        opt720: "⚡ 720p HD (Schnell & empfohlen)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (Kompakt)",
        subtitle: "Schneiden und laden Sie Medien von YouTube und TikTok in Sekunden herunter.",
        urlLabel: "Medien-Link (YouTube, TikTok)",
        tiktokModeLabel: "Download-Option",
        tkFull: "Ganzes Video",
        tkCut: "Abschnitt schneiden",
        startLabel: "Startzeit",
        endLabel: "Endzeit",
        submitBtnDefault: "Starten",
        submitBtnYoutube: "Schneiden & Herunterladen",
        submitBtnTiktok: "TikTok Herunterladen",
        submitBtnSpotify: "MP3 Herunterladen",
        playBtn: "▶ Abspielen",
        pauseBtn: "⏸ Pause",
        setStartBtn: "⏱️ Als Start setzen",
        setEndBtn: "⏱️ Als Ende setzen",
        badgeYoutube: "YouTube Erkannt",
        badgeTiktok: "TikTok Erkannt",
        badgeSpotify: "Spotify Erkannt",
        success: "Erfolg! Ihre Datei wird heruntergeladen...",
        errorGeneral: "Ein Fehler ist aufgetreten."
    },
    ar: {
        qualityLabel: "جودة الفيديو",
        opt720: "⚡ 720p HD (سريع وموصى به)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (حجم صغير)",
        subtitle: "قص وتنزيل الوسائط من YouTube و TikTok و Spotify في ثوانٍ.",
        urlLabel: "رابط الوسائط",
        tiktokModeLabel: "خيار التنزيل",
        tkFull: "فيديو كامل",
        tkCut: "قطع قسم",
        startLabel: "البداية",
        endLabel: "النهاية",
        submitBtnDefault: "بدء العملية",
        submitBtnYoutube: "قص وتنزيل",
        submitBtnTiktok: "تنزيل TikTok",
        submitBtnSpotify: "تنزيل MP3",
        playBtn: "▶ تشغيل",
        pauseBtn: "⏸ إيقاف مؤقت",
        setStartBtn: "⏱️ تعيين كبداية",
        setEndBtn: "⏱️ تعيين كنهاية",
        badgeYoutube: "تم اكتشاف YouTube",
        badgeTiktok: "تم اكتشاف TikTok",
        badgeSpotify: "تم اكتشاف Spotify",
        success: "نجاح! جاري تنزيل ملفك...",
        errorGeneral: "حدث خطأ."
    },
    hi: {
        qualityLabel: "वीडियो गुणवत्ता",
        opt720: "⚡ 720p HD (तेज़ और अनुशंसित)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (छोटा आकार)",
        subtitle: "सेकंड में YouTube, TikTok और Spotify से मीडिया काटें और डाउनलोड करें।",
        urlLabel: "मीडिया लिंक",
        tiktokModeLabel: "डाउनलोड विकल्प",
        tkFull: "पूरा वीडियो",
        tkCut: "अनुभाग काटें",
        startLabel: "प्रारंभ समय",
        endLabel: "समाप्ति समय",
        submitBtnDefault: "प्रारंभ करें",
        submitBtnYoutube: "काटें और डाउनलोड करें",
        submitBtnTiktok: "TikTok डाउनलोड करें",
        submitBtnSpotify: "MP3 डाउनलोड करें",
        playBtn: "▶ चलाएं",
        pauseBtn: "⏸ रोकें",
        setStartBtn: "⏱️ प्रारंभ के रूप में सेट करें",
        setEndBtn: "⏱️ अंत के रूप में सेट करें",
        badgeYoutube: "YouTube मिला",
        badgeTiktok: "TikTok मिला",
        badgeSpotify: "Spotify मिला",
        success: "सफलता! आपकी फ़ाइल डाउनलोड हो रही है...",
        errorGeneral: "एक त्रुटि हुई।"
    },
    zh: {
        qualityLabel: "视频清晰度",
        opt720: "⚡ 720p HD (最快且推荐)",
        opt1080: "🎬 1080p Full HD",
        opt480: "📱 480p SD",
        opt360: "💾 360p (小文件)",
        subtitle: "在几秒钟内剪切并下载YouTube，TikTok和Spotify媒体。",
        urlLabel: "媒体链接",
        tiktokModeLabel: "下载选项",
        tkFull: "完整视频",
        tkCut: "剪切部分",
        startLabel: "开始时间",
        endLabel: "结束时间",
        submitBtnDefault: "开始",
        submitBtnYoutube: "剪切和下载",
        submitBtnTiktok: "下载TikTok",
        submitBtnSpotify: "下载MP3",
        playBtn: "▶ 播放",
        pauseBtn: "⏸ 暂停",
        setStartBtn: "⏱️ 设为开始",
        setEndBtn: "⏱️ 设为结束",
        badgeYoutube: "检测到YouTube",
        badgeTiktok: "检测到TikTok",
        badgeSpotify: "检测到Spotify",
        success: "成功！您的文件正在下载...",
        errorGeneral: "发生错误。"
    }
};

let currentLang = 'en';

function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    const t = translations[lang] || translations['en'];
    const tEn = translations['en'];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = (t && t[key]) || (tEn && tEn[key]);
        if (text) {
            if (text.includes('<') && text.includes('>')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    if (typeof urlInput !== 'undefined' && urlInput) {
        urlInput.dispatchEvent(new Event('input'));
    }
}

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayer = null;
let isPlayerReady = false;

function onYouTubeIframeAPIReady() {
    isPlayerReady = true;
}

const urlInput = document.getElementById('url');
const timeOptions = document.getElementById('time-options');
const platformBadge = document.getElementById('platform-badge');
const btnText = document.querySelector('.btn-text');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const playerWrapper = document.getElementById('player-wrapper');
const ytPlayerContainer = document.getElementById('player-container');
const tkPlayerContainer = document.getElementById('tk-player');
const tkIframe = document.getElementById('tk-iframe');

const mediaControls = document.getElementById('media-controls');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const timeCaptureBtns = document.getElementById('time-capture-btns');

const tiktokModeGroup = document.getElementById('tiktok-mode-group');
const qualityGroup = document.getElementById('quality-group');
const tkModeRadios = document.getElementsByName('tkMode');

function updateTikTokModeUI() {
    const selectedMode = document.querySelector('input[name="tkMode"]:checked');
    const mode = selectedMode ? selectedMode.value : 'full';
    
    // TikTok iframe engeli olduğu için playerWrapper'ı gizliyoruz
    playerWrapper.classList.add('hidden');
    tkPlayerContainer.classList.add('hidden');
    mediaControls.classList.add('hidden');
    timeCaptureBtns.classList.add('hidden');
    sliderContainer.style.display = 'none';
    tkIframe.src = "";
    
    if (mode === 'cut') {
        timeOptions.classList.remove('hidden');
        startTimeInput.required = true;
        endTimeInput.required = true;
        if (!startTimeInput.value) startTimeInput.value = '00:00';
        if (!endTimeInput.value) endTimeInput.value = '00:15';
    } else {
        timeOptions.classList.add('hidden');
        startTimeInput.required = false;
        endTimeInput.required = false;
    }
}

Array.from(tkModeRadios).forEach(radio => {
    radio.addEventListener('change', () => {
        if (currentPlatform === 'tiktok') {
            updateTikTokModeUI();
        }
    });
});

const sliderContainer = document.getElementById('slider-container');
const sliderStart = document.getElementById('slider-start');
const sliderEnd = document.getElementById('slider-end');
const rangeFill = document.getElementById('range-fill');
const labelStart = document.getElementById('label-start');
const labelEnd = document.getElementById('label-end');

let currentPlatform = 'unknown';
let videoDuration = 0;
let durationPollInterval = null;

const savedLang = localStorage.getItem('snapcut_lang');
const browserLang = (navigator.language || 'en').substring(0, 2);
const initialLang = savedLang || (translations[browserLang] ? browserLang : 'en');

const langSelectEl = document.getElementById('language-select');
if (langSelectEl) {
    langSelectEl.value = initialLang;
    langSelectEl.addEventListener('change', (e) => {
        localStorage.setItem('snapcut_lang', e.target.value);
        applyLanguage(e.target.value);
    });
}
applyLanguage(initialLang);

function getTikTokId(url) {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : null;
}

tkModeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'cut') {
            timeOptions.classList.remove('hidden');
            startTimeInput.required = true;
            endTimeInput.required = true;
            
            // Show Tiktok embed if valid ID
            const tkId = getTikTokId(urlInput.value);
            if (tkId) {
                tkIframe.src = `https://www.tiktok.com/embed/v2/${tkId}`;
                tkPlayerContainer.classList.remove('hidden');
                playerWrapper.classList.remove('hidden');
            }
        } else {
            timeOptions.classList.add('hidden');
            startTimeInput.required = false;
            endTimeInput.required = false;
            tkPlayerContainer.classList.add('hidden');
            playerWrapper.classList.add('hidden');
            tkIframe.src = "";
        }
    });
});

function getYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function timeToSeconds(timeStr) {
    if (!timeStr) return 0;
    const parts = timeStr.split(':');
    if (parts.length === 2) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else if (parts.length === 3) {
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    }
    return 0;
}

function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m}:${s}`;
    return `${m}:${s}`;
}

function initSlider(duration) {
    if (videoDuration === duration) return;
    videoDuration = duration;
    sliderStart.max = duration;
    sliderEnd.max = duration;
    sliderStart.value = 0;
    sliderEnd.value = duration;
    sliderContainer.style.display = 'block';
    updateSliderUI();
}

function updateSliderUI() {
    let startVal = parseInt(sliderStart.value);
    let endVal = parseInt(sliderEnd.value);
    
    if (startVal >= endVal) { sliderStart.value = endVal - 1; startVal = endVal - 1; }
    if (endVal <= startVal) { sliderEnd.value = startVal + 1; endVal = startVal + 1; }
    
    const startPercent = (startVal / videoDuration) * 100;
    const endPercent = (endVal / videoDuration) * 100;
    rangeFill.style.left = startPercent + '%';
    rangeFill.style.width = (endPercent - startPercent) + '%';
    
    labelStart.textContent = formatTime(startVal);
    labelEnd.textContent = formatTime(endVal);
    startTimeInput.value = formatTime(startVal);
    endTimeInput.value = formatTime(endVal);
}

sliderStart.addEventListener('input', () => {
    updateSliderUI();
    if (ytPlayer) ytPlayer.seekTo(sliderStart.value, true);
});

sliderEnd.addEventListener('input', () => {
    updateSliderUI();
    if (ytPlayer) ytPlayer.seekTo(sliderEnd.value, true);
});

startTimeInput.addEventListener('input', (e) => {
    if (currentPlatform === 'tiktok') return; // no slider sync for tiktok
    const sec = timeToSeconds(e.target.value);
    if (sec >= 0 && sec <= videoDuration) {
        sliderStart.value = sec;
        updateSliderUI();
        if (ytPlayer) ytPlayer.seekTo(sec, true);
    }
});

endTimeInput.addEventListener('input', (e) => {
    if (currentPlatform === 'tiktok') return;
    const sec = timeToSeconds(e.target.value);
    if (sec >= 0 && sec <= videoDuration) {
        sliderEnd.value = sec;
        updateSliderUI();
        if (ytPlayer) ytPlayer.seekTo(sec, true);
    }
});

function pollDuration() {
    if (ytPlayer && typeof ytPlayer.getDuration === 'function') {
        const d = ytPlayer.getDuration();
        if (d > 0) {
            initSlider(d);
            clearInterval(durationPollInterval);
        }
    }
}

// PLATFORM DETECTION
urlInput.addEventListener('input', (e) => {
    const url = e.target.value;
    const urlLower = url.toLowerCase();
    const t = translations[currentLang];
    
    tiktokModeGroup.style.display = 'none';
    platformBadge.className = 'badge hidden';
    
    // Reset all player UIs initially
    ytPlayerContainer.classList.add('hidden');
    tkPlayerContainer.classList.add('hidden');
    playerWrapper.classList.add('hidden');
    mediaControls.classList.add('hidden');
    sliderContainer.style.display = 'none';
    timeCaptureBtns.classList.add('hidden');
    tkIframe.src = "";
    
    if (urlLower.includes('tiktok.com')) {
        currentPlatform = 'tiktok';
        if (qualityGroup) qualityGroup.style.display = 'none';
        tiktokModeGroup.style.display = 'block';
        
        platformBadge.textContent = t.badgeTiktok;
        platformBadge.className = 'badge tiktok';
        btnText.textContent = t.submitBtnTiktok;
        
        updateTikTokModeUI();
    } else if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) {
        currentPlatform = 'youtube';
        if (qualityGroup) qualityGroup.style.display = 'block';
        timeOptions.classList.remove('hidden');
        
        platformBadge.textContent = t.badgeYoutube;
        platformBadge.className = 'badge youtube';
        btnText.textContent = t.submitBtnYoutube;
        
        startTimeInput.required = true;
        endTimeInput.required = true;

        const videoId = getYouTubeId(url); 
        if (videoId && isPlayerReady) {
            ytPlayerContainer.classList.remove('hidden');
            playerWrapper.classList.remove('hidden');
            mediaControls.classList.remove('hidden');
            timeCaptureBtns.classList.remove('hidden');
            
            if (ytPlayer) {
                ytPlayer.loadVideoById(videoId);
            } else {
                ytPlayer = new YT.Player('yt-player', {
                    videoId: videoId,
                    playerVars: { 'playsinline': 1, 'autoplay': 1 }
                });
            }
            if (durationPollInterval) clearInterval(durationPollInterval);
            durationPollInterval = setInterval(pollDuration, 500);
            
        }
    } else {
        currentPlatform = 'unknown';
        timeOptions.classList.remove('hidden');
        btnText.textContent = t.submitBtnDefault;
        startTimeInput.required = true;
        endTimeInput.required = true;
    }
});

document.getElementById('set-start-btn').addEventListener('click', () => {
    if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        startTimeInput.value = formatTime(ytPlayer.getCurrentTime());
        startTimeInput.dispatchEvent(new Event('input'));
    }
});

document.getElementById('set-end-btn').addEventListener('click', () => {
    if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function') {
        endTimeInput.value = formatTime(ytPlayer.getCurrentTime());
        endTimeInput.dispatchEvent(new Event('input'));
    }
});

playBtn.addEventListener('click', () => {
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') ytPlayer.playVideo();
});

pauseBtn.addEventListener('click', () => {
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
});

document.getElementById('cutter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const t = translations[currentLang];
    
    const url = urlInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    const qualityEl = document.getElementById('quality');
    const quality = qualityEl ? qualityEl.value : '1080';
    
    const btn = document.getElementById('submit-btn');
    btn.classList.add('btn-loading');
    btn.disabled = true;
    
    // İşlem başladığında 15 saniye uyarısını ve spinner'ı göster
    statusDiv.className = 'processing';
    statusDiv.textContent = t.processingNotice || (currentLang === 'tr' ? '⏳ Video işleniyor... Bu işlem yaklaşık 15 saniye sürebilir. Lütfen sayfayı kapatmayın.' : '⏳ Processing video... This may take about 15 seconds. Please do not close the page.');
    statusDiv.classList.remove('hidden');
    
    try {
        let payload;
        if (currentPlatform === 'tiktok') {
            const mode = document.querySelector('input[name="tkMode"]:checked').value;
            payload = { url, platform: 'tiktok', mode, startTime, endTime, quality };
        } else {
            payload = { url, startTime, endTime, platform: 'youtube', quality };
        }
            
        const response = await fetch('/api/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        let data = null;
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            if (response.status === 504) {
                throw new Error(currentLang === 'tr' ? 'İşlem zaman aşımına uğradı. Video uzun olabilir, lütfen daha kısa bir kesit seçin.' : 'Processing timed out. Please select a shorter segment.');
            }
            throw new Error(currentLang === 'tr' ? `Sunucu hatası (${response.status}). Lütfen tekrar deneyin.` : `Server error (${response.status}). Please try again.`);
        }
        
        if (response.ok && data) {
            const downloadFilename = data.filename || 'video.mp4';
            statusDiv.innerHTML = `
                <div style="font-weight: 600; font-size: 1.05rem; margin-bottom: 6px;">${t.success}</div>
                <div style="font-size: 0.95rem; margin-bottom: 12px; word-break: break-all; color: #4facfe;">
                    📁 <strong>${downloadFilename}</strong>
                </div>
                <a href="${data.downloadUrl}" class="direct-download-link" download="${downloadFilename}">
                    ⬇️ ${currentLang === 'tr' ? 'İndirme başlamadıysa buraya tıklayın' : 'Click here if download does not start'}
                </a>
            `;
            statusDiv.classList.add('success');
            
            if (data.downloadUrl) {
                // Yönlendirme ile indir (Tarayıcı pop-up engelleyicisini aşmak için)
                window.location.href = data.downloadUrl;
            }
        } else {
            throw new Error((data && data.error) || t.errorGeneral);
        }
    } catch (err) {
        statusDiv.textContent = err.message;
        statusDiv.classList.add('error');
    } finally {
        btn.classList.remove('btn-loading');
        btn.disabled = false;
        statusDiv.classList.remove('hidden');
    }
});

// URL Parametresi Desteği (?url=https://...)
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const prefillUrl = params.get('url') || params.get('link');
    if (prefillUrl) {
        urlInput.value = decodeURIComponent(prefillUrl);
        urlInput.dispatchEvent(new Event('input'));
    }
});

