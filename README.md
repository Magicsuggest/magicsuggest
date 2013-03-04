MagicSuggest v1.2
--------------------------

Check out full documentation and examples here: http://nicolasbize.github.com/magicsuggest/

Milestone change log:

v1.2.0 Standardization on jQuery plugins (Minor Tagged Milestone - Mar. 4th 2013)
=================================================================================
- (fix) fixed disabled behaviour when one could still edit the emptyText
- (fix) collapse method would throw an error
- (cfg) typeDelay: Amount (in ms) between keyboard registers (credits to jayesbee - https://github.com/jayesbee)
- (fea) standardized on jQuery plugin (credits to jayesbee - https://github.com/jayesbee)
- (fea) added documentation examples
- (cfg) name: name used for magicsuggest as a form element (credits to iambibhas - https://github.com/iambibhas)
- (fix) start up rendering when value rendered as text
- (cfg) dataParams: additional parameters for ajax request (credits to jayesbee - https://github.com/jayesbee)
- (fix) other rendering issues with inner text

v1.1.0 Various enhancements and bug fixing (Minor Tagged Milestone - Feb. 19th 2013)
====================================================================================
- (fea) close cross style now blends in a bit more
- (fea) escape now collapses the combo (without loosing focus)
- (fix) can't enter entries made out of space
- (cfg) noSuggestionText: text displayed when there are no suggestions from given data
- (cfg) minCharsRenderer: allows to customize message when not enough characters are entered to trigger a search
- (cfg) maxEntryRenderer: allows to customize message when too many characters have been entered
- (cfg) maxEntryLength: amount of characters to limit user input
- (cfg) style: custom style applied to the main container
- (cfg) infoMsgCls: custom class to apply to the helper
- (fea) new helper message on upper right to inform on the component status
- (cfg) id: allows to give the component a custom ID
- (cfg) inputCfg : allows additional parameters passed out to the INPUT tag. Enables usage of AngularJS's custom tags for ex.
- (cfg) renderer : allows custom rendering within the combo.
- (cfg) groupBy : allows grouping within the combo box listing.
- (fix) blur event now registers correctly when selecting an element from the combo
- (fix) flicker in IE when hovering trigger
- (cfg) strictSuggest : set how suggestions will be proposed
- (fix) maxResults is now correctly interpreted
- (fix) maxSelection is now correctly interpreted
- (cfg) method : set the ajax method, default to 'POST'
- (fea) ajax request can now interpret multiple results from server base.
- (fix) bug where the blur event would be triggered when clicking upon the page
- (cfg) required : triggers invalid / valid events when not filled
- (fea) validation through isValid() method

v1.0. initial component release
===============================
- choose to allow free entries or not
- keyboard management
- theme ability
- static and dynamic data processing
- positionning