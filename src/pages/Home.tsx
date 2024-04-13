import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import logoImage from '../assets/PWA_LOGO-02-white-crop-logo.png';
import { Helmet } from "react-helmet";
import Lottie from 'react-lottie';
import spinner from '../assets/spinner.json';
import notfound from '../assets/notfound.json';
import found from '../assets/found.json';
import { CSSTransition } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface FormData {
    firstName: string;
    lastName: string;
    generation: string;
    id: string;
}

interface ApiData {
    id: string;
    prefix: string;
    first_name: string;
    last_name: string;
    generation: string;
}

const Home: React.FC = () => {

    const spinnerOptions = {
        loop: true,
        autoplay: true,
        animationData: spinner,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const notfoundOptions = {
        loop: false,
        autoplay: true,
        animationData: notfound,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const foundOptions = {
        loop: false,
        autoplay: true,
        animationData: found,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const [bgColor, setBgColor] = useState('bg-gradient-to-tl from-red-100 to-purple-900');
    const [bgColorChange, setBgColorChange] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        generation: '',
        id: ''
    });
    const [apiData, setApiData] = useState<ApiData[]>([]);
    const [displayData, setDisplayData] = useState<ApiData[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const changeBgColor = (colorClass: string) => {
        setBgColor(colorClass);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setBgColorChange(false)
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const firstNameLower = formData.firstName.toLowerCase();
        const lastNameLower = formData.lastName.toLowerCase();

        const tempData = apiData

        const filteredData = tempData.filter((data) => {
            const apiFirstNameLower = data.first_name.toLowerCase();
            const apiLastNameLower = data.last_name.toLowerCase();

            // Check if the entered firstName matches
            const firstNameMatch = apiFirstNameLower.includes(firstNameLower);

            // Check if the entered lastName matches (if lastName is provided)
            const lastNameMatch = lastNameLower === '' || apiLastNameLower.includes(lastNameLower);

            // Return true if firstName and optionally lastName match
            return firstNameMatch && lastNameMatch;
        });

        setDisplayData(filteredData);
        if (bgColorChange) {
            changeBgColor('bg-gradient-to-tl from-blue-200 to-blue-800');
        } else {
            changeBgColor('bg-gradient-to-tl from-red-100 to-purple-900');
        }
        openModal();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make two separate API calls concurrently
                const [response1, response2] = await Promise.all([
                    axios.get<ApiData[]>('https://script.google.com/macros/s/AKfycbz8bMqHqNuWcvi0mDkxxmRyxdQJNgpRBK23IXhPTv2hQAChEgLfah7HhAOg6FzeEnhgPw/exec?action=getM6'),
                    axios.get<ApiData[]>('https://script.google.com/macros/s/AKfycbz8bMqHqNuWcvi0mDkxxmRyxdQJNgpRBK23IXhPTv2hQAChEgLfah7HhAOg6FzeEnhgPw/exec?action=getM3')
                ]);

                const data1 = response1.data;
                const data2 = response2.data;

                // Combine data from both APIs
                const combinedData = [...data1, ...data2];

                setApiData(combinedData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center px-4 w-full`}>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>
            <div className="text-center mb-8">
                <img src={logoImage} alt="Logo" className="h-20" />
                <p className="text-sm text-white mt-2">PSU.WITTAYANUSORN ALUMNI</p>
            </div>

            <div className="bg-white shadow rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-extrabold leading-6 text-gray-800 text-center mb-4">ตรวจสอบข้อมูล</h1>
                <p className="text-sm font-medium text-gray-500 text-center mb-5">กรอกชื่อและนามสกุลของศิษย์เก่า</p>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-500">ชื่อ*</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="bg-gray-200 border rounded text-sm text-gray-500 py-2 px-3 w-full"
                            onChange={handleInputChange}
                            value={formData.firstName}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-500">นามสกุล</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="bg-gray-200 border rounded text-sm text-gray-500 py-2 px-3 w-full"
                            onChange={handleInputChange}
                            value={formData.lastName}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold py-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 w-full"
                    >
                        ตรวจสอบ
                    </button>
                </form>
            </div>

            <CSSTransition
                in={isModalOpen}
                timeout={300}
                classNames="modal-fade"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-screen-sm w-full mx-4 my-8 overflow-y-auto relative">
                        <div className="flex items-center justify-center">
                            <h2 className="text-2xl font-semibold mb-4 text-center flex items-center">
                                ข้อมูลที่คุณค้นหา
                                {displayData.length > 0 && <Lottie
                                    options={foundOptions}
                                    height={40}
                                    width={40}
                                />}
                            </h2>
                        </div>

                        {displayData.length > 0 ? (
                            <div className="overflow-x-auto max-h-96">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-3 text-left sm:px-6">ชื่อ</th>
                                            <th className="px-4 py-3 text-left sm:px-6">นามสกุล</th>
                                            <th className="px-4 py-3 text-left sm:px-6">รุ่น</th>
                                            <th className="px-4 py-3 text-left sm:px-6">รหัสประจำตัว</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {displayData.map((data) => (
                                            <tr key={data.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="px-4 py-3 whitespace-nowrap sm:px-6">{data.first_name}</td>
                                                <td className="px-4 py-3 whitespace-nowrap sm:px-6">{data.last_name}</td>
                                                <td className="px-4 py-3 whitespace-nowrap sm:px-6">{data.generation}</td>
                                                <td className="px-4 py-3 whitespace-nowrap sm:px-6">{data.id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>
                                <Lottie
                                    options={notfoundOptions}
                                    height={100}
                                    width={100}
                                />
                                <p className="text-center text-gray-600">ไม่พบข้อมูล</p>
                            </div>

                        )}
                        {/* Close button positioned at the top right of the modal */}
                        <button
                            className="absolute top-4 right-4 bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold py-2 px-3 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
                            onClick={closeModal}
                        >
                            ปิด
                        </button>
                        {/* <button
                            className="absolute top-4 right-4 text-gray-800 text-2xl font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
                            onClick={closeModal}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button> */}
                    </div>
                </div>
            </CSSTransition>





            <CSSTransition
                in={isLoading}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                {isLoading ? (
                    <div className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 fade-in-animation">
                        <Lottie
                            options={spinnerOptions}
                            height={40}
                            width={40}
                        />
                        <p className="text-gray-100 text-sm mt-2">กำลังดาวน์โหลดข้อมูล</p>
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 fade-out-animation">
                        <Lottie
                            options={spinnerOptions}
                            height={40}
                            width={40}
                        />
                        <p className="text-gray-100 text-sm mt-2">กำลังดาวน์โหลดข้อมูล</p>
                    </div>
                )}
            </CSSTransition>

            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-10 text-white px-4 py-1 text-center text-xs">
                <p>Developed and maintained by Neer and Far (Gen 12)</p>
            </div>

        </div>
    );
};

export default Home;
