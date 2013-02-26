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

var MagicSuggest = Class.create({
    /**
     * Initializes the MagicSuggest component
     * @param cfg - see config below
     */
    init: function(cfg){
        /**********  CONFIGURATION PROPERTIES ************/
        /**
         * @cfg {Boolean} allowFreeEntries
         * <p>Restricts or allows the user to validate typed entries </p>
         * Defaults to <code>true</code>.
         */
        this.allowFreeEntries = cfg.allowFreeEntries !== undefined ? cfg.allowFreeEntries : true;

        /**
         * @cfg {Boolean} preselectSingleSuggestion
         * <p>If a single suggestion comes out, it is preselected.</p>
         * Defaults to <code>true</code>.
         */
        this.preselectSingleSuggestion = cfg.preselectSingleSuggestion !== undefined ? cfg.preselectSingleSuggestion : true;

        /**
         * @cfg {String} cls
         * <p>A custom CSS class to apply to the field's underlying element</p>
         * Defaults to <code>''</code>.
         */
        this.cls = cfg.cls || '';

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
        this.data = cfg.data !== undefined ? cfg.data : null;

        /**
         * @cfg {Object} dataParams
         * <p>Additional parameters to the ajax call</p>
         * Defaults to <code>{}</code>
         */
        this.dataParams = cfg.dataParams !== undefined ? cfg.dataParams : {};

        /**
         * @cfg {Boolean} disabled
         * <p>Start the component in a disabled state.</p>
         * Defaults to <code>false</code>.
         */
        this.disabled = !!cfg.disabled;

        /**
         * @cfg {String} displayField
         * <p>name of JSON object property displayed in the combo list</p>
         * Defaults to <code>name</code>.
         */
        this.displayField = cfg.displayField || 'name';

        /**
         * @cfg {Boolean} editable
         * <p>Set to false if you only want mouse interaction. In that case the combo will
         * automatically expand on focus.</p>
         * Defaults to <code>true</code>.
         */
        this.editable = cfg.editable !== undefined ? cfg.editable : true;

        /**
         * @cfg {String} emptyText
         * <p>The default placeholder text when nothing has been entered</p>
         * Defaults to <code>'Type or click here'</code> or just <code>'Click here'</code> if not editable.
         */
        this.emptyText = cfg.emptyText !== undefined ? cfg.emptyText : (this.editable === true ? 'Type or click here' : 'Click here');

        /**
         * @cfg {String} emptyTextCls
         * <p>A custom CSS class to style the empty text</p>
         * Defaults to <code>'ms-empty-text'</code>.
         */
        this.emptyTextCls = cfg.emptyTextCls || 'ms-empty-text';

        /**
         * @cfg {Boolean} expanded
         * <p>Set starting state for combo.</p>
         * Defaults to <code>false</code>.
         */
        this.expanded = !!cfg.expanded;

        /**
         * @cfg {Boolean} expandOnFocus
         * <p>Automatically expands combo on focus.</p>
         * Defaults to <code>false</code>.
         */
        this.expandOnFocus = this.editable === false ? true : !!cfg.expandOnFocus;

        /**
         * @cfg {Boolean} hideTrigger
         * <p>Set to true to hide the trigger on the right</p>
         * Defaults to <code>false</code>.
         */
        this.hideTrigger = !!cfg.hideTrigger;

        /**
         * @cfg {Boolean} highlight
         * <p>Set to true to highlight search input within displayed suggestions</p>
         * Defaults to <code>true</code>.
         */
        this.highlight = cfg.highlight !== undefined ? cfg.highlight : true;

        /**
         * @cfg {String} id
         * <p>A custom ID for this component</p>
         * Defaults to 'ms-ctn-{n}' with n positive integer
         */
        this.id = cfg.id || ('ms-ctn-' + $('div[id^="ms-ctn"]').length);

        /**
         * @cfg {String} infoMsgCls
         * <p>A class that is added to the info message appearing on the top-right part of the component</p>
         * Defaults to ''
         */
        this.infoMsgCls = cfg.infoMsgCls || '';

        /**
         * @cfg {Object} inputCfg
         * <p>Additional parameters passed out to the INPUT tag. Enables usage of AngularJS's custom tags for ex.</p>
         * Defaults to <code>{}</code>
         */
        this.inputCfg = cfg.inputCfg || {};

        /**
         * @cfg {String} inputName
         * <p>the <code>name</code> parameter of the input field for the items being selected.</p>
         * Defaults to <code>'item'</code>
         */
        this.inputName = cfg.inputName || 'item';

        /**
         * @cfg {String} invalidCls
         * <p>The class that is applied to show that the field is invalid</p>
         * Defaults to ms-ctn-invalid
         */
        this.invalidCls = cfg.invalidCls || 'ms-ctn-invalid';

        /**
         * @cfg {String} groupBy
         * <p>JSON property by which the list should be grouped</p>
         * Defaults to null
         */
        this.groupBy = cfg.groupBy !== undefined ? cfg.groupBy : null;

        /**
         * @cfg {Boolean} matchCase
         * <p>Set to true to filter data results according to case. Useless if the data is fetched remotely</p>
         * Defaults to <code>false</code>.
         */
        this.matchCase = !!cfg.matchCase;

        /**
         * @cfg {Integer} maxDropHeight (in px)
         * <p>Once expanded, the combo's height will take as much room as the # of available results.
         *    In case there are too many results displayed, this will fix the drop down height.</p>
         * Defaults to 290 px.
         */
        this.maxDropHeight = cfg.maxDropHeight || 290;

        /**
         * @cfg {Integer} maxEntryLength
         * <p>Defines how long the user free entry can be. Set to null for no limit.</p>
         * Defaults to null.
         */
        this.maxEntryLength = cfg.maxEntryLength !== undefined ? cfg.maxEntryLength : null;

        /**
         * @cfg {String} maxEntryRenderer
         * <p>A function that defines the helper text when the max entry length has been surpassed.</p>
         * Defaults to <code>function(v){return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');}</code>
         */
        this.maxEntryRenderer = cfg.maxEntryRenderer ||
            function(v){return 'Please reduce your entry by ' + v + ' character' + (v > 1 ? 's':'');};


        /**
         * @cfg {Integer} maxSuggestions
         * <p>The maximum number of results displayed in the combo drop down at once.</p>
         * Defaults to null.
         */
        this.maxSuggestions = cfg.maxSuggestions !== undefined ? cfg.maxSuggestions : null;

        /**
         * @cfg {Integer} maxSelection
         * <p>The maximum number of items the user can select if multiple selection is allowed.
         *    Set to null to remove the limit.</p>
         * Defaults to 10.
         */
        this.maxSelection = cfg.maxSelection !== undefined ? cfg.maxSelection : 10;

        /**
         * @cfg {Function} maxSelectionRenderer
         * <p>A function that defines the helper text when the max selection amount has been reached. The function has a single
         *    parameter which is the number of selected elements.</p>
         * Defaults to <code>function(v){return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');}</code>
         */
        this.maxSelectionRenderer = cfg.maxSelectionRenderer ||
            function(v){return 'You cannot choose more than ' + v + ' item' + (v > 1 ? 's':'');};

        /**
         * @cfg {String} method
         * <p>The method used by the ajax request.</p>
         * Defaults to 'POST'
         */
        this.method = cfg.method || 'POST';

        /**
         * @cfg {Integer} minChars
         * <p>The minimum number of characters the user must type before the combo expands and offers suggestions.
         * Defaults to <code>0</code>.
         */
        this.minChars = $.isNumeric(cfg.minChars) ? cfg.minChars : 0;

        /**
         * @cfg {Function} minCharsRenderer
         * <p>A function that defines the helper text when not enough letters are set. The function has a single
         *    parameter which is the difference between the required amount of letters and the current one.</p>
         * Defaults to <code>function(v){return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');}</code>
         */
        this.minCharsRenderer = cfg.minCharsRenderer ||
            function(v){return 'Please type ' + v + ' more character' + (v > 1 ? 's':'');};

        /**
         * @cfg {String} noSuggestionText
         * <p>The text displayed when there are no suggestions.</p>
         * Defaults to 'No suggestions"
         */
        this.noSuggestionText = cfg.noSuggestionText || 'No suggestions';

        /**
         * @cfg (function) renderer
         * <p>A function used to define how the items will be presented in the combo</p>
         * Defaults to <code>null</code>.
         */
        this.renderer = cfg.renderer || null;

        /**
         * @cfg (input DOM Element) renderTo
         * <p>The input tag that will be transformed into the component</p>
         * Defaults to <code>null</code>.
         */
        this.renderTo = cfg.renderTo || null;

        /**
         * @cfg {Boolean} required
         * <p>Whether or not this field should be required</p>
         * Defaults to false
         */
        this.required = !!cfg.required;

        /**
         * @cfg {Boolean} resultAsString
         * <p>Set to true to render selection as comma separated string</p>
         * Defaults to <code>false</code>.
         */
        this.resultAsString = !!cfg.resultAsString;

        /**
         * @cfg {String} selectionCls
         * <p>A custom CSS class to add to a selected item</p>
         * Defaults to <code>''</code>.
         */
        this.selectionCls = cfg.selectionCls || '';

        /**
         * @cfg {String} selectionPosition
         * <p>Where the selected items will be displayed. Only 'right', 'bottom' and 'inner' are valid values</p>
         * Defaults to <code>'inner'</code>, meaning the selected items will appear within the input box itself.
         */
        if($.type(cfg.selectionPosition) === 'string'){
            if(['right', 'bottom', 'inner'].indexOf(cfg.selectionPosition.toLowerCase()) === -1){
                throw "selectionPosition is not valid. Only 'right', 'bottom' and 'inner' are accepted";
            }
            this.selectionPosition = cfg.selectionPosition.toLowerCase();
        } else {
            this.selectionPosition = 'inner';
        }

        /**
         * @cfg {Boolean} selectionStacked
         * <p>Set to true to stack the selectioned items when positioned on the bottom
         *    Requires the selectionPosition to be set to 'bottom'</p>
         * Defaults to <code>false</code>.
         */
        this.selectionStacked = !!cfg.selectionStacked;
        if(this.selectionStacked === true && this.selectionPosition !== 'bottom'){
            this.selectionPosition = 'bottom';
        }

        /**
         * @cfg {String} sortDir
         * <p>Direction used for sorting. Only 'asc' and 'desc' are valid values</p>
         * Defaults to <code>'asc'</code>.
         */
        if($.type(cfg.sortDir) === 'string'){
            if(['asc', 'desc'].indexOf(cfg.sortDir.toLowerCase()) === -1){
                throw "sortDir is not valid. Only 'asc' and 'desc' are accepted";
            }
            this.sortDir = cfg.sortDir.toLowerCase();
        } else {
            this.sortDir = 'asc';
        }

        /**
         * @cfg {String} sortOrder
         * <p>name of JSON object property for local result sorting.
         *    Leave null if you do not wish the results to be ordered or if they are already ordered remotely.</p>
         *
         * Defaults to <code>null</code>.
         */
        this.sortOrder = cfg.sortOrder !== undefined ? cfg.sortOrder : null;

        /**
         * @cfg {Boolean} strictSuggest
         * <p>If set to true, suggestions will have to start by user input (and not simply contain it as a substring)</p>
         * Defaults to <code>false</code>.
         */
        this.strictSuggest = !!cfg.strictSuggest;

        /**
         * @cfg {String} style
         * <p>Custom style added to the component container.</p>
         *
         * Defaults to <code>''</code>.
         */
        this.style = cfg.style || '';

        /**
         * @cfg {Boolean} useTabKey
         * <p>If set to true, tab won't blur the component but will be registered as the ENTER key</p>
         * Defaults to <code>false</code>.
         */
        this.useTabKey = !!cfg.useTabKey;

        /**
         * @cfg {Boolean} useCommaKey
         * <p>If set to true, using comma will validate the user's choice</p>
         * Defaults to <code>true</code>.
         */
        this.useCommaKey = cfg.useCommaKey !== undefined ? cfg.useCommaKey : true;


        /**
         * @cfg {Boolean} useZebraStyle
         * <p>Determines whether or not the results will be displayed with a zebra table style</p>
         * Defaults to <code>true</code>.
         */
        this.useZebraStyle = cfg.useZebraStyle !== undefined ? cfg.useZebraStyle : true;

        /**
         * @cfg {String/Object/Array} value
         * <p>initial value for the field</p>
         * Defaults to <code>null</code>.
         */
        this.value = cfg.value !== undefined ? cfg.value : null;

        /**
         * @cfg {String} valueField
         * <p>name of JSON object property that represents its underlying value</p>
         * Defaults to <code>id</code>.
         */
        this.valueField = cfg.valueField || 'id';

        /**
         * @cfg {Integer} width (in px)
         * <p>Width of the component</p>
         * Defaults to underlying element width.
         */
        this.width = cfg.width || $(this.renderTo).width();

        /**********  EVENT LIST ************/
        this._events = [
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

        this._selection = []; // private array holder for our selected objects
        this._comboItemHeight = 0; // private height for each combo item.

        if(this.renderTo !== null){
            this._doRender();
        }
        return this;
    },


    /**********  PUBLIC METHODS ************/
    /**
     * Add one or multiple json items to the current selection
     * @param items - json object or array of json objects
     */
    addToSelection: function(items){
        if(!this.maxSelection || this._selection.length < this.maxSelection){
            if(!$.isArray(items)){
                items = [items];
            }
            var ref = this, valuechanged = false;
            $.each(items, function(index, json){
                if(ref.getValue().indexOf(json[ref.valueField]) === -1){
                    ref._selection.push(json);
                    valuechanged = true;
                }
            });
            if(valuechanged === true){
                this._renderSelection();
                this.input.val('');
                $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
            }
        }
    },

    /**
     * Collapse the drop down part of the combo
     */
    collapse: function(){
        if(this.expanded === true){
            this.combobox.detach();
            this.expanded = false;
            $(this).trigger('collapse', [this]);
        }
    },

    /**
     * Set the component in a disabled state.
     */
    disable: function(){
        this.container.addClass('ms-ctn-disabled');
        this.disabled = true;
    },

    /**
     * Set the component in a enable state.
     */
    enable: function(){
        this.container.removeClass('ms-ctn-disabled');
        this.disabled = false;
    },

    /**
     * Expand the drop drown part of the combo.
     */
    expand: function(){
        if(!this.expanded && this.input.val().length >= this.minChars){
            this.combobox.appendTo(this.container);
            this._processSuggestions();

            this.expanded = true;
            $(this).trigger('expand', [this]);
        }
    },

    /**
     * Retrieve component enabled status
     */
    isDisabled: function(){
        return this.disabled;
    },

    /**
     * Check whether or not the component has been rendered.
     * @return {boolean}
     */
    isRendered: function(){
        return this._rendered === true;
    },

    /**
     * Checks whether the field is valid or not
     * @return {boolean}
     */
    isValid: function(){
        return this.required === false || this._selection.length > 0;
    },

    /**
     * Retrieve an array of selected json objects
     * @return {Array}
     */
    getSelectedItems: function(){
        return this._selection;
    },

    /**
     * Retrieve an array of selected values
     */
    getValue: function(){
        var ref = this;
        return $.map(this._selection, function(o) {
            return o[ref.valueField];
        });
    },

    /**
     * Remove one or multiples json items from the current selection
     * @param items - json object or array of json objects
     */
    removeFromSelection: function(items){
        if(!$.isArray(items)){
            items = [items];
        }
        var ref = this, valuechanged = false;
        $.each(items, function(index, json){
            var i = ref.getValue().indexOf(json[ref.valueField]);
            if(i > -1){
                ref._selection.splice(i, 1);
                valuechanged = true;
            }
        });
        if(valuechanged === true){
            this._renderSelection();
            $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
            if(this.expanded){
                this._processSuggestions();
            }
        }
    },

    /**
     * If not rendered, the component will dynamically render itself in the given element.
     * @param el
     */
    render: function(el){
        if(this.isRendered() === false){
            this.renderTo = el;
            this._doRender();
        }
    },

    /**
     * Sets a value for the combo box. Value must be a value or an array of value with data type matching valueField one.
     * @param data
     */
    setValue: function(data){
        var values = $.isArray(data) ? data : [data],
            ref = this,
            items = [];
        $.each(this.combobox.children(), function(index, suggestion){
            var obj = $(suggestion).data('json');
            if(values.indexOf(obj[ref.valueField]) > -1){
                items.push(obj);
            }
        });
        if(items.length > 0){
            this.addToSelection(items);
        }

    },

    /**********  PRIVATE ************/

    /**
     * Render the component to the given input DOM element
     * @private
     */
    _doRender: function(){
        if(this.isRendered() === false){

            $(this).trigger('beforerender', [this]);

            // holds the main div, will relay the focus events to the contained input element.
            this.container = $('<div/>', {
                id: this.id,
                'class': 'ms-ctn ' + this.cls +
                    (this.disabled === true ? ' ms-ctn-disabled' : '') +
                    (this.editable === true ? '' : ' ms-ctn-readonly'),
                style: 'width: ' + this.width + 'px;' + this.style
            });
            this.container.focus($.proxy(this._onFocus, this));
            this.container.blur($.proxy(this._onBlur, this));
            this.container.keydown($.proxy(this._onHandleKeyDown, this));
            this.container.keyup($.proxy(this._onHandleKeyUp, this));

            // holds the input field
            this.input = $('<input/>', $.extend({
                id: 'ms-input-' + $('input[id^="ms-input"]').length,
                type: 'text',
                'class': this.emptyTextCls + (this.editable === true ? '' : ' ms-input-readonly'),
                value: this.emptyText,
                readonly: !this.editable,
                style: 'width: ' + (this.width - (this.hideTrigger ? 16 : 44)) + 'px;'
            }, this.inputCfg));
            this.input.focus($.proxy(this._onInputFocus, this));

            // holds the trigger on the right side
            if(this.hideTrigger === false){
                this.trigger = $('<div/>', {
                    id: 'ms-trigger-' + $('div[id^="ms-trigger"]').length,
                    'class': 'ms-trigger',
                    html: '<div class="ms-trigger-ico"></div>'
                });
                this.trigger.click($.proxy(this._onTriggerClick, this));
                this.container.append(this.trigger);
            }

            // holds the suggestions. will always be placed on focus
            this.combobox = $('<div/>', {
                id: 'ms-res-ctn-' + $('div[id^="ms-res-ctn"]').length,
                'class': 'ms-res-ctn ',
                style: 'width: ' + this.width + 'px; height: ' + this.maxDropHeight + 'px;'
            });

            this.selectionContainer = $('<div/>', {
                id: 'ms-sel-ctn-' +  $('div[id^="ms-sel-ctn"]').length,
                'class': 'ms-sel-ctn'
            });
            this.selectionContainer.click($.proxy(this._onFocus, this));

            if(this.selectionPosition === 'inner'){
                this.selectionContainer.append(this.input);
            } else {
                this.container.append(this.input);
            }

            this.helper = $('<div/>', {
                'class': 'ms-helper ' + this.infoMsgCls
            });
            this._updateHelper();
            this.container.append(this.helper);


            // Render the whole thing
            $(this.renderTo).replaceWith(this.container);

            switch(this.selectionPosition){
                case 'bottom':
                    this.selectionContainer.insertAfter(this.container);
                    if(this.selectionStacked === true){
                        this.selectionContainer.width(this.container.width());
                        this.selectionContainer.addClass('ms-stacked');
                    }
                    break;
                case 'right':
                    this.selectionContainer.insertAfter(this.container);
                    this.container.css('float', 'left');
                    break;
                default:
                    this.container.append(this.selectionContainer);
                    break;
            }

            this._rendered = true;
            this._processSuggestions();
            if(this.value !== null){
                this.setValue(this.value);
                this._renderSelection();
            }
            $(this).trigger('afterrender', [this]);
            var ref = this;
            $("body").click(function(e) {
                if(ref.container.hasClass('ms-ctn-bootstrap-focus') && ref.container.has(e.target).length === 0 && e.target.className.indexOf('ms-res-item') < 0 &&
                    ref.container[0] !== e.target){
                    ref._onBlur();
                }
            });

            if(this.expanded === true){
                this.expanded = false;
                this.expand();
            }
        }
    },

    /**
     * Triggered when focusing on the container div. Will focus on the input field instead.
     * @private
     */
    _onFocus: function(){
        this.input.focus();
    },

    /**
     * Triggered when focusing on the input text field.
     * @private
     */
    _onInputFocus: function(){
        if(this.isDisabled() === false && !this._hasFocus){
            this._hasFocus = true;
            this.container.addClass('ms-ctn-bootstrap-focus');
            this.container.removeClass(this.invalidCls);
            if(this.input.val() === this.emptyText){
                this.input.val('');
            }
            this.input.removeClass(this.emptyTextCls);
            var curLength = this.input.val().length;
            if((this.expandOnFocus === true && curLength === 0) || curLength > this.minChars){
                this.expand();
            }
            if(this._selection.length === this.maxSelection){
                this._updateHelper(this.maxSelectionRenderer.call(this, this._selection.length));
            } else if(curLength < this.minChars){
                this._updateHelper(this.minCharsRenderer.call(this, this.minChars - curLength));
            }
            this._renderSelection();
            $(this).trigger('focus', [this]);
        }
    },

    /**
     * Triggered when blurring out of the component
     * @private
     */
    _onBlur: function(){
        this.container.removeClass('ms-ctn-bootstrap-focus');
        this.collapse();
        this._hasFocus = false;
        this._renderSelection();
        if(this.isValid() === false){
            this.container.addClass('ms-ctn-invalid');
        }

        if(this.input.val() === '' && this._selection.length === 0){
            this.input.addClass(this.emptyTextCls);
            this.input.val(this.emptyText);
        } else if(this.input.val() !== '' && this.allowFreeEntries === false){
            this.input.val('');
            this._updateHelper('');
        }
        if(this.input.is(":focus")){
            $(this).trigger('blur', [this]);
        }
    },

    /**
     * Triggered when the user presses a key while the component has focus
     * This is where we want to handle all keys that don't require the user input field
     * since it hasn't registered the key hit yet
     * @param e keyEvent
     * @private
     */
    _onHandleKeyDown: function(e){
        // check how tab should be handled
        var active = this.combobox.find('.ms-res-item-active:first'),
            freeInput = this.input.val() !== this.emptyText ? this.input.val() : '';

        $(this).trigger('onkeydown', [this, e]);

        if(e.keyCode === 9 && (this.useTabKey === false ||
            (this.useTabKey === true && active.length === 0 && this.input.val().length === 0))){
            this._onBlur();
            return;
        }
        switch(e.keyCode) {
            case 8: //backspace
                if(freeInput.length === 0 && this.getSelectedItems().length > 0 && this.selectionPosition === 'inner'){
                    this._selection.pop();
                    this._renderSelection();
                    $(this).trigger('selectionchange', [this, this.getSelectedItems()]);
                    this.input.focus();
                    e.preventDefault();
                }
                break;
            case 9:case 188:case 13: // tab,esc,enter
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
                if(this._selection.length === this.maxSelection){
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
    _onHandleKeyUp: function(e){
        var freeInput = this.input.val() !== this.emptyText ? this.input.val() : '',
            inputValid = this.input.val().trim().length > 0 && this.input.val() !== this.emptyText &&
                (!this.maxEntryLength || this.input.val().trim().length < this.maxEntryLength),
            selected,
            obj = {},
            ref = this;
        $(this).trigger('onkeyup', [this, e]);

        // collapse if escape, but keep focus.
        if(e.keyCode === 27 && this.expanded){
            this.collapse();
        }
        // ignore a bunch of keys
        if((e.keyCode === 9 && this.useTabKey === false) || (e.keyCode > 13 && e.keyCode < 32)){
            return;
        }
        switch(e.keyCode) {
            case 40:case 38: // up, down
            e.preventDefault();
            break;
            case 13:case 9:case 188:// enter, tab, comma
            if(e.keyCode !== 188 || this.useCommaKey === true){
                e.preventDefault();
                if(this.expanded === true){ // if a selection is performed, select it and reset field
                    selected = this.combobox.find('.ms-res-item-active:first');
                    if(selected.length > 0){
                        this._selectItem(selected);
                        return;
                    }
                }
                // if no selection or if freetext entered and free entries allowed, add new obj to selection
                if(inputValid === true && this.allowFreeEntries === true){
                    obj[this.displayField] = obj[this.valueField] = freeInput;
                    this.addToSelection(obj);
                    this.collapse(); // cause the combo suggestions to reset
                    ref.input.focus();
                }
                break;
            }
            default:
                if(this._selection.length === this.maxSelection){
                    this._updateHelper(this.maxSelectionRenderer.call(this, this._selection.length));
                } else {
                    if(freeInput.length < this.minChars){
                        this._updateHelper(this.minCharsRenderer.call(this, this.minChars - freeInput.length));
                        if(this.expanded === true){
                            this.combobox.collapse();
                        }
                    } else if(this.maxEntryLength && freeInput.length > this.maxEntryLength){
                        this._updateHelper(this.maxEntryRenderer.call(this, freeInput.length - this.maxEntryLength));
                        if(this.expanded === true){
                            this.combobox.collapse();
                        }
                    } else {
                        this.helper.hide();
                        if(this.expanded === true){
                            this._processSuggestions();
                        } else if(freeInput.length >= this.minChars && this.expanded === false){
                            this.expand();
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
    _onTriggerClick: function(){
        if(this.isDisabled() === false){

            $(this).trigger('ontriggerclick', [this]);

            if(this.expanded === true){
                this.collapse();
            } else {
                this.input.focus();
                this.expand();
            }
        }
    },

    /**
     * According to given data and query, sort and add suggestions in their container
     * @private
     */
    _processSuggestions: function(){
        var json = null;
        if(this.data !== null){
            if(typeof(this.data) === 'string' && this.data.indexOf(',') < 0){ // get results from ajax
                $(this).trigger('onbeforeload', [this]);
                var ref = this;
                var params = $.extend({query: this.input.val()}, this.dataParams);
                $.ajax({
                    type: this.method,
                    url: this.data,
                    data: params,
                    success: function(items){
                        if(typeof(items) === 'string'){
                            json = JSON.parse(items);
                        } else if(items.results !== undefined){
                            json = items.results;
                        } else if($.isArray(items)){
                            json = items;
                        }
                        $(this).trigger('onload', [ref, json]);
                        ref._displaySuggestions(ref._sortAndTrim(json));
                    },
                    error: function(){
                        throw("Could not reach server");
                    }
                });
            } else if(typeof(this.data) === 'string' && this.data.indexOf(',') > -1) { // results from csv string
                this._displaySuggestions(this._sortAndTrim(this._getEntriesFromStringArray(this.data.split(','))));
            } else { // results from local array
                if(this.data.length > 0 && typeof(this.data[0]) === 'string'){ // results from array of strings
                    this._displaySuggestions(this._sortAndTrim(this._getEntriesFromStringArray(this.data)));
                } else { // regular json array
                    this._displaySuggestions(this._sortAndTrim(this.data));
                }
            }
        }
    },

    /**
     * Returns an array of json objects from an array of strings.
     * @private
     */
    _getEntriesFromStringArray: function(data){
        var json = [], ref = this;
        $.each(data, function(index, s){
            var entry = {};
            entry[ref.displayField] = entry[ref.valueField] = s.trim();
            json.push(entry);
        });
        return json;
    },

    /**
     * Sorts the results and cut them down to max # of displayed results at once
     * @private
     */
    _sortAndTrim: function(data){
        var ref = this,
            q = this.input.val() !== this.emptyText ? this.input.val() : '',
            filtered = [],
            newSuggestions = [],
            selectedValues = this.getValue();
        // filter the data according to given input
        if(q.length > 0){
            $.each(data, function(index, obj){
                var name = obj[ref.displayField];
                if((ref.matchCase === true && name.indexOf(q) > -1) ||
                    (ref.matchCase === false && name.toLowerCase().indexOf(q.toLowerCase()) > -1)){
                    if(ref.strictSuggest === false || name.toLowerCase().indexOf(q.toLowerCase()) === 0){
                        filtered.push(obj);
                    }
                }
            });
        } else {
            filtered = data;
        }
        // take out the ones that have already been selected
        $.each(filtered, function(index, obj){
            if(selectedValues.indexOf(obj[ref.valueField]) === -1){
                newSuggestions.push(obj);
            }
        });
        // sort the data
        if(this.sortOrder !== null){
            newSuggestions.sort(function(a,b){
                if(a[ref.sortOrder] < b[ref.sortOrder]){
                    return ref.sortDir === 'asc' ? -1 : 1;
                }
                if(a[ref.sortOrder] > b[ref.sortOrder]){
                    return ref.sortDir === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        // trim it down
        if(this.maxSuggestions && this.maxSuggestions > 0){
            newSuggestions = newSuggestions.slice(0, this.maxSuggestions);
        }
        // build groups
        if(this.groupBy !== null){
            this._groups = {};
            $.each(newSuggestions, function(index, value){
                if(ref._groups[value[ref.groupBy]] === undefined){
                    ref._groups[value[ref.groupBy]] = {title: value[ref.groupBy], items: [value]};
                } else {
                    ref._groups[value[ref.groupBy]].items.push(value);
                }
            });
        }
        return newSuggestions;
    },

    /**
     * Empties the result container and refills it with the array of json results in input
     * @private
     */
    _displaySuggestions: function(data){
        this.combobox.empty();
        var ref = this,    // i hate the way jQuery handles scopes
            resHeight = 0, // total height taken by displayed results.
            nbGroups = 0;

        if(this._groups === undefined){
            this._renderComboItems(data);
            resHeight = ref._comboItemHeight * data.length;
        } else {
            for(var grpName in this._groups){
                nbGroups += 1;
                $('<div/>', {
                    'class': 'ms-res-group',
                    html: grpName
                }).appendTo(ref.combobox);
                this._renderComboItems(this._groups[grpName].items, true);
            }
            resHeight = ref._comboItemHeight * (data.length + nbGroups);
        }

        if(resHeight < this.combobox.height() || resHeight < this.maxDropHeight){
            this.combobox.height(resHeight);
        } else if(resHeight >= this.combobox.height() && resHeight > this.maxDropHeight){
            this.combobox.height(this.maxDropHeight);
        }
        if(data.length === 1 && this.preselectSingleSuggestion === true){
            this.combobox.children().filter(':last').addClass('ms-res-item-active');
        }
        if(data.length === 0){
            this._updateHelper(this.noSuggestionText);
            this.combobox.collapse();
        }
    },

    _renderComboItems: function(items, isGrouped){
        var ref = this;
        $.each(items, function(index, value){
            var displayed = ref.renderer !== null ? ref.renderer.call(ref, value) : value[ref.displayField];
            var resultItemEl = $('<div/>', {
                'class': 'ms-res-item ' + (isGrouped ? 'ms-res-item-grouped ':'') +
                    (index % 2 === 1 && ref.useZebraStyle === true ? 'ms-res-odd' : ''),
                html: ref.highlight === true ? ref._highlightSuggestion(displayed) : displayed
            }).data('json', value);
            resultItemEl.click($.proxy(ref._onComboItemSelected, ref));
            resultItemEl.mouseover($.proxy(ref._onComboItemMouseOver, ref));
            ref.combobox.append(resultItemEl);
        });
        this._comboItemHeight = this.combobox.find('.ms-res-item:first').outerHeight();
    },

    /**
     * Replaces html with highlighted html according to case
     * @param html
     * @private
     */
    _highlightSuggestion: function(html){
        var q = this.input.val() !== this.emptyText ? this.input.val() : '';
        if(q.length === 0){
            return html; // nothing entered as input
        }
        if(this.matchCase === true){
            html = html.replace(new RegExp('(' + q + ')','g'), '<em>$1</em>');
        } else {
            html = html.replace(new RegExp('(' + q + ')','gi'), '<em>$1</em>');
        }
        return html;
    },

    /**
     * Triggered when hovering an element in the combo
     * @param e
     * @private
     */
    _onComboItemMouseOver: function(e){
        this.combobox.children().removeClass('ms-res-item-active');
        $(e.currentTarget).addClass('ms-res-item-active');
    },

    /**
     * Triggered when an item is chosen from the list
     * @param e
     * @private
     */
    _onComboItemSelected: function(e){
        this._selectItem($(e.currentTarget));
    },

    /**
     * Select an item either through keyboard or mouse
     * @param item
     * @private
     */
    _selectItem: function(item){
        this.addToSelection(item.data('json'));
        item.removeClass('ms-res-item-active');
        this.collapse();
        this.input.focus();
    },

    /**
     * Renders the selected items into their container.
     * @private
     */
    _renderSelection: function(){
        var ref = this, w = 0, inputOffset = 0, items = [],
            asText = this.resultAsString === true && !this._hasFocus;
        this.selectionContainer.find('.ms-sel-item').remove();

        $.each(this._selection, function(index, value){

            var selectedItemEl, delItemEl;
            // tag representing selected value
            if(asText === true){
                selectedItemEl = $('<div/>', {
                    'class': 'ms-sel-item ms-sel-text ' + ref.selectionCls,
                    html: value[ref.displayField] + (index === (ref._selection.length - 1) ? '' : ',')
                }).data('json', value);
            } else {
                selectedItemEl = $('<div/>', {
                    'class': 'ms-sel-item ' + ref.selectionCls,
                    html: value[ref.displayField]
                }).data('json', value);

                // small cross img
                delItemEl = $('<span/>', {
                    'class': 'ms-close-btn'
                }).data('json', value).appendTo(selectedItemEl);
                delItemEl.click($.proxy(ref._onRemoveFromSelection, ref));
            }
            
            inputEl = $('<input/>', {
                'type': 'hidden',
                'name': ref.inputName,
                'value': value[ref.valueField]
            }).appendTo(selectedItemEl);

            items.push(selectedItemEl);
        });
        this.selectionContainer.prepend(items);
        if(this.selectionPosition === 'inner'){
            // this really sucks... trying to figure out the best way to fill out the remaining space
//            this.selectionContainer.append(this.input);
            this.input.width(0);
            if(this.editable === true || this._selection.length === 0){
                inputOffset = this.input.offset().left - this.selectionContainer.offset().left;
                w = this.container.width() - inputOffset - 32 - (this.hideTrigger === true ? 0 : 42);
                this.input.width(w < 100 ? 100 : w);
            }
            this.container.height(this.selectionContainer.height());
        }
    },

    /**
     * Triggered when clicking upon cross for deletion
     * @param e
     * @private
     */
    _onRemoveFromSelection: function(e){
        this.removeFromSelection($(e.currentTarget).data('json'));
    },

    /**
     * Moves the selected cursor amongst the list item
     * @param dir - 'up' or 'down'
     * @private
     */
    _moveSelectedRow: function(dir){
        if(!this.expanded){
            this.expand();
        }
        var list, start, active, scrollPos;
        list = this.combobox.find(".ms-res-item");
        if(dir === 'down'){
            start = list.eq(0);
        } else {
            start = list.filter(':last');
        }
        active = this.combobox.find('.ms-res-item-active:first');
        if(active.length > 0){
            if(dir === 'down'){
                start = active.nextAll('.ms-res-item').first();
                if(start.length === 0){
                    start = list.eq(0);
                }
                scrollPos = this.combobox.scrollTop();
                this.combobox.scrollTop(0);
                if(start[0].offsetTop + start.outerHeight() > this.combobox.height()){
                    this.combobox.scrollTop(scrollPos + this._comboItemHeight);
                }
            } else {
                start = active.prevAll('.ms-res-item').first();
                if(start.length === 0){
                    start = list.filter(':last');
                    this.combobox.scrollTop(this._comboItemHeight * list.length);
                }
                if(start[0].offsetTop < this.combobox.scrollTop()){
                    this.combobox.scrollTop(this.combobox.scrollTop() - this._comboItemHeight);
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
    _updateHelper: function(html){
        this.helper.html(html);
        if(!this.helper.is(":visible")){
            this.helper.fadeIn();
        }
    }



});


