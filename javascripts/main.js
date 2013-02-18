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

    // examples... Not time for da pretty code here!
    $('.conf .opt-ex').click(function(){

        var cfgIndex = this.className.indexOf('cfg_');
        if(cfgIndex > 0){
            var cfg = this.className.substring(cfgIndex).split('_')[1];
            var rawval = this.className.substring(cfgIndex).split('_')[2];
            var clsCfg = "ex-" + cfg;
            var id = 'ex-' + cfg + '-' + ($('div[id^=clsCfg]').length + 1);
            var val = null;
            if(rawval === 'true' || rawval === 'false'){
                val = rawval === 'true';
            } else if($.isNumeric(rawval)){
                val = rawval * 1;
            } else {
                if(rawval[0] === '[' || rawval[0] === '{'){
                    val = rawval;
                } else if (rawval.indexOf('function') === 0){
                    val = eval('a=' + rawval);
                } else {
                    val = ("'" + rawval + "'");
                }
            }
            var foo =
                "new MagicSuggest({<br/>" +
                "  " + cfg + ": " + val + ",<br/>" +
                (cfg !== 'renderTo' ? "  renderTo: $('#" + id + "'),<br/>" : '') +
                (cfg !== 'width' ? "  width: 590,<br/>" : '') +
                (cfg !== 'data' ? "  data: 'data.json'<br/>" : '') +
                "});";
            $('<div/>', {
                html: "<br/><hr/><div>Example with <em>"+cfg+"</em> set to <em>" + val + "</em></div>" +
                    "<code><pre>" + foo + "</pre></code><br/><div style='clear:both'></div><br/>"
            }).hide().insertBefore(this).fadeIn();
            var exDiv = $('<div/>',{id: id});
            exDiv.insertBefore(this);
            eval(foo.toString().replace(new RegExp('<br/>', 'g'), ''));
            $(this).hide();
        }
    });

});
