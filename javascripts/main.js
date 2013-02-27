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
        if(currentTab === '#tab-4'){
            new MagicSuggest({
                renderTo: $('#ms-right'),
                width: 250,
                selectionPosition: 'right',
                data: 'red,orange,blue,purple,dark blue,yellow,green,magenta,cyan,black,white'
            });
            new MagicSuggest({
                renderTo: $('#ms-gmail'),
                resultAsString: true,
                width: 590,
                value: ['john@kennedy.com','martin@luther.com'],
                data: 'marilyn@monroe.com,mother@teresa.com,john@kennedy.com,martin@luther.com,nelson@mandela.com,winston@churchill.com,bill@gates.com,muhammad@ali.com,mahatma@gandhi.com,margaret@thatcher.com,charles@gaulle.com,christopher@colombus.com,george@orwell.com,charles@darwin.com,elvis@presley.com,albert@einstein.com,paul@mccartney.com,queen@elizabeth.com,queen@victoria.com,john@keynes.com,mikhail@gorbachev.com,jawaharlal@nehru.com,leonardo@vinci.com,louis@pasteur.com,leo@tolstoy.com,pablo@picasso.com,vincent@gogh.com,franklin@roosevelt.com,john@paul.com,neil@armstrong.com,thomas@edison.com,rosa@parks.com,aung@kyi.com,lyndon@johnson.com,ludwig@beethoven.com,oprah@winfrey.com,indira@gandhi.com,eva@peron.com,benazir@bhutto.com,desmond@tutu.com,dalai@lama.com,walt@disney.com,peter@sellers.com,barack@obama.com,malcolm@x.com,richard@branson.com,jesse@owens.com,ernest@hemingway.com,john@lennon.com,henry@ford.com,haile@selassie.com,joseph@stalin.com,lord@baden.com,michael@jordon.com,george@bush.com,osama@laden.com,fidel@castro.com,oscar@wilde.com,coco@chanel.com,amelia@earhart.com,adolf@hitler.com,mary@magdalene.com,alfred@hitchcock.com,michael@jackson.com,mata@hari.com,emmeline@pankhurst.com,ronald@reagan.com,lionel@messi.com,babe@ruth.com,bob@geldof.com,leon@trotsky.com,roger@federer.com,sigmund@freud.com,woodrow@wilson.com,mao@zedong.com,katherine@hepburn.com,audrey@hepburn.com,david@beckham.com,tiger@woods.com,usain@bolt.com,bill@cosby.com,carl@lewis.com,prince@charles.com,jacqueline@onassis.com,billie@holiday.com,virginia@woolf.com,billie@king.com,kylie@minogue.com,anne@frank.com,emile@zatopek.com,lech@walesa.com,christiano@ronaldo.com,yoko@ono.com,julie@andrews.com,florence@nightingale.com,marie@curie.com,stephen@hawking.com,tim@lee.com,lady@gaga.com,lance@armstrong.com,jon@stewart.com,scarlett@johansson.com,larry@page.com,sergey@brin.com,roman@abramovich.com,rupert@murdoch.com,al@gore.com,sacha@baron.com,george@clooney.com,paul@krugman.com,jimmy@wales.com'
            });
            new MagicSuggest({
                renderTo: $('#ms-filter'),
                width: 180,
                sortOrder: 'countryName',
                selectionPosition: 'bottom',
                selectionStacked: true,
                displayField: 'countryName',
                value: [1,2],
                data: [{
                    id: 0,
                    countryName: 'France'
                }, {
                    id: 1,
                    countryName: 'United States'
                }, {
                    id: 2,
                    countryName: 'England'
                }, {
                    id: 3,
                    countryName: 'Germany'
                }, {
                    id: 4,
                    countryName: 'Japon'
                }, {
                    id: 5,
                    countryName: 'Spain'
                }, {
                    id: 6,
                    countryName: 'India'
                }, {
                    id: 7,
                    countryName: 'China'
                }]
            });
            new MagicSuggest({
                renderTo: $('#ms-tpl'),
                width: 590,
                highlight: false,
                data: [{
                        id: 0,
                        name: "Panda",
                        desc: "Pandas are great furry animals",
                        image: "images/panda.png"
                    },{
                        id: 1,
                        name: "Butterfly",
                        desc: "Butterflies fly better with theirs wings on",
                        image: "images/butterfly.png"
                    },{
                        id: 2,
                        name: "Dolphin",
                        desc: "Dolphins call themselves by name like we do",
                        image: "images/dolphin.png"
                    },{
                        id: 3,
                        name: "Elephant",
                        desc: "Elephants are pretty heavy animals",
                        image: "images/elephant.png"
                    },{
                        id: 4,
                        name: "Hippopotamus",
                        desc: "Not quite sure what these guys are here for",
                        image: "images/hippo.png"
                    },{
                        id: 5,
                        name: "Turtle",
                        desc: "Turtles can live up to 200 years",
                        image: "images/turtle.png"
                    }
                ],
                renderer: function(v){
                    return '<div>' +
                            '<div style="float:left;"><img src="' + v.image + '"/></div>' +
                              '<div style="padding-left: 85px;">' +
                                '<div style="padding-top: 20px;font-style:bold;font-size:120%;color:#333">' + v.name + '</div>' +
                                '<div style="color: #999">' + v.desc + '</div>' +
                              '</div>' +
                           '</div><div style="clear:both;"></div>';
                }
            });
        }
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
