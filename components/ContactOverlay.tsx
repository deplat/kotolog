
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from "react-icons/fa";

export const ContactOverlay = ({ onClose }: { onClose: () => void }) => {
    const contactMethods = [
        {
            name: "WhatsApp",
            url: "https://wa.me/+79997855492",
            icon: <FaWhatsapp className="inline-block mr-2" />
        },
        {
            name: "Telegram",
            url: "https://t.me/+79997855492",
            icon: <FaTelegramPlane className="inline-block mr-2" />
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/kotolife76",
            icon: <FaInstagram className="inline-block mr-2" />
        }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-md shadow-lg">
                <h2 className="text-2xl mb-2">Свяжитесь с нами:</h2>
                <hr className='mb-4' style={{border: "1px solid #F35627"}}/>
                <ul>
                    {contactMethods.map((method) => (
                        <li key={method.name} className="mb-4">
                            <a href={method.url} target="_blank" rel="noopener noreferrer" className="btn primary py-1 px-2 rounded-md">
                                {method.icon}
                                {method.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex'>
                    <button onClick={onClose} className="ms-auto py-2 px-4 hover:underline">Закрыть</button>
                </div>
            </div>
        </div>
    );
};

