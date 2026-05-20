export type Category = 'sleep' | 'colon' | 'stress' | 'reflux' | 'immunity' | 'headache';

export interface Question {
  id: number;
  text: string;
}

export interface QuizCategory {
  id: Category;
  title: string;
  icon: string;
  questions: Question[];
}

export interface Product {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  ingredients: string[];
  benefits: string[];
  rating: number;
  reviews: number;
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "peace-of-mind",
    name: "Peace of Mind",
    arabicName: "راحة البال",
    description: "تركيبة عشبية مهدئة تساعد على الاسترخاء العميق وتحسين جودة النوم وتقليل التفكير المفرط قبل النوم.",
    price: "١٤٩ ر.س",
    priceNumber: 149,
    image: "/assets/images/سكون.png",
    ingredients: ["البابونج", "اللافندر", "نبتة سانت جون", "الميليسا"],
    benefits: ["تحسين جودة النوم", "تقليل القلق", "تهدئة الأعصاب"],
    rating: 4.9,
    reviews: 124,
    category: 'sleep'
  },
  {
    id: "deep-sleep-elixir",
    name: "Deep Sleep Elixir",
    arabicName: "إكسير النوم العميق",
    description: "مزيج مُكثف للأرق المزمن، يعيد ضبط الساعة البيولوجية للجسم.",
    price: "١٧٥ ر.س",
    priceNumber: 175,
    image: "/assets/images/هدوء.png",
    ingredients: ["جذور الvalerian", "زهرة العاطفة", "اللافندر"],
    benefits: ["نوم متواصل", "الاستيقاظ بنشاط", "تخفيف التوتر العضلي"],
    rating: 4.8,
    reviews: 45,
    category: 'sleep'
  },
  {
    id: "stomach-balance",
    name: "Stomach Balance",
    arabicName: "توازن المعدة",
    description: "مزيج طبيعي يخفف من أعراض الارتجاع والحموضة ويساعد على الهضم الصحي بشكل طبيعي.",
    price: "١٣٥ ر.س",
    priceNumber: 135,
    image: "/assets/images/توازن.png",
    ingredients: ["العرقسوس", "الزنجبيل", "النعناع", "المستكة"],
    benefits: ["تخفيف الحموضة", "حماية جدار المعدة", "تحسين الهضم"],
    rating: 4.8,
    reviews: 89,
    category: 'reflux'
  },
  {
    id: "clear-mind",
    name: "Clear Mind",
    arabicName: "صفاء الذهن",
    description: "خلطة فريدة تعزز التركيز والصفاء الذهني وتقلل من الإرهاق الذهني الناتج عن ضغوط العمل.",
    price: "١٢٥ ر.س",
    priceNumber: 125,
    image: "/assets/images/صفاء.png",
    ingredients: ["اكليل الجبل", "الجنكة", "المتة", "الجينسنغ"],
    benefits: ["زيادة التركيز", "تنشيط الذاكرة", "تقليل الضباب الذهني"],
    rating: 4.7,
    reviews: 56,
    category: 'stress'
  },
  {
    id: "abdominal-comfort",
    name: "Abdominal Comfort",
    arabicName: "راحة البطن",
    description: "تركيبة مخصصة لتهدئة القولون وتقليل الانتفاخات والمغص بعد الوجبات.",
    price: "١١٩ ر.س",
    priceNumber: 119,
    image: "/assets/images/خفة.png",
    ingredients: ["اليانسون", "الكمون", "الشمر", "المستكة"],
    benefits: ["طارد للغازات", "تخفيف تشنجات القولون", "هضم مريح"],
    rating: 4.9,
    reviews: 210,
    category: 'colon'
  },
  {
    id: "colon-calm",
    name: "Colon Calm",
    arabicName: "هدوء القولون",
    description: "الأفضل للقولون العصبي والانتفاخات الناتجة عن التوتر.",
    price: "١٢٩ ر.س",
    priceNumber: 129,
    image: "/assets/images/توازن.png",
    ingredients: ["البردقوش", "بذور القاطونة", "النعناع"],
    benefits: ["تنظيم حركة الأمعاء", "تخفيف الآلام المفاجئة"],
    rating: 4.6,
    reviews: 67,
    category: 'colon'
  },
  {
    id: "head-stillness",
    name: "Head Stillness",
    arabicName: "سكون الرأس",
    description: "مزيج منعش يخفف من حدة الصداع والتوتر العضلي المرتبط بآلام الرأس.",
    price: "١٤٠ ر.س",
    priceNumber: 140,
    image: "/assets/images/هدوء.png",
    ingredients: ["البردقوش", "النعناع الفلفلي", "اللافندر", "نبتة المخلب"],
    benefits: ["تخفيف الصداع", "تقليل شد الرقبة", "انتعاش فوري"],
    rating: 4.8,
    reviews: 142,
    category: 'headache'
  },
  {
    id: "body-shield",
    name: "Body Shield",
    arabicName: "درع الجسم",
    description: "تركيبة غنية بمضادات الأكسدة لتقوية جهاز المناعة وزيادة مقاومة الجسم للأمراض.",
    price: "١٦٥ ر.س",
    priceNumber: 165,
    image: "/assets/images/حصن.png",
    ingredients: ["القنفذية (Echinacea)", "الزعتر البري", "الكركم", "ثمر الورد"],
    benefits: ["تقوية المناعة", "مضاد للالتهابات", "زيادة الحيوية"],
    rating: 5.0,
    reviews: 74,
    category: 'immunity'
  },
  {
    id: "winter-power",
    name: "Winter Power",
    arabicName: "طاقة الشتاء",
    description: "مزيج دافئ لتعزيز المناعة والحماية من تقلبات الجو.",
    price: "١٥٥ ر.س",
    priceNumber: 155,
    image: "/assets/images/winter drink.jpg",
    ingredients: ["الزنجبيل", "القرفة", "العسل الجبلي", "الليمون الأسود"],
    benefits: ["دفء داخلي", "مقاومة نزلات البرد", "تنشيط الدورة الدموية"],
    rating: 4.9,
    reviews: 31,
    category: 'immunity'
  }
];

