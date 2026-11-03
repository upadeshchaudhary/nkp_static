import type { Bi } from "./i18n";

/* ---------- news sections ---------- */

export interface Category {
  id: string;
  n: Bi;
}

export const CATS: Category[] = [
  { id: "nepal", n: { en: "Nepal", ne: "नेपाल" } },
  { id: "world", n: { en: "World", ne: "विश्व" } },
  { id: "education", n: { en: "Education", ne: "शिक्षा" } },
  { id: "science", n: { en: "Science", ne: "विज्ञान" } },
  { id: "technology", n: { en: "Technology", ne: "प्रविधि" } },
  { id: "environment", n: { en: "Environment", ne: "वातावरण" } },
  { id: "sports", n: { en: "Sports", ne: "खेलकुद" } },
  { id: "explainers", n: { en: "Explainers", ne: "व्याख्या" } },
];

export const catById = (id: string) => CATS.find((c) => c.id === id);

/* ---------- articles (sample content) ---------- */

export interface Article {
  slug: string;
  cat: string;
  date: string;
  desk: Bi;
  title: Bi;
  summary: Bi;
  body: Bi[];
  sources: Bi[];
}

const NEWS_DESK: Bi = { en: "News desk", ne: "समाचार डेस्क" };
const EDU_DESK: Bi = { en: "Education desk", ne: "शिक्षा डेस्क" };
const EXPLAIN_DESK: Bi = { en: "Explainers desk", ne: "व्याख्या डेस्क" };

