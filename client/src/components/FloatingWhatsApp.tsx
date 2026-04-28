/**
 * FloatingWhatsApp Component
 * Design: Fixed floating button in bottom-right corner
 * - Color: WhatsApp green (#25D366)
 * - Always visible for quick contact
 */
export default function FloatingWhatsApp() {
  const whatsappNumber = "233243105412";
  const whatsappMessage = "Hello! I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <svg
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.001.332.005c.109.004.253-.041.397.301.144.344.491 1.199.534 1.286.044.087.073.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.101-.177.211-.077.383.101.173.446.735.956 1.19.658.587 1.212.769 1.385.855.173.087.275.072.376-.043.101-.116.433-.506.548-.68.116-.173.231-.144.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1-3.607c-.61-1.062-.932-2.269-.932-3.504 0-3.759 3.057-6.816 6.817-6.816 3.76 0 6.817 3.057 6.817 6.816s-3.057 6.816-6.817 6.816z" />
      </svg>
      <span className="absolute right-16 bg-[#25D366] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
