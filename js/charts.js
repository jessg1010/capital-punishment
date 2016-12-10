$(document).ready(function() {
    Highcharts.SparkLine = function (a, b, c) {
        var hasRenderToArg = typeof a === 'string' || a.nodeName,
            options = arguments[hasRenderToArg ? 1 : 0],
            defaultOptions = {
                chart: {
                    renderTo: (options.chart && options.chart.renderTo) || this,
                    backgroundColor: null,
                    borderWidth: 0,
                    type: 'area',
                    margin: [2, 0, 2, 0],
                    width: 120,
                    height: 20,
                    style: {
                        overflow: 'visible'
                    },

                    // small optimalization, saves 1-2 ms each sparkline
                    skipClone: true
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    startOnTick: false,
                    endOnTick: false,
                    tickPositions: []
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    hideDelay: 0,
                    shared: true,
                    padding: 0,
                    positioner: function (w, h, point) {
                        return { x: point.plotX - w / 2, y: point.plotY - h };
                    }
                },
                plotOptions: {
                    series: {
                        animation: false,
                        lineWidth: 1,
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        marker: {
                            radius: 1,
                            states: {
                                hover: {
                                    radius: 2
                                }
                            }
                        },
                        fillOpacity: 0.25
                    },
                    column: {
                        negativeColor: '#910000',
                        borderColor: 'silver'
                    }
                }
            };

        options = Highcharts.merge(defaultOptions, options);

        return hasRenderToArg ?
            new Highcharts.Chart(a, options, c) :
            new Highcharts.Chart(options, b);
    };

    var start = +new Date(),
        $tds = $('td[data-sparkline]'),
        fullLen = $tds.length,
        n = 0;

    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
    function doChunk() {
        var time = +new Date(),
            i,
            len = $tds.length,
            $td,
            stringdata,
            arr,
            data,
            chart;

        for (i = 0; i < len; i += 1) {
            $td = $($tds[i]);
            stringdata = $td.data('sparkline');
            arr = stringdata.split('; ');
            data = $.map(arr[0].split(', '), parseFloat);
            chart = {};

            if (arr[1]) {
                chart.type = arr[1];
            }
            $td.highcharts('SparkLine', {
                series: [{
                    data: data,
                    pointStart: 1
                }],
                tooltip: {
                    headerFormat: '<span style="font-size: 10px">' + $td.parent().find('th').html() + ',{point.x}:</span><br/>',
                    pointFormat: '<b>{point.y}'
                },
                chart: chart
            });

            n += 1;

            // If the process takes too much time, run a timeout to allow interaction with the browser
            if (new Date() - time > 500) {
                $tds.splice(0, i + 1);
                setTimeout(doChunk, 0);
                break;
            }

            // Print a feedback on the performance
            if (n === fullLen) {
                $('#result').html('Generated ' + fullLen + ' sparklines in ' + (new Date() - start) + ' ms');
            }
        }
    }
    doChunk();

});

$(function () {
    Highcharts.chart('neighboringStates1', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Murder Rates Comparison Between Illinois and Missouri'
        },
        subtitle: {
            text: 'Source: FBI Uniform Crime Reports'
        },
        xAxis: {
            categories: ['Illinois', 'Missouri'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Murder rate (# of murder crimes/population)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 60,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 2010',
            data: [5.5, 7]
        }, {
            name: 'Year 2011',
            data: [5.6, 6.1]
        }, {
            name: 'Year 2012',
            data: [5.8, 6.5]
        },{
            name: 'Year 2013',
            data: [5.5, 6.1]
        }]
    });
});

$(function () {
    Highcharts.chart('neighboringStates2', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Murder Rates Comparison Between West Virginia and Kentucky'
        },
        subtitle: {
            text: 'Source: FBI Uniform Crime Reports'
        },
        xAxis: {
            categories: ['Kentucky', 'West Virginia'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Murder rate (# of murder crimes/population)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 60,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 2010',
            data: [5.5, 7]
        }, {
            name: 'Year 2011',
            data: [5.6, 6.1]
        }, {
            name: 'Year 2012',
            data: [5.8, 6.5]
        },{
            name: 'Year 2013',
            data: [5.5, 6.1]
        }]
    });
});

$(function () {
    Highcharts.chart('neighboringStates3', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Murder Rates Comparison Between North Dakota and South Dakota'
        },
        subtitle: {
            text: 'Source: FBI Uniform Crime Reports'
        },
        xAxis: {
            categories: ['North Dakota', 'South Dakota'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Murder rate (# of murder crimes/population)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 130,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 2010',
            data: [1.5, 2.8]
        }, {
            name: 'Year 2011',
            data: [3.5, 2.5]
        }, {
            name: 'Year 2012',
            data: [4, 3]
        },{
            name: 'Year 2013',
            data: [2.2, 2.4]
        }]
    });
});
$(function () {
    Highcharts.chart('neighboringStates4', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Murder Rates Comparison Between Colorado and Wyoming'
        },
        subtitle: {
            text: 'Source: FBI Uniform Crime Reports'
        },
        xAxis: {
            categories: ['Colorado', 'Wyoming'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Murder rate (# of murder crimes/population)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 140,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Year 2010',
            data: [2.4, 1.4]
        }, {
            name: 'Year 2011',
            data: [2.9, 3.2]
        }, {
            name: 'Year 2012',
            data: [3.1, 2.4]
        },{
            name: 'Year 2013',
            data: [3.4, 2.9]
        }]
    });
});