const RAW: Article[] = [
  {
    slug: "federal-structure",
    cat: "nepal",
    date: "2026-11-02",
    desk: EXPLAIN_DESK,
    title: { en: "How Nepal's federal system is organised", ne: "नेपालको संघीय संरचना कसरी बनेको छ" },
    summary: {
      en: "The 2015 constitution set up three levels of government. Here is what each level does and how many units there are.",
      ne: "२०७२ को संविधानले सरकारका तीन तह बनायो। हरेक तहले के गर्छ र कति एकाइ छन्, यहाँ हेर्नुहोस्।",
    },
    body: [
      {
        en: "The Constitution of Nepal, promulgated on 20 September 2015, divides state power between three levels: the federal government, seven provincial governments and 753 local governments.",
        ne: "२०७२ असोज ३ (२० सेप्टेम्बर २०१५) मा जारी नेपालको संविधानले राज्यशक्तिलाई तीन तहमा बाँडेको छ: संघीय सरकार, सात प्रदेश सरकार र ७५३ स्थानीय सरकार।",
      },
      {
        en: "Local governments are metropolitan cities, sub-metropolitan cities, municipalities and rural municipalities. They handle services close to residents, such as school education, local roads and the registration of births and deaths.",
        ne: "स्थानीय तहमा महानगरपालिका, उपमहानगरपालिका, नगरपालिका र गाउँपालिका पर्छन्। यिनले विद्यालय शिक्षा, स्थानीय सडक र जन्म तथा मृत्यु दर्ताजस्ता नागरिकका नजिकका सेवा हेर्छन्।",
      },
      {
        en: "Each province has its own assembly and government. Some powers belong to one level only, others are shared, and the constitution lists them in its schedules.",
        ne: "हरेक प्रदेशको आफ्नै सभा र सरकार छ। केही अधिकार एउटा तहको मात्र हुन्छन्, केही साझा हुन्छन्, र संविधानका अनुसूचीहरूमा तिनको सूची छ।",
      },
    ],
    sources: [
      { en: "Constitution of Nepal, 2015", ne: "नेपालको संविधान, २०७२" },
      { en: "Ministry of Federal Affairs and General Administration", ne: "संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय" },
    ],
  },
  {
    slug: "everest-height",
    cat: "science",
    date: "2026-11-01",
    desk: EXPLAIN_DESK,
    title: {
      en: "Why Mount Everest has an official height of 8,848.86 metres",
      ne: "सगरमाथाको आधिकारिक उचाइ ८,८४८.८६ मिटर किन हो",
    },
    summary: {
      en: "Nepal and China announced a joint measurement in December 2020. This is how surveyors arrived at the figure.",
      ne: "नेपाल र चीनले सन् २०२० डिसेम्बरमा संयुक्त मापन सार्वजनिक गरे। सर्वेक्षकहरू यो अङ्कमा कसरी पुगे, यहाँ छ।",
    },
    body: [
      {
        en: "On 8 December 2020, Nepal and China jointly announced the height of Mount Everest as 8,848.86 metres above sea level. The figure replaced the long-used value of 8,848 metres.",
        ne: "सन् २०२० डिसेम्बर ८ मा नेपाल र चीनले सगरमाथाको उचाइ समुद्री सतहबाट ८,८४८.८६ मिटर रहेको संयुक्त घोषणा गरे। यसले लामो समयदेखि प्रयोग हुँदै आएको ८,८४८ मिटरको अङ्कलाई प्रतिस्थापन गर्‍यो।",
      },
      {
        en: "Survey teams from both countries took measurements on the summit, Nepal's team in 2019 and China's in 2020. They used satellite positioning and gravity measurements, and ground-penetrating radar to estimate the depth of snow on top of the rock.",
        ne: "दुवै देशका सर्वेक्षण टोलीले शिखरमा पुगेर मापन गरे, नेपाली टोलीले सन् २०१९ मा र चिनियाँ टोलीले सन् २०२० मा। उनीहरूले स्याटेलाइट पोजिसनिङ र गुरुत्व मापन प्रयोग गरे, र चट्टानमाथिको हिउँको गहिराइ अनुमान गर्न ग्राउन्ड पेनिट्रेटिङ राडार चलाए।",
      },
      {
        en: "The height of a mountain depends on where sea level is taken to be beneath it. Surveyors model this with a surface called the geoid, which is why careful measurements can still give slightly different results.",
        ne: "पहाडको उचाइ त्यसमुनि समुद्री सतह कहाँ मानिन्छ भन्नेमा भर पर्छ। सर्वेक्षकहरूले यसलाई जियोइड भनिने सतहको मोडेलबाट निकाल्छन्, त्यसैले सावधानीपूर्वक गरिएका मापनले पनि अलि फरक नतिजा दिन सक्छन्।",
      },
    ],
    sources: [{ en: "Survey Department, Government of Nepal", ne: "नापी विभाग, नेपाल सरकार" }],
  },
  {
    slug: "see-results",
    cat: "education",
    date: "2026-10-31",
    desk: EDU_DESK,
    title: { en: "How SEE results are reported", ne: "एसईईको नतिजा कसरी प्रकाशित हुन्छ" },
    summary: {
      en: "Grade 10 results come as letter grades and a GPA. Here is what the grade sheet shows.",
      ne: "कक्षा १० को नतिजा अक्षराङ्कन र जीपीएमा आउँछ। ग्रेडसिटमा के देखिन्छ, यहाँ हेर्नुहोस्।",
    },
    body: [
      {
        en: "The Secondary Education Examination, or SEE, is taken at the end of Grade 10. Results are given as a letter grade for each subject and an overall grade point average (GPA).",
        ne: "माध्यमिक शिक्षा परीक्षा (एसईई) कक्षा १० को अन्त्यमा हुन्छ। नतिजा हरेक विषयको अक्षराङ्कन (लेटर ग्रेड) र समग्र ग्रेड पोइन्ट एभरेज (जीपीए) मा दिइन्छ।",
      },
      {
        en: "Each subject has a theory part. Many subjects also have a practical or internal assessment part that is recorded by the school.",
        ne: "हरेक विषयमा सैद्धान्तिक भाग हुन्छ। धेरै विषयमा विद्यालयले अभिलेख गर्ने प्रयोगात्मक वा आन्तरिक मूल्याङ्कनको भाग पनि हुन्छ।",
      },
      {
        en: "Results are published online by the examination authority. Check them on the official site only, and keep a copy of the published grade sheet.",
        ne: "नतिजा परीक्षा सञ्चालन गर्ने निकायले अनलाइन प्रकाशित गर्छ। आधिकारिक साइटमा मात्र हेर्नुहोस् र प्रकाशित ग्रेडसिटको प्रति राख्नुहोस्।",
      },
    ],
    sources: [{ en: "National Examinations Board", ne: "राष्ट्रिय परीक्षा बोर्ड" }],
  },
  {
    slug: "checking-claims-online",
    cat: "technology",
    date: "2026-10-30",
    desk: NEWS_DESK,
    title: { en: "Five checks to make before you share a post", ne: "पोस्ट सेयर गर्नुअघि गर्नुपर्ने पाँच जाँच" },
    summary: {
      en: "A short routine for judging screenshots, videos and forwarded messages before passing them on.",
      ne: "स्क्रिनसट, भिडियो र फरवार्ड गरिएका सन्देश अरूलाई पठाउनुअघि जाँच्ने छोटो तरिका।",
    },
    body: [
      {
        en: "Find the original source. A screenshot of a headline is not the article, so search for the story on the publisher's own site.",
        ne: "मूल स्रोत खोज्नुहोस्। शीर्षकको स्क्रिनसट लेख होइन, त्यसैले प्रकाशकको आफ्नै साइटमा त्यो समाचार खोज्नुहोस्।",
      },
      {
        en: "Check the date. Old photos and videos are often shared again as if they were new.",
        ne: "मिति हेर्नुहोस्। पुराना फोटो र भिडियो प्रायः नयाँ जस्तो गरी फेरि सेयर गरिन्छन्।",
      },
      {
        en: "Read past the headline. Compare with at least one other independent source. Be careful with posts designed to make you angry or afraid. If you cannot confirm it, it is fine not to share it.",
        ne: "शीर्षकभन्दा पर पढ्नुहोस्। कम्तीमा एउटा अर्को स्वतन्त्र स्रोतसँग तुलना गर्नुहोस्। रिस वा डर जगाउन बनाइएका पोस्टमा सावधान रहनुहोस्। पुष्टि गर्न सक्नुभएन भने सेयर नगर्नु ठीक हो।",
      },
    ],
    sources: [],
  },
  {
    slug: "glacial-lake-floods",
    cat: "environment",
    date: "2026-10-29",
    desk: EXPLAIN_DESK,
    title: { en: "What a glacial lake outburst flood is", ne: "हिमताल विस्फोटन बाढी भनेको के हो" },
    summary: {
      en: "As glaciers retreat, lakes form behind loose walls of rock and soil. When a wall gives way, the water can travel far downstream.",
      ne: "हिमनदी पछि हट्दै जाँदा ढुङ्गा र माटोको खुकुलो पर्खालपछाडि ताल बन्छन्। पर्खाल भत्किँदा पानी धेरै तलसम्म पुग्न सक्छ।",
    },
    body: [
      {
        en: "A glacial lake outburst flood, often shortened to GLOF, happens when water held in a glacial lake is released suddenly. Many of these lakes are held back by moraine, a loose mix of rock and soil left behind by a glacier.",
        ne: "हिमताल विस्फोटन बाढी (अंग्रेजीमा GLOF) हिमतालमा जम्मा भएको पानी अचानक बाहिर निस्किँदा आउँछ। धेरै यस्ता ताल मोरेनले थुनिएका हुन्छन्। मोरेन भनेको हिमनदीले छोडेर गएको ढुङ्गा र माटोको खुकुलो थुप्रो हो।",
      },
      {
        en: "Such a dam can fail after an avalanche or landslide falls into the lake, after an earthquake, or when water seeping through weakens it. The flood can carry rocks and debris many kilometres down the valley.",
        ne: "तालमा हिमपहिरो वा पहिरो खसेपछि, भूकम्पपछि, वा पानी चुहिँदै गएर कमजोर भएपछि यस्तो बाँध भत्किन सक्छ। बाढीले ढुङ्गा र लेदो बगाएर उपत्यकामा धेरै किलोमिटरसम्म पुर्‍याउन सक्छ।",
      },
      {
        en: "In Nepal, Tsho Rolpa in Dolakha district is one of the most studied glacial lakes. In 2000 a channel was built there to lower the water level and reduce the risk.",
        ne: "नेपालमा दोलखा जिल्लाको त्सो रोल्पा सबैभन्दा बढी अध्ययन गरिएका हिमतालमध्ये एक हो। जोखिम घटाउन सन् २००० मा त्यहाँ पानीको सतह घटाउने नहर बनाइयो।",
      },
    ],
    sources: [
      { en: "International Centre for Integrated Mountain Development (ICIMOD)", ne: "अन्तर्राष्ट्रिय एकीकृत पर्वतीय विकास केन्द्र (इसिमोड)" },
      { en: "Department of Hydrology and Meteorology, Nepal", ne: "जल तथा मौसम विज्ञान विभाग" },
    ],
  },
  {
    slug: "sustainable-development-goals",
    cat: "world",
    date: "2026-10-28",
    desk: EXPLAIN_DESK,
    title: { en: "The UN Sustainable Development Goals in brief", ne: "संयुक्त राष्ट्रसंघका दिगो विकास लक्ष्य छोटकरीमा" },
    summary: {
      en: "In 2015, UN member states agreed on 17 goals to reach by 2030. They cover poverty, health, education, climate and more.",
      ne: "सन् २०१५ मा राष्ट्रसंघका सदस्य राष्ट्रहरूले २०३० सम्म पूरा गर्ने १७ लक्ष्यमा सहमति गरे। यसमा गरिबी, स्वास्थ्य, शिक्षा, जलवायु लगायतका विषय पर्छन्।",
    },
    body: [
      {
        en: "The Sustainable Development Goals, or SDGs, were adopted by all United Nations member states in September 2015 as part of the 2030 Agenda for Sustainable Development.",
        ne: "दिगो विकास लक्ष्य (एसडीजी) सन् २०१५ सेप्टेम्बरमा संयुक्त राष्ट्रसंघका सबै सदस्य राष्ट्रले दिगो विकासका लागि एजेन्डा २०३० अन्तर्गत पारित गरेका हुन्।",
      },
      {
        en: "There are 17 goals and 169 targets. Goal 4, for example, is about quality education, and Goal 13 is about climate action.",
        ne: "यसमा १७ लक्ष्य र १६९ परिमाणात्मक लक्ष्य छन्। उदाहरणका लागि, लक्ष्य ४ गुणस्तरीय शिक्षासँग र लक्ष्य १३ जलवायु कारबाहीसँग सम्बन्धित छ।",
      },
      {
        en: "Each country reports on its own progress. Nepal has presented voluntary national reviews to the UN on its work towards the goals.",
        ne: "हरेक देशले आफ्नो प्रगतिबारे आफैं प्रतिवेदन दिन्छ। नेपालले लक्ष्यतर्फको आफ्नो कामबारे राष्ट्रसंघमा स्वैच्छिक राष्ट्रिय समीक्षा प्रस्तुत गरेको छ।",
      },
    ],
    sources: [
      { en: "United Nations, 2030 Agenda for Sustainable Development", ne: "संयुक्त राष्ट्रसंघ, दिगो विकासका लागि एजेन्डा २०३०" },
      { en: "National Planning Commission, Nepal", ne: "राष्ट्रिय योजना आयोग" },
    ],
  },
  {
    slug: "t20-format",
    cat: "sports",
    date: "2026-10-27",
    desk: NEWS_DESK,
    title: { en: "How a T20 cricket match works", ne: "टी-ट्वान्टी क्रिकेट खेल कसरी चल्छ" },
    summary: {
      en: "Each side bats for up to 20 overs. These are the basic rules that shape the game.",
      ne: "हरेक टोलीले बढीमा २० ओभर ब्याटिङ गर्छ। खेललाई आकार दिने आधारभूत नियम यहाँ छन्।",
    },
    body: [
      {
        en: "In Twenty20 cricket each team bats once and faces at most 20 overs, with six legal deliveries in each over. A match usually finishes in about three hours.",
        ne: "टी-ट्वान्टी क्रिकेटमा हरेक टोलीले एक पटक ब्याटिङ गर्छ र बढीमा २० ओभर खेल्छ। हरेक ओभरमा छ वटा वैध बल हुन्छन्। एउटा खेल प्रायः करिब तीन घण्टामा सकिन्छ।",
      },
      {
        en: "A bowler can bowl no more than four overs in an innings. In the first six overs, called the powerplay, only two fielders may stand outside the 30-yard circle.",
        ne: "एउटा बलरले एक इनिङ्समा चार ओभरभन्दा बढी बल हाल्न पाउँदैन। पावरप्ले भनिने पहिलो छ ओभरमा ३० गज घेराबाहिर दुई जना फिल्डर मात्र बस्न पाउँछन्।",
      },
      {
        en: "If the scores are level at the end, many competitions use a super over, in which each side faces one more over to decide the winner.",
        ne: "अन्त्यमा स्कोर बराबर भए धेरै प्रतियोगितामा सुपर ओभर खेलाइन्छ, जसमा विजेता छुट्याउन हरेक टोलीले थप एक ओभर खेल्छ।",
      },
    ],
    sources: [{ en: "International Cricket Council playing conditions", ne: "अन्तर्राष्ट्रिय क्रिकेट परिषद्का खेल नियम" }],
  },
  {
    slug: "bikram-sambat",
    cat: "explainers",
    date: "2026-10-26",
    desk: EXPLAIN_DESK,
    title: {
      en: "What Bikram Sambat is and how it relates to the Gregorian calendar",
      ne: "विक्रम संवत् के हो र यो ग्रेगोरियन क्यालेन्डरसँग कसरी जोडिन्छ",
    },
    summary: {
      en: "Nepal's official calendar runs about 56 years and 8 months ahead of the calendar used in most of the world.",
      ne: "नेपालको आधिकारिक पात्रो विश्वका धेरैजसो ठाउँमा चल्ने क्यालेन्डरभन्दा करिब ५६ वर्ष ८ महिना अगाडि छ।",
    },
    body: [
      {
        en: "Bikram Sambat, often written BS, is the official calendar of Nepal. It runs about 56 years and 8 months ahead of the Gregorian calendar, so the year 2026 falls across 2082 and 2083 BS.",
        ne: "विक्रम संवत् (वि.सं.) नेपालको आधिकारिक पात्रो हो। यो ग्रेगोरियन क्यालेन्डरभन्दा करिब ५६ वर्ष ८ महिना अगाडि छ, त्यसैले सन् २०२६ वि.सं. २०८२ र २०८३ मा पर्छ।",
      },
      {
        en: "The new year begins on 1 Baisakh, in mid-April. Month lengths change from year to year and can be anywhere from 29 to 32 days, so dates are converted with published tables rather than a simple formula.",
        ne: "नयाँ वर्ष वैशाख १ गते, अप्रिलको मध्यतिर सुरु हुन्छ। महिनाका दिन वर्षैपिच्छे फेरिन्छन् र २९ देखि ३२ दिनसम्मका हुन सक्छन्, त्यसैले मिति साधारण सूत्रले होइन, प्रकाशित तालिकाबाट मिलाइन्छ।",
      },
      {
        en: "Government notices, school calendars and exam schedules in Nepal usually give dates in BS, sometimes with the Gregorian date alongside.",
        ne: "नेपालमा सरकारी सूचना, विद्यालयको पात्रो र परीक्षा तालिकामा प्रायः वि.सं. मिति दिइन्छ, कहिलेकाहीँ सँगै ईस्वी मिति पनि राखिन्छ।",
      },
    ],
    sources: [{ en: "Nepal Panchanga Nirnayak Bikas Samiti", ne: "नेपाल पञ्चाङ्ग निर्णायक विकास समिति" }],
  },
  {
    slug: "scholarship-documents",
    cat: "education",
    date: "2026-10-24",
    desk: EDU_DESK,
    title: {
      en: "Documents to prepare before applying for a scholarship",
      ne: "छात्रवृत्तिका लागि आवेदन दिनुअघि तयार गर्नुपर्ने कागजात",
    },
    summary: {
      en: "Most applications ask for the same set of papers. Getting them ready early saves time when a deadline is close.",
      ne: "धेरैजसो आवेदनमा उस्तै कागजात माग्छन्। समयमै तयार राखे अन्तिम मिति नजिकिँदा समय बच्छ।",
    },
    body: [
      {
        en: "Most scholarship forms ask for your academic transcripts and certificates, a copy of your citizenship certificate or birth registration, and recent passport-size photographs.",
        ne: "धेरैजसो छात्रवृत्ति फारममा शैक्षिक लब्धाङ्कपत्र र प्रमाणपत्र, नागरिकता प्रमाणपत्र वा जन्मदर्ताको प्रतिलिपि, र हालै खिचिएको पासपोर्ट साइजको फोटो माग्छन्।",
      },
      {
        en: "Some also need a recommendation letter from a teacher, proof of family income or a recommendation from your ward office. Check the official notice for the exact list.",
        ne: "कतिपयमा शिक्षकको सिफारिस पत्र, पारिवारिक आयको प्रमाण वा वडा कार्यालयको सिफारिस पनि चाहिन्छ। ठ्याक्कै सूचीका लागि आधिकारिक सूचना हेर्नुहोस्।",
      },
      {
        en: "Scan each document clearly and name the files so you can recognise them. Apply only through the provider's official website or office, and never pay an agent who promises a guaranteed place.",
        ne: "हरेक कागजात प्रस्ट स्क्यान गर्नुहोस् र फाइलको नाम आफूले चिन्ने गरी राख्नुहोस्। प्रदायकको आधिकारिक वेबसाइट वा कार्यालयमार्फत मात्र आवेदन दिनुहोस्, र पक्का छनोटको वाचा गर्ने एजेन्टलाई कहिल्यै पैसा नतिर्नुहोस्।",
      },
    ],
    sources: [],
  },
  {
    slug: "lumbini",
    cat: "nepal",
    date: "2026-10-22",
    desk: EXPLAIN_DESK,
    title: { en: "Lumbini, the birthplace of the Buddha", ne: "लुम्बिनी, बुद्धको जन्मस्थल" },
    summary: {
      en: "What the site contains and why it is on the World Heritage List.",
      ne: "यस क्षेत्रमा के छ र यो विश्व सम्पदा सूचीमा किन छ।",
    },
    body: [
      {
        en: "Lumbini, in Rupandehi district of Lumbini Province, is the birthplace of Siddhartha Gautama, later known as the Buddha. It was added to the UNESCO World Heritage List in 1997.",
        ne: "लुम्बिनी प्रदेशको रुपन्देही जिल्लामा रहेको लुम्बिनी पछि बुद्ध भनेर चिनिएका सिद्धार्थ गौतमको जन्मस्थल हो। यसलाई सन् १९९७ मा युनेस्को विश्व सम्पदा सूचीमा राखियो।",
      },
      {
        en: "The site includes the Maya Devi Temple and the Ashoka Pillar, an inscribed stone pillar set up by the Emperor Ashoka in the third century BCE to record his visit.",
        ne: "यहाँ मायादेवी मन्दिर र अशोक स्तम्भ छन्। अशोक स्तम्भ ईसापूर्व तेस्रो शताब्दीमा सम्राट अशोकले आफ्नो भ्रमणको सम्झनामा गाडेको अभिलेखसहितको ढुङ्गाको स्तम्भ हो।",
      },
      {
        en: "Around the sacred garden is a monastic zone where Buddhist communities from many countries have built monasteries, following a master plan by the Japanese architect Kenzo Tange.",
        ne: "पवित्र बगैंचा वरिपरि बौद्ध विहार क्षेत्र छ, जहाँ जापानी वास्तुकार केन्जो टाङ्गेको गुरुयोजनाअनुसार धेरै देशका बौद्ध समुदायले विहार बनाएका छन्।",
      },
    ],
    sources: [
      { en: "UNESCO World Heritage Centre", ne: "युनेस्को विश्व सम्पदा केन्द्र" },
      { en: "Lumbini Development Trust", ne: "लुम्बिनी विकास कोष" },
    ],
  },
];

