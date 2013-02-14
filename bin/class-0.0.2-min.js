/**
 * The Class class
 *
 * Copyright (c) 2008, Digg, Inc.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without 
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, 
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright notice, 
 *   this list of conditions and the following disclaimer in the documentation 
 *   and/or other materials provided with the distribution.
 * - Neither the name of the Digg, Inc. nor the names of its contributors 
 *   may be used to endorse or promote products derived from this software 
 *   without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @module Class
 * @author Micah Snyder <micah@digg.com>
 * @description Class creation and management for use with jQuery
 * @link http://code.google.com/p/digg
 *
 * @requires Array.indexOf -- If you support older browsers, make sure you prototype this in
 */
(function(e){Class={create:function(){var t=arguments.length>0&&arguments[arguments.length-1].constructor==Boolean?arguments[arguments.length-1]:false;var n=t?{}:function(){this.init.apply(this,arguments)};var r={ns:[],supers:{},init:function(){},namespace:function(t){if(!t)return null;var n=this;if(t.constructor==Array){e.each(t,function(){n.namespace.apply(n,[this])});return}else if(t.constructor==Object){for(var r in t){if([Object,Function].indexOf(t[r].constructor)>-1){if(!this.ns)this.ns=[];this.ns[r]=t[r];this.namespace.apply(this,[r])}}return}var i=t.split(".");var s=this.prototype?this.prototype:this;e.each(i,function(){s[this]=n.ns[this]||s[this]||window[this]||Class.create(true);delete n.ns[this];s=s[this]});return s},create:function(){var e=Array.prototype.slice.call(arguments);var t=e.shift();var n=Class.create.apply(Class,e);var r={};r[t]=n;this.namespace(r)},sup:function(){try{var e=this.sup.caller.name;this.supers[e].apply(this,arguments)}catch(t){return false}}};t?delete r.init:null;e.extend(n,r);if(!t)e.extend(n.prototype,r);var s=t?n:n.prototype;e.each(arguments,function(){if(this.constructor==Object||typeof this.init!=undefined){for(i in this){if(s[i]&&s[i].constructor==Function&&["namespace","create","sup"].indexOf(i)==-1){this[i].name=s[i].name=i;s.supers[i]=s[i]}s[i]=this[i]}}});return n}}})(jQuery)