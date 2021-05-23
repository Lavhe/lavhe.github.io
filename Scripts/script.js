/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/materialize.d.ts" />
$(document).ready(function () {
    new WOW().init();

    particlesJS.load('particles-js', 'Uzzie/Content/particlesjs-config.json', function() {
      console.log('callback - particles.js config loaded');
    });
});

var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', 'C++', 'C#', 'HTML/CSS', 'Java', 'JavaScript', 'MSSQL', 'VB'],
            ['C++', 44, 0, 0, 0, 0, 0, 0],
            ['C#', 0, 97, 0, 0, 0, 0, 0],
            ['HTML/CSS', 0, 0, 92, 0, 0, 0, 0],
            ['Java', 0, 0, 0, 70, 0, 0, 0],
            ['Javascript', 0, 0, 0, 0, 87, 0, 0],
            ['MSSQL', 0, 0, 0, 0, 0, 95, 0],
            ['VB', 0, 0, 0, 0, 0, 0, 68],
        ],
        type: 'bar',
        labels: true,
        colors: {
            Java: '#0000ff',
            Javascript: '#00f00f',
            VB: '#000000',
            MSSQL: '#8e24aa'
        }
    },
    axis: {
        x: {
            type: 'category',
            color: '#00ff00'
        }
    },
    legend: {
        show: false
    },
    tooltip: {
        grouped: false
    },
});
counter = 0;
setInterval(function () {
    counter++;
    if (counter < 10) {
        chart.transform('area-spline');
    }
    else if (counter < 40) {
        chart.transform('bar');
    }
    else {
        counter = 0;
    }
}, 500);
d3.select('#chartLabel').insert('div', '.chart').attr('class', 'legend').selectAll('span')
    .data(['C++', 'C#', 'HTML/CSS', 'Java', 'Javascript', 'MSSQL', 'VB'])
    .enter().append('span')
    .attr('data-id', function (id) { return id; })
    .html(function (id) { return id; })
    .each(function (id) {
    d3.select(this).style('color', chart.color(id));
})
    .on('mouseover', function (id) {
    chart.focus(id);
})
    .on('mouseout', function (id) {
    chart.revert();
})
    .on('click', function (id) {
    chart.toggle(id);
});
//# sourceMappingURL=Uzzie.js.map
