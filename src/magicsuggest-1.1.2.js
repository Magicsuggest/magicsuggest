/**
 * All auto suggestion boxes are fucked up or badly written.
 * This is an attempt to create something that doesn't suck...
 *
 * Requires: jQuery and the Class class for OOP.
 *
 * Author: Nicolas Bize
 * Date: Feb. 8th 2013
 * Version: 1.0
 * Licence: MagicSuggest is licenced under MIT licence (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) 
{
	var MagicSuggest = function(element, options) 
	{
		var context = this;
		
	    /**
	     * Initializes the MagicSuggest component
	     * @param defaults - see config below
	     */
		var defaults = {
	        /**********  CONFIGURATION PROPERTIES ************/
	        /**
	         * @cfg {Boolean} allowFreeEntries
	         * <p>Restricts or allows the user to validate typed entries </p>
	         * Defaults to <code>true</code>.
	         */
	        allowFreeEntries: true,

	        /**
	         * @cfg {Boolean} preselectSingleSuggestion
	         * <p>If a single suggestion comes out, it is preselected.</p>
	         * Defaults to <code>true</code>.
	         */
	        preselectSingleSuggestion: true,

	        /**
	         * @cfg {String} cls
	         * <p>A custom CSS class to apply to the field's underlying element</p>
	         * Defaults to <code>''</code>.
	         */
	        cls: '',

	        /**
	         * @cfg {Array / String} data
	         * JSON Data source used to populate the combo box. 3 options are available here:<br/>
	         * <p><u>No Data Source (default)</u><br/>
	         *    When left null, the combo box will not suggest anything. It can still enable
	         *    the user to enter multiple entries if allowFreeEntries is set to true (default).</p>
	         * <p><u>Static Source</u><br/>
	         *    You can pass an array of JSON objects, an array of strings or even a single
	         *    CSV string as the data source.<br/>
	         *    For ex. data: [{id:0,name:"Paris"}, {id: 1, name: "New York"}]</p>
	         * <p><u>Url</u><br/>
	         *     You can pass the url from which the component will fetch its JSON data.<br/>
	         *     Data will be fetched using a POST ajax request that will include the entered
	         *     text as 'query' parameter</p>
	         * Defaults to <em>null</em>
	         */
	        data: null,

    	    /**
	         * @cfg {Object} dataParams
        	 * <p>Additional parameters to the ajax call</p>
    	     * Defaults to <code>{}</code>
	         */
	        dataUrlParams: {},
	        
	        /**
	         * @cfg {Boolean} disabled
	         * <p>Start the component in a disabled state.</p>
	         * Defaults to <code>false</code>.
	         */
	        disabled: false,

	        /**
	         * @cfg {String} displayField
	         * <p>name of JSON object property displayed in the combo list</p>
	         * Defaults to <code>name</code>.
	         */
	        displayField: 'name',

	        /**
	         * @cfg {Boolean} editable
	         * <p>Set to false if you only want mouse interaction. In that case the combo will
	         * automatically expand on focus.</p>
	         * Defaults to <code>true</code>.
	         */
	        editable: true,

	        /**
	         * @cfg {String} emptyText
	         * <p>The default placeholder text when nothing has been entered</p>
	         * Defaults to <code>'Type or click here'</code> or just <code>'Click here'</code> if not editable.
	         */
	        emptyText: function() {
	        	return settings.editable ? 'Type or click here' : 'Click here'; 
	        },	        
	        
	        /**
	         * @cfg {String} emptyTextCls
	         * <p>A custom CSS class to style the empty text</p>
	         * Defaults to <code>'ms-empty-text'</code>.
	         */
	        emptyTextCls: 'ms-empty-text',

	        /**
	         * @cfg {Boolean} expanded
	         * <p>Set starting state for combo.</p>
	         * Defaults to <code>false</code>.
	         */
	        expanded: false,

	        /**
	         * @cfg {Boolean} expandOnFocus
	         * <p>Automatically expands combo on focus.</p>
	         * Defaults to <code>false</code>.
	         */
	        expandOnFocus: function() {
	        	return settings.editable === false ? true : false;
	        },

	        /**
	         * @cfg {Boolean} hideTrigger
	         * <p>Set to true to hide the trigger on the right</p>
	         * Defaults to <code>false</code>.
	         */
	        hideTrigger: false,

	        /**
	         * @cfg {Boolean} highlight
	         * <p>Set to true to highlight search input within displayed suggestions</p>
	         * Defaults to <code>true</code>.
	         */
	        highlight: true,
	        

	        /**
	         * @cfg {String} id
	         * <p>A custom ID for this component</p>
	         * Defaults to 'ms-ctn-{n}' with n positive integer
	         */
	        id: function() {
	        	return 'ms-ctn-' + $('div[id^="ms-ctn"]').length;
	        },
	        
	        // this.id = cfg.id || ('ms-ctn-' + $('div[id^="ms-ctn"]').length);

	        /**
	         * @cfg {String} infoMsgCls
	         * <p>A class that is added to the info message appearing on the top-right part of the component</p>
	         * Defaults to ''
	         */
	        infoMsgCls: '',

	        /**
	         * @cfg {Object} inputCfg
	         * <p>Additional parameters passed out to the INPUT tag. Enables usage of AngularJS's custom tags for ex.</p>
	         * Defaults to <code>{}</code>
	         */
	        inputCfg: {},

	        /**
	         * @cfg {String} invalidCls
	         * <p>The class that is applied to show that the field is invalid</p>
	         * Defaults to ms-ctn-invalid
	         */
	        invalidCls: 'ms-ctn-invalid',

	        /**
	         * @cfg {String} groupBy
	         * <p>JSON property by which the list should be grouped</p>
	         * Defaults to null
	         */
	        groupBy: null,

	        /**
	         * @cfg {Boolean} matchCase
	         * <p>Set to true to filter data results according to case. Useless if the data is fetched remotely</p>
	         * Defaults to <code>false</code>.
	         */
	        matchCase: false,

	        /**
	         * @cfg {Integer} maxDropHeight (in px)
	         * <p>Once expanded, the combo's height will take as much room as the # of available results.
	         *    In case there are too many results displayed, this will fix the drop down height.</p>
	         * Defaults to 290 px.
	         */
	        maxDropHeight: 290,

	        /**
	         * @cfg {Integer} maxEntryLength
	         * <p>Defines how long the user free entry can be. Set to null for no limit.</p>
	         * Defaults to null.
	         */
	        maxEntryLength: null,

	        /**
	         * @cfg {String} maxEntryRenderer
	         * <p>A function that defines the helper text when the max entry length has been surpassed.</p>
	         * Defaults to <code>function(v){return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');}</code>
	         */
	        maxEntryRenderer: function(v) {
	        	return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');
	        },


	        /**
	         * @cfg {Integer} maxSuggestions
	         * <p>The maximum number of results displayed in the combo drop down at once.</p>
	         * Defaults to null.
	         */
	        maxSuggestions: null,

	        /**
	         * @cfg {Integer} maxSelection
	         * <p>The maximum number of items the user can select if multiple selection is allowed.
	         *    Set to null to remove the limit.</p>
	         * Defaults to 10.
	         */
	        maxSelection: 10,

	        /**
	         * @cfg {Function} maxSelectionRenderer
	         * <p>A function that defines the helper text when the max selection amount has been reached. The function has a single
	         *    parameter which is the number of selected elements.</p>
	         * Defaults to <code>function(v){return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');}</code>
	         */
	        maxSelectionRenderer: function(v) {
	        	return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');
	        },

	        /**
	         * @cfg {String} method
	         * <p>The method used by the ajax request.</p>
	         * Defaults to 'POST'
	         */
	        method: 'POST',

	        /**
	         * @cfg {Integer} minChars
	         * <p>The minimum number of characters the user must type before the combo expands and offers suggestions.
	         * Defaults to <code>0</code>.
	         */
	        minChars: 0,

	        /**
	         * @cfg {Function} minCharsRenderer
	         * <p>A function that defines the helper text when not enough letters are set. The function has a single
	         *    parameter which is the difference between the required amount of letters and the current one.</p>
	         * Defaults to <code>function(v){return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');}</code>
	         */
	        minCharsRenderer: function(v) {
	        	return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');
	        },

    	    /**
	         * @cfg {String} name
        	 * <p>The name used as a form element.</p>
    	     * Defaults to 'null'
	         */
        	name: null,
        
	        /**
	         * @cfg {String} noSuggestionText
	         * <p>The text displayed when there are no suggestions.</p>
	         * Defaults to 'No suggestions"
	         */
	        noSuggestionText: 'No suggestions',

	        /**
	         * @cfg (function) renderer
	         * <p>A function used to define how the items will be presented in the combo</p>
	         * Defaults to <code>null</code>.
	         */
	        renderer: null,

	        /**
	         * @cfg (input DOM Element) renderTo
	         * <p>The input tag that will be transformed into the component</p>
	         * Defaults to <code>null</code>.
	         */
	        // renderTo: element,

	        /**
	         * @cfg {Boolean} required
	         * <p>Whether or not this field should be required</p>
	         * Defaults to false
	         */
	        required: false,

	        /**
	         * @cfg {Boolean} resultAsString
	         * <p>Set to true to render selection as comma separated string</p>
	         * Defaults to <code>false</code>.
	         */
	        resultAsString: false,

	        /**
	         * @cfg {String} selectionCls
	         * <p>A custom CSS class to add to a selected item</p>
	         * Defaults to <code>''</code>.
	         */
	        selectionCls: '',

	        /**
	         * @cfg {String} selectionPosition
	         * <p>Where the selected items will be displayed. Only 'right', 'bottom' and 'inner' are valid values</p>
	         * Defaults to <code>'inner'</code>, meaning the selected items will appear within the input box itself.
	         */
	        selectionPosition: 'inner',
	        
	        /*
	        if($.type(cfg.selectionPosition) === 'string'){
	            if(['right', 'bottom', 'inner'].indexOf(cfg.selectionPosition.toLowerCase()) === -1){
	                throw "selectionPosition is not valid. Only 'right', 'bottom' and 'inner' are accepted";
	            }
	            this.selectionPosition = cfg.selectionPosition.toLowerCase();
	        } else {
	            this.selectionPosition = 'inner';
	        }
	        */

	        /**
	         * @cfg {Boolean} selectionStacked
	         * <p>Set to true to stack the selectioned items when positioned on the bottom
	         *    Requires the selectionPosition to be set to 'bottom'</p>
	         * Defaults to <code>false</code>.
	         */
	        selectionStacked: false,
	        /*
	        if(this.selectionStacked === true && this.selectionPosition !== 'bottom'){
	            this.selectionPosition = 'bottom';
	        }
	        */

	        /**
	         * @cfg {String} sortDir
	         * <p>Direction used for sorting. Only 'asc' and 'desc' are valid values</p>
	         * Defaults to <code>'asc'</code>.
	         */
	        sortDir: 'asc',
	        /*
	        if($.type(cfg.sortDir) === 'string'){
	            if(['asc', 'desc'].indexOf(cfg.sortDir.toLowerCase()) === -1){
	                throw "sortDir is not valid. Only 'asc' and 'desc' are accepted";
	            }
	            this.sortDir = cfg.sortDir.toLowerCase();
	        } else {
	            this.sortDir = 'asc';
	        }
	        */

	        /**
	         * @cfg {String} sortOrder
	         * <p>name of JSON object property for local result sorting.
	         *    Leave null if you do not wish the results to be ordered or if they are already ordered remotely.</p>
	         *
	         * Defaults to <code>null</code>.
	         */
	        sortOrder: null,

	        /**
	         * @cfg {Boolean} strictSuggest
	         * <p>If set to true, suggestions will have to start by user input (and not simply contain it as a substring)</p>
	         * Defaults to <code>false</code>.
	         */
	        strictSuggest: false,

	        /**
	         * @cfg {String} style
	         * <p>Custom style added to the component container.</p>
	         *
	         * Defaults to <code>''</code>.
	         */
	        style: '',

	        /**
	         * @cfg {Boolean} useTabKey
	         * <p>If set to true, tab won't blur the component but will be registered as the ENTER key</p>
	         * Defaults to <code>false</code>.
	         */
	        useTabKey: false,

	        /**
	         * @cfg {Boolean} useCommaKey
	         * <p>If set to true, using comma will validate the user's choice</p>
	         * Defaults to <code>true</code>.
	         */
	        useCommaKey: true,


	        /**
	         * @cfg {Boolean} useZebraStyle
	         * <p>Determines whether or not the results will be displayed with a zebra table style</p>
	         * Defaults to <code>true</code>.
	         */
	        useZebraStyle: true,

	        /**
	         * @cfg {String/Object/Array} value
	         * <p>initial value for the field</p>
	         * Defaults to <code>null</code>.
	         */
	        value: null,

	        /**
	         * @cfg {String} valueField
	         * <p>name of JSON object property that represents its underlying value</p>
	         * Defaults to <code>id</code>.
	         */
	        valueField: 'id',

	        /**
	         * @cfg {Integer} width (in px)
	         * <p>Width of the component</p>
	         * Defaults to underlying element width.
	         */
	        width: function() {
	        	return $(this).width();
	        }
	    };

		var conf = $.extend({},options);
		var settings = $.extend(true, {}, defaults, conf);

		// some init stuff
		if (settings.emptyText instanceof Function) {
			settings.emptyText = settings.emptyText.call();	
		}
		if (settings.expandOnFocus instanceof Function) {
			settings.expandOnFocus = settings.expandOnFocus.call();
		}
		if (settings.id instanceof Function) {
			settings.id = settings.id.call();
		}
		
        /**********  EVENT LIST ************/
        var events = [
        /**
         * @event afterrender
         * Fired when the component has finished rendering.
         * @param this
         */
            'afterrender',

        /**
         * @event beforerender
         * Fired before the component renders.
         * @param this
         */
            'beforerender',

        /**
         * @event blur
         * Fired when the component looses focus.
         * @param this
         */
            'blur',

        /**
         * @event collapse
         * Fired when the combo is collapsed.
         * @param this
         */
            'collapse',

        /**
         * @event expand
         * Fired when the combo is expanded.
         * @param this
         */
            'expand',

        /**
         * @event focus
         * Fired when the component gains focus.
         * @param this
         */
            'focus',

        /**
         * @event onbeforeload
         * Fired prior to an ajax request.
         * @param this
         */
            'onbeforeload',

        /**
         * @event onload
         * Fired when a key is pressed down within the component.
         * @param this
         */
            'onkeydown',

        /**
         * @event onkeydown
         * Fired when a key is pressed down within the component.
         * @param this
         */
            'onkeydown',

        /**
         * @event onkeyup
         * Fired when a key is released within the component.
         * @param this
         */
            'onkeyup',

        /**
         * @event onload
         * Fired once the ajax request has successfully finished.
         * @param this
         * @param json records
         */
            'onload',

        /**
         * @event ontriggerclick
         * Fired when the user clicks the side trigger.
         * @param this
         */
            'ontriggerclick',

        /**
         * @event selectionchange
         * Fired when the selected values have changed.
         * @param this
         * @param selected items
         */
            'selectionchange'

        ];
           		
   	    /**********  PUBLIC METHODS ************/
   	    /**
   	     * Add one or multiple json items to the current selection
   	     * @param items - json object or array of json objects
   	     */
   	    this.addToSelection = function(items) 
   	    {   	    	
   	        if (!settings.maxSelection || selection.length < settings.maxSelection) {
   	            if (!$.isArray(items)) {
   	                items = [items];
   	            }
   	            var valuechanged = false;
   	            $.each(items, function(index, json) {
   	                if (context.getValue().indexOf(json[settings.valueField]) === -1) {
   	                    _selection.push(json);
   	                    valuechanged = true;
   	                }
   	            });
   	            if(valuechanged === true) {
   	                handlers._renderSelection();
   	                this.input.val('');
   	                $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
   	            }
   	        }
   	    };

   	    /**
   	     * Collapse the drop down part of the combo
   	     */
   	    this.collapse = function()
   	    {
   	        if (settings.expanded === true) {
   	            this.combobox.detach();
   	            settings.expanded = false;
   	            $(this).trigger('collapse', [this]);
   	        }
   	    },

   	    /**
   	     * Set the component in a disabled state.
   	     */
   	    this.disable = function() 
   	    {
   	        this.container.addClass('ms-ctn-disabled');
   	        settings.disabled = true;
   	    };

   	    /**
   	     * Set the component in a enable state.
   	     */
   	    this.enable = function() 
   	    {
   	        this.container.removeClass('ms-ctn-disabled');
   	        settings.disabled = false;
   	    };

   	    /**
   	     * Expand the drop drown part of the combo.
   	     */
   	    this.expand = function() 
   	    {
   	        if (!settings.expanded && (this.input.val().length >= settings.minChars || this.combobox.children().size() > 0)) {
   	            this.combobox.appendTo(this.container);
   	            handlers._processSuggestions();

   	            settings.expanded = true;
   	            $(this).trigger('expand', [this]);
   	        }
   	    };

   	    /**
   	     * Retrieve component enabled status
   	     */
   	    this.isDisabled = function()
   	    {
   	        return settings.disabled;
   	    };

   	    /**
   	     * Check whether or not the component has been rendered.
   	     * @return {boolean}
   	     */
   	    this.isRendered = function() 
   	    {
   	        return handlers._rendered === true;
   	    };

   	    /**
   	     * Checks whether the field is valid or not
   	     * @return {boolean}
   	     */
   	    this.isValid = function()
   	    {
   	        return settings.required === false || _selection.length > 0;
   	    };

   	    /**
   	     * Retrieve an array of selected json objects
   	     * @return {Array}
   	     */
   	    this.getSelectedItems = function()
   	    {
   	        return _selection;
   	    };

   	    /**
   	     * Retrieve an array of selected values
   	     */
   	    this.getValue = function()
   	    {
   	        return $.map(_selection, function(o) {
   	            return o[settings.valueField];
   	        });
   	    };

   	    /**
   	     * Remove one or multiples json items from the current selection
   	     * @param items - json object or array of json objects
   	     */
   	    this.removeFromSelection = function(items)
   	    {
   	        if (!$.isArray(items)) {
   	            items = [items];
   	        }
   	        var valuechanged = false;
   	        $.each(items, function(index, json) {
   	            var i = context.getValue().indexOf(json[settings.valueField]);
   	            if (i > -1) {
   	                _selection.splice(i, 1);
   	                valuechanged = true;
   	            }
   	        });
   	        if (valuechanged === true) {
   	            handlers._renderSelection();
   	            $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
   	            if (settings.expanded) {
   	                handlers._processSuggestions();
   	            }
   	        }
   	    };
   	    
   	    /**
   	     * Remove all items from the current selection
 	     * 
   	     */
   	    this.removeAllFromSelection = function()
   	    {
   	    	this.removeFromSelection(_selection.slice());
   	    };

   	    /**
   	     * If not rendered, the component will dynamically render itself in the given element.
   	     * @param el
   	     */
   	    this.render = function(el)
   	    {
   	        if (this.isRendered() === false) {
   	            // this.renderTo = el;
   	            handlers._doRender(el);
   	        }
   	    };

   	    /**
   	     * Sets a value for the combo box. Value must be a value or an array of value with data type matching valueField one.
   	     * @param data
   	     */
   	    this.setValue = function(data)
   	    {
   	        var values = $.isArray(data) ? data : [data],
   	            items = [];
   	        
   	        $.each(this.combobox.children(), function(index, suggestion) {
   	            var obj = $(suggestion).data('json');
   	            if (values.indexOf(obj[settings.valueField]) > -1) {
   	                items.push(obj);
   	            }
   	        });
   	        if (items.length > 0) {
   	            this.addToSelection(items);
   	        }
   	    };

   	    /**
   	     * Sets data params for subsequent ajax requests
   	     * @param params
   	     */
   	    this.setDataUrlParams = function(params) 
   	    {
   	    	settings.dataUrlParams = $.extend({},params);
   	    };
   	    
   	    /**
   	     * Gets the data params for current ajax request
   	     */
   	    this.getDataUrlParams = function()
   	    {
   	    	return settings.dataUrlParams;
   	    };
   	    
		/**********  PRIVATE ************/
		var handlers = {
			_rendered: false,
			_hasFocus: false,
			
		    /**
		     * Render the component to the given input DOM element
		     * @private
		     */
		    _doRender: function(el) {
		        if (context.isRendered() === false) {
		
		            $(context).trigger('beforerender', [context]);
		
		            // holds the main div, will relay the focus events to the contained input element.
		            context.container = $('<div/>', {
		                id: settings.id,
		                'class': 'ms-ctn ' + settings.cls +
		                    (settings.disabled === true ? ' ms-ctn-disabled' : '') +
		                    (settings.editable === true ? '' : ' ms-ctn-readonly'),
		                style: 'width: ' + settings.width.call(el) + 'px;' + settings.style
		            });
		            context.container.focus($.proxy(this._onFocus, this));
		            context.container.blur($.proxy(this._onBlur, this));
		            context.container.keydown($.proxy(this._onHandleKeyDown, this));
		            context.container.keyup($.proxy(this._onHandleKeyUp, this));
		
		            // holds the input field
		            context.input = $('<input/>', $.extend({
		                id: 'ms-input-' + $('input[id^="ms-input"]').length,
		                type: 'text',
		                'class': settings.emptyTextCls + (settings.editable === true ? '' : ' ms-input-readonly'),
		                value: settings.emptyText,
		                readonly: !settings.editable,
		                style: 'width: ' + (settings.width.call(el) - (settings.hideTrigger ? 16 : 42)) + 'px;'
		            }, settings.inputCfg));
		            
		            context.input.focus($.proxy(this._onInputFocus, this));
		
		            // holds the trigger on the right side
		            if (settings.hideTrigger === false) {
		            	context.trigger = $('<div/>', {
		                    id: 'ms-trigger-' + $('div[id^="ms-trigger"]').length,
		                    'class': 'ms-trigger',
		                    html: '<div class="ms-trigger-ico"></div>'
		                });
		            	context.trigger.click($.proxy(this._onTriggerClick, this));
		            	context.container.append(context.trigger);
		            }
		
		            // holds the suggestions. will always be placed on focus
		            context.combobox = $('<div/>', {
		                id: 'ms-res-ctn-' + $('div[id^="ms-res-ctn"]').length,
		                'class': 'ms-res-ctn ',
		                style: 'width: ' + settings.width.call(el) + 'px; height: ' + settings.maxDropHeight + 'px;'
		            });
		
		            context.selectionContainer = $('<div/>', {
		                id: 'ms-sel-ctn-' +  $('div[id^="ms-sel-ctn"]').length,
		                'class': 'ms-sel-ctn'
		            });
		            context.selectionContainer.click($.proxy(this._onFocus, this));
		
		            if (settings.selectionPosition === 'inner') {
		            	context.selectionContainer.append(context.input);
		            } 
		            else {
		            	context.container.append(context.input);
		            }
		
		            context.helper = $('<div/>', {
		                'class': 'ms-helper ' + settings.infoMsgCls
		            });
		            this._updateHelper();
		            context.container.append(context.helper);
		
		
		            // Render the whole thing
		            $(el).replaceWith(context.container);
		
		            switch(settings.selectionPosition) { 
		                case 'bottom':
		                	context.selectionContainer.insertAfter(context.container);
		                    if (settings.selectionStacked === true) {
		                    	context.selectionContainer.width(context.container.width());
		                    	context.selectionContainer.addClass('ms-stacked');
		                    }
		                    break;
		                case 'right':
		                	context.selectionContainer.insertAfter(context.container);
		                	context.container.css('float', 'left');
		                    break;
		                default:
		                	context.container.append(context.selectionContainer);
		                    break;
		            }
		
		            this._rendered = true;
		            // handlers._processSuggestions();
		            if (settings.value !== null) {
		                context.setValue(settings.value);
	                    this._renderSelection();
		            }
		            
		            $(context).trigger('afterrender', [context]);
		            var ref = this;
		            $("body").click(function(e) {
		                if (context.container.hasClass('ms-ctn-bootstrap-focus') && context.container.has(e.target).length === 0 && e.target.className.indexOf('ms-res-item') < 0 &&
		                	context.container[0] !== e.target) {
		                    ref._onBlur();
		                }
		            });
		
		            if (settings.expanded === true) {
		            	settings.expanded = false;
		                context.expand();
		            }
		        }
		    },
		
		    /**
		     * Triggered when focusing on the container div. Will focus on the input field instead.
		     * 
		     * @private
		     */
		    _onFocus: function() {
		        context.input.focus();
		    },
		
		    /**
		     * Triggered when focusing on the input text field.
		     * @private
		     */
		    _onInputFocus: function() {
		        if (context.isDisabled() === false && !this._hasFocus) {
                    this._hasFocus = true;
		        	context.container.addClass('ms-ctn-bootstrap-focus');
		        	context.container.removeClass(settings.invalidCls);
		            
		            if (context.input.val() === settings.emptyText) {
		            	context.input.removeClass(settings.emptyTextCls);
		            	context.input.val('');
		            }
		            
		            var curLength = context.input.val().length;
		            if ((settings.expandOnFocus === true && curLength === 0) || curLength > settings.minChars){
		                context.expand();
		            }
		            
		            if (_selection.length === settings.maxSelection) {
		                this._updateHelper(settings.maxSelectionRenderer.call(this, _selection.length));
		            } 
		            else if (curLength < settings.minChars) {
		                this._updateHelper(settings.minCharsRenderer.call(this, settings.minChars - curLength));
		            }
		            
	                this._renderSelection();
		            $(context).trigger('focus', [context]);
		        }
		    },
		
		    /**
		     * Triggered when blurring out of the component
		     * @private
		     */
		    _onBlur: function() {
		    	context.container.removeClass('ms-ctn-bootstrap-focus');
		        context.collapse();
		        this._hasFocus = false;
		        this._renderSelection();
		        
		        if (context.isValid() === false) {
		        	context.container.addClass('ms-ctn-invalid');
		        }
		
		        if (context.input.val() === '' && _selection.length === 0) {
		        	context.input.addClass(settings.emptyTextCls);
		        	context.input.val(settings.emptyText);
		        }
		        else if(context.input.val() !== '' && settings.allowFreeEntries === false) {
		            context.input.val('');
        		    this._updateHelper('');
		        }
        
		        if (context.input.is(":focus")) {
		            $(context).trigger('blur', [context]);
		        }
		    },
		
		    /**
		     * Triggered when the user presses a key while the component has focus
		     * This is where we want to handle all keys that don't require the user input field
		     * since it hasn't registered the key hit yet
		     * @param e keyEvent
		     * @private
		     */
		    _onHandleKeyDown: function(e) {
		        // check how tab should be handled
		        var active = context.combobox.find('.ms-res-item-active:first'),
		            freeInput = context.input.val() !== settings.emptyText ? context.input.val() : '';
		
		        $(context).trigger('onkeydown', [context, e]);
		
		        if (e.keyCode === 9 && (settings.useTabKey === false ||
		            (settings.useTabKey === true && active.length === 0 && context.input.val().length === 0))) {
		            this._onBlur();
		            return;
		        }
		        switch(e.keyCode) {
		            case 8: //backspace
		                if (freeInput.length === 0 && context.getSelectedItems().length > 0 && settings.selectionPosition === 'inner') {
		                    _selection.pop();
		                    this._renderSelection();
		                    $(context).trigger('selectionchange', [context, context.getSelectedItems()]);
		                    context.input.focus();
		                    e.preventDefault();
		                }
		                break;
		            case 9: // tab
		            case 188: // esc
		            case 13: // enter
		                e.preventDefault();
		                break;
		            case 40: // down
		                e.preventDefault();
		                this._moveSelectedRow("down");
		                break;
		            case 38: // up
		                e.preventDefault();
		                this._moveSelectedRow("up");
		                break;
		            default:
		                if (_selection.length === settings.maxSelection) {
		                    e.preventDefault();
		                }
		                break;
		        }
		    },
				    
		    /**
		     * Triggered when a key is released while the component has focus
		     * @param e
		     * @private
		     */		    
		    _onHandleKeyUp: function(e) {
		        var freeInput = context.input.val() !== settings.emptyText ? context.input.val() : '',
		            inputValid = context.input.val().trim().length > 0 && context.input.val() !== settings.emptyText &&
		                (!settings.maxEntryLength || context.input.val().trim().length < settings.maxEntryLength),
		            selected,
		            obj = {};
		            
		        $(context).trigger('onkeyup', [context, e]);
		        
		        clearTimeout(_timer);
		        
		        // collapse if escape, but keep focus.
		        if (e.keyCode === 27 && settings.expanded) {
		        	context.combobox.height(0);
		        }
		        // ignore a bunch of keys
		        if ((e.keyCode === 9 && settings.useTabKey === false) || (e.keyCode > 13 && e.keyCode < 32)) {
		            return;
		        }
		        switch(e.keyCode) {
		            case 40:case 38: // up, down
		                e.preventDefault();
		                break;
		            case 13:case 9:case 188:// enter, tab, comma
		                if (e.keyCode !== 188 || settings.useCommaKey === true) {
		                    e.preventDefault();
		                    if(this.expanded === true){ // if a selection is performed, select it and reset field
		                        selected = context.combobox.find('.ms-res-item-active:first');
		                        if (selected.length > 0) {
		                            this._selectItem(selected);
		                            return;
		                        }
		                    }
		                    // if no selection or if freetext entered and free entries allowed, add new obj to selection
		                    if (inputValid === true && settings.allowFreeEntries === true) {
		                        obj[settings.displayField] = obj[settings.valueField] = freeInput;
		                        context.addToSelection(obj);
		                        context.collapse(); // cause the combo suggestions to reset
		                        context.input.focus();
		                    }
		                    break;
		                }
		            default:
		                if (_selection.length === settings.maxSelection){
		                    this._updateHelper(settings.maxSelectionRenderer.call(this, _selection.length));
		                } 
		                else {
		                    if (freeInput.length < settings.minChars) {
		                        this._updateHelper(settings.minCharsRenderer.call(this, settings.minChars - freeInput.length));
		                        if (settings.expanded === true) {
									context.combobox.collapse();
		                        }
		                    } 
		                    else if (settings.maxEntryLength && freeInput.length > settings.maxEntryLength) {
		                        this._updateHelper(settings.maxEntryRenderer.call(this, freeInput.length - settings.maxEntryLength));
		                        if (settings.expanded === true) {
		                        	context.combobox.collapse();
		                        }
		                    } 
		                    else {
		                    	context.helper.hide();
		                        if (settings.expanded === true) {
		                        	ctx = this;
		            				_timer = setTimeout(function() {
		            					ctx._processSuggestions();
		            				}, 450);
		                        } 
		                        else if (freeInput.length >= settings.minChars && settings.expanded === false) {
		                            context.expand();
		                        }
		                    }
		                }
		                break;
		        }
		    },
		
		    /**
		     * Triggered when clicking on the small trigger in the right
		     * @private
		     */
		    _onTriggerClick: function() {
		        if (context.isDisabled() === false) {
		        	
		            $(context).trigger('ontriggerclick', [context]);
		            
		            if (settings.expanded === true) {
		                context.collapse();
		            } 
		            else {
		            	context.input.focus();
		                context.expand();
		            }
		        }
		    },
		
		    /**
		     * According to given data and query, sort and add suggestions in their container
		     * @private
		     */
		    _processSuggestions: function() {
		        var json = null;
		        if (settings.data !== null) {
		            if (typeof(settings.data) === 'string' && settings.data.indexOf(',') < 0) { // get results from ajax
		                $(context).trigger('onbeforeload', [context]);
		                var ref = this;
		                var params = $.extend({query: context.input.val()}, settings.dataUrlParams);
		        		
		                $.ajax({
		                    type: settings.method,
		                    url: settings.data,
		                    data: params,
		                    success: function(items){
		                        if(typeof(items) === 'string' && items.length > 0){
		                            json = JSON.parse(items);
		                        } else if(items.results !== undefined){
		                            json = items.results;
		                        } else if($.isArray(items)){
		                            json = items;
		                        } else {
		                        	json = [];
		                        }
		                        $(context).trigger('onload', [context, json]);
		                        ref._displaySuggestions(ref._sortAndTrim(json));
		                    },
		                    error: function(){
		                        throw("Could not reach server");
		                    }
		                });
		            } 
		            else if (typeof(settings.data) === 'string' && settings.data.indexOf(',') > -1) { // results from csv string
		                this._displaySuggestions(this._sortAndTrim(this._getEntriesFromStringArray(settings.data.split(','))));
		            } 
		            else { // results from local array
		                if (settings.data.length > 0 && typeof(settings.data[0]) === 'string') { // results from array of strings
		                    this._displaySuggestions(this._sortAndTrim(this._getEntriesFromStringArray(settings.data)));
		                } 
		                else { // regular json array
		                    this._displaySuggestions(this._sortAndTrim(settings.data));
		                }
		            }
		        }
		    },
		
		    /**
		     * Returns an array of json objects from an array of strings.
		     * @private
		     */
		    _getEntriesFromStringArray: function(data) {
		        var json = [];
		        $.each(data, function(index, s) {
		            var entry = {};
		            entry[settings.displayField] = entry[settings.valueField] = s.trim();
		            json.push(entry);
		        });
		        return json;
		    },
		
		    /**
		     * Sorts the results and cut them down to max # of displayed results at once
		     * @private
		     */
		    _sortAndTrim: function(data) {
		        var ref = this,
		            q = context.input.val() !== settings.emptyText ? context.input.val() : '',
		            filtered = [],
		            newSuggestions = [],
		            selectedValues = context.getValue();
		        // filter the data according to given input
		        if (q.length > 0) {
		            $.each(data, function(index, obj) { 
		                var name = obj[settings.displayField];
		                if ((settings.matchCase === true && name.indexOf(q) > -1) ||
		                   (settings.matchCase === false && name.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
		                    if (settings.strictSuggest === false || name.toLowerCase().indexOf(q.toLowerCase()) === 0) {
		                        filtered.push(obj);
		                    }
		                }
		            });
		        } 
		        else {
		            filtered = data;
		        }
		        // take out the ones that have already been selected
		        $.each(filtered, function(index, obj) {
		            if (selectedValues.indexOf(obj[settings.valueField]) === -1) {
		                newSuggestions.push(obj);
		            }
		        });
		        // sort the data
		        if (settings.sortOrder !== null) {
		            newSuggestions.sort(function(a,b) {
		                if(a[settings.sortOrder] < b[settings.sortOrder]) {
		                    return settings.sortDir === 'asc' ? -1 : 1;
		                }
		                if(a[settings.sortOrder] > b[settings.sortOrder]) {
		                    return settings.sortDir === 'asc' ? 1 : -1;
		                }
		                return 0;
		            });
		        }
		        // trim it down
		        if (settings.maxSuggestions && settings.maxSuggestions > 0) {
		            newSuggestions = newSuggestions.slice(0, settings.maxSuggestions);
		        }
		        // build groups
		        if (settings.groupBy !== null) {
		            this._groups = {};
		            $.each(newSuggestions, function(index, value) {
		                if(ref._groups[value[settings.groupBy]] === undefined) {
		                    ref._groups[value[settings.groupBy]] = {title: value[settings.groupBy], items: [value]};
		                } 
		                else {
		                    ref._groups[value[settings.groupBy]].items.push(value);
		                }
		            });
		        }
		        return newSuggestions;
		    },
		
		    /**
		     * Empties the result container and refills it with the array of json results in input
		     * @private
		     */
		    _displaySuggestions: function(data) {
		    	context.combobox.empty();
		        
		        var resHeight = 0, // total height taken by displayed results.
		            nbGroups = 0;
		
		        if (this._groups === undefined) {
		            this._renderComboItems(data);
		            resHeight = _comboItemHeight * data.length;
		        } 
		        else {
		            for(var grpName in this._groups) {
		                nbGroups += 1;
		                $('<div/>', {
		                    'class': 'ms-res-group',
		                    html: grpName
		                }).appendTo(context.combobox);
		                this._renderComboItems(this._groups[grpName].items, true);
		            }
		            resHeight = _comboItemHeight * (data.length + nbGroups);
		        }
		
		        if (resHeight < context.combobox.height() || resHeight < settings.maxDropHeight) {
		        	context.combobox.height(resHeight);
		        } 
		        else if(resHeight >= context.combobox.height() && resHeight > settings.maxDropHeight) {
		        	context.combobox.height(settings.maxDropHeight);
		        }
		        
		        if (data.length === 1 && settings.preselectSingleSuggestion === true) {
		        	context.combobox.children().filter(':last').addClass('ms-res-item-active');
		        }
		        
		        if (data.length === 0) {
		            this._updateHelper(settings.noSuggestionText);
					context.combobox.collapse();
		        }
		    },
		
		    _renderComboItems: function(items, isGrouped) {
		        var ref = this;
		        $.each(items, function(index, value) {
		            var displayed = settings.renderer !== null ? settings.renderer.call(ref, value) : value[settings.displayField];
		            var resultItemEl = $('<div/>', {
		                'class': 'ms-res-item ' + (isGrouped ? 'ms-res-item-grouped ':'') +
		                    (index % 2 === 1 && settings.useZebraStyle === true ? 'ms-res-odd' : ''),
		                html: settings.highlight === true ? ref._highlightSuggestion(displayed) : displayed
		            }).data('json', value);
		            resultItemEl.click($.proxy(ref._onComboItemSelected, ref));
		            resultItemEl.mouseover($.proxy(ref._onComboItemMouseOver, ref));
		            context.combobox.append(resultItemEl);
		        });
		        _comboItemHeight = context.combobox.find('.ms-res-item:first').outerHeight();
		    },
		
		    /**
		     * Replaces html with highlighted html according to case
		     * @param html
		     * @private
		     */
		    _highlightSuggestion: function(html) {
		        var q = context.input.val() !== settings.emptyText ? context.input.val() : '';
		        if (q.length === 0) {
		            return html; // nothing entered as input
		        }
		        
		        if (settings.matchCase === true) {
		            html = html.replace(new RegExp('(' + q + ')','g'), '<em>$1</em>');
		        } 
		        else {
		            html = html.replace(new RegExp('(' + q + ')','gi'), '<em>$1</em>');
		        }
		        return html;
		    },
		
		    /**
		     * Triggered when hovering an element in the combo
		     * @param e
		     * @private
		     */
		    _onComboItemMouseOver: function(e) { 
		    	context.combobox.children().removeClass('ms-res-item-active');
		        $(e.currentTarget).addClass('ms-res-item-active');
		    },
		
		    /**
		     * Triggered when an item is chosen from the list
		     * @param e
		     * @private
		     */
		    _onComboItemSelected: function(e) {
		        this._selectItem($(e.currentTarget));		    
		    },
		
		    /**
		     * Select an item either through keyboard or mouse
		     * @param item
		     * @private
		     */
		    _selectItem: function(item) {
		        context.addToSelection(item.data('json'));
		        item.removeClass('ms-res-item-active');
		        context.collapse();
		        context.input.focus();
		    },
    
		    /**
		     * Renders the selected items into their container.
		     * @private
		     */
		    _renderSelection: function() {
		        var ref = this, w = 0, inputOffset = 0, items = [],
		            asText = settings.resultAsString === true && !this._hasFocus;
		        
		        context.selectionContainer.find('.ms-sel-item').remove();
		        if (context._valueContainer !== undefined) {
		            context._valueContainer.remove();
        		}
        		
		        $.each(_selection, function(index, value){
		
		            var selectedItemEl, delItemEl;
		            // tag representing selected value
		            if (asText === true) {
		                selectedItemEl = $('<div/>', {
		                    'class': 'ms-sel-item ms-sel-text ' + settings.selectionCls,
		                    html: value[settings.displayField] + (index === (_selection.length - 1) ? '' : ',')
		                })
		                .data('json', value);
		            } 
		            else {
		                selectedItemEl = $('<div/>', {
		                    'class': 'ms-sel-item ' + settings.selectionCls,
		                    html: value[settings.displayField]
		                })
		                .data('json', value);
		
		                // small cross img
		                delItemEl = $('<span/>', {
		                    'class': 'ms-close-btn'
		                })
		                .data('json', value).appendTo(selectedItemEl);
		                
		                delItemEl.click($.proxy(ref._onRemoveFromSelection, ref));
		            }
		
		            items.push(selectedItemEl);
		        });
		        
		        context.selectionContainer.prepend(items);
        		context._valueContainer = $('<input/>', {
		            type: 'hidden',
        		    name: settings.name,
		            value: JSON.stringify(context.getValue())
        		});
		        context._valueContainer.appendTo(context.selectionContainer);
        
		        if (settings.selectionPosition === 'inner') {
		            // this really sucks... trying to figure out the best way to fill out the remaining space
		        	context.selectionContainer.append(context.input);
		        	context.input.width(0);
		            if (settings.editable === true || _selection.length === 0) {
		                inputOffset = context.input.offset().left - context.selectionContainer.offset().left;
		                w = context.container.width() - inputOffset - 32 - (settings.hideTrigger === true ? 0 : 42);
		                context.input.width(w < 100 ? 100 : w);
		            }
		            context.container.height(context.selectionContainer.height());
		        }
		    },
		
		    /**
		     * Triggered when clicking upon cross for deletion
		     * @param e
		     * @private
		     */
		    _onRemoveFromSelection: function(e) {
		        context.removeFromSelection($(e.currentTarget).data('json'));
		    },
		
		    /**
		     * Moves the selected cursor amongst the list item
		     * @param dir - 'up' or 'down'
		     * @private
		     */
		    _moveSelectedRow: function(dir) {
		        if (!settings.expanded) {
		            context.expand();
		        }
		        var list, start, active, scrollPos;
		        list = context.combobox.find(".ms-res-item");
		        if (dir === 'down') {
		            start = list.eq(0);
		        } 
		        else {
		            start = list.filter(':last');
		        }
		        active = context.combobox.find('.ms-res-item-active:first');
		        if (active.length > 0) {
		            if (dir === 'down') {
		                start = active.nextAll('.ms-res-item').first();
		                if (start.length === 0) {
		                    start = list.eq(0);
		                }
		                scrollPos = context.combobox.scrollTop();
		                context.combobox.scrollTop(0);
		                if (start[0].offsetTop + start.outerHeight() > context.combobox.height()) {
		                	context.combobox.scrollTop(scrollPos + _comboItemHeight);
		                }
		            } 
		            else {
		                start = active.prevAll('.ms-res-item').first();
		                if (start.length === 0) {
		                    start = list.filter(':last');
		                    context.combobox.scrollTop(_comboItemHeight * list.length);
		                }
		                if (start[0].offsetTop < context.combobox.scrollTop()) {
		                	context.combobox.scrollTop(context.combobox.scrollTop() - _comboItemHeight);
		                }
		            }
		        }
		        list.removeClass("ms-res-item-active");
		        start.addClass("ms-res-item-active");
		    },
		
		    /**
		     * Update the helper text
		     * @private
		     */
		    _updateHelper: function(html) {
		    	context.helper.html(html);
		        if (!context.helper.is(":visible")) {
		        	context.helper.fadeIn();
		        }
		    }
    	};
		
        var _selection = []; // private array holder for our selected objects
        var _comboItemHeight = 0; // private height for each combo item.
        var _timer;
        
        if (element !== null) {
            handlers._doRender(element);
        }
	};
	
	$.fn.magicSuggest = function(options) {
		var obj = $(this);
		
		if (obj.size() == 1 && obj.data('magicSuggest')) {
			return obj.data('magicSuggest');
		}

		obj.each(function(i) {
			// assume $(this) is an element
			var cntr = $(this);

			// Return early if this element already has a plugin instance
			if (cntr.data('magicSuggest')) return;

			// set rendered element
			// options.renderTo = this;
			
            // pass options to plugin constructor
            var field = new MagicSuggest(this, options);

            // Store plugin object in this element's data
            cntr.data('magicSuggest', field);
		});
		
		if (obj.size() == 1) {
			return obj.data('magicSuggest');
		}
		return obj; 
	};
})(jQuery);