export const QUIZ_DATA: QuizCategory[] = [
  {
    id: 'sleep',
    title: 'النوم',
    icon: 'Moon',
    questions: [
      { id: 1, text: 'هل تعاني من صعوبة في النوم؟' },
      { id: 2, text: 'هل تشعر بالتفكير المستمر والإرهاق؟' },
      { id: 3, text: 'هل يتسم يومك بالضغط والتوتر الشديد؟' },
      { id: 4, text: 'هل تستيقظ من النوم وأنت تشعر بعدم الراحة؟' }
    ]
  },
  {
    id: 'colon',
    title: 'القولون',
    icon: 'Activity',
    questions: [
      { id: 1, text: 'انتفاخ يومي؟' },
      { id: 2, text: 'مغص بعد الأكل؟' },
      { id: 3, text: 'التوتر يزيد الأعراض؟' },
      { id: 4, text: 'عندك ارتجاع أو حموضة؟' }
    ]
  },
  {
    id: 'stress',
    title: 'التوتر',
    icon: 'Wind',
    questions: [
      { id: 1, text: 'تفكير زائد؟' },
      { id: 2, text: 'شد عضلي؟' },
      { id: 3, text: 'صداع مع التوتر؟' },
      { id: 4, text: 'أرق بسبب التفكير؟' }
    ]
  },
  {
    id: 'reflux',
    title: 'الارتجاع والحموضة',
    icon: 'Flame',
    questions: [
      { id: 1, text: 'حموضة بعد الأكل؟' },
      { id: 2, text: 'كحة أو شيء عالق بالحلق؟' },
      { id: 3, text: 'غازات وانتفاخ؟' },
      { id: 4, text: 'نومك يتأثر؟' }
    ]
  },
  {
    id: 'immunity',
    title: 'المناعة',
    icon: 'Shield',
    questions: [
      { id: 1, text: 'تتعب بسرعة؟' },
      { id: 2, text: 'يجيك زكام كثير؟' },
      { id: 3, text: 'نومك سيء؟' },
      { id: 4, text: 'أكلك غير منتظم؟' }
    ]
  },
  {
    id: 'headache',
    title: 'الصداع',
    icon: 'Zap',
    questions: [
      { id: 1, text: 'صداع مع التوتر؟' },
      { id: 2, text: 'صداع مع قلة النوم؟' },
      { id: 3, text: 'شد بالرقبة؟' },
      { id: 4, text: 'تفكير كثير؟' }
    ]
  }
];
