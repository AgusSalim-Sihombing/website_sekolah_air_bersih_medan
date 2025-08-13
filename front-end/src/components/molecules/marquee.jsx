import Marquee from "react-fast-marquee";

const TeksBerjalan = () => {
    return (
        <Marquee
            style={{
                background: "linear-gradient(90deg, rgba(3,29,68,1) 0%, rgba(79,103,136,1) 100%)",
                color: "white",
                padding: "4px 0",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                letterSpacing: "0.5px"
            }}
            speed={50}
            gradient={false} // Biar gak ada gradasi ujung yang ngeblur
        >
            🎉 Selamat kepada siswa/i yang telah lulus masuk ke Sekolah Advent Jalan Air Bersih | 🎓 Selamat kepada siswa/i yang telah lulus masuk ke Sekolah Advent Jalan Air Bersih
        </Marquee>
    );
};

export default TeksBerjalan;
