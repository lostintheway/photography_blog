import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "Contact Us - Precious Memories",
  description: "Get in touch with Precious Memories",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-8 md:mb-12 animate-fadeIn">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-500 mb-4">
                We&apos;d love to hear from you. Please fill out the form or use
                our contact information below.
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-600">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  (123) 456-7890
                </p>
                <p className="flex items-center text-gray-600">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@preciousmemories.com
                </p>
              </div>
            </div>
            <div className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
