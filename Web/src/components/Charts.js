import React from 'react';
import Chart from 'react-apexcharts';

export function DashboardSmallChart({ data, colors }) {
  const options = {
    chart: {
      id: 'basic-bar',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150,
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div className="bg-white py-2 px-2 text-xs border-[.5px] border-border">' +
          'Total:' +
          ' ' +
          '<span className="font-semibold">' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '75%',
        distributed: false,
        borderRadius: 2,
      },
    },
    colors: [colors],
  };
  const series = [
    {
      name: 'series-1',
      data: data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={50}
    />
  );
}

export function DashboardBigChart() {
  const options = {
    chart: {
      id: 'area-datetime',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '10px',
          fontWeight: 400,
        },
        formatter: function (value) {
          return value + 'k';
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div className="bg-white py-2 px-2 text-xs border-[.5px] border-border">' +
          'Total:' +
          ' ' +
          '<span className="font-semibold">' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
    grid: {
      show: true,
      borderColor: '#E8EBEE',
      strokeDashArray: 4,
      position: 'back',
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ['#66B5A3'],
  };
  const series = [
    {
      name: 'Total',
      data: [30, 40, 25, 50, 49, 21, 70, 51, 42, 60, 40, 20],
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height={300}
    />
  );
}
