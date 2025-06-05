import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const AdminTopArea = () => {
  const departmentRef = useRef(null);
  const userRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    const departmentCtx = departmentRef.current?.getContext("2d");
    const userCtx = userRef.current?.getContext("2d");

    if (!departmentCtx || !userCtx) return;

    const departmentChart = new Chart(departmentCtx, {
      type: "doughnut",
      data: {
        labels: ["A 부서", "B 부서", "C 부서", "D 부서"],
        datasets: [
          {
            data: [15, 9, 15, 1],
            backgroundColor: ["#4e73df", "#f6c23e", "#36b9cc", "#e74a3b"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: isDarkMode ? "#f0f0f0" : "#333",
            },
          },
        },
      },
    });

    const userChart = new Chart(userCtx, {
      type: "bar",
      data: {
        labels: ["출근", "무단결근", "휴가", "연차"],
        datasets: [
          {
            label: "사용자 수",
            data: [1, 30, 9, 1],
            backgroundColor: ["#4e73df", "#e74a3b", "#36b9cc", "#f6c23e"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: isDarkMode ? "#f0f0f0" : "#333",
            },
            grid: {
              color: isDarkMode ? "#555" : "#ddd",
            },
          },
          x: {
            ticks: {
              color: isDarkMode ? "#f0f0f0" : "#333",
            },
            grid: {
              color: isDarkMode ? "#555" : "#ddd",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
            labels: {
              color: isDarkMode ? "#f0f0f0" : "#333",
            },
          },
        },
      },
    });

    // 다크모드 toggle 감지
    const toggleInput = document.getElementById("darkModeToggle");
    const handleToggle = () => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    };

    toggleInput?.addEventListener("change", handleToggle);

    return () => {
      toggleInput?.removeEventListener("change", handleToggle);
      departmentChart.destroy();
      userChart.destroy();
    };
  }, [isDarkMode]);

  return (
    <div className="topArea">
      <div className="mainProfile">
        <div className="Title">
          <h3>Company Name</h3>
        </div>
        <div className="infoArea">
          <div className="chartBox">
            <canvas id="departmentChart" ref={departmentRef}></canvas>
          </div>
          <div className="chartBox">
            <canvas id="userStatusChart" ref={userRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
