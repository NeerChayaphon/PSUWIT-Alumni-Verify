import React from 'react';

interface ApiData {
    id: string;
    prefix: string;
    first_name: string;
    last_name: string;
    generation: string;
}
interface ModalProps {
    apiData: ApiData[];
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ apiData, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-screen-md w-full mx-4 my-8 overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4 text-center">ข้อมูลที่คุณค้นหา</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ชื่อ
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    นามสกุล
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    รุ่น
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    รหัสประจำตัว
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiData.map((data) => (
                                <tr key={data.id} className="bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.first_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.last_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.generation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    className="bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded mt-4 ml-auto"
                    onClick={closeModal}
                >
                    ปิด
                </button>
            </div>
        </div>
    );
};

export default Modal;
