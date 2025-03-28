import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("rgba(3, 29, 68, 1)");

    return (
        <div className="sweet-loading" style={{ justifyContent: "center",alignItems:"center", display:"flex" }} >

            <PulseLoader
                color={color}
                loading={loading}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"

            />
        </div>
    );
}

export default Loader;