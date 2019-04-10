(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{243:function(e,t,n){e.exports=n(472)},254:function(e,t,n){},472:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"geojsons",function(){return Ie}),n.d(a,"toporefs",function(){return Le}),n.d(a,"intensityMaps",function(){return Fe});n(244);var o=n(237),r=n(1),i=n.n(r),c=n(10),s=n.n(c),u=n(85),p=n(166),l=n(232),d=n.n(l),h=(n(254),n(255),n(236)),f=n(30),m=n(31),v=n(37),y=n(35),j=n(38),b=(n(99),n(52)),g=n(66),O=(n(176),n(53)),E=n(55),k=n(75),w=(n(474),n(235)),C=(n(475),n(234)),S=(n(265),n(11)),x=(n(267),n(89)),D=n(57),I=n(25),L=n(233),F=function(e){var t=e.features,n=Object(g.a)(e,["features"]),a=t.map(function(e,t){var n=e.properties,a=Object(g.a)(e,["properties"]),o=n,r=o.intensity,i="number"===typeof r&&r<7;return Object(I.a)({},a,{properties:Object(I.a)({index:t},o,{intensity:i?r:0})})}),o=a.reduce(function(e,t){var n=t.properties;return Object(I.a)({},e,Object(D.a)({},n.index,n.intensity))},{});return{geo:Object(I.a)({},n,{features:a}),intensities:o}};function U(e){var t=Object.keys(e.objects)[0];return Object(L.a)(e,e.objects[t])}function M(e,t,n){!function(e,t){var n=JSON.stringify(e),a=new Blob([n],{type:"text/json"}),o=new MouseEvent("click",{}),r=document.createElement("a");r.download=t,r.href=window.URL.createObjectURL(a),r.dataset.downloadurl=["text/json",r.download,r.href].join(":"),r.dispatchEvent(o)}(Object(I.a)({},e,{features:e.features.map(function(e){var n=e.properties,a=Object(g.a)(e,["properties"]);return Object(I.a)({},a,{properties:Object(I.a)({},n,{intensity:t[n.index]})})})}),n)}var T=0;function A(){return++T}var N=n(87),B=n.n(N),R=x.a.Item;var G=function(e){var t=e.toporefs,n=e.onSelect;return i.a.createElement(x.a,{onSelect:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e){var t=e.key;return n(t)})},t.map(function(e){return i.a.createElement(R,{key:e.name},e.name)}))},Z=function(e){var t=e.onSuccess;setTimeout(function(){t("ok")},0)},z=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).handleChange=function(e){switch(e.file.status){case"done":var t=new FileReader;t.onload=function(e){var t=e.target.result;n.handleDrop(t)},t.onerror=n.handleError,t.readAsText(e.file.originFileObj)}},n.handleError=function(){n.props.onUploadError("filesystem")},n.handleDrop=function(e){var t=function(e){var t={type:"unknown"};try{var n=JSON.parse(e);return n&&"object"===typeof n&&"string"===typeof n.type?n:t}catch(a){return t}}(e);switch(t.type){case"Topology":var a=t.type,o=t.objects,r=t.arcs,i=t.transform;if(o&&"object"===typeof o&&Object.keys(o).length&&r){Object.keys(o);var c=i?{type:a,arcs:r,objects:o,transform:i}:{type:a,arcs:r,objects:o};try{var s=U(c);n.props.onUpload(s)}catch(u){n.props.onUploadError("topojson")}}else n.props.onUploadError("topojson");break;case"FeatureCollection":try{B.a.geoJSON(t),n.props.onUpload(t)}catch(p){n.props.onUploadError("geojson")}break;default:n.props.onUploadError("parse")}},n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props.toporefs,t=void 0===e?[]:e;return i.a.createElement(w.a,{title:"Choose a Geography"},i.a.createElement(C.a,{accept:"application/json",onChange:this.handleChange,showUploadList:!1,customRequest:Z},i.a.createElement(b.a,null,i.a.createElement(S.a,{type:"upload"}),i.a.createElement("span",null,"Upload a Saved Choropleth, GeoJSON, or TopoJSON file"))),i.a.createElement(G,{toporefs:t,onSelect:this.props.onTopoSelect}))}}]),t}(i.a.Component),J=(n(406),n(173)),q=(n(408),n(172)),P=(n(473),n(171)),H=(n(177),n(97).a.TabPane,P.a.Column),V=function(e){var t=e.items,n=void 0===t?[]:t;return i.a.createElement("ul",null,n.map(function(e){var t=e.key,n=e.value;return i.a.createElement("li",{key:t},"".concat(t,": ").concat(n))}))},_=function(e,t){return i.a.createElement(V,{items:t.props})},K=["#FFEDA0","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#BD0026","#800026"],W=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).state={value:n.props.intensity},n.handleChange=function(e){n.setState({value:e})},n.handleAfterChange=function(e){n.props.onChange(n.props.index,e)},n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.value,t=this.props;t.index,t.onChange;return i.a.createElement("div",null,i.a.createElement(q.a,{value:e,min:0,max:7,onChange:this.handleChange,onAfterChange:this.handleAfterChange}),i.a.createElement(J.a,{color:K[e]},e))}}]),t}(i.a.Component),Q=function(e){var t=e.loading,n=e.regions,a=e.onRowClick,o=e.onIntensityChange;return i.a.createElement(P.a,{dataSource:n,loading:t,rowKey:"index",onRow:function(e){return{onClick:function(){return a(e)}}}},i.a.createElement(H,{title:"Index",dataIndex:"index"}),i.a.createElement(H,{title:"Intensity",dataIndex:"intensity",key:"intensity",render:function(e,t,n){var a=t.index;return i.a.createElement(W,{index:a,intensity:e,onChange:o})}}),i.a.createElement(H,{title:"Properties",key:"properties",render:_}))},X=(n(465),["#FFEDA0","#FED976","#FEB24C","#FD8D3C","#FC4E2A","#E31A1C","#BD0026","#800026"]),Y=function(){function e(){Object(f.a)(this,e),this.map=void 0,this.geoLayer=void 0,this.featureLayers={}}return Object(m.a)(e,[{key:"loadMap",value:function(e,t){var n=this,a=t.url,o=t.attribution,r=t.center,i=void 0===r?[39.8282,-98.5795]:r,c=t.zoom,s=void 0===c?5:c,u=t.maxZoom,p=void 0===u?19:u;this.map=B.a.map(e,{center:i,zoom:s}),B.a.tileLayer(a,{maxZoom:p,attribution:o}).addTo(this.map),this.refresh(),this.map.on("popupopen",function(e){var t=e.popup,a=n.map.project,o=n.map.unproject,r=a(t._latlng);r.y-=t._container.clientHeight/2,n.map.panTo(o(r),{animate:!0})})}},{key:"addGeojson",value:function(e,t){var n=this;this.featureLayers={},this.geoLayer=B.a.geoJSON(e,{onEachFeature:function(e,a){var o=e.properties,r=o.index,i=o.intensity,c={fillColor:X[i],weight:2,opacity:1,color:"white",dashArray:"3",fillOpacity:.7};a.setStyle(c),a.on({click:function(e){t(e.latlng,r)}}),n.featureLayers[r]=a}}),this.geoLayer.addTo(this.map)}},{key:"updateFeature",value:function(e,t){this.featureLayers[e].setStyle({fillColor:X[t]})}},{key:"fitGeoLayer",value:function(){this.map.fitBounds(this.geoLayer.getBounds())}},{key:"refresh",value:function(){this.map.invalidateSize()}},{key:"zoomToFeature",value:function(e){var t=this.featureLayers[e];this.map.fitBounds(t.getBounds())}},{key:"removeGeojson",value:function(){this.map.removeLayer(this.geoLayer),this.featureLayers={}}}]),e}(),$=i.a.createContext(null),ee=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).node=void 0,n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.onLoad(this.node)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"app-map",ref:function(t){e.node=t}})}}]),t}(i.a.Component),te=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).state={map:new Y,isLoaded:!1},n.handleMapLoad=function(e){n.state.map.loadMap(e,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),n.setState({isLoaded:!0}),n.props.onLoad(n.state.map)},n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.state.isLoaded;return i.a.createElement($.Provider,{value:this.state.map},i.a.createElement("div",{className:"map-container"},i.a.createElement(ee,{onLoad:this.handleMapLoad}),e?this.props.children:null))}}]),t}(i.a.Component),ne=function(e){function t(){return Object(f.a)(this,t),Object(v.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this.context,t=this.props,n=t.geojson,a=t.onClick;e.addGeojson(n,a),e.refresh(),e.fitGeoLayer()}},{key:"componentDidUpdate",value:function(e){var t=this.context,n=this.props,a=n.geojson,o=n.onClick;this.props.geojson!==e.geojson&&(t.removeGeojson(),t.addGeojson(a,o),t.fitGeoLayer(),t.refresh())}},{key:"componentWillUnmount",value:function(){this.context.removeGeojson()}},{key:"remove",value:function(){this.context.removeGeojson()}},{key:"render",value:function(){return this.props.children?this.props.children:null}}]),t}(i.a.Component);ne.contextType=$,ne.defaultProps={onClick:function(){}};var ae=function(e){function t(){return Object(f.a)(this,t),Object(v.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(j.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this.context,t=this.props.index;e.zoomToFeature(t),this.props.onZoomEnd()}},{key:"render",value:function(){return null}}]),t}(i.a.PureComponent);ae.contextType=$;var oe=n(230);function re(e,t){return e.geojsons[t.geoID]}function ie(e,t){return e.intensityMaps[t.geoID]}var ce=Object(oe.a)(re,ie,function(e,t){return e?e.features.map(function(e){var n=e.properties;return function(e,t){var n=e.index,a=(e.intensity,Object(g.a)(e,["index","intensity"]));return{index:n,intensity:t,props:Object.keys(a).map(function(t){return{key:t,value:e[t]}})}}(n,t[n.index])}):void 0}),se=function(e,t){return{type:"insert choropleth",data:Object(I.a)({id:e},F(t))}},ue=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:"httpError",data:Object(I.a)({type:e},t)}},pe=O.a.Header,le=O.a.Content,de=O.a.Sider,he=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).state={needsZoom:!1,zoomIndex:0},n.handleRowClick=function(e){var t=e.index;return n.setState(Object(I.a)({},n.state,{needsZoom:!0,zoomIndex:t}))},n.handleIntensityChange=function(e,t){var a=n.props.geoID,o=e;n.props.updateIntensity(a,o,t),n.state.map.updateFeature(e,t)},n.handleZoomEnd=function(){return n.setState({needsZoom:!1})},n.handleMapLoad=function(e){n.setState(Object(I.a)({},n.state,{map:e}))},n.handleSaveFormSubmit=function(){console.log("sub")},n.handleSave=function(){var e=n.props;M(e.geojson,e.intensities,"choropleth.json")},n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this.props,t=e.geojson,n=e.regions,a=e.loading,o=this.state,r=o.needsZoom,c=o.zoomIndex;return i.a.createElement(O.a,{className:"app-content"},i.a.createElement(de,{className:"app-sider",theme:"light",width:400},i.a.createElement(Q,{loading:a,regions:n,onRowClick:this.handleRowClick,onIntensityChange:this.handleIntensityChange})),i.a.createElement(le,null,i.a.createElement(O.a,{className:"app-content"},i.a.createElement(pe,{style:{background:"#f2f2f2"}},i.a.createElement(b.a,{icon:"save",disabled:a,onClick:this.handleSave},"Save")),i.a.createElement(le,null,i.a.createElement(te,{onLoad:this.handleMapLoad},t&&i.a.createElement(ne,{geojson:t},r&&i.a.createElement(ae,{index:c,onZoomEnd:this.handleZoomEnd})))))))}}]),t}(i.a.Component),fe=Object(u.b)(function(e,t){return{geojson:re(e,t),intensities:ie(e,t),regions:ce(e,t),loading:!re(e,t)}},{updateIntensity:function(e,t,n){return{type:"update intensity",data:{geoID:e,featureID:t,newValue:n}}}})(he),me=O.a.Header,ve=O.a.Content,ye=function(e){var t=e.isBrowsing,n=e.geoID,a=e.toporefs,o=Object(g.a)(e,["isBrowsing","geoID","toporefs"]);return i.a.createElement(O.a,{className:"app"},i.a.createElement(me,null,i.a.createElement(b.a,{ghost:!0,onClick:o.onNewMapClick},"New Map")),i.a.createElement(ve,null,i.a.createElement(k.d,null,i.a.createElement(k.b,{path:"/create",render:function(){return t?i.a.createElement(z,{toporefs:a,onTopoSelect:o.onTopoSelect,onUpload:o.onUpload,onUploadError:o.onUploadError}):i.a.createElement(fe,{geoID:n})}}),i.a.createElement(k.a,{to:"/create"}))))},je=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(o)))).state={appStatus:"browsing"},n.handleTopoSelect=function(e){var t=n.props.toporefs.find(function(t){return t.name==e}).key;n.setState({appStatus:"mapping",geoID:A()},function(){n.props.requestTopojson(e,t,n.state.geoID)})},n.handleUpload=function(e){n.setState({appStatus:"mapping",geoID:A()},function(){var t=n.state.geoID;n.props.onUpload(t,e)})},n.handleFileError=function(){h.a.error("ERROR: Could not load file")},n.handleAuthentication=function(){n.props.history.push("/mymaps")},n.handleNewMapClick=function(){n.setState({appStatus:"browsing"})},n}return Object(j.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.props.browseMaps()}},{key:"render",value:function(){var e=this.state.geoID,t=this.props,n=t.toporefs,a=(t.requestTopojson,"browsing"==this.state.appStatus);return i.a.createElement(ye,{isBrowsing:a,geoID:e,toporefs:n,onAuthentication:this.handleAuthentication,onUploadError:this.handleFileError,onUpload:this.handleUpload,onTopoSelect:this.handleTopoSelect,onNewMapClick:this.handleNewMapClick})}}]),t}(i.a.Component),be=Object(E.compose)(k.f,Object(u.b)(function(e){return{toporefs:e.toporefs}},{browseMaps:function(){return{type:"browse maps",data:{}}},requestTopojson:function(e,t,n){return{type:"request topojson",data:{id:n,name:e,key:t}}},onUpload:se}))(je),ge=(n(467),n(481)),Oe=n(480),Ee=n(482),ke=n(477),we=n(478),Ce=n(63),Se=n(479),xe=n(239),De=n(238),Ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"insert choropleth":var n=t.data,a=n.geo,o=n.id;return Object(I.a)({},e,Object(D.a)({},o,a));default:return e}},Le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"insert toporefs":return t.data.toporefs;default:return e}},Fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"insert choropleth":var n=t.data,a=n.id,o=n.intensities;return Object(I.a)({},e,Object(D.a)({},a,o));case"update intensity":var r=t.data,i=r.geoID,c=r.featureID,s=r.newValue;return Object(I.a)({},e,Object(D.a)({},i,Object(I.a)({},e[i],Object(D.a)({},c,s))));default:return e}},Ue=Object(ge.a)(function(e,t,n){var a=n.getFile;return e.pipe(Object(De.a)("request topojson"),Object(ke.a)("data"),Object(we.a)(function(e){var t=e.id,n=(e.key,e.name);return a("topojson/".concat(n,".json")).pipe(Object(Ce.a)(function(e){return se(t,U(e))}),Object(Se.a)(function(){return Object(xe.a)(ue("topojson",{id:t}))}))}))},function(e,t,n){var a=n.getFile;return e.pipe(Object(De.a)("browse maps"),Object(we.a)(function(){return a("toporefs.json").pipe(Object(Ce.a)(function(e){return function(e){return{type:"insert toporefs",data:{toporefs:e}}}(e.toporefs)}),Object(Se.a)(function(){return Object(xe.a)(ue("toporefs"))}))}))}),Me=Object(Oe.a)({dependencies:{getFile:function(e){return Ee.a.getJSON("https://raw.githubusercontent.com/cory17/react-choropleth/master/api/"+e)}}}),Te=Object(E.combineReducers)(a),Ae=Object(E.createStore)(Te,{},Object(E.applyMiddleware)(Me));Me.run(Ue);var Ne=Ae;s.a.render(i.a.createElement(o.a,{locale:d.a},i.a.createElement(u.a,{store:Ne},i.a.createElement(p.a,null,i.a.createElement(be,null)))),document.getElementById("root"))}},[[243,1,2]]]);
//# sourceMappingURL=main.15835258.chunk.js.map