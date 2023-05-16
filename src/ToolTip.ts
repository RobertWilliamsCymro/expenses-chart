      // using code from chart.js: https://github.com/chartjs/Chart.js/blob/master/docs/samples/tooltip/html.md
  const getOrCreateTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div') as HTMLDivElement;

    if (!tooltipEl) {
      tooltipEl = document.createElement('div') as HTMLDivElement;
      tooltipEl.style.background = 'hsl(25 47% 15%)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = '1';
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


  export const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart) as HTMLDivElement;

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Set Text
    if (tooltip.body) {

      const bodyLines = tooltip.body.map((b: any) => b.lines);
      const tableBody = document.createElement('tbody');
      bodyLines.forEach((toolTipBody: string) => {
        const tableRow = document.createElement('tr') as HTMLTableRowElement;
        tableRow.style.backgroundColor = 'inherit';
        tableRow.style.borderWidth = '0';

        const tableCell = document.createElement('td') as HTMLTableCellElement;
        tableCell.style.borderWidth = '0';

        const toolTipText = document.createTextNode(toolTipBody);
        tableCell.appendChild(toolTipText);
        tableRow.appendChild(tableCell);
        tableBody.appendChild(tableRow);
      });

      const tableRoot = tooltipEl.querySelector('table') as HTMLTableElement;

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

    return externalTooltipHandler;

  };