// Newest first.
export const ARTICLES = [...RAW].sort((a, b) => b.date.localeCompare(a.date));

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const articlesIn = (cat: string) => ARTICLES.filter((a) => a.cat === cat);

/* ---------- quiz ---------- */

export interface QuizItem {
  q: Bi;
  o: Bi[];
  a: number;
}

export const QUIZ: QuizItem[] = [
  {
    q: { en: "What is the capital of Nepal?", ne: "नेपालको राजधानी कुन हो?" },
    o: [
      { en: "Kathmandu", ne: "काठमाडौं" },
      { en: "Pokhara", ne: "पोखरा" },
      { en: "Biratnagar", ne: "विराटनगर" },
      { en: "Lalitpur", ne: "ललितपुर" },
    ],
    a: 0,
  },
  {
    q: { en: "Which is the highest mountain in the world?", ne: "संसारको सबैभन्दा अग्लो हिमाल कुन हो?" },
    o: [
      { en: "K2", ne: "के टू" },
      { en: "Kanchenjunga", ne: "कञ्चनजङ्घा" },
      { en: "Mount Everest", ne: "सगरमाथा" },
      { en: "Lhotse", ne: "ल्होत्से" },
    ],
    a: 2,
  },
  {
    q: { en: "How many provinces does Nepal have?", ne: "नेपालमा कतिवटा प्रदेश छन्?" },
    o: [
      { en: "5", ne: "५" },
      { en: "6", ne: "६" },
      { en: "7", ne: "७" },
      { en: "8", ne: "८" },
    ],
    a: 2,
  },
  {
    q: { en: "Where was Gautama Buddha born?", ne: "गौतम बुद्धको जन्म कहाँ भएको थियो?" },
    o: [
      { en: "Janakpur", ne: "जनकपुर" },
      { en: "Lumbini", ne: "लुम्बिनी" },
      { en: "Patan", ne: "पाटन" },
      { en: "Bandipur", ne: "बन्दीपुर" },
    ],
    a: 1,
  },
];

