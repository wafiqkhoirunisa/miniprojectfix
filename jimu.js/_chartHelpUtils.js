// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare jimu/utils dojo/_base/lang dojo/_base/config dojo/_base/Color ./_dateFormat moment/moment esri/lang esri/graphic esri/layers/GraphicsLayer esri/symbols/jsonUtils".split(" "),function(z,r,k,A,t,B,C,w,v,D,u){return z(null,{constructor:function(a){a&&k.mixin(this,a);this.popupInfo||(this.popupInfo={});this.featureLayer||(this.featureLayer={});this._cachePlaces={}},setLayerFeatureLayer:function(a){this.featureLayer=a;this.map&&((a=this.map.getLayer("chart_highLight_GraphicLayer"))?
this.graphicLayer=a:(this.graphicLayer=new D({id:"chart_highLight_GraphicLayer"}),this.map.addLayer(this.graphicLayer)),this.graphicLayer.clear())},setLayerObject:function(a){this.layerObject=a},setSymbolLayer:function(a){this.symbolLayer=a},setPopupInfo:function(a){this.popupInfo=a},setMap:function(a){this.map=a},getBestLabelDisplay:function(a,b,c){if("feature"===c)return this.betterDataCategoryForFeatureMode(a,b);if("category"===c||"count"===c)return this.betterDataCategoryForCategoryCountMode(a,
b);if("field"===c)return this.betterDataCategoryForFieldMode(a)},betterDataCategoryForFeatureMode:function(a,b){a.forEach(k.hitch(this,function(c){c.label=this.getBestDisplayValue(b,c.label)}));return a},betterDataCategoryForFieldMode:function(a){a.forEach(k.hitch(this,function(b){b.label=this.getFieldAlias(b.label)}));return a},betterDataCategoryForCategoryCountMode:function(a,b){a.forEach(k.hitch(this,function(c){c.label="undefined"!==typeof c.unit?this.getCategoryDisplayForDateUnit(c.label,c.unit):
this.getBestDisplayValue(b,c.label)}));return a},keepStatisticsDataBestDecimalPlace:function(a,b,c){if("count"===c)return b;var d=a.valueFields,e=a.operation,f=a.hasStatisticsed;this.cacheDecimalPlace(d,a.features,this.popupInfo,e,f);"feature"===c||"category"===c?b.forEach(k.hitch(this,function(g){g.originalValues=k.clone(g.values);d.forEach(k.hitch(this,function(h,m){var l=g.values[m];l=this.formatedValueDecimalplace(h,l,e,f);g.values[m]=l}))})):"field"===c&&d.forEach(k.hitch(this,function(g){b.some(k.hitch(this,
function(h){if(h.label===g){var m=h.values[0];m=this.formatedValueDecimalplace(g,m,e,f);h.values[0]=m;return!0}return!1}))}));return b},formatedValueDecimalplace:function(a,b,c,d){this.isIntegerNumberField(a)&&"average"===c?b=this.handleValueMaxDecimalplaces(b,6):this.isFloatNumberField(a)&&(a=this.getFieldDecimalPlaceFromCache(a),b=this.formatValuePlaces(b,a),d&&!this.popupInfo&&(b=this.handleValueMaxDecimalplaces(b,6)));return b},isIntegerNumberField:function(a){if(!this.featureLayer||!this.featureLayer.fields)return!1;
var b=["esriFieldTypeSmallInteger","esriFieldTypeInteger"];return this.featureLayer.fields.some(k.hitch(this,function(c){return c.name===a&&0<=b.indexOf(c.type)}))},formatValuePlaces:function(a,b){return"number"!==typeof b||!a&&0!==a?a:a.toFixed(b)},handleValueMaxDecimalplaces:function(a,b){a=Number(a);if("number"!==typeof a)return a;var c=0,d=a.toString().split(".");1===d.length?c=0:2===d.length&&(c=d[1].length);return 0<c?(c>b&&(c=b),a=a.toFixed(c),parseFloat(a)):a},getFieldDecimalPlaceFromCache:function(a){var b;
this._cachePlaces&&(a=this._cachePlaces[a],"number"===typeof a&&(b=a));return b},getValueFromAttributes:function(a,b,c,d){if(a)return c="average"===c?"avg":c,d?(d=r.upperCaseString(b+"_"+c),d=a[d],"undefined"===typeof d&&(d=r.lowerCaseString(b+"_"+c),d=a[d])):d=a[b],d},cacheDecimalPlace:function(a,b,c,d,e){this._cachePlaces={};if(a&&a.length){var f=a.filter(k.hitch(this,function(h){return this.isFloatNumberField(h)})),g={};f.forEach(k.hitch(this,function(h){g[h]=[]}));b&&0<b.length&&b.forEach(k.hitch(this,
function(h){var m=h.attributes;m&&f.forEach(k.hitch(this,function(l){var n=this.getValueFromAttributes(m,l,d,e);"number"===typeof n&&g[l].push(n)}))}));f.forEach(k.hitch(this,function(h){var m=this.getFieldInfoFromPopupInfo(c,h);this._cachePlaces[h]=0;var l=g[h];if(0<l.length)try{var n=this.getBestDecimalPlaceForArrayValues(l);this._cachePlaces[h]=n}catch(p){this._cachePlaces[h]=0,console.error(p)}c&&((m=this.getPlacesFromPopupFieldInfo(m))||0===m)&&(this._cachePlaces[h]=m)}))}},getBestDecimalPlaceForArrayValues:function(a){var b=
0,c={};a.forEach(function(f){f=f.toString().split(".");var g=null;1===f.length?g=0:2===f.length&&(g=f[1].length);null!==g&&(c[g]=void 0===c[g]?1:c[g]+1)});a=null;for(var d in c){d=parseInt(d,10);var e=c[d];a?e>a.value&&(a={key:d,value:e}):a={key:d,value:e}}a&&(b=parseInt(a.key,10));return b},getFieldInfoFromPopupInfo:function(a,b){var c=null;return a&&a.fieldInfos?c=a.fieldInfos.filter(function(d){return d.fieldName===b})[0]:c},getPlacesFromPopupFieldInfo:function(a){return a&&a.format&&a.format.places},
getAliasFromPopupInfo:function(a,b){var c=b;if(!a||!a.fieldInfos)return c;(a=a.fieldInfos)&&0<a.length&&a.some(function(d){if(d.fieldName===b)return c=d.label,!0});return c},isFloatNumberField:function(a){if(!this.featureLayer||!this.featureLayer.fields)return!1;var b=["esriFieldTypeSingle","esriFieldTypeDouble"];return this.featureLayer.fields.some(k.hitch(this,function(c){return c.name===a&&0<=b.indexOf(c.type)}))},isNumberField:function(a){if(!this.featureLayer||!this.featureLayer.fields)return!1;
var b=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"];return this.featureLayer.fields.some(k.hitch(this,function(c){return c.name===a&&0<=b.indexOf(c.type)}))},isDateField:function(a){return(a=this.getFieldInfo(a))?"esriFieldTypeDate"===a.type:!1},getFieldInfo:function(a){if(this.featureLayer)for(var b=this.featureLayer.fields,c=0;c<b.length;c++)if(b[c].name===a)return b[c];return null},getFieldAliasArray:function(a){return a.map(k.hitch(this,function(b){return this.getFieldAlias(b)}))},
getBestDisplayValue:function(a,b){if("_NULL\x26UNDEFINED_"===b)return"null";if(this.isDateField(a))return this.formatedDateByPopupInfoOrLocal(a,b);var c={};c[a]=b;c=r.getDisplayValueForCodedValueOrSubtype(this.layerObject||this.featureLayer,a,c);c.isCodedValueOrSubtype?b=c.displayValue:this.isNumberField(a)&&(a=this.getFieldInfoFromPopupInfo(this.popupInfo,a),b=r.localizeNumberByFieldInfo(b,a));return b},formatedDateByPopupInfoOrLocal:function(a,b,c){c||(c=this.popupInfo);a:{if(c&&w.isDefined(c.fieldInfos))for(var d=
0,e=c.fieldInfos.length;d<e;d++){var f=c.fieldInfos[d];if(f.fieldName===a){a=f.format;break a}}a=null}b=Number(b);return r.fieldFormatter.getFormattedDate(b,a)},getDisplayValForNumberCodedValueSubTypes:function(a,b){var c=this.tryLocaleNumber(b,a);if(this.featureLayer&&this.featureLayer.typeIdField===a){var d=this.featureLayer.types;if(d&&0<d.length&&(d=d.filter(k.hitch(this,function(e){return e.id===b})),0<d.length))return c=d[0].name}(a=this.getFieldInfo(a))&&a.domain&&(a=a.domain.codedValues)&&
0<a.length&&a.some(function(e){return e.code===b?(c=e.name,!0):!1});return c},tryLocaleNumber:function(a,b){var c=a;if(w.isDefined(a)&&isFinite(a))try{if(b&&this.isNumberField(b)){var d=this.popupInfo[b];var e=d&&k.exists("format.places",d)?r.localizeNumberByFieldInfo(a,d):r.localizeNumber(a)}else e=a;"string"===typeof e&&(c=e)}catch(f){console.error(f)}return c+""},getCategoryDisplayForDateUnit:function(a,b){if(!b)return a;a=Number(a);return this._getFormatteredDate(a,b)},_getFormatteredDate:function(a,
b){var c=this._getDateTemplate(b);0<=["year","quarter","month","day"].indexOf(b)?c=r.localizeDate(new Date(a),{selector:"date",datePattern:c.date}):(b=r.localizeDate(new Date(a),{selector:"date",datePattern:c.date}),a=C(a).format(c.time),c=b+c.connector+a);return c},_getDateTemplate:function(a){var b=B[A.locale];(b=b||{},b.date)||(b.date={"short":"short"});b&&!b.time&&(b.time={medium:"HH:mm:ss a"});b&&!b.connector&&(b.connector=" ");b&&!b.sNoDay&&(b.sNoDay="MMM, y");var c={};"year"===a?c.date="y":
"quarter"===a?c.date="y q":"month"===a?c.date=b.date.sNoDay:"day"===a?c.date=b.date["short"]:"hour"===a?(c.date=b.date["short"],c.time="HH a",c.connector=b.connector):"minute"===a?(c.date=b.date["short"],c.time="HH:mm a",c.connector=b.connector):"second"===a&&(c.date=b.date["short"],c.time=b.time.medium,c.connector=b.connector);return c},_getSymbolLayerGraphics:function(a,b){if(!this.symbolLayer)return null;if(!this.symbolLayer.refreshInterval&&this.symbolGraphics&&!1===this.symbolGraphics.filterByExtent&&
!1===this.symbolGraphics.useSelection)return this.symbolGraphics.graphics;var c=null;this.map&&this.symbolLayer&&(c=r.getClientFeaturesFromMap(this.map,this.symbolLayer,b,!!a));this.symbolGraphics={filterByExtent:a,useSelection:b,graphics:c};return c},_isContainAttr:function(a,b){if("object"!==typeof b||"object"!==typeof b)return!1;var c=!0;Object.keys(b).some(function(d){return b[d]!==a[d]?(c=!1,!0):!1});return c},_getFeaturesByAttr:function(a,b){if(b){var c=null;b.some(function(d){return this._isContainAttr(d.attributes,
a)?(c=d,!0):!1}.bind(this));return c}},_getFeaturesByClusterfield:function(a,b,c,d){var e=this._getSymbolLayerGraphics(c);if(e)return c=null,a=this.clientStatisticsUtils.getCluseringObj(a,e,d),(b=k.mixin(a.notNullLabel,a.nullLabel)[b])&&b.features&&b.features.length&&(c=b.features),c},_getFeatureForSerieData:function(a,b,c){var d=b.clusterField,e=b.mode,f=b.filterByExtent;b=b.useSelection;var g={};g[d]=a.name;if("feature"===e)return this._getFeatureBySerieDataItem(a,d,c,f,b);if("category"===e||"count"===
e)return new v(null,null,g)},_getFeatureBySerieDataItem:function(a,b,c,d,e){var f={};f[b]=a.name;f[c]=Number("undefined"!==typeof a.originValue?a.originValue:a.value);a=this._getSymbolLayerGraphics(d,e);return this._getFeaturesByAttr(f,a)},_getFeatureBycsuDataItem:function(a,b,c,d,e,f){var g={};g[b]=a.label;a=a.originalValues||a.values;g[c]=Number(a&&a[d]);c=this._getSymbolLayerGraphics(e,f);return this._getFeaturesByAttr(g,c)},bindChartEvent:function(a,b,c){var d=b.filterByExtent,e=b.useSelection,
f=b.clusterField,g=b.valueFields,h=null;"undefined"!==b.dateConfig&&(h=b.dateConfig);this.highLightColor=b.highLightColor||"#00ffff";var m=b.mode;if(this.map&&0!==c.length){b=k.hitch(this,function(n){if("series"===n.componentType){var p=null,q=this._getSymbolLayerGraphics(d,e);if("field"===m)p=q;else if(q=c[n.dataIndex])if("feature"===m){var x=n.seriesIndex,y=g[x];if(!y)return;(q=this._getFeatureBycsuDataItem(q,f,y,x,d,e))&&(p=[q])}else q=q.label,"undefined"!==typeof q&&(p=this._getFeaturesByClusterfield(f,
q,d,h));p&&"mouseover"===n.type&&this.graphicLayer&&(this._mouseoverFeatures=p,this._mouseOverChartItem(p))}});var l=k.hitch(this,function(){this._mouseoverFeatures&&this.graphicLayer&&(this._mouseOutChartItem(this._mouseoverFeatures),this._mouseoverFeatures=null)});[{name:"mouseover",callback:b},{name:"mouseout",callback:l}].forEach(k.hitch(this,function(n){a.chart.off(n.name);a.chart.on(n.name,k.hitch(this,function(p){"mouseover"===p.type?(this._hasTriggerMouseoverEvent||(this._hasTriggerMouseoverEvent=
!0,n.callback(p)),setTimeout(k.hitch(this,function(){this._hasTriggerMouseoverEvent=!1},500))):"mouseout"===p.type&&n.callback(p)}))}))}},_createHighLightFeatures:function(a,b){a.forEach(k.hitch(this,function(c){c=new v(c.geometry,b);this.graphicLayer.add(c)}))},_mouseOverChartItem:function(a){if(this.featureLayer&&this.featureLayer.getMap()&&this.featureLayer.visible){var b=r.getTypeByGeometryType(this.featureLayer.geometryType);a.forEach(k.hitch(this,function(e){e._originalSymbol=e.symbol}));var c=
null;if("point"===b)c=this._getHighLightMarkerSymbol(),this._createHighLightFeatures(a,c);else if("polyline"===b)c=this._getHighLightLineSymbol(this.highLightColor),this._createHighLightFeatures(a,c);else if("polygon"===b){var d=this.featureLayer.getSelectedFeatures()||[];a.forEach(k.hitch(this,function(e){var f=0<=d.indexOf(e);f=this._getHighLightFillSymbol(this.featureLayer,e,f);e=new v(e.geometry,f);this.graphicLayer.add(e)}))}}},_mouseOutChartItem:function(){this.graphicLayer&&this.graphicLayer.clear()},
_getHighLightMarkerSymbol:function(){var a=u.fromJson({color:[255,255,255,0],size:18,angle:0,xoffset:0,yoffset:0,type:"esriSMS",style:"esriSMSSquare",outline:{color:[0,0,128,255],width:.75,type:"esriSLS",style:"esriSLSSolid"}});a.setSize(30);a.outline.setColor(new t(this.highLightColor));return a},_getHighLightLineSymbol:function(a){var b=u.fromJson({color:[0,255,255,255],width:1.5,type:"esriSLS",style:"esriSLSSolid"});b.setColor(new t(a||this.highLightColor));return b},_getDefaultHighLightFillSymbol:function(){var a=
u.fromJson({color:[0,255,255,128],outline:{color:[0,255,255,255],width:1.5,type:"esriSLS",style:"esriSLSSolid"},type:"esriSFS",style:"esriSFSSolid"});a.outline.setColor(new t(this.highLightColor));return a},_getSymbolByRenderer:function(a,b){var c=this._getDefaultHighLightFillSymbol(),d=this.getVisualVariableByType("colorInfo",a.visualVariables);if(d){if(a=a.getColor(b,{colorInfo:d}))a=k.clone(a),c.setColor(a)}else c=a.getSymbol(b);return c},getVisualVariableByType:function(a,b){return b&&(b=b.filter(function(c){return c.type===
a&&!c.target}),b.length)?b[0]:null},_getHighLightFillSymbol:function(a,b,c){var d=null,e=b.symbol;d=a.renderer;!e&&d&&(e=this._getSymbolByRenderer(d,b));e&&"function"===typeof e.setOutline?(d=u.fromJson(e.toJson()),b=1.5,e.outline&&0<e.outline.width&&(b=e.outline.width+1),c=this._getHighLightLineSymbol(c?"#ff0000":"#00ffff"),c.setWidth(b),d.setOutline(c)):d=this._getDefaultHighLightFillSymbol();return d},_isNumberField:function(a){var b=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle",
"esriFieldTypeDouble"];return this.featureLayer.fields.some(k.hitch(this,function(c){return c.name===a&&0<=b.indexOf(c.type)}))},getFieldAlias:function(a){var b;this.popupInfo&&(b=this.getAliasFromPopupInfo(this.popupInfo,a));b||(b=a,(a=this.getFieldInfo(a))&&a.alias&&(b=a.alias));return b},_removeDuplicateElementForObjArray:function(a){if(!Array.isArray(a))return a;var b=[];b.push(a[0]);a.forEach(function(c){b.some(function(d){return r.isEqual(d,c)})||b.push(c)});return b},assigneeSettingColor:function(a,
b,c){if(!b||!b.length)return b;var d=a.seriesStyle;if(!d)return b;"layerSymbol"===d.type?b=this._assigneeStyleLayerSymbolColor(b,c):"series"===d.type?b=this._assigneeStyleSeriesColor(a,b):"custom"===d.type&&(b=this._assigneeStyleCustomColor(a,b));return b},_assigneeStyleCustomColor:function(a,b){a=a.seriesStyle;if(!a||!a.customColor)return b;var c=a.customColor;a=c.categories;c=c.others;if(!(a&&a.length||c&&c.length))return b;c&&c.length&&this._setCustomOthersColor(c,b);a&&a.length&&this._setCustomCategoriesColor(a,
b)},_setCustomCategoriesColor:function(a,b){b.forEach(function(c){(c=c.data)&&c.length&&c.forEach(function(d){if("undefined"!==typeof d.name){var e=this._getMatchingCustomColor(d.name,a);this.setColorToDataItem(d,e)}}.bind(this))}.bind(this))},_getMatchingCustomColor:function(a,b){var c=!1;if(!b||!b.length)return c;(b=b.filter(function(d){return d.id===a})[0])&&b.color&&(c=b.color);return c},_getMatchingCustomLabel:function(a,b){var c=!1;if(!b||!b.length)return c;(b=b.filter(function(d){return d.id===
a})[0])&&b.label&&(c=b.label);return c},_setCustomOthersColor:function(a,b){this._setOtherColorForCustomColor(a,b);this._setNullLabelColorForCustomColor(a,b)},_setOtherColorForCustomColor:function(a,b){(a=a.filter(function(c){return"others"===c.id})[0])&&a.color&&this.setColorToAllSerieDataItem(b,a.color)},_setNullLabelColorForCustomColor:function(a,b){if((a=a.filter(function(d){return"null"===d.id})[0])&&a.color){var c=a.color;b.forEach(function(d){(d=d.data)&&d.length&&d.forEach(function(e){e.name&&
"_NULL\x26UNDEFINED_"===e.name&&this.setColorToDataItem(e,c)}.bind(this))}.bind(this))}},_assigneeStyleSeriesColor:function(a,b){var c=a.seriesStyle;if(!c||!c.styles||!c.styles[0])return b;var d=a.mode,e=a.area;return b.map(function(f){var g=null,h=f.type;if("field"===d)"line"===h?(g=c.styles[0].style,f=this._setStyleToSerie(g,f,e)):(h=f.data)&&h[0]&&(f.data=h.map(function(m){g=this._getMatchingStyle(m.name,c);return this.setStyleToSerieDataItem(g,m)}.bind(this)));else if("column"===h||"bar"===h||
"line"===h)"count"===d?(g=c.styles[0].style,f=this._setStyleToSerie(g,f,e)):"undefined"!==typeof f.name&&(g=this._getMatchingStyle(f.name,c))&&(f=this._setStyleToSerie(g,f,e));return f}.bind(this))},_assigneeStyleLayerSymbolColor:function(a,b){a.forEach(function(c){var d=c.name;(c=c.data)&&c.length&&c.forEach(function(e){var f=[this._getFeatureForSerieData(e,b,d)];if(f=this._getSymbolColorForDataItem(f))e.itemStyle={color:f}}.bind(this))}.bind(this))},_setStyleToSerie:function(a,b,c){b.itemStyle||
(b.itemStyle={});a&&"undefined"!==typeof a.color&&(Array.isArray(a.color)?b.itemStyle.color=a.color[0]:b.itemStyle.color=a.color);a&&"undefined"!==typeof a.opacity&&(c?(b.areaStyle||(b.areaStyle={}),b.areaStyle.opacity=1-parseFloat(a.opacity/10)):b.itemStyle.opacity=1-parseFloat(a.opacity/10));return b},_getMatchingStyle:function(a,b){var c=null;b=b.styles;if(!b||!b[0]||""===a)return c;b.forEach(function(d){d.name===a&&(c=d.style)});return c},_getSymbolColorForDataItem:function(a){var b=!1;if(!this.symbolLayer)return b;
a=a&&a[0];return a?b=this._getColorForFeature(this.symbolLayer.renderer,a):b},_getColorForFeature:function(a,b){var c=!1,d=this.getVisualVariableByType("colorInfo",a.visualVariables);d?(a=a.getColor(b,{colorInfo:d}))&&(c=this._convertToEchartsRbga(a)):(a=a.getSymbol(b))&&"undefined"!==typeof a.color&&(c=this._convertToEchartsRbga(a.color));return c},_convertToEchartsRbga:function(a){if(!a||"undefined"===typeof a.r)return a;a=window.JSON.parse(window.JSON.stringify(a));var b="rgba("+(a.r+",");b+=a.g+
",";b+=a.b+",";return b+=a.a+")"},getColors:function(a,b){var c=[];if(2===a.length)c=this._createGradientColors(a[0],a[a.length-1],b);else{for(var d=Math.ceil(b/a.length),e=0;e<d;e++)c=c.concat(a);c=c.slice(0,b)}return c},_createGradientColors:function(a,b,c){var d=[];a=new t(a);var e=new t(b);b=(e.r-a.r)/c;var f=(e.g-a.g)/c;e=(e.b-a.b)/c;for(var g=new t,h=0,m=0,l=0,n=0;n<c;n++)h=parseInt(a.r+b*n,10),m=parseInt(a.g+f*n,10),l=parseInt(a.b+e*n,10),g.setColor([h,m,l]),d.push(g.toHex());return d},setStyleToSerieDataItem:function(a,
b){b.itemStyle||(b.itemStyle={});a&&"undefined"!==typeof a.color&&(Array.isArray(a.color)?b.itemStyle.color=a.color[0]:b.itemStyle.color=a.color);a&&"undefined"!==typeof a.opacity&&(b.itemStyle.opacity=1-parseFloat(a.opacity/10));return b},setColorToSerie:function(a,b){if(!a||"object"!==typeof a||Array.isArray(a))return a;a.itemStyle||(a.itemStyle={});b&&(a.itemStyle.color=b)},setColorToDataItem:function(a,b){if(!a||"object"!==typeof a)return a;a.itemStyle||(a.itemStyle={});b&&(a.itemStyle.color=
b)},setColorToAllSerieDataItem:function(a,b){a.forEach(function(c){(c=c.data)&&c.length&&c.forEach(function(d){this.setColorToDataItem(d,b)}.bind(this))}.bind(this))},_updateDataItemNameForCustom:function(a,b,c){if("undefined"!==typeof a.name){var d=a.name;"_NULL\x26UNDEFINED_"===a.name&&b?d=b:(b=this._getMatchingCustomLabel("undefined"!==typeof a.originName?a.originName:a.name,c))&&(d=b);a.name=d}return d},_updateSerieDataItemName:function(a,b,c){var d=a.name,e=d;e=a.unit&&d?this.getCategoryDisplayForDateUnit(d,
a.unit):"field"!==b?this.getBestDisplayValue(c,d):this.getFieldAlias(d);a.name=e;a.originName=d;return e},updateChartSeriesDisplayName:function(a,b,c){var d=c.clusterField,e=c.mode;c=a.series;var f=[];b=b.seriesStyle;var g;c.forEach(function(l,n){l.name&&(l.name=this.getFieldAlias(l.name));(l=l.data)&&l.length&&l.forEach(function(p,q){g=this._updateSerieDataItemName(p,e,d);0===n&&(f[q]=g)}.bind(this))}.bind(this));if("custom"===b.type){if((b=b.customColor)&&b.categories&&b.categories.length){var h=
b.categories;b=b.others||[];if((b=b.filter(function(l){return"null"===l.id})[0])&&b.label)var m=b.label}c.forEach(function(l,n){(l=l.data)&&l.length&&l.forEach(function(p,q){g=this._updateDataItemNameForCustom(p,m,h);0===n&&(f[q]=g)}.bind(this))}.bind(this))}a.labels=null;a.labels=f}})});