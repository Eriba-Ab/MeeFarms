import { MessageCircle, Users } from "lucide-react";

const WHATSAPP_NUMBER = "2348149196557";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello MEE FARMS! I'm interested in your Outgrower Program. Please share more details about how I can participate."
);

const StickyLeadCapture = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Outgrower Signup */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-primary text-white rounded-full px-4 py-3 shadow-2xl hover:bg-primary-darker transition-all duration-300 hover:scale-105 hover:shadow-primary/30"
        title="Join Outgrower Program"
      >
        <Users className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm font-semibold font-body pr-1 max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-300 whitespace-nowrap">
          Join Outgrower Program
        </span>
      </a>

      {/* WhatsApp Chat */}
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-[#25D366] text-white rounded-full px-4 py-3 shadow-2xl hover:bg-[#1ebe5a] transition-all duration-300 hover:scale-105"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm font-semibold font-body pr-1 max-w-0 overflow-hidden group-hover:max-w-[140px] transition-all duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default StickyLeadCapture;
