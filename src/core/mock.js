$.mockjax({
    url:  /^http:\/\/.+\/command/,
    responseText: 'Build version: edge-693ab47, Build date: Apr 12 2016 04:05:31, MCU: LPC1769, System Clock: 120MHz'
});

$.mockjax({
    url:  /^http:\/\/.+\/sd\/config/,
    proxy: 'static/config'
});