/* ---------- education ---------- */

export interface TabItem {
  id: string;
  n: Bi;
  h: Bi;
  p: Bi;
}

export const TABS: TabItem[] = [
  {
    id: "see",
    n: { en: "SEE", ne: "एसईई" },
    h: { en: "Secondary Education Examination", ne: "माध्यमिक शिक्षा परीक्षा" },
    p: { en: "Subject notes, past papers, model questions and syllabus for Grade 10.", ne: "कक्षा १० का लागि विषयगत नोट, पुराना प्रश्नपत्र, नमुना प्रश्न र पाठ्यक्रम।" },
  },
  {
    id: "neb",
    n: { en: "NEB", ne: "एनईबी" },
    h: { en: "National Examinations Board", ne: "राष्ट्रिय परीक्षा बोर्ड" },
    p: { en: "Notes, past papers and model questions for Grades 11 and 12.", ne: "कक्षा ११ र १२ का नोट, पुराना प्रश्नपत्र र नमुना प्रश्न।" },
  },
  {
    id: "ent",
    n: { en: "Entrance", ne: "प्रवेश परीक्षा" },
    h: { en: "Entrance preparation", ne: "प्रवेश परीक्षा तयारी" },
    p: { en: "Model sets and timed practice for college and university admission.", ne: "कलेज तथा विश्वविद्यालय भर्नाका लागि नमुना सेट र समयबद्ध अभ्यास।" },
  },
  {
    id: "ls",
    n: { en: "Lok Sewa", ne: "लोकसेवा" },
    h: { en: "Public service exams", ne: "लोकसेवा परीक्षा" },
    p: { en: "Syllabus, past questions, general knowledge and practice sets.", ne: "पाठ्यक्रम, पुराना प्रश्न, सामान्य ज्ञान र अभ्यास सेट।" },
  },
  {
    id: "sch",
    n: { en: "Scholarships", ne: "छात्रवृत्ति" },
    h: { en: "Scholarships", ne: "छात्रवृत्ति" },
    p: { en: "Listings with the provider, the deadline and a link to the official source.", ne: "प्रदायक, अन्तिम मिति र आधिकारिक स्रोतको लिङ्कसहितका सूची।" },
  },
];

