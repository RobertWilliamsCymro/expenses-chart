// code ripped from documentation: https://www.chartjs.org/docs/latest/samples/scriptable/bar.html
export function SetBackgroundColour() {
  return (barChartValue: any) => {
    const barChartBackgroundColour = barChartValue.parsed.y === 52.36 ? 'rgb(118, 181, 188)' : 'rgb(236, 119, 95)';
    return barChartBackgroundColour;
  };
}

export function SetHoverBackgroundColour() {  
  return (barChartValue: any) => {
    const barChartHoverBackgroundColour = barChartValue.parsed.y === 52.36 ? 'rgba(118, 181, 188, 0.6)' : 'rgba(236, 119, 95, 0.75)';
    return barChartHoverBackgroundColour;
  };
}