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
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.022 1.022-1.756 2.119-2.259 3.357-.506 1.238-.749 2.565-.949 4.255-.2 1.69.016 3.386.25 5.05.234 1.664.703 3.27 1.408 4.744.705 1.475 1.635 2.77 2.789 3.924 1.154 1.154 2.449 2.084 3.924 2.789 1.475.705 3.08 1.174 4.744 1.408 1.664.234 3.36.45 5.05.25 1.69-.2 3.017-.443 4.255-.949 1.238-.503 2.335-1.236 3.356-2.259 1.022-1.022 1.756-2.119 2.259-3.357.506-1.238.749-2.565.949-4.255.2-1.69-.016-3.386-.25-5.05-.234-1.664-.703-3.27-1.408-4.744-.705-1.475-1.635-2.77-2.789-3.924-1.154-1.154-2.449-2.084-3.924-2.789-1.475-.705-3.08-1.174-4.744-1.408-1.664-.234-3.36-.45-5.05-.25z" />
      </svg>
      <span className="absolute right-16 bg-[#25D366] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
