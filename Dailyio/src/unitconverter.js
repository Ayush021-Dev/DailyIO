import { useState } from "react";
import "./unitconverter.css";

const Unitconverter = () => {
    const [conversionType, setConversionType] = useState("length");
    const [fromUnit, setFromUnit] = useState("meters");
    const [toUnit, setToUnit] = useState("kilometers");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const conversions = {
        length: {
            meters: 1,
            kilometers: 0.001,
            feet: 3.28084,
            miles: 0.000621371
        },
        mass: {
            grams: 1,
            kilograms: 0.001,
            pounds: 0.00220462,
            ounces: 0.035274
        },
        temperature: {
            celsiusToFahrenheit: (c) => (c * 9/5) + 32,
            fahrenheitToCelsius: (f) => (f - 32) * 5/9,
            celsiusToKelvin: (c) => c + 273.15,
            kelvinToCelsius: (k) => k - 273.15
        }
    };

    const handleConvert = (e) => {
        e.preventDefault();
        if (inputValue === "" || isNaN(inputValue)) {
            alert("Please enter a valid number.");
            return;
        }

        let output;
        if (conversionType === "temperature") {
            const key = fromUnit + "To" + toUnit.charAt(0).toUpperCase() + toUnit.slice(1);
            output = conversions.temperature[key] ? conversions.temperature[key](parseFloat(inputValue)) : "Invalid conversion";
        } else {
            output = (parseFloat(inputValue) * conversions[conversionType][toUnit]) / conversions[conversionType][fromUnit];
        }

        setResult(`${output.toFixed(2)} ${toUnit}`);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <div className="container">
            <h1>Unit Converter</h1>
            <form onSubmit={handleConvert}>
                <label>Select conversion type:</label>
                <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
                    <option value="length">Length</option>
                    <option value="mass">Mass</option>
                    <option value="temperature">Temperature</option>
                </select>

                <label>Enter value:</label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter value"
                />

                <label>From:</label>
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                    {Object.keys(conversions[conversionType]).map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>

                <button type="button" id="xbutt" onClick={swapUnits}>
                    <img src="exchange.svg" alt="Swap Units" />
                </button>

                <label>To:</label>
                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                    {Object.keys(conversions[conversionType]).map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                    ))}
                </select>

                <button type="submit">Convert</button>
            </form>

            {result && <div className="result">{result}</div>}
        </div>
    );
};

export default Unitconverter;
