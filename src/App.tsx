import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { cn } from './lib/utils';
import { ChevronLeft, Moon, Activity, Wind, Flame, Shield, Zap, ShoppingCart, Star, RefreshCw, Plus, Minus, Trash2, CreditCard, Truck, CheckCircle, X } from 'lucide-react';
import { PRODUCTS, QUIZ_DATA, type Category, type Product, type CartItem } from './constants';
import confetti from 'canvas-confetti';

// --- Components ---
// في App.tsx — أضف هذا بعد سطر useState مباشرةً

useEffect(() => {
  if (window.location.pathname === '/admin') {
    window.location.replace('https://ash203.vercel.app/');
  }
}, []);
const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-3", className)}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-olive/20 to-primary/20 rounded-full blur-md" />
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
          {/* Mortar */}
          <path 
            d="M20 45 C 20 75, 80 75, 80 45 L 85 45 C 85 85, 15 85, 15 45 Z" 
            className="fill-olive stroke-gold/30" 
            strokeWidth="2"
          />
          {/* Pestle */}
          <rect 
            x="45" y="15" width="10" height="40" rx="5"
            transform="rotate(25 50 35)"
            className="fill-gold stroke-olive/20"
            strokeWidth="1"
          />
          {/* Leaf Detail */}
          <path 
            d="M30 65 Q 40 70, 50 65 Q 60 70, 70 65" 
            className="fill-none stroke-gold/50" 
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    <div className="flex flex-col -gap-1">
      <span className="text-xl font-bold font-display tracking-tight text-olive leading-none">
        TRIYAK
      </span>
      <span className="text-sm font-medium text-primary tracking-[0.2em] uppercase leading-none opacity-80">
        ترياق
      </span>
    </div>
  </div>
);

const Navbar = ({ 
  onStartQuiz, 
  onShowProducts, 
  onShowCart, 
  cartCount,
  onNavigateHome,
  onNavigateStory,
  onNavigateBlog,
  onNavigateContact,
  currentView
}: { 
  onStartQuiz: () => void, 
  onShowProducts: () => void, 
  onShowCart: () => void, 
  cartCount: number,
  onNavigateHome: () => void,
  onNavigateStory: () => void,
  onNavigateBlog: () => void,
  onNavigateContact: () => void,
  currentView: string
}) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between mx-auto max-w-7xl mt-4 rounded-2xl transition-all duration-500"
    >
      <button onClick={onNavigateHome} className="hover:opacity-80 transition-opacity">
        <Logo />
      </button>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-olive/80">
        <button 
          onClick={onShowProducts} 
          className={cn("hover:text-primary transition-colors", currentView === 'home' && "text-primary font-bold")}
        >
          منتجاتنا
        </button>
        <button 
          onClick={onNavigateStory} 
          className={cn("hover:text-primary transition-colors", currentView === 'story' && "text-primary font-bold")}
        >
          قصتنا
        </button>
        <button 
          onClick={onNavigateBlog} 
          className={cn("hover:text-primary transition-colors", currentView === 'blog' && "text-primary font-bold")}
        >
          المدونة
        </button>
        <button 
          onClick={onNavigateContact} 
          className={cn("hover:text-primary transition-colors", currentView === 'contact' && "text-primary font-bold")}
        >
          تواصل معنا
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onShowCart}
          className="p-2 text-olive hover:bg-olive/5 rounded-full transition-colors relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </button>
        <button 
          onClick={onStartQuiz}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          اختر خخلطتك
        </button>
      </div>
    </motion.nav>
  );
};

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-sage/20 blur-sm"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

const Hero = ({ onStartQuiz, onShowProducts }: { onStartQuiz: () => void, onShowProducts: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <ParticleBackground />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(138,154,91,0.05),transparent_70%)]" />
      
      <motion.div 
        style={{ y, opacity }}
        className="max-w-4xl text-center space-y-8 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage/10 text-sage text-sm font-bold tracking-wider mb-6 border border-sage/20 uppercase">
            الطبيعة في أسمى صورها
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.2] text-olive-900 mb-6">
            خلطتك العشبية <br />
            <span className="text-sage italic">المصممة خصيصاً لك</span>
          </h1>
          <p className="text-lg md:text-xl text-olive/70 leading-relaxed max-w-2xl mx-auto mb-10">
            أجب عن عدة أسئلة بسيطة وسنحدد لك التركيبة الأنسب لجسمك واحتياجاتك العضوية، عبر نظام ذكاء اصطناعي تفاعلي صُمم لراحتك.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onStartQuiz}
            className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            اختر خلطتك المناسبة
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <button 
            onClick={onShowProducts}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl text-lg font-bold border-2 border-sage/20 text-olive hover:bg-sage/5 transition-all"
          >
            عرض المنتجات
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
        className="mt-20 relative px-4"
      >
        <div className="absolute inset-0 bg-sage/20 blur-[120px] rounded-full -z-10" />
        <img 
          src="/src/assets/images/herbalmix.jpeg" 
          alt="Herbal mix" 
          className="w-full max-w-4xl rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
        />
      </motion.div>
    </section>
  );
};

