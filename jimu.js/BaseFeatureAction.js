// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define(["dojo/_base/declare","dojo/_base/lang"],function(b,c){return b(null,{name:void 0,label:void 0,iconFormat:"svg",iconClass:"",map:null,appConfig:{},widgetId:null,constructor:function(a){c.mixin(this,a)},isFeatureSupported:function(a,d){return!0},onExecute:function(a,d){},setMap:function(a){this.map=a},setAppConfig:function(a){this.appConfig=a},getIcon:function(a){return"framework"===this.widgetId?require.toUrl("jimu")+"/images/feature_actions/"+this.name+"_"+a+"."+this.iconFormat:this.appConfig.getConfigElementById(this.widgetId).folderUrl+
"images/"+this.name+"_"+a+"."+this.iconFormat}})});