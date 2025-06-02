document.addEventListener("DOMContentLoaded", () => {
  const toggleInput = document.getElementById("darkModeToggle");

  // 다크모드 토글
  toggleInput?.addEventListener("change", () => {
    // 다크모드 클래스 토글
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container")?.classList.toggle("dark-mode");

    // 차트 재생성
    departmentChart.destroy();
    userChart.destroy();
    createCharts();
  });

  let departmentChart;
  let userChart;

  function createCharts() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    Chart.defaults.color = isDarkMode ? "#f0f0f0" : "#333";
    // 도넛 차트
    const departmentCtx = document
      .getElementById("departmentChart")
      .getContext("2d");
    departmentChart = new Chart(departmentCtx, {
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
      plugins: ["centerTextPlugin"],
    });

    // 막대 차트
    const userCtx = document.getElementById("userStatusChart").getContext("2d");
    userChart = new Chart(userCtx, {
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
  }

  // Plugin 등록은 가장 먼저
  Chart.register({
    id: "centerTextPlugin",
    beforeDraw(chart) {
      if (chart.canvas.id !== "departmentChart") return;

      const { width, height, ctx } = chart;
      const data = chart.data.datasets[0].data;
      const total = data.reduce((sum, v) => sum + v, 0);
      const isDarkMode = document.body.classList.contains("dark-mode");

      ctx.save();
      ctx.font = "bold 20px Pretendard, sans-serif";
      ctx.fillStyle = isDarkMode ? "#f0f0f0" : "#333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(total, width / 2, height / 2 - 28);
      ctx.restore();
    },
  });

  // 초기 차트 생성
  createCharts();
});