const QuizPortal = ({ onClose, onAddToCart }: { onClose: () => void, onAddToCart: (p: Product) => void }) => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<Product | null>(null);

  const handleCategorySelect = (id: Category) => {
    setCategory(id);
    setStep(2);
    setQIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (val: boolean) => {
    const newAnswers = [...answers, val];
    if (qIndex < 3) {
      setQIndex(qIndex + 1);
      setAnswers(newAnswers);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: boolean[]) => {
    let finalProduct: Product;
    const cat = category;

    if (cat === 'sleep') {
      if (finalAnswers[0] && finalAnswers[1]) finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
      else if (finalAnswers[2] && finalAnswers[3]) finalProduct = PRODUCTS.find(p => p.id === 'stomach-balance')!;
      else if (finalAnswers[0] && !finalAnswers[2]) finalProduct = PRODUCTS.find(p => p.id === 'clear-mind')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
    } else if (cat === 'colon') {
      if (finalAnswers[0] && finalAnswers[1]) finalProduct = PRODUCTS.find(p => p.id === 'abdominal-comfort')!;
      else if (finalAnswers[2]) finalProduct = PRODUCTS.find(p => p.id === 'clear-mind')!;
      else if (finalAnswers[3]) finalProduct = PRODUCTS.find(p => p.id === 'stomach-balance')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'abdominal-comfort')!;
    } else if (cat === 'stress') {
      if (finalAnswers[0] && finalAnswers[3]) finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
      else if (finalAnswers[1] && finalAnswers[2]) finalProduct = PRODUCTS.find(p => p.id === 'head-stillness')!;
      else if (finalAnswers[0]) finalProduct = PRODUCTS.find(p => p.id === 'clear-mind')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'clear-mind')!;
    } else if (cat === 'reflux') {
      if (finalAnswers[0] && finalAnswers[1]) finalProduct = PRODUCTS.find(p => p.id === 'stomach-balance')!;
      else if (finalAnswers[2]) finalProduct = PRODUCTS.find(p => p.id === 'abdominal-comfort')!;
      else if (finalAnswers[3]) finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'stomach-balance')!;
    } else if (cat === 'immunity') {
      if (finalAnswers[0] && finalAnswers[1]) finalProduct = PRODUCTS.find(p => p.id === 'body-shield')!;
      else if (finalAnswers[2]) finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'body-shield')!;
    } else {
      if (finalAnswers[0] && finalAnswers[3]) finalProduct = PRODUCTS.find(p => p.id === 'head-stillness')!;
      else if (finalAnswers[1]) finalProduct = PRODUCTS.find(p => p.id === 'peace-of-mind')!;
      else finalProduct = PRODUCTS.find(p => p.id === 'head-stillness')!;
    }

    setResult(finalProduct);
    setStep(3);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8A9A5B', '#708238', '#D4AF37']
    });
  };

  const currentCategoryData = QUIZ_DATA.find(c => c.id === category);


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col items-center justify-center p-6"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-olive/40 hover:text-olive hover:rotate-90 transition-all duration-300"
      >
        <Zap className="w-8 h-8 rotate-45" />
      </button>

      {step === 1 && (
        <div className="max-w-4xl w-full">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display text-olive mb-4">ما الذي تود تحسينه اليوم؟</h2>
            <p className="text-olive/60">اختر الفئة التي تعاني من أعراضها لنبدأ التشخيص</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {QUIZ_DATA.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleCategorySelect(cat.id)}
                className="group relative h-48 glass rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:bg-sage/10 transition-colors border-2 border-transparent hover:border-sage/20"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {cat.icon === 'Moon' && <Moon className="w-8 h-8 text-sage" />}
                  {cat.icon === 'Activity' && <Activity className="w-8 h-8 text-sage" />}
                  {cat.icon === 'Wind' && <Wind className="w-8 h-8 text-sage" />}
                  {cat.icon === 'Flame' && <Flame className="w-8 h-8 text-sage" />}
                  {cat.icon === 'Shield' && <Shield className="w-8 h-8 text-sage" />}
                  {cat.icon === 'Zap' && <Zap className="w-8 h-8 text-sage" />}
                </div>
                <span className="text-xl font-bold text-olive">{cat.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && currentCategoryData && (
        <div className="max-w-2xl w-full text-center">
          <motion.div 
            key={qIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              سؤال {qIndex + 1} من 4
            </div>
            
            <h2 className="text-4xl font-bold font-display text-olive leading-tight">
              {currentCategoryData.questions[qIndex].text}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleAnswer(true)}
                className="h-24 glass rounded-2xl text-2xl font-bold text-olive hover:bg-sage hover:text-white transition-all active:scale-95"
              >
                نعم
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className="h-24 glass rounded-2xl text-2xl font-bold text-olive hover:bg-olive/10 transition-all active:scale-95"
              >
                لا
              </button>
            </div>

            <div className="w-full bg-olive/5 h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((qIndex + 1) / 4) * 100}%` }}
                 className="h-full bg-sage"
               />
            </div>
          </motion.div>
        </div>
      )}

      {step === 3 && result && (
        <div className="max-w-6xl w-full h-full overflow-y-auto no-scrollbar py-20 px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
               <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src={result.image} alt={result.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 right-8 text-white">
                     <h3 className="text-5xl font-bold font-display mb-2">{result.arabicName}</h3>
                     <p className="text-white/80 text-xl">{result.name}</p>
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-8">
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                    <span className="text-olive/60 text-sm mr-2">(٢١٠ تقييم)</span>
                 </div>
                 <h2 className="text-4xl font-bold text-olive">الخلطة المقترحة لك</h2>
                 <p className="text-xl text-olive/70 leading-relaxed">{result.description}</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl glass space-y-3">
                   <h4 className="font-bold text-sage">المكونات المختارة</h4>
                   <ul className="text-sm space-y-1 text-olive/80">
                     {result.ingredients.map(ing => <li key={ing}>• {ing}</li>)}
                   </ul>
                 </div>
                 <div className="p-6 rounded-2xl glass space-y-3">
                   <h4 className="font-bold text-sage">الفوائد المتوقعة</h4>
                   <ul className="text-sm space-y-1 text-olive/80">
                     {result.benefits.map(ben => <li key={ben}>• {ben}</li>)}
                   </ul>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                 <button 
                  onClick={() => onAddToCart(result)}
                  className="w-full sm:flex-1 bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                 >
                   إضافة للسلة - {result.price}
                 </button>
                 <button 
                  onClick={() => {
                    setStep(1);
                    setCategory(null);
                    setQIndex(0);
                    setAnswers([]);
                    setResult(null);
                  }}
                  className="w-full sm:w-auto p-5 rounded-2xl border-2 border-sage/20 text-olive hover:bg-sage/5 transition-all"
                 >
                   <RefreshCw className="w-6 h-6" />
                 </button>
               </div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const CartPortal = ({ 
  cart, 
  onClose, 
  onUpdateQty, 
  onRemove, 
  onCheckout 
}: { 
  cart: CartItem[], 
  onClose: () => void, 
  onUpdateQty: (id: string, delta: number) => void, 
  onRemove: (id: string) => void,
  onCheckout: () => void
}) => {
  const total = cart.reduce((acc, item) => acc + (item.priceNumber * item.quantity), 0);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex justify-end"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-olive/5 flex items-center justify-between">
          <h3 className="text-2xl font-bold font-display text-olive">سلة المشتريات</h3>
          <button onClick={onClose} className="p-2 hover:bg-olive/5 rounded-full transition-colors text-olive/40 hover:text-olive">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
              <ShoppingCart className="w-16 h-16" />
              <p className="text-xl font-bold">السلة فارغة</p>
            </div>
          ) : (
            cart.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex gap-4 p-4 glass rounded-2xl items-center"
              >
                <img src={item.image} alt={item.arabicName} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-olive truncate">{item.arabicName}</h4>
                  <p className="text-primary font-bold">{item.priceNumber} ر.س</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:bg-olive/10 rounded-lg transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold tabular-nums w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:bg-olive/10 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 border-t border-olive/5 bg-white/50 space-y-6">
            <div className="flex items-center justify-between text-xl font-bold text-olive">
              <span>الإجمالي</span>
              <span className="text-primary">{total} ر.س</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              إتمام الطلب
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const CheckoutPortal = ({ 
  cart, 
  onClose, 
  onSuccess 
}: { 
  cart: CartItem[], 
  onClose: () => void, 
  onSuccess: () => void 
}) => {
  const [step, setStep] = useState(1);
  const total = cart.reduce((acc, item) => acc + (item.priceNumber * item.quantity), 0);

  const handlePayment = () => {
    setStep(3);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-[#FDFBF7] flex flex-col items-center py-20 px-6 overflow-y-auto no-scrollbar"
    >
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-12">
          <button onClick={onClose} className="p-2 hover:bg-olive/5 rounded-full transition-colors text-olive/40 hover:text-olive">
            <ChevronLeft className="w-8 h-8 rotate-180" />
          </button>
          <div className="flex items-center gap-4">
               {[1, 2, 3].map((s) => (
                 <div key={s} className="flex items-center">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                      step === s ? "bg-primary text-white transform scale-125" : 
                      step > s ? "bg-sage text-white" : "bg-olive/5 text-olive/40"
                    )}>
                      {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                    </div>
                    {s < 3 && <div className={cn("w-12 h-1 mx-2 rounded-full", step > s ? "bg-sage" : "bg-olive/5")} />}
                 </div>
               ))}
          </div>
          <div className="w-12" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <h2 className="text-3xl font-bold font-display text-olive">عنوان الشحن</h2>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-olive/60">الاسم الكامل</label>
                    <input type="text" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" placeholder="مثلاً: وسام قن" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-olive/60">رقم الجوال</label>
                    <input type="tel" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage font-mono" placeholder="+966 5..." />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-olive/60">المدينة</label>
                    <input type="text" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" placeholder="الرياض" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-olive/60">العنوان بالتفصيل</label>
                    <textarea rows={3} className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" placeholder="الحي، الشارع، رقم المبنى..." />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-2xl flex items-center justify-center gap-3"
                >
                  المتابعة للدفع
                  <ChevronLeft className="w-6 h-6 rotate-180" />
                </button>
              </div>

              <div className="space-y-8">
                 <h2 className="text-3xl font-bold font-display text-olive">ملخص الطلب</h2>
                 <div className="glass rounded-[2rem] p-8 space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex gap-4">
                           <div className="relative">
                             <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                             <span className="absolute -top-2 -right-2 bg-sage text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                           </div>
                           <div>
                              <p className="font-bold text-olive">{item.arabicName}</p>
                              <p className="text-sm text-olive/60">{item.name}</p>
                           </div>
                        </div>
                        <p className="font-bold text-primary">{item.priceNumber * item.quantity} ر.س</p>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-olive/10 space-y-4">
                       <div className="flex justify-between text-olive/60">
                         <span>المجموع الفرعي</span>
                         <span>{total} ر.س</span>
                       </div>
                       <div className="flex justify-between text-olive/60">
                         <span>رسوم الشحن</span>
                         <span>مجاني</span>
                       </div>
                       <div className="flex justify-between text-2xl font-bold text-olive pt-4">
                         <span>المجموع الكلي</span>
                         <span className="text-primary">{total} ر.س</span>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto space-y-12"
            >
               <h2 className="text-4xl font-bold font-display text-olive text-center">طريقة الدفع</h2>
               <div className="grid gap-6">
                  <div className="glass p-8 rounded-3xl border-2 border-primary ring-4 ring-primary/5 flex items-center gap-6 cursor-pointer">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <CreditCard className="w-8 h-8 text-primary" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-xl font-bold text-olive">بطاقة مدى / أبل باي</h4>
                        <p className="text-olive/60">دفع آمن وفوري</p>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                     </div>
                  </div>

                  <div className="glass p-8 rounded-3xl border-2 border-transparent flex items-center gap-6 cursor-pointer opacity-60">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Truck className="w-8 h-8 text-olive" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-xl font-bold text-olive">الدفع عند الاستلام</h4>
                        <p className="text-olive/60">رسوم إضافية ٢٥ ر.س</p>
                     </div>
                     <div className="w-6 h-6 rounded-full border-2 border-olive/20" />
                  </div>
               </div>

               <div className="glass p-8 rounded-[2rem] space-y-6">
                  <div className="grid gap-4">
                     <input type="text" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage font-mono" placeholder="رقم البطاقة" />
                     <div className="grid grid-cols-2 gap-4">
                        <input type="text" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage font-mono" placeholder="MM/YY" />
                        <input type="text" className="w-full bg-white border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage font-mono" placeholder="CVV" />
                     </div>
                  </div>
               </div>

               <button 
                  onClick={handlePayment}
                  className="w-full bg-primary text-white py-6 rounded-2xl text-2xl font-bold shadow-2xl flex items-center justify-center gap-3"
               >
                  تأكيد الدفع لـ {total} ر.س
                  <CheckCircle className="w-7 h-7" />
               </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-20"
            >
               <div className="w-32 h-32 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                  >
                     <CheckCircle className="w-20 h-20 text-sage" />
                  </motion.div>
               </div>
               <h2 className="text-5xl font-bold font-display text-olive">تم استلام طلبك بنجاح!</h2>
               <p className="text-xl text-olive/60 max-w-lg mx-auto leading-relaxed">
                  شكراً لثقتك بـ "ترياق". سنقوم بتوصيل خلطتك العشبية المخصصة إليك في غضون ٢-٤ أيام عمل.
               </p>
               <button 
                onClick={onSuccess}
                className="bg-primary text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
               >
                العودة للرئيسية
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ product, onAddToCart, onViewDetails }: { product: Product, onAddToCart: (p: Product) => void, onViewDetails: (p: Product) => void, key?: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative glass rounded-[2.5rem] overflow-hidden"
    >
      <div className="aspect-[4/5] overflow-hidden relative" onClick={() => onViewDetails(product)}>
        <img 
          src={product.image} 
          alt={product.arabicName} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white transition-colors hover:text-primary z-10"
        >
           <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-sage bg-sage/10 px-3 py-1 rounded-full">{product.name}</span>
          <div className="flex items-center gap-1 text-gold">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold text-olive">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-olive">{product.arabicName}</h3>
        <p className="text-olive/60 line-clamp-2 text-sm leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-olive/5">
          <span className="text-2xl font-bold text-primary">{product.price}</span>
          <button 
            onClick={() => onViewDetails(product)}
            className="text-sm font-bold text-olive hover:text-sage transition-colors flex items-center gap-1"
          >
            التفاصيل
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'story' | 'blog' | 'contact' | 'faq' | 'terms' | 'disclaimer' | 'category' | 'product-details'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleCategoryView = (cat: Category) => {
    setSelectedCategory(cat);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setView('home');
  };

  const productsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch (view) {
      case 'story':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-5xl mx-auto space-y-20 text-center"
          >
            <div className="space-y-6">
              <span className="text-sage font-bold tracking-widest uppercase text-sm">تراثنا ورؤيتنا</span>
              <h1 className="text-5xl md:text-7xl font-bold font-display text-olive">قصة ترياق</h1>
              <p className="text-xl text-olive/70 leading-relaxed max-w-3xl mx-auto">
                بدأ "ترياق" من شغف عميق بالحكمة العربية القديمة في العلاج بالأعشاب، مدمجة بأحدث التقنيات الرقمية لنقدم لك حلاً مخصصاً يتناسب مع احتياجات جسمك الفريدة.
              </p>
            </div>
            
            <div className="relative grid md:grid-cols-2 gap-12 text-right p-12 rounded-[4rem] overflow-hidden bg-[#fffefb]">
              <img 
                src="/src/assets/images/our story.jpg" 
                className="absolute inset-0 w-full h-full object-cover -z-10 opacity-20"
                alt="Herbal Background"
              />
              <div className="glass p-10 rounded-[3rem] space-y-6 border-white/40 shadow-2xl">
                <h3 className="text-3xl font-bold text-olive">أصالة المكونات</h3>
                <p className="text-olive/60 leading-relaxed text-lg">نحن نجوب الجبال والوديان لنبحث عن أنقى الأعشاب العضوية، ونحرص على أن تُقطف في أوج جودتها لتمنحك ترياقاً حقيقياً.</p>
              </div>
              <div className="glass p-10 rounded-[3rem] space-y-6 border-white/40 shadow-2xl">
                <h3 className="text-3xl font-bold text-olive">التكنولوجيا والوعي</h3>
                <p className="text-olive/60 leading-relaxed text-lg">عبر محركنا الذكي، نقوم بتحليل أعراضك واحتياجاتك لنقترح لك التركيبة التي تعيد التوازن لحياتك اليومية.</p>
              </div>
            </div>

            <img 
              src="/src/assets/images/our story.jpg" 
              className="w-full rounded-[4rem] shadow-2xl h-[500px] object-cover" 
              alt="Our Story"
            />
          </motion.section>
        );
      case 'blog':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-20"
          >
            <div className="text-center space-y-4">
              <span className="text-sage font-bold tracking-widest uppercase text-sm">مدونة الحكمة</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-olive">مقالات للصحة والوعي</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="glass rounded-[2.5rem] overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1515694346937 + i}-94d85e41e6f0?auto=format&fit=crop&q=80&w=800`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-8 space-y-4 text-right">
                    <span className="text-sage text-xs font-bold">أعشاب ونمط حياة</span>
                    <h3 className="text-xl font-bold text-olive">كيف تبدأ يومك بوعي وطاقة عشبية؟</h3>
                    <p className="text-olive/60 text-sm">اكتشف أفضل الخلطات الصباحية التي تمنحك التركيز والنشاط الطبيعي بدون كافيين...</p>
                    <button className="text-primary font-bold text-sm">اقرأ المزيد</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        );
      case 'contact':
        return (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pt-40 pb-20 px-6 max-w-4xl mx-auto"
          >
            <div className="glass rounded-[4rem] p-12 md:p-20 text-center space-y-12">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-display text-olive">تواصل معنا</h1>
                <p className="text-olive/60 text-lg">فريقنا جاهز للإجابة على جميع استفساراتك حول خلطاتنا.</p>
              </div>

              <div className="grid gap-6 text-right">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-olive/40 mr-4">الاسم</label>
                    <input type="text" className="w-full bg-white/50 border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-olive/40 mr-4">البريد الإلكتروني</label>
                    <input type="email" className="w-full bg-white/50 border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-olive/40 mr-4">الرسالة</label>
                  <textarea rows={5} className="w-full bg-white/50 border border-olive/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-sage" />
                </div>
                <button className="bg-primary text-white py-5 rounded-2xl text-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all">إرسال الرسالة</button>
              </div>
            </div>
          </motion.section>
        );
      case 'faq':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold font-display text-olive">الأسئلة الشائعة</h1>
              <p className="text-olive/60">كل ما تحتاج لمعرفته حول منتجاتنا وخدماتنا</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "كيف أختار الخلطة المناسبة لي؟", a: "يمكنك استخدام نظام التشخيص الذكي الخاص بنا (اختر خلطتك) للإجابة على بعض الأسئلة وسنقوم باقتراح الأنسب لك." },
                { q: "هل الأعشاب المستخدمة عضوية؟", a: "نعم، جميع أعشابنا عضوية بنسبة ١٠٠٪ ومختارة بعناية من مصادر مستدامة." },
                { q: "كم يستغرق التوصيل؟", a: "يستغرق التوصيل عادة من ٢ إلى ٤ أيام عمل لجميع مناطق المملكة." },
                { q: "هل توجد موانع استخدام؟", a: "نوصي دائماً باستشارة طبيبك قبل البدء بأي برنامج عشبي، خاصة إذا كنت تعاني من حالات طبية خاصة أو تتناول أدوية." }
              ].map((item, i) => (
                <div key={i} className="glass p-8 rounded-3xl text-right space-y-4">
                  <h3 className="text-xl font-bold text-olive">{item.q}</h3>
                  <p className="text-olive/60 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.section>
        );
      case 'terms':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-4xl mx-auto space-y-8 text-right"
          >
            <h1 className="text-4xl font-bold font-display text-olive">شروط الاستخدام</h1>
            <div className="glass p-12 rounded-[3rem] space-y-8 text-olive/70 leading-loose">
              <p>باستخدامك لموقع ترياق، فإنك توافق على الالتزام بالشروط والأحكام التالية:</p>
              <ul className="list-disc pr-6 space-y-4">
                <li>المعلومات المقدمة في الموقع هي لأغراض تعليمية وتثقيفية فقط.</li>
                <li>نحن نحتفظ بالحق في تعديل الأسعار أو المنتجات في أي وقت.</li>
                <li>يجب أن تكون في السن القانونية لإجراء عمليات الشراء.</li>
                <li>يتم التعامل مع جميع البيانات الشخصية وفقاً لسياسة الخصوصية.</li>
              </ul>
            </div>
          </motion.section>
        );
      case 'disclaimer':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-4xl mx-auto space-y-8 text-right font-medium"
          >
           <div className="bg-red-50 border-2 border-red-100 p-12 rounded-[3.5rem] space-y-8">
              <h1 className="text-4xl font-bold font-display text-red-900">إخلاء المسؤولية الطبي</h1>
              <div className="text-red-800/80 leading-loose text-lg space-y-6">
                <p>منتجات ترياق هي مكملات عشبية طبيعية وليست أدوية كيميائية. لم يتم تقييم هذه المنتجات من قبل الهيئات الصحية لتشخيص أو علاج أو شفاء أو منع أي مرض.</p>
                <p>يُرجى استشارة ممارس رعاية صحية مرخص قبل استخدام أي منتج عشبي، خاصة إذا كنتِ حاملاً، أو مرضعة، أو تتناولين أدوية طبية، أو لديك حالة صحية مشخصة.</p>
                <p>ترياق لا يتحمل أي مسؤولية عن سوء استخدام المنتجات أو تجاهل الاستشارة الطبية المتخصصة.</p>
              </div>
           </div>
          </motion.section>
        );
      case 'category':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-20"
          >
            <div className="text-center space-y-4">
              <span className="text-sage font-bold tracking-widest uppercase text-sm">مجموعتنا</span>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-olive">
                {QUIZ_DATA.find(c => c.id === selectedCategory)?.title || 'المنتجات'}
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-sage to-olive mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PRODUCTS.filter(p => !selectedCategory || p.category === selectedCategory).map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            {PRODUCTS.filter(p => !selectedCategory || p.category === selectedCategory).length === 0 && (
              <div className="text-center py-20 text-olive/40 space-y-4">
                <Zap className="w-16 h-16 mx-auto opacity-20" />
                <p className="text-xl font-bold">عذراً، لا توجد منتجات حالياً في هذه الفئة</p>
                <button onClick={() => setView('home')} className="text-primary font-bold underline">العودة للرئيسية</button>
              </div>
            )}
          </motion.section>
        );
      case 'product-details':
        if (!selectedProduct) return null;
        return (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-40 pb-20 px-6 max-w-7xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
              >
                <img src={selectedProduct.image} alt={selectedProduct.arabicName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              <div className="space-y-10 text-right">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <span className="text-olive/40 text-sm mr-2">({selectedProduct.reviews} تقييم)</span>
                    </div>
                    <span className="text-sage font-bold tracking-widest uppercase text-sm border-b-2 border-sage/20 pb-1">
                      {QUIZ_DATA.find(c => c.id === selectedProduct.category)?.title}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold font-display text-olive">{selectedProduct.arabicName}</h1>
                  <p className="text-2xl text-primary font-bold">{selectedProduct.price}</p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-olive">عن هذه الخلطة</h3>
                  <p className="text-xl text-olive/70 leading-relaxed">{selectedProduct.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass p-8 rounded-3xl space-y-4">
                    <h4 className="text-lg font-bold text-sage">المكونات العضوية</h4>
                    <ul className="space-y-2 text-olive/80">
                      {selectedProduct.ingredients.map(ing => (
                        <li key={ing} className="flex items-center gap-2 justify-end">
                          {ing}
                          <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass p-8 rounded-3xl space-y-4">
                    <h4 className="text-lg font-bold text-sage">الفوائد الصحية</h4>
                    <ul className="space-y-2 text-olive/80">
                      {selectedProduct.benefits.map(ben => (
                        <li key={ben} className="flex items-center gap-2 justify-end">
                          {ben}
                          <div className="w-1.5 h-1.5 rounded-full bg-sage" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full bg-primary text-white py-6 rounded-2xl text-2xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    إضافة للسلة
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setView('home')}
                    className="w-full sm:w-auto px-8 py-6 rounded-2xl border-2 border-olive/10 text-olive hover:bg-olive/5 transition-all font-bold"
                  >
                    العودة للتسوق
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-32 space-y-12">
              <h2 className="text-3xl font-bold font-display text-olive text-center">أهم الأسئلة حول {selectedProduct.arabicName}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { q: "كيفية التحضير؟", a: "يُنصح بوضع ملعقة منه في ماء حار لمدة ١٠ دقائق قبل الشرب." },
                  { q: "كم مرة يُستخدم؟", a: "يُفضل استخدامه مرة أو مرتين يومياً للحصول على أفضل توازن." }
                ].map((faq, i) => (
                  <div key={i} className="glass p-8 rounded-3xl text-right">
                    <h4 className="text-xl font-bold text-olive mb-2">{faq.q}</h4>
                    <p className="text-olive/60">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        );
      default:
        return (
          <>
            <Hero onStartQuiz={() => setShowQuiz(true)} onShowProducts={scrollToProducts} />
            
            <section ref={productsRef} className="py-32 px-6 max-w-7xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                <span className="text-sage font-bold tracking-widest uppercase text-sm">مجموعتنا المختارة</span>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-olive">اكتشف خلطاتنا الطبيعية</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-sage to-olive mx-auto rounded-full" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PRODUCTS.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </section>

            {/* Cinematic Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
               <img 
                src="/src/assets/images/regenerated_image_1779135494219.png" 
                className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
                alt="Nature"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#FDFBF7]" />
               
               <div className="relative text-center text-white space-y-8 px-6 max-w-4xl">
                  <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight">نعيد تعريف علاقتك <br /> <span className="italic text-sage">بالطبيعة</span></h2>
                  <p className="text-xl text-white/80 leading-relaxed">نؤمن أن الطبيعة تمتلك الإجابات لكل تساؤلات أجسامنا. نحن هنا فقط لنجمع لك أصفاها.</p>
                  <button 
                    onClick={() => setShowQuiz(true)}
                    className="bg-white text-primary px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    ابدأ رحلتك اليوم
                  </button>
               </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="antialiased font-sans selection:bg-sage/30">
      <Navbar 
        onStartQuiz={() => setShowQuiz(true)} 
        onShowProducts={scrollToProducts} 
        onShowCart={() => setShowCart(true)}
        cartCount={cartCount}
        onNavigateHome={() => setView('home')}
        onNavigateStory={() => setView('story')}
        onNavigateBlog={() => setView('blog')}
        onNavigateContact={() => setView('contact')}
        currentView={view}
      />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-20 px-6 border-t border-olive/5 bg-olive/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Logo />
            <p className="text-olive/60 text-sm leading-relaxed">أول منصة ذكية للعلاجات العشبية المخصصة في العالم العربي. نجمع بين الحكمة القديمة والتقنيات الحديثة باسم "ترياق".</p>
          </div>
          
          <div>
            <h4 className="font-bold text-olive mb-6">المنتجات</h4>
            <ul className="space-y-4 text-sm text-olive/60">
              <li><button onClick={() => handleCategoryView('sleep')} className="hover:text-primary transition-colors">خلطات النوم</button></li>
              <li><button onClick={() => handleCategoryView('colon')} className="hover:text-primary transition-colors">علاجات القولون</button></li>
              <li><button onClick={() => handleCategoryView('immunity')} className="hover:text-primary transition-colors">تقوية المناعة</button></li>
              <li><button onClick={() => handleCategoryView('headache')} className="hover:text-primary transition-colors">منتجات الصداع</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-olive mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-sm text-olive/60">
              <li><button onClick={() => setView('story')} className="hover:text-primary transition-colors">عن ترياق</button></li>
              <li><button onClick={() => setView('faq')} className="hover:text-primary transition-colors">الأسئلة الشائعة</button></li>
              <li><button onClick={() => setView('terms')} className="hover:text-primary transition-colors">شروط الاستخدام</button></li>
              <li><button onClick={() => setView('disclaimer')} className="hover:text-primary transition-colors">إخلاء المسؤولية الطبي</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-olive mb-6">اشترك في نشرتنا</h4>
            <div className="relative">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full bg-white border border-olive/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-all"
              />
              <button className="absolute left-2 top-2 bg-sage text-white px-4 py-1 rounded-lg text-sm font-bold">انضم</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-olive/10 text-center text-xs text-olive/40 font-medium">
          جميع الحقوق محفوظة لترياق © ٢٠٢٤
        </div>
      </footer>
      
      <AnimatePresence>
        {showQuiz && (
          <QuizPortal 
            onClose={() => setShowQuiz(false)} 
            onAddToCart={(p) => {
              addToCart(p);
              setShowQuiz(false);
            }} 
          />
        )}
        {showCart && (
          <CartPortal 
            cart={cart}
            onClose={() => setShowCart(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
            onCheckout={() => {
              setShowCart(false);
              setShowCheckout(true);
            }}
          />
        )}
        {showCheckout && (
          <CheckoutPortal 
            cart={cart}
            onClose={() => setShowCheckout(false)}
            onSuccess={handleCheckoutSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