export const EDU_FEATURES: Bi[] = [
  { en: "Timed mock tests with scoring, explanations and review.", ne: "समयबद्ध अभ्यास परीक्षा, अङ्क, व्याख्या र पुनरावलोकनसहित।" },
  { en: "Search by level, subject, year and file format.", ne: "तह, विषय, वर्ष र फाइल ढाँचाअनुसार खोज।" },
  { en: "With an account: saved resources and your attempt history.", ne: "खाता भए: सुरक्षित सामग्री र तपाईंका प्रयासको इतिहास।" },
];

/* ---------- games ---------- */

export const GAMES: { n: Bi; d: Bi; ready: boolean }[] = [
  { n: { en: "Daily GK Quiz", ne: "दैनिक सामान्य ज्ञान" }, d: { en: "Daily questions with explanations.", ne: "व्याख्यासहित दैनिक प्रश्न।" }, ready: true },
  { n: { en: "Nepali Word Challenge", ne: "नेपाली शब्द चुनौती" }, d: { en: "Guess the daily Nepali word.", ne: "दैनिक नेपाली शब्द अनुमान गर्नुहोस्।" }, ready: false },
  { n: { en: "Sudoku", ne: "सुडोकु" }, d: { en: "Puzzles in several difficulty levels.", ne: "विभिन्न कठिनाइ स्तरका पजल।" }, ready: false },
  { n: { en: "Memory Flip", ne: "मेमोरी फ्लिप" }, d: { en: "Match pairs on a card grid.", ne: "कार्ड ग्रिडमा जोडा मिलाउनुहोस्।" }, ready: false },
  { n: { en: "Daily Jigsaw", ne: "दैनिक जिग्सो" }, d: { en: "An image puzzle with a few difficulty levels.", ne: "केही कठिनाइ स्तरसहितको चित्र पजल।" }, ready: false },
  { n: { en: "Quick Math", ne: "छिटो गणित" }, d: { en: "Timed arithmetic that gets harder as you go.", ne: "अगाडि बढ्दै जाँदा कठिन हुने समयबद्ध अङ्कगणित।" }, ready: false },
];

