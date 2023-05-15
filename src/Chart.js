import React, { useState } from "react";
import axios from "axios";
import './Chart.css'
import { CSVLink } from "react-csv";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
 
  Tooltip,
  Legend,
} from "recharts";

function Chart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://www.terriblytinytales.com/test.txt"
    );
    const text = response.data;
    const wordCounts = {};
    const words = text.replace(/[^\w\s]/gi, "").split(" ");
    for (const word of words) {
      if (word === "") continue;
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
    const topWords = Object.keys(wordCounts)
      .sort((a, b) => wordCounts[b] - wordCounts[a])
      .slice(0, 20)
      .map((word) => ({ word, count: wordCounts[word] }));
    setData(topWords);
    setLoading(false);
  };

  const csvData = data.map(({ word, count }) => ({ word, count }));

  return (
    <div className="main">
      {data.length === 0 && (
        <button className="button" onClick={fetchData} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      )}

      {data.length > 0 && (
        <div className="container">
          <div className="left"><h2>Terribly<br /> Tiny <br/>Tales</h2></div>
          <div className="right">
            <h3>Top 20 Words</h3>
            <BarChart className="histo" width={900} height={400} data={data}>
              
              <XAxis dataKey="word" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
            <CSVLink className="btn-2" data={csvData} filename={"histogram.csv"}>
              Export
            </CSVLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chart;
