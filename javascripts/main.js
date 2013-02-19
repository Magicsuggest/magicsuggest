$(document).ready(function(){
	$('#tabs .tab-content').hide();
	$('#tabs div:first').show();
	$('#tabs ul li:first').addClass('active');
	$('#tabs ul li a').click(function(){
		$('#tabs ul li').removeClass('active');
		$(this).parent().addClass('active');
		var currentTab = $(this).attr('href');
		$('#tabs .tab-content').hide();
		$(currentTab).show();
		return false;
	});

	new MagicSuggest({
		renderTo: $('#ms1'),
		data: 'New York,Los Angeles,Chicago,Houston,Philadelphia,Phoenix,San Antonio,San Diego,Dallas,San Jose,Jacksonville'
	});

    var data = [{
        "id": 1,
        "name": "New York",
        "country": "United States"
    },{
        "id": 2,
        "name": "Los Angeles",
        "country": "United States"
    },{
        "id": 3,
        "name": "Chicago",
        "country": "United States"
    },{
        "id": 4,
        "name": "Houston",
        "country": "United States"
    },{
        "id": 5,
        "name": "Philadelphia",
        "country": "United States"
    },{
        "id": 6,
        "name": "Paris",
        "country": "France"
    },{
        "id": 7,
        "name": "Marseille",
        "country": "France"
    },{
        "id": 8,
        "name": "Toulouse",
        "country": "France"
    },{
        "id": 9,
        "name": "Lyon",
        "country": "France"
    },{
        "id": 10,
        "name": "Bordeaux",
        "country": "France"
    },{
        "id": 11,
        "name": "Montpellier",
        "country": "France"
    },{
        "id": 16,
        "name": "Phoenix",
        "country": "United States"
    },{
        "id": 17,
        "name": "San Antonio",
        "country": "United States"
    },{
        "id": 18,
        "name": "San Diego",
        "country": "United States"
    },{
        "id": 19,
        "name": "Dallas",
        "country": "United States"
    },{
        "id": 20,
        "name": "San Jose",
        "country": "United States"
    },{
        "id": 21,
        "name": "Jacksonville",
        "country": "United States"
    }];

    // examples... Not time for da pretty code here!
    $('.conf .opt-ex').click(function(){

        var cfgIndex = this.className.indexOf('cfg_');
        if(cfgIndex > 0){
            var cfg = this.className.substring(cfgIndex).split('_')[1];
            var rawval = this.className.substring(cfgIndex).split('_')[2];
            var clsCfg = "ex-" + cfg;
            var id = 'ex-' + cfg + '-' + ($('div[id^=clsCfg]').length + 1);
            var val = null;
            var dispVal = '';
            if(rawval === 'true' || rawval === 'false'){
                val = rawval === 'true';
                dispVal = val;
            } else if($.isNumeric(rawval)){
                val = rawval * 1;
                dispVal = val;
            } else {
                if(rawval[0] === '[' || rawval[0] === '{'){
                    dispVal = rawval;
                    val = JSON.parse(rawval);
                } else if (rawval.indexOf('function') === 0){
                    val = eval('a=' + rawval);
                    dispVal = val;
                } else {
                    val = rawval;
                    dispVal = "'" + rawval + "'";
                }
            }
            var foo =
                "new MagicSuggest({<br/>" +
                "  " + cfg + ": " + dispVal + ",<br/>" +
                (cfg !== 'renderTo' ? "  renderTo: $('#" + id + "'),<br/>" : '') +
                (cfg !== 'width' ? "  width: 590,<br/>" : '') +
                (cfg !== 'data' ? "  data: 'data.json'<br/>" : '') +
                "});";
            $('<div/>', {
                html: "<br/><hr/><div>Example with <b>"+cfg+"</b> set to <b>" + dispVal + "</b></div>" +
                    "<code><pre>" + foo + "</pre></code><br/><div style='clear:both'></div><br/><br/>"
            }).hide().insertBefore(this).fadeIn();
            var exDiv = $('<div/>',{id: id});
            exDiv.insertBefore(this);
            var config = {
                renderTo: $('#' + id),
                width: 590,
                data: data
            };
            config[cfg] = val;
            new MagicSuggest(config);
            $(this).detach();
        }
    });

});
