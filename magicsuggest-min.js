/**
 * Multiple Selection Component for Bootstrap
 * Check nicolasbize.github.io/magicsuggest/ for latest updates.
 *
 * Author:       Nicolas Bize
 * Created:      Feb 8th 2013
 * Last Updated: Oct 16th 2014
 * Version:      2.1.4
 * Licence:      MagicSuggest is licenced under MIT licence (http://opensource.org/licenses/MIT)
 */
!function(e){"use strict"
var t=function(t,n){var i=this,a={allowFreeEntries:!0,allowDuplicates:!1,ajaxConfig:{},autoSelect:!0,selectFirst:!1,queryParam:"query",beforeSend:function(){},cls:"",data:null,dataUrlParams:{},disabled:!1,disabledField:null,displayField:"name",editable:!0,expanded:!1,expandOnFocus:!1,groupBy:null,hideTrigger:!1,highlight:!0,id:null,infoMsgCls:"",inputCfg:{},invalidCls:"ms-inv",matchCase:!1,maxDropHeight:290,maxEntryLength:null,maxEntryRenderer:function(e){return"Please reduce your entry by "+e+" character"+(e>1?"s":"")},maxSuggestions:null,maxSelection:10,maxSelectionRenderer:function(e){return"You cannot choose more than "+e+" item"+(e>1?"s":"")},method:"POST",minChars:0,minCharsRenderer:function(e){return"Please type "+e+" more character"+(e>1?"s":"")},mode:"local",name:null,noSuggestionText:"No suggestions",placeholder:"Type or click here",renderer:null,required:!1,resultAsString:!1,resultAsStringDelimiter:",",resultsField:"results",selectionCls:"",selectionContainer:null,selectionPosition:"inner",selectionRenderer:null,selectionStacked:!1,sortDir:"asc",sortOrder:null,strictSuggest:!1,style:"",toggleOnClick:!1,typeDelay:400,useTabKey:!1,useCommaKey:!0,useZebraStyle:!1,value:null,valueField:"id",vregex:null,vtype:null},s=e.extend({},n),o=e.extend(!0,{},a,s)
this.addToSelection=function(t,n){if(!o.maxSelection||l.length<o.maxSelection){e.isArray(t)||(t=[t])
var a=!1
e.each(t,function(t,n){(o.allowDuplicates||e.inArray(n[o.valueField],i.getValue())===-1)&&(l.push(n),a=!0)}),a===!0&&(h._renderSelection(),this.empty(),n!==!0&&e(this).trigger("selectionchange",[this,this.getSelection()]))}this.input.attr("placeholder","inner"===o.selectionPosition&&this.getValue().length>0?"":o.placeholder)},this.clear=function(e){this.removeFromSelection(l.slice(0),e)},this.collapse=function(){o.neverCollapse||o.expanded===!0&&(this.combobox.detach(),o.expanded=!1,e(this).trigger("collapse",[this]))},this.disable=function(){this.container.addClass("ms-ctn-disabled"),o.disabled=!0,i.input.attr("disabled",!0)},this.empty=function(){this.input.val("")},this.enable=function(){this.container.removeClass("ms-ctn-disabled"),o.disabled=!1,i.input.attr("disabled",!1)},this.expand=function(){if(!o.expanded&&(this.input.val().length>=o.minChars||this.combobox.children().size()>0)){if(o.container){var t="string"==typeof o.container?e(o.container):o.container
this.combobox.appendTo(t)}else this.combobox.appendTo(this.container)
h._processSuggestions(),o.expanded=!0,e(this).trigger("expand",[this])}},this.isDisabled=function(){return o.disabled},this.isValid=function(){var t=o.required===!1||l.length>0
return(o.vtype||o.vregex)&&e.each(l,function(e,n){t=t&&h._validateSingleItem(n[o.valueField])}),t},this.getDataUrlParams=function(){return o.dataUrlParams},this.getName=function(){return o.name},this.getSelection=function(){return l},this.getRawValue=function(){return i.input.val()},this.getValue=function(){return e.map(l,function(e){return e[o.valueField]})},this.removeFromSelection=function(t,n){e.isArray(t)||(t=[t])
var a=!1
e.each(t,function(t,n){var s=e.inArray(n[o.valueField],i.getValue())
s>-1&&(l.splice(s,1),a=!0)}),a===!0&&(h._renderSelection(),n!==!0&&e(this).trigger("selectionchange",[this,this.getSelection()]),o.expandOnFocus&&i.expand(),o.expanded&&h._processSuggestions()),this.input.attr("placeholder","inner"===o.selectionPosition&&this.getValue().length>0?"":o.placeholder)},this.getData=function(){return m},this.setData=function(e){o.data=e,h._processSuggestions()},this.setName=function(t){o.name=t,t&&(o.name+=t.indexOf("[]")>0?"":"[]"),i._valueContainer&&e.each(i._valueContainer.children(),function(e,t){t.name=o.name})},this.setSelection=function(e){this.clear(),this.addToSelection(e)},this.setValue=function(t){var n=[]
e.each(t,function(t,i){var a=!1
if(e.each(m,function(e,t){if(t[o.valueField]==i)return n.push(t),a=!0,!1}),!a)if("object"==typeof i)n.push(i)
else{var s={}
s[o.valueField]=i,s[o.displayField]=i,n.push(s)}}),n.length>0&&this.addToSelection(n)},this.setDataUrlParams=function(t){o.dataUrlParams=e.extend({},t)}
var r,l=[],c=0,d=!1,u=null,m=[],g=!1,p={BACKSPACE:8,TAB:9,ENTER:13,CTRL:17,ESC:27,SPACE:32,UPARROW:38,DOWNARROW:40,COMMA:188},h={_displaySuggestions:function(t){i.combobox.show(),i.combobox.empty()
var n=0,a=0
if(null===u)h._renderComboItems(t),n=c*t.length
else{for(var s in u)a+=1,e("<div/>",{class:"ms-res-group",html:s}).appendTo(i.combobox),h._renderComboItems(u[s].items,!0)
var r=i.combobox.find(".ms-res-group").outerHeight()
if(null!==r){var l=a*r
n=c*t.length+l}else n=c*(t.length+a)}if(n<i.combobox.height()||n<=o.maxDropHeight?i.combobox.height(n):n>=i.combobox.height()&&n>o.maxDropHeight&&i.combobox.height(o.maxDropHeight),1===t.length&&o.autoSelect===!0&&i.combobox.children().filter(":not(.ms-res-item-disabled):last").addClass("ms-res-item-active"),o.selectFirst===!0&&i.combobox.children().filter(":not(.ms-res-item-disabled):first").addClass("ms-res-item-active"),0===t.length&&""!==i.getRawValue()){var d=o.noSuggestionText.replace(/\{\{.*\}\}/,i.input.val())
h._updateHelper(d),i.collapse()}o.allowFreeEntries===!1&&(0===t.length?(e(i.input).addClass(o.invalidCls),i.combobox.hide()):e(i.input).removeClass(o.invalidCls))},_getEntriesFromStringArray:function(t){var n=[]
return e.each(t,function(t,i){var a={}
a[o.displayField]=a[o.valueField]=e.trim(i),n.push(a)}),n},_highlightSuggestion:function(t){var n=i.input.val(),a=["^","$","*","+","?",".","(",")",":","!","|","{","}","[","]"]
if(e.each(a,function(e,t){n=n.replace(t,"\\"+t)}),0===n.length)return t
var s=o.matchCase===!0?"g":"gi"
return t.replace(new RegExp("("+n+")(?!([^<]+)?>)",s),"<em>$1</em>")},_moveSelectedRow:function(e){o.expanded||i.expand()
var t,n,a,s
t=i.combobox.find(".ms-res-item:not(.ms-res-item-disabled)"),n="down"===e?t.eq(0):t.filter(":last"),a=i.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),a.length>0&&("down"===e?(n=a.nextAll(".ms-res-item:not(.ms-res-item-disabled)").first(),0===n.length&&(n=t.eq(0)),s=i.combobox.scrollTop(),i.combobox.scrollTop(0),n[0].offsetTop+n.outerHeight()>i.combobox.height()&&i.combobox.scrollTop(s+c)):(n=a.prevAll(".ms-res-item:not(.ms-res-item-disabled)").first(),0===n.length&&(n=t.filter(":last"),i.combobox.scrollTop(c*t.length)),n[0].offsetTop<i.combobox.scrollTop()&&i.combobox.scrollTop(i.combobox.scrollTop()-c))),t.removeClass("ms-res-item-active"),n.addClass("ms-res-item-active")},_processSuggestions:function(t){var n=null,a=t||o.data
if(null!==a){if("function"==typeof a&&(a=a.call(i,i.getRawValue())),"string"==typeof a){e(i).trigger("beforeload",[i])
var s={}
s[o.queryParam]=i.input.val()
var r=e.extend(s,o.dataUrlParams)
return void e.ajax(e.extend({type:o.method,url:a,data:r,beforeSend:o.beforeSend,success:function(t){n="string"==typeof t?JSON.parse(t):t,h._processSuggestions(n),e(i).trigger("load",[i,n]),h._asyncValues&&(i.setValue("string"==typeof h._asyncValues?JSON.parse(h._asyncValues):h._asyncValues),h._renderSelection(),delete h._asyncValues)},error:function(){throw"Could not reach server"}},o.ajaxConfig))}m=a.length>0&&"string"==typeof a[0]?h._getEntriesFromStringArray(a):a[o.resultsField]||a
var l="remote"===o.mode?m:h._sortAndTrim(m)
h._displaySuggestions(h._group(l))}},_render:function(t){if(i.setName(o.name),i.container=e("<div/>",{class:"ms-ctn form-control "+(o.resultAsString?"ms-as-string ":"")+o.cls+(e(t).hasClass("input-lg")?" input-lg":"")+(e(t).hasClass("input-sm")?" input-sm":"")+(o.disabled===!0?" ms-ctn-disabled":"")+(o.editable===!0?"":" ms-ctn-readonly")+(o.hideTrigger===!1?"":" ms-no-trigger"),style:o.style,id:o.id}),i.container.focus(e.proxy(f._onFocus,this)),i.container.blur(e.proxy(f._onBlur,this)),i.container.keydown(e.proxy(f._onKeyDown,this)),i.container.keyup(e.proxy(f._onKeyUp,this)),i.input=e("<input/>",e.extend({type:"text",class:o.editable===!0?"":" ms-input-readonly",readonly:!o.editable,placeholder:o.placeholder,disabled:o.disabled},o.inputCfg)),i.input.focus(e.proxy(f._onInputFocus,this)),i.input.click(e.proxy(f._onInputClick,this)),o.container?i.combobox=e("<div/>",{class:"ms-res-ctn"}):i.combobox=e("<div/>",{class:"ms-res-ctn dropdown-menu"}).height(o.maxDropHeight),i.combobox.on("click","div.ms-res-item",e.proxy(f._onComboItemSelected,this)),i.combobox.on("mouseover","div.ms-res-item",e.proxy(f._onComboItemMouseOver,this)),o.selectionContainer?(i.selectionContainer=o.selectionContainer,e(i.selectionContainer).addClass("ms-sel-ctn")):i.selectionContainer=e("<div/>",{class:"ms-sel-ctn"}),i.selectionContainer.click(e.proxy(f._onFocus,this)),"inner"!==o.selectionPosition||o.selectionContainer?i.container.append(i.input):i.selectionContainer.append(i.input),i.helper=e("<span/>",{class:"ms-helper "+o.infoMsgCls}),h._updateHelper(),i.container.append(i.helper),e(t).replaceWith(i.container),!o.selectionContainer)switch(o.selectionPosition){case"bottom":i.selectionContainer.insertAfter(i.container),o.selectionStacked===!0&&(i.selectionContainer.width(i.container.width()),i.selectionContainer.addClass("ms-stacked"))
break
case"right":i.selectionContainer.insertAfter(i.container),i.container.css("float","left")
break
default:i.container.append(i.selectionContainer)}o.hideTrigger===!1&&(i.trigger=e("<div/>",{class:"ms-trigger",html:'<div class="ms-trigger-ico"></div>'}),i.trigger.click(e.proxy(f._onTriggerClick,this)),i.container.append(i.trigger)),e(window).resize(e.proxy(f._onWindowResized,this)),null===o.value&&null===o.data||("string"==typeof o.data?(h._asyncValues=o.value,h._processSuggestions()):(h._processSuggestions(),null!==o.value&&(i.setValue(o.value),h._renderSelection()))),e("body").click(function(e){i.container.hasClass("ms-ctn-focus")&&0===i.container.has(e.target).length&&e.target.className.indexOf("ms-res-item")<0&&e.target.className.indexOf("ms-close-btn")<0&&i.container[0]!==e.target&&f._onBlur()}),o.expanded===!0&&(o.expanded=!1,i.expand())},_renderComboItems:function(t,n){var a=this,s=""
e.each(t,function(t,i){var r=null!==o.renderer?o.renderer.call(a,i):i[o.displayField],l=null!==o.disabledField&&i[o.disabledField]===!0,c=e("<div/>",{class:"ms-res-item "+(n?"ms-res-item-grouped ":"")+(l?"ms-res-item-disabled ":"")+(t%2===1&&o.useZebraStyle===!0?"ms-res-odd":""),html:o.highlight===!0?h._highlightSuggestion(r):r,"data-json":JSON.stringify(i)})
s+=e("<div/>").append(c).html()}),i.combobox.append(s),c=i.combobox.find(".ms-res-item:first").outerHeight()},_renderSelection:function(){var t=this,n=0,a=0,s=[],r=o.resultAsString===!0&&!d
i.selectionContainer.find(".ms-sel-item").remove(),void 0!==i._valueContainer&&i._valueContainer.remove(),e.each(l,function(n,i){var a,c,d=null!==o.selectionRenderer?o.selectionRenderer.call(t,i):i[o.displayField],u=h._validateSingleItem(i[o.displayField])?"":" ms-sel-invalid"
r===!0?a=e("<div/>",{class:"ms-sel-item ms-sel-text "+o.selectionCls+u,html:d+(n===l.length-1?"":o.resultAsStringDelimiter)}).data("json",i):(a=e("<div/>",{class:"ms-sel-item "+o.selectionCls+u,html:d}).data("json",i),o.disabled===!1&&(c=e("<span/>",{class:"ms-close-btn"}).data("json",i).appendTo(a),c.click(e.proxy(f._onTagTriggerClick,t)))),s.push(a)}),i.selectionContainer.prepend(s),i._valueContainer=e("<div/>",{style:"display: none;"}),e.each(i.getValue(),function(t,n){var a=e("<input/>",{type:"hidden",name:o.name,value:n})
a.appendTo(i._valueContainer)}),i._valueContainer.appendTo(i.selectionContainer),"inner"!==o.selectionPosition||o.selectionContainer||(i.input.width(0),a=i.input.offset().left-i.selectionContainer.offset().left,n=i.container.width()-a-42,i.input.width(n)),l.length===o.maxSelection?h._updateHelper(o.maxSelectionRenderer.call(this,l.length)):i.helper.hide()},_selectItem:function(e){1===o.maxSelection&&(l=[]),i.addToSelection(e.data("json")),e.removeClass("ms-res-item-active"),o.expandOnFocus!==!1&&l.length!==o.maxSelection||i.collapse(),d?d&&(o.expandOnFocus||g)&&(h._processSuggestions(),g&&i.expand()):i.input.focus()},_sortAndTrim:function(t){var n=i.getRawValue(),a=[],s=[],r=i.getValue()
return n.length>0?e.each(t,function(e,t){var i=t[o.displayField];(o.matchCase===!0&&i.indexOf(n)>-1||o.matchCase===!1&&i.toLowerCase().indexOf(n.toLowerCase())>-1)&&(o.strictSuggest!==!1&&0!==i.toLowerCase().indexOf(n.toLowerCase())||a.push(t))}):a=t,e.each(a,function(t,n){(o.allowDuplicates||e.inArray(n[o.valueField],r)===-1)&&s.push(n)}),null!==o.sortOrder&&s.sort(function(e,t){return e[o.sortOrder]<t[o.sortOrder]?"asc"===o.sortDir?-1:1:e[o.sortOrder]>t[o.sortOrder]?"asc"===o.sortDir?1:-1:0}),o.maxSuggestions&&o.maxSuggestions>0&&(s=s.slice(0,o.maxSuggestions)),s},_group:function(t){return null!==o.groupBy&&(u={},e.each(t,function(e,t){var n=o.groupBy.indexOf(".")>-1?o.groupBy.split("."):o.groupBy,i=t[o.groupBy]
if("string"!=typeof n)for(i=t;n.length>0;)i=i[n.shift()]
void 0===u[i]?u[i]={title:i,items:[t]}:u[i].items.push(t)})),t},_updateHelper:function(e){i.helper.html(e),i.helper.is(":visible")||i.helper.fadeIn()},_validateSingleItem:function(e){if(null!==o.vregex&&o.vregex instanceof RegExp)return o.vregex.test(e)
if(null!==o.vtype)switch(o.vtype){case"alpha":return/^[a-zA-Z_]+$/.test(e)
case"alphanum":return/^[a-zA-Z0-9_]+$/.test(e)
case"email":return/^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/.test(e)
case"url":return/(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i.test(e)
case"ipaddress":return/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(e)}return!0}},f={_onBlur:function(){if(i.container.removeClass("ms-ctn-focus"),i.collapse(),d=!1,""!==i.getRawValue()&&o.allowFreeEntries===!0){var t={}
t[o.displayField]=t[o.valueField]=i.getRawValue().trim(),i.addToSelection(t)}h._renderSelection(),i.isValid()===!1?i.container.addClass(o.invalidCls):""!==i.input.val()&&o.allowFreeEntries===!1&&(i.empty(),h._updateHelper("")),e(i).trigger("blur",[i])},_onComboItemMouseOver:function(t){var n=e(t.currentTarget)
n.hasClass("ms-res-item-disabled")||(i.combobox.children().removeClass("ms-res-item-active"),n.addClass("ms-res-item-active"))},_onComboItemSelected:function(t){var n=e(t.currentTarget)
n.hasClass("ms-res-item-disabled")||h._selectItem(e(t.currentTarget))},_onFocus:function(){i.input.focus()},_onInputClick:function(){i.isDisabled()===!1&&d&&o.toggleOnClick===!0&&(o.expanded?i.collapse():i.expand())},_onInputFocus:function(){if(i.isDisabled()===!1&&!d){d=!0,i.container.addClass("ms-ctn-focus"),i.container.removeClass(o.invalidCls)
var t=i.getRawValue().length
o.expandOnFocus===!0&&i.expand(),l.length===o.maxSelection?h._updateHelper(o.maxSelectionRenderer.call(this,l.length)):t<o.minChars&&h._updateHelper(o.minCharsRenderer.call(this,o.minChars-t)),h._renderSelection(),e(i).trigger("focus",[i])}},_onKeyDown:function(t){var n=i.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),a=i.input.val()
if(e(i).trigger("keydown",[i,t]),t.keyCode===p.TAB&&(o.useTabKey===!1||o.useTabKey===!0&&0===n.length&&0===i.input.val().length))return void f._onBlur()
switch(t.keyCode){case p.BACKSPACE:0===a.length&&i.getSelection().length>0&&"inner"===o.selectionPosition&&(l.pop(),h._renderSelection(),e(i).trigger("selectionchange",[i,i.getSelection()]),i.input.attr("placeholder","inner"===o.selectionPosition&&i.getValue().length>0?"":o.placeholder),i.input.focus(),t.preventDefault())
break
case p.TAB:case p.ESC:t.preventDefault()
break
case p.ENTER:(""!==a||o.expanded)&&t.preventDefault()
break
case p.COMMA:o.useCommaKey===!0&&t.preventDefault()
break
case p.CTRL:g=!0
break
case p.DOWNARROW:t.preventDefault(),h._moveSelectedRow("down")
break
case p.UPARROW:t.preventDefault(),h._moveSelectedRow("up")
break
default:l.length===o.maxSelection&&t.preventDefault()}},_onKeyUp:function(t){var n,a=i.getRawValue(),s=e.trim(i.input.val()).length>0&&(!o.maxEntryLength||e.trim(i.input.val()).length<=o.maxEntryLength),c={}
if(e(i).trigger("keyup",[i,t]),clearTimeout(r),t.keyCode===p.ESC&&o.expanded&&i.combobox.hide(),t.keyCode===p.TAB&&o.useTabKey===!1||t.keyCode>p.ENTER&&t.keyCode<p.SPACE)return void(t.keyCode===p.CTRL&&(g=!1))
switch(t.keyCode){case p.UPARROW:case p.DOWNARROW:t.preventDefault()
break
case p.ENTER:case p.TAB:case p.COMMA:if(t.keyCode!==p.COMMA||o.useCommaKey===!0){if(t.preventDefault(),o.expanded===!0&&(n=i.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),n.length>0))return void h._selectItem(n)
s===!0&&o.allowFreeEntries===!0&&(c[o.displayField]=c[o.valueField]=a.trim(),i.addToSelection(c),i.collapse(),i.input.focus())
break}default:l.length===o.maxSelection?h._updateHelper(o.maxSelectionRenderer.call(this,l.length)):a.length<o.minChars?(h._updateHelper(o.minCharsRenderer.call(this,o.minChars-a.length)),o.expanded===!0&&i.collapse()):o.maxEntryLength&&a.length>o.maxEntryLength?(h._updateHelper(o.maxEntryRenderer.call(this,a.length-o.maxEntryLength)),o.expanded===!0&&i.collapse()):(i.helper.hide(),o.minChars<=a.length&&(r=setTimeout(function(){o.expanded===!0?h._processSuggestions():i.expand()},o.typeDelay)))}},_onTagTriggerClick:function(t){i.removeFromSelection(e(t.currentTarget).data("json"))},_onTriggerClick:function(){if(i.isDisabled()===!1&&(o.expandOnFocus!==!0||l.length!==o.maxSelection))if(e(i).trigger("triggerclick",[i]),o.expanded===!0)i.collapse()
else{var t=i.getRawValue().length
t>=o.minChars?(i.input.focus(),i.expand()):h._updateHelper(o.minCharsRenderer.call(this,o.minChars-t))}},_onWindowResized:function(){h._renderSelection()}}
null!==t&&h._render(t)}
e.fn.magicSuggest=function(n){var i=e(this)
return 1===i.size()&&i.data("magicSuggest")?i.data("magicSuggest"):(i.each(function(i){var a=e(this)
if(!a.data("magicSuggest")){"select"===this.nodeName.toLowerCase()&&(n.data=[],n.value=[],e.each(this.children,function(t,i){i.nodeName&&"option"===i.nodeName.toLowerCase()&&(n.data.push({id:i.value,name:i.text}),e(i).attr("selected")&&n.value.push(i.value))}))
var s={}
e.each(this.attributes,function(e,t){s[t.name]="value"===t.name&&""!==t.value?JSON.parse(t.value):t.value})
var o=new t(this,e.extend([],e.fn.magicSuggest.defaults,n,s))
a.data("magicSuggest",o),o.container.data("magicSuggest",o)}}),1===i.size()?i.data("magicSuggest"):i)},e.fn.magicSuggest.defaults={}}(jQuery)
