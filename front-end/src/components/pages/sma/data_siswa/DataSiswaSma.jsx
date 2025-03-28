// import GrafikTotalSiswa from "./grafik/GrafikTotalSiswa"
import DataKelasSMA from "./data_kelas_sma/DataKelasSma";
import GrafikTotalSiswaBulanan from "./grafik/GrafikTotalSiswaBulanan";


const DataSiswaSma = () => {
    return (
        <div>
            <DataKelasSMA />
            <GrafikTotalSiswaBulanan/>
        </div>
    )
}

export default DataSiswaSma;