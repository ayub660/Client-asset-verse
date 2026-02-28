import { FaQuestionCircle, FaEnvelope, FaBook, FaLifeRing } from "react-icons/fa";

const Help = () => {
    const faqs = [
        {
            question: "How do I request an asset?",
            answer: "Go to the Asset List from your dashboard, click on 'View Details' of the asset you need, and then click the 'Request This Asset' button. You can provide a note for HR as well."
        },
        {
            question: "How long does it take for approval?",
            answer: "Usually, HR reviews requests within 1-2 business days. You will see the status update in your 'My Requests' page."
        },
        {
            question: "Can I cancel a request?",
            answer: "Yes, as long as the request is in 'pending' status, you can cancel it from your request list."
        },
        {
            question: "What if an asset is out of stock?",
            answer: "If an asset's quantity is 0, the request button will be disabled. You can contact HR for restock information."
        }
    ];

    return (
        <div className="p-4 md:p-10 max-w-6xl mx-auto bg-gray-50 min-h-screen rounded-2xl shadow-inner mt-5">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-blue-700 flex justify-center items-center gap-3">
                    <FaLifeRing className="animate-pulse" /> Help & Support Center
                </h1>
                <p className="text-gray-600 mt-3 text-lg">Everything you need to know about using our Asset Management System.</p>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-blue-500 hover:shadow-lg transition-all">
                    <FaBook className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">User Guides</h3>
                    <p className="text-gray-500 text-sm">Step-by-step instructions for HR and Employees.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-green-500 hover:shadow-lg transition-all">
                    <FaEnvelope className="text-4xl text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Contact HR</h3>
                    <p className="text-gray-500 text-sm">Directly email your HR department for urgent issues.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-orange-500 hover:shadow-lg transition-all">
                    <FaQuestionCircle className="text-4xl text-orange-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">System Status</h3>
                    <p className="text-gray-500 text-sm">Check if all system services are running smoothly.</p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group border rounded-xl overflow-hidden transition-all">
                            <summary className="flex items-center justify-between p-5 font-semibold text-gray-700 cursor-pointer bg-gray-50 hover:bg-blue-50">
                                {faq.question}
                                <span className="text-blue-500 transition-transform group-open:rotate-180">▼</span>
                            </summary>
                            <div className="p-5 text-gray-600 bg-white border-t leading-relaxed">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>

            {/* Footer Support */}
            <div className="mt-16 text-center bg-blue-600 text-white p-10 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                <p className="mb-6 opacity-90">Our technical support team is available 24/7 for your assistance.</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-extrabold hover:bg-gray-100 transition-colors">
                    Chat with Support
                </button>
            </div>
        </div>
    );
};

export default Help;