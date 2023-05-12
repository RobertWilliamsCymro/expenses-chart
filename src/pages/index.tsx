import Image from 'next/image'
import Logo from '../../public/logo.svg'
import Chart, { ChartItem } from 'chart.js/auto'

export default function Home() {
  return (
    <>
      <title>Frontend Mentor | Expenses chart component</title>
      <main className="font-dm-sans bg-cream flex items-center min-h-screen justify-center">
        <div className="w-1/3 rounded-md">
          <div className="bg-soft-red text-white mb-2 rounded-md">
            <div className="pt-6 ml-6">
              <div className="flex flex-col justify-between">
                <p>My balance</p>
                <p className="text-3xl font-normal">$921.48</p>
              </div>
                <Image className="mr-6 mt-2" src={Logo} alt=""></Image>
            </div>
          </div>
          <div className="mt-6 bg-pale-orange rounded-md">
            <h1 className="p-8 font-bold text-3xl">Spending - Last 7 Days</h1>
            <div className="px-8">
              <canvas id="spending-last-7-days"></canvas>
            </div>
          <hr className="h-px w-10/12 mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700"/>          
            <div className="flex flex-row justify-around">
              <p className="text-gray-400">Total this month:</p>
              <p className="font-bold text-3xl">$478.33</p>              
              <p className="font-bold text-right">+2.4%</p>
              <p className="text-gray-400"> from last month</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
(async function () {
  const spendingData = [
    {
      "day": "mon",
      "amount": 17.45
    },
    {
      "day": "tue",
      "amount": 34.91
    },
    {
      "day": "wed",
      "amount": 52.36
    },
    {
      "day": "thu",
      "amount": 31.07
    },
    {
      "day": "fri",
      "amount": 23.39
    },
    {
      "day": "sat",
      "amount": 43.28
    },
    {
      "day": "sun",
      "amount": 25.48
    },
  ];
// code ripped from documentation: https://www.chartjs.org/docs/latest/samples/scriptable/bar.html
  function coloriseBar() {
    return (currentDay: any) => {
      const bar = currentDay.parsed.y;
      const colour = bar === 52.36 ? '#76b5bc' : '#ec775f';
      return colour;
    };
  }

  function hoverSelectedBar() {
    return (currentDay: any) => {
      const bar = currentDay.parsed.y;
      const colour = bar === 52.36 ? '#76b5bc' : '#fffaf5';
      return colour;
    };
  }
  // using code from chart.js: https://github.com/chartjs/Chart.js/blob/master/docs/samples/tooltip/html.md
  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b: any) => b.lines);
  
      const tableHead = document.createElement('thead');
  
      titleLines.forEach((title: string) => {
        const tr = document.createElement('tr') as HTMLTableRowElement;
        tr.style.borderWidth = "0";
        tableHead.appendChild(tr);
      });
  
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body: string, i: string | number) => {
                        
        const tr = document.createElement('tr') as HTMLTableRowElement;
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = "0";
  
        const td = document.createElement('td') as HTMLTableCellElement;
        td.style.borderWidth = "0";
  
        const text = document.createTextNode(body);
        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });
  
      const tableRoot = tooltipEl.querySelector('table');
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

    
  };
  
  
  new Chart(
    document.getElementById('spending-last-7-days') as ChartItem,
    {
      type: 'bar',
      options: {
        scales: {
          x: {

            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          }
        }
      },
      
      data: {
        labels: spendingData.map(row => row.day),
        datasets: [
          {
            label: '$',
            data: spendingData.map(row => row.amount),
            backgroundColor: coloriseBar(),
            borderRadius: 5
          }
        ]
      }
    }
  );
})();