/* ---------- newsroom and trust ---------- */

export const STEPS: { h: Bi; d: Bi }[] = [
  { h: { en: "Collect", ne: "जम्मा गर्ने" }, d: { en: "Gather items from approved feeds and official sites, keeping the original link.", ne: "स्वीकृत फिड र आधिकारिक साइटबाट सामग्री जम्मा गरिन्छ, मूल लिङ्कसहित।" } },
  { h: { en: "Find the claims", ne: "दाबी छुट्याउने" }, d: { en: "Group reports on the same event and pull out statements that can be checked.", ne: "एउटै घटनाका समाचार समूहबद्ध गरी जाँच गर्न मिल्ने कथन छुट्याइन्छ।" } },
  { h: { en: "Check the evidence", ne: "प्रमाण जाँच्ने" }, d: { en: "Look for supporting and conflicting sources. A source repeating itself does not count as confirmation.", ne: "समर्थन र विरोध गर्ने स्रोत खोजिन्छ। एउटै स्रोतले आफ्नै कुरा दोहोर्याउनु पुष्टि मानिँदैन।" } },
  { h: { en: "Draft", ne: "मस्यौदा" }, d: { en: "Prepare a draft in Nepali and English that cites only traced sources.", ne: "पहिचान गरिएका स्रोत मात्र उद्धृत गरी नेपाली र अंग्रेजीमा मस्यौदा तयार गरिन्छ।" } },
  { h: { en: "Editor decides", ne: "सम्पादकले निर्णय गर्छ" }, d: { en: "An editor reviews the evidence and draft, then approves, edits or rejects.", ne: "सम्पादकले प्रमाण र मस्यौदा हेरी स्वीकृत, सम्पादन वा अस्वीकार गर्छन्।" } },
];

