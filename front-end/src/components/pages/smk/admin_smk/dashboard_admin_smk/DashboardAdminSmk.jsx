import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./DashboardAdminSmk.css";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const DashboardAdminSmk = () => {
    return (
        <div className="dashboard-admin-smk">
            <h2>Dashboard Admin SMK</h2>
            <p>Selamat datang di dashboard admin SMK. Di sini Anda dapat mengelola konten dan data sekolah.</p>
            {/* Add more components or features as needed */}
        </div>
    )
};

export default DashboardAdminSmk;
