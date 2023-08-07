
document.addEventListener("DOMContentLoaded", function () {
  let scriptElement = document.createElement('script');
  scriptElement.src = 'https://cdn.anychart.com/releases/8.11.0/js/anychart-bundle.min.js';
  scriptElement.type = 'text/javascript';
  document.head.appendChild(scriptElement);
  const responseDiv = document.querySelector('.content');
  
  
  scriptElement.onload = function() {
    anychart.onDocumentReady(function () {
      if (responseDiv) {
        const graphs = [...responseDiv.querySelectorAll(`.graph[data-graph]`)];
        graphs.forEach((g) => {
          const id = Date.now().toString() + Math.random().toString().slice(2);
          g.innerHTML += `<div class="chartBox top">
            <div class="chat-series" id=${id}></div>
          </div>`;
          let graphColumns = JSON.parse(g.getAttribute("data-columns"));
          let graphData = JSON.parse(g.getAttribute("data-graph"));
          const max = Math.max(
            ...graphData.flatMap((d) => d).filter((d) => !isNaN(d))
          );
          switch (g.getAttribute("data-type")) {
            case "bar": {
              if (graphData[0].length > 2) {
                const chart1 = anychart.column();
                chart1.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);
    
                for (const key in graphData[0].slice(1)) {
                  const seriesData = graphData.map((d) => ({
                    x: d[0],
                    value: d[Number(key) + 1],
                  }));
    
                  let series1 = chart1.column(seriesData);
                  //
                  series1.fill('#5177FF');
                  series1.name(graphColumns[Number(key) + 1]);
                  series1.stroke("transparent");
                }
    
                let labels = chart1.xAxis().labels();
                labels.fontColor("#000000");
                labels = chart1.yAxis().labels();
                labels.fontColor("#000000");
    
                chart1.yGrid().enabled(true);
                chart1
                  .xAxis()
                  .title({ text: graphColumns[0], fontColor: "#000000" });
    
                chart1.yGrid().stroke({
                  color: "rgba(0, 0, 0, 0.1)",
                });
                chart1.yGrid().palette(["transparent"]);
                chart1
                  .yScale()
                  .minimum(0)
                  .maximum(Math.ceil(Number(max) / 100) * 100);
                chart1
                  .yScale()
                  .ticks()
                  .interval(
                    Math.round(0.2 * (Math.ceil(Number(max) / 100) * 100))
                  );
                chart1.background().fill("transparent");
                chart1.yAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis().ticks().enabled(false);
                chart1.yAxis().ticks().enabled(false);
    
                const credits = chart1.credits();
                credits.enabled(false);
    
                chart1.container(id);
                chart1.height("100%");
                chart1.draw();
                chart1.listen("chartDraw", function() {
                  if (typeof(callPhantom) == 'function') {
                    return callPhantom(-1);
                  }      
                });
              } else {
                const barData = [...graphData.map((d) => ({ x: d[0], value: d[1] }))];
                const chart1 = anychart.column();
                chart1.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);
                const max = Math.max(...barData.map((d) => d.value));
                let series1 = chart1.column(barData);
                series1.name(graphColumns[1]);
    
                let labels = chart1.xAxis().labels();
                labels.fontColor("#000000");
                labels = chart1.yAxis().labels();
                labels.fontColor("#000000");
                series1.fill("#5177FF");
                series1.stroke("transparent");
                chart1.yGrid().enabled(true);
                chart1
                  .xAxis()
                  .title({ text: graphColumns[0], fontColor: "#000000" });
                chart1
                  .yAxis()
                  .title({ text: graphColumns[1], fontColor: "#000000" });
                chart1.yGrid().stroke({
                  color: "rgba(0, 0, 0, 0.1)",
                });
                chart1.yGrid().palette(["transparent"]);
                chart1
                  .yScale()
                  .minimum(0)
                  .maximum(Math.ceil(Number(max) / 100) * 100);
                chart1
                  .yScale()
                  .ticks()
                  .interval(
                    Math.round(0.2 * (Math.ceil(Number(max) / 100) * 100))
                  );
                chart1.background().fill("transparent");
                chart1.yAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis().ticks().enabled(false);
                chart1.yAxis().ticks().enabled(false);
    
                const credits = chart1.credits();
                credits.enabled(false);
    
                chart1.container(id);
                chart1.height("100%");
                chart1.draw();
                chart1.listen("chartDraw", function() {
                  if (typeof(callPhantom) == 'function') {
                    return callPhantom(-1);
                  }      
                });
              }
              break;
            }
            case "pie": {
              const barData = [...graphData.map((d) => ({ x: d[0], value: d[1] }))];
              const chart1 = anychart.pie(barData);
              chart1.radius("100%");
              chart1.tooltip().format("{%value}");
    
              chart1.background().fill("transparent");
    
              const credits = chart1.credits();
              credits.enabled(false);
    
              chart1.container(id);
              chart1.height("100%");
              chart1.draw();
              chart1.listen("chartDraw", function() {
                if (typeof(callPhantom) == 'function') {
                  return callPhantom(-1);
                }      
              });
              break;
            }
            case "line": {
              if (graphData[0].length > 2) {
                const chart1 = anychart.line();
                chart1.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);
                for (const key in graphData[0].slice(1)) {
                  const seriesData = graphData.map((d) => ({
                    x: d[0],
                    value: d[Number(key) + 1],
                  }));
    
                  let series1 = chart1.spline(seriesData);
                  //
                  // series1.stroke(`3 #000000`);
                  series1.name(graphColumns[Number(key) + 1]);
                }
    
                let labels = chart1.xAxis().labels();
                labels.fontColor("#fff");
                labels = chart1.yAxis().labels();
                labels.fontColor("#fff");
                chart1.xAxis().title({ text: graphColumns[0], fontColor: "#fff" });
                chart1.yGrid().enabled(true);
                chart1.yGrid().stroke({
                  color: "rgba(0, 0, 0, 0.1)",
                });
                chart1.yGrid().palette(["transparent"]);
                chart1.xAxis().title(graphColumns[0]);
                chart1
                  .yScale()
                  .minimum(0)
                  .maximum(Math.ceil(Number(max) / 100) * 100);
                chart1
                  .yScale()
                  .ticks()
                  .interval(
                    Math.round(0.2 * (Math.ceil(Number(max) / 100) * 100))
                  );
                chart1.background().fill("transparent");
                chart1.yAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis().ticks().enabled(false);
                chart1.yAxis().ticks().enabled(false);
    
                const credits = chart1.credits();
                credits.enabled(false);
    
                chart1.container(id);
                chart1.height("100%");
                chart1.draw();
                chart1.listen("chartDraw", function() {
                  if (typeof(callPhantom) == 'function') {
                    return callPhantom(-1);
                  }      
                });
              } else {
                const barData = [...graphData.map((d) => ({ x: d[0], value: d[1] }))];
                const chart1 = anychart.line();
                chart1.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);
                let series1 = chart1.spline(barData);
    
                series1.stroke("3 #5177FF");
                series1.name(graphColumns[1]);
                let labels = chart1.xAxis().labels();
                labels.fontColor("#000000");
                labels = chart1.yAxis().labels();
                labels.fontColor("#000000");
    
                chart1.yGrid().enabled(true);
    
                chart1.yGrid().stroke({
                  color: "rgba(0, 0, 0, 0.1)",
                });
                chart1.yGrid().palette(["transparent"]);
                chart1
                  .yScale()
                  .minimum(0)
                  .maximum(Math.ceil(Number(max) / 100) * 100);
                chart1
                  .yScale()
                  .ticks()
                  .interval(
                    Math.round(0.2 * (Math.ceil(Number(max) / 100) * 100))
                  );
                chart1.background().fill("transparent");
                chart1.yAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis(0).stroke("rgba(0, 0, 0, 0.1)");
                chart1.xAxis().ticks().enabled(false);
                chart1.yAxis().ticks().enabled(false);
    
                const credits = chart1.credits();
                credits.enabled(false);
    
                chart1
                  .yAxis()
                  .title({ text: graphColumns[1], fontColor: "#000000" });
                chart1
                  .xAxis()
                  .title({ text: graphColumns[0], fontColor: "#000000" });
    
                chart1.container(id);
                chart1.height("100%");
                chart1.draw();
                chart1.listen("chartDraw", function() {
                  if (typeof(callPhantom) == 'function') {
                    return callPhantom(-1);
                  }      
                });
              }
              break;
            }
            default: {
              console.log(g.getAttribute("data-type"));
              break;
            }
          }
        });
      }
    })
  };
});




