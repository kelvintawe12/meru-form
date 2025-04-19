import { useState, useEffect } from 'react';
import { 
  MessageCircle, Phone, Mail, Smartphone, Clock, 
  MapPin, ChevronRight, LifeBuoy, AlertCircle,
  CheckCircle2, Globe, Video, MessageSquareText, Smile, Send, 
  Truck, User, CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

const Help: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Auto-reply simulation
  useEffect(() => {
    if (messages.length === 0 || messages[messages.length - 1].sender === 'support') return;

    const timer = setTimeout(() => {
      setIsTyping(true);
      const replyTimer = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            text: t('help.autoReply'),
            sender: 'support',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 2000);

      return () => clearTimeout(replyTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, [messages, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus(t('help.formSuccess'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        text: chatMessage,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
    setChatMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 mt-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <LifeBuoy className="h-10 w-10 text-blue-600" />
            {t('help.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('help.subtitle')}
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 mb-12 justify-center">
          {['contact', 'faq', 'status'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                activeSection === section
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section === 'contact' && <MessageCircle className="h-5 w-5" />}
              {section === 'faq' && <AlertCircle className="h-5 w-5" />}
              {section === 'status' && <CheckCircle2 className="h-5 w-5" />}
              {t(`help.${section}`)}
            </button>
          ))}
        </nav>

        {activeSection === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div className="space-y-8">
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Smile className="h-8 w-8 text-blue-600" />
                  {t('help.immediateHelp')}
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MessageCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
                        <a
                          href="https://wa.me/250788123456"
                          className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 flex items-center gap-2 w-fit"
                        >
                          <MessageCircle className="h-5 w-5" />
                          {t('help.startChat')}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t('help.phoneSupport')}</h3>
                        <div className="space-y-2">
                          <a href="tel:+250788123456" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                            <Phone className="h-5 w-5" />
                            +250 788 123 456
                          </a>
                          <a href="tel:+250733987654" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                            <Phone className="h-5 w-5" />
                            +250 733 987 654
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold">{t('help.supportHours')}</h3>
                      </div>
                      <ul className="space-y-2 text-gray-600">
                        <li>Mon-Fri: 7AM - 9PM</li>
                        <li>Saturday: 8AM - 8PM</li>
                        <li>Sunday: 9AM - 5PM</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold">{t('help.visitUs')}</h3>
                      </div>
                      <p className="text-gray-600">
                        KN 45 St, Kigali Heights<br/>
                        Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MessageSquareText className="h-8 w-8 text-blue-600" />
                  {t('help.liveChat')}
                </h2>

                <div className="h-96 flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs p-4 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span>{t('help.typing')}</span>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleChatSubmit} className="border-t pt-4">
                    <div className="flex gap-2">
                      <input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder={t('help.chatPlaceholder')}
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send className="h-5 w-5" />
                        {t('help.send')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Mail className="h-8 w-8 text-blue-600" />
                  {t('help.emailFormTitle')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('help.fullName')}</label>
                    <div className="relative">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                      />
                      <User className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                      />
                      <Mail className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('help.subject')}</label>
                    <div className="relative">
                      <input
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={t('help.subjectPlaceholder')}
                      />
                      <AlertCircle className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t('help.message')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={5}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={t('help.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Send className="h-5 w-5" />
                    {t('help.sendMessage')}
                  </button>

                  {formStatus && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                      {formStatus}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'faq' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-6">
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">{t('help.faqCategories')}</h2>
                <div className="space-y-4">
                  {['ordering', 'payments', 'delivery', 'account'].map((category) => (
                    <button
                      key={category}
                      className="w-full p-4 bg-white rounded-xl text-left hover:shadow-md transition-shadow flex items-center justify-between"
                    >
                      <span className="font-medium">{t(`help.${category}`)}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-6">{t('help.popularQuestions')}</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: 'help.faq1',
                      answer: 'help.faq1Answer',
                      icon: <Globe className="h-5 w-5 text-blue-600" />
                    },
                    {
                      question: 'help.faq2',
                      answer: 'help.faq2Answer',
                      icon: <CreditCard className="h-5 w-5 text-green-600" />
                    },
                    {
                      question: 'help.faq3',
                      answer: 'help.faq3Answer',
                      icon: <Truck className="h-5 w-5 text-purple-600" />
                    }
                  ].map((faq, index) => (
                    <details key={index} className="group border rounded-xl p-4 hover:border-blue-200">
                      <summary className="flex items-center gap-3 cursor-pointer">
                        {faq.icon}
                        <span className="font-medium">{t(faq.question)}</span>
                      </summary>
                      <p className="mt-3 ml-8 text-gray-600">{t(faq.answer)}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Help;