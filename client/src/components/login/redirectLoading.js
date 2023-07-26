import React from "react";
import { DoubleBubble } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

// https://github.com/venushadilshan/react-spinner-animated?ref=reactjsexample.com
const RedirectLoading = () => {
    return (
        <div className="loading-container">
            <DoubleBubble text="Redirect to login" center={true} width={120} height={120} />
        </div>
    );
};

export default RedirectLoading;
