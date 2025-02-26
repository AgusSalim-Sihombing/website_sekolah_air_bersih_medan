import "../../../../styles/pages/sma/profile_sma/ProfileSma.css"


const ProfileSma = () => {
    return (
        <div className="profile">
            <div className="title">Profile Sekolah</div>
            {/* <div className="col-md-3" >
                <table className="table costum-table" >
                    <tbody className="tbody">
                        <tr>
                            <td >NPSN </td>
                            <td>:</td>
                            <td>000000</td>
                        </tr>
                        <tr>
                            <td>No.Tlp </td>
                            <td>:</td>
                            <td>0800-0000-0000</td>
                        </tr>
                        <tr>
                            <td>No WA</td>
                            <td>:</td>
                            <td>0800-0000-0000</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>abc@gmail.com</td>
                        </tr>
                        <tr>
                            <td colSpan="4" className="text-center">Jalan Air Bersih Medan</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
            <div className="table-profile-sma">
                <table >
                    <tbody className="tbody-profile-sma">
                        <tr>
                            <td>Kepala Sekolah</td>
                            <td>:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Nama Sekolah</td>
                            <td>:</td>
                            <td>SMA ADVENT AIR BERSIH</td>
                        </tr>
                        <tr>
                            <td>Status Sekolah</td>
                            <td>:</td>
                            <td>SWASTA</td>
                        </tr>
                        <tr>
                            <td>Status Kepemilikan</td>
                            <td>:</td>
                            <td>Yayasan</td>
                        </tr>
                        <tr>
                            <td>NSS</td>
                            <td>:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Alamat Sekolah</td>
                            <td>:</td>
                            <td>JL. AIR BERSIH NO. 98 A</td>
                        </tr>
                        <tr>
                            <td>Desa/Kelurahan</td>
                            <td>:</td>
                            <td>Sudi Rejo I</td>
                        </tr>
                        <tr>
                            <td>Kecamatan/Kota(LN)</td>
                            <td>:</td>
                            <td>Kec. Medan Kota</td>
                        </tr>
                        <tr>
                            <td>Kab.-Kota/Negara(LN)</td>
                            <td>:</td>
                            <td>Kota Medan</td>
                        </tr>
                        <tr>
                            <td>Profinsi</td>
                            <td>:</td>
                            <td>Prov. Sumatera Utara</td>
                        </tr>
                        <tr>
                            <td>Bentuk Pendidikan</td>
                            <td>:</td>
                            <td>SMA</td>
                        </tr>
                        <tr>
                            <td>Nomor Telepon</td>
                            <td>:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>:</td>
                            <td>Yayasan</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="denah">Denah Sekolah</div>

            <div className="denah-sekolah">
                <div className="box">
                    <img
                        src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                        width="100%"
                        height="100%"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </div>

            </div>
        </div>
    )
}

export default ProfileSma;