export const STATUS: { n: Bi; d: Bi }[] = [
  { n: { en: "Unverified", ne: "अप्रमाणित" }, d: { en: "No adequate evidence has been assessed yet.", ne: "पर्याप्त प्रमाण अझै जाँचिएको छैन।" } },
  { n: { en: "Partially supported", ne: "आंशिक समर्थित" }, d: { en: "Some parts are supported, but not the full claim.", ne: "केही अंश समर्थित छन्, पूरा दाबी होइन।" } },
  { n: { en: "Supported", ne: "समर्थित" }, d: { en: "Evidence supports the claim within its recorded scope.", ne: "अभिलेखित दायराभित्र प्रमाणले दाबीलाई समर्थन गर्छ।" } },
  { n: { en: "Contradicted", ne: "खण्डित" }, d: { en: "Reliable evidence conflicts with the claim.", ne: "भरपर्दो प्रमाणले दाबीको विरोध गर्छ।" } },
  { n: { en: "Conflicting", ne: "परस्पर विरोधी" }, d: { en: "Credible sources materially disagree.", ne: "विश्वसनीय स्रोतहरूबीच ठूलो मतभेद छ।" } },
  { n: { en: "Needs editor review", ne: "सम्पादकीय समीक्षा चाहिन्छ" }, d: { en: "Evidence or context needs human judgement.", ne: "प्रमाण वा सन्दर्भमा मानवीय निर्णय चाहिन्छ।" } },
];

export const TRUST: Bi[] = [
  { en: "Sources and licences are shown with the content.", ne: "सामग्रीसँगै स्रोत र अनुमति देखाइन्छ।" },
  { en: "Corrections stay visible and the original version is kept.", ne: "सच्याइ देखिन्छन् र मूल संस्करण सुरक्षित रहन्छ।" },
  { en: "Reading and playing need no account.", ne: "पढ्न र खेल्न खाता चाहिँदैन।" },
  { en: "The site keeps working if the AI service is down.", ne: "एआई सेवा बन्द भए पनि साइट चलिरहन्छ।" },
];
