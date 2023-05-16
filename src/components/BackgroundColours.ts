  // code ripped from documentation: https://www.chartjs.org/docs/latest/samples/scriptable/bar.html
 export function SetBackgroundColour() {
    return (currentDay: any) => {
      const bar = currentDay.parsed.y;
      const colour = bar === 52.36 ? 'rgb(118, 181, 188)' : 'rgb(236, 119, 95)';
      return colour;
    };
  }

export function SetHoverBackgroundColour() {
    return (currentDay: any) => {
      const bar = currentDay.parsed.y;
      const colour = bar === 52.36 ? 'rgba(118, 181, 188, 0.6)' : 'rgba(236, 119, 95, 0.75)';
      return colour;
    };
  }