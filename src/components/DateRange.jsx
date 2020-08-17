import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const DateRange = ({callback}) => {

    const sendDateRange = () => {
        callback(from, to);
    };

    useEffect(() => {
        sendDateRange();
    });
    
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    return (
        <div id="date-picker-range">
            <div class="date-container">
                <span>From:</span>
                <DatePicker
                    selected={from}
                    onChange={date => setFrom(date)}
                    selectsStart
                    startDate={from}
                    endDate={to}
                />
            </div>
            <div class="date-container">
                <span>To:</span>
                <DatePicker
                    selected={to}
                    onChange={date => setTo(date)}
                    selectsEnd
                    startDate={from}
                    endDate={to}
                    minDate={from}
                />
            </div>
        </div>
    );

};

export default DateRange;