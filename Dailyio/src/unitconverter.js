import { useState } from "react";
import convert from "convert-units";
import "./unitconverter.css";

const UnitConverter = () => {
    const [measure, setMeasure] = useState("length");
    const [fromUnit, setFromUnit] = useState("m");
    const [toUnit, setToUnit] = useState("km");
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");
    const [showBest, setShowBest] = useState(false);

    const measures = convert().measures();
    const units = convert().possibilities(measure);
    const allUnits = convert().list(measure);

    const handleConvert = (e) => {
        e.preventDefault();
        if (!inputValue || isNaN(inputValue)) {
            alert("Please enter a valid number");
            return;
        }

        try {
            let output;
            if (measure === "temperature") {
                output = convert(parseFloat(inputValue)).from(fromUnit).to(toUnit);
            } else {
                output = convert(parseFloat(inputValue)).from(fromUnit).to(toUnit);
            }
            
            setResult(`${inputValue} ${fromUnit} = ${output.toFixed(4)} ${toUnit}`);
            setShowBest(false);
        } catch (error) {
            setResult("Invalid conversion combination");
        }
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <div className="container">
            <h1>Unit Converter</h1>
            <form onSubmit={handleConvert}>
                <div className="form-group">
                    <label>Measurement Type:</label>
                    <select 
                        value={measure} 
                        onChange={(e) => {
                            setMeasure(e.target.value);
                            setFromUnit(convert().possibilities(e.target.value)[0]);
                            setToUnit(convert().possibilities(e.target.value)[1]);
                        }}
                    >
                        {measures.map(m => (
                            <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Value:</label>
                    <input
                        type="number"
                        step="any"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter value"
                    />
                </div>

                <div className="unit-selectors">
                    <div className="select-group">
                        <label>From:</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                        >
                            {units.map(unit => {
                                const desc = allUnits.find(u => u.abbr === unit);
                                return <option key={unit} value={unit}>{desc?.plural || unit}</option>;
                            })}
                        </select>
                    </div>

                    <button type="button" className="swap-btn" onClick={swapUnits}>
                        ↔
                    </button>

                    <div className="select-group">
                        <label>To:</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                        >
                            {units.map(unit => {
                                const desc = allUnits.find(u => u.abbr === unit);
                                return <option key={unit} value={unit}>{desc?.plural || unit}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit">Convert</button>
                </div>
            </form>

            {result && (
                <div className={`result-box ${showBest ? "best-unit" : ""}`}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default UnitConverter;