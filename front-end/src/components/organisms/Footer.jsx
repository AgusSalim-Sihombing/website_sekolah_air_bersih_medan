import "../../styles/organisms/Footer.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

const Footer = () => {
    return (
        // <footer>
        //     <div>
        //         <div className="container-costum" >
        //             <div className="row" >
        //                 <div className="col-md-4">
        //                     <h5>Arsip :</h5>
        //                     <ul className="list-unstyled">
        //                         <li>Tahun 2014</li>
        //                         <li>Tahun 2015</li>
        //                         <li>Tahun 2016</li>
        //                         <li>Tahun 2017</li>
        //                         <li>Tahun 2018</li>
        //                         <li>Tahun 2019</li>
        //                     </ul>
        //                 </div>
        //                 <div className="col-md-4">
        //                     <h5>Unit Lainnya :</h5>
        //                     <ul className="list-unstyled">
        //                         <li>SMP</li>
        //                         <li>SMA</li>
        //                         <li>SMK</li>
        //                     </ul>
        //                 </div>
        //                 <div className="col-md-3" >
        //                     <table className="table costum-table" >
        //                         <tbody>
        //                             <tr>
        //                                 <td >NPSN </td>
        //                                 <td>:</td>
        //                                 <td>000000</td>
        //                             </tr>
        //                             <tr>
        //                                 <td>No.Tlp </td>
        //                                 <td>:</td>
        //                                 <td>0800-0000-0000</td>
        //                             </tr>
        //                             <tr>
        //                                 <td>No WA</td>
        //                                 <td>:</td>
        //                                 <td>0800-0000-0000</td>
        //                             </tr>
        //                             <tr>
        //                                 <td>Email</td>
        //                                 <td>:</td>
        //                                 <td>abc@gmail.com</td>
        //                             </tr>
        //                             <tr>
        //                                 <td colSpan="1" className="text-center">Jalan Air Bersih Medan</td>
        //                             </tr>
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //             <div className="text-center mt-4">
        //                 <p>CopyRight © 2024 - SMAS ADVENT AIR BERSIH MEDAN</p>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <footer>
            <Card.Footer className="body-footer">

                <div className="footer">
                    <div className="col-md-4">
                        <h5>Arsip :</h5>
                        <ul className="list-unstyled">
                            <li>Tahun 2014</li>
                            <li>Tahun 2015</li>
                            <li>Tahun 2016</li>
                            <li>Tahun 2017</li>
                            <li>Tahun 2018</li>
                            <li>Tahun 2019</li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h5>Unit Lainnya :</h5>
                        <ul className="list-unstyled">
                            <li>SMP</li>
                            <li>SMA</li>
                            <li>SMK</li>
                        </ul>
                    </div>
                    <div className="col-md-3" >
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
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>CopyRight © 2024 - SMAS ADVENT AIR BERSIH MEDAN</p>
                </div>
            </Card.Footer>
        </footer>

    )
}

export default Footer;