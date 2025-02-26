import React from "react";


const tugasPimpinan = [
    {
        jabatan: "Kepala Sekolah",
        deskripsi:
            "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document. To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar.",
    },
    {
        jabatan: "Wakil Kepala Sekolah",
        deskripsi:
            "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document. To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar.",
    },
    {
        jabatan: "Bendahara",
        deskripsi:
            "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document. To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar.",
    },
];

const DeskripsiTugas = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg" style={{padding:"30px"}}>
            <h1 className="text-center text-x1 font-bold mb-6">
                Deskripsi Tugas Pimpinan SMA Tahun 2024/2025
            </h1>
            {tugasPimpinan.map((tugas, index) => (
                <div key={index} className="mb-5">
                    <h2 className="text-lg font-semibold">{index + 1}. {tugas.jabatan}</h2>
                    <p className="text-gray-700 text-justify mt-2">{tugas.deskripsi}</p>
                </div>
            ))}
        </div>
    );
};

export default DeskripsiTugas;
