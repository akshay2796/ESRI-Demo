import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import Search from "esri/widgets/Search";
import FeatureLayer from "esri/layers/FeatureLayer";
import Popup from "esri/widgets/Popup";

const noop = () => {};

export const map = new WebMap({
	portalItem: {
		id: "e691172598f04ea8881cd2a4adaa45ba",
	},
});

export const view = new MapView({
	map: map,
});

export const search = new Search({ view });
view.ui.add(search, "top-right");

//Using non-proxy url since the proxy url was not working
const featureLayer1 = new FeatureLayer({
	url:
		"https://sptlgis.com/server/rest/services/GISDev/rfs_route/FeatureServer/1",
	popupTemplate: {
		title: "<b>TENSION TOWER</b>",
		content:
			"<b>Survey Status:</b> {survey_status}<br><b>Tower Type:</b> {tower_type}<br><b>Angle Tower Seq:</b> {angle_tower_seq}<br><b>Angle Value:</b> {angle_value}<br><b>Route ID:</b> {route_id}",
	},
});

const featureLayer2 = new FeatureLayer({
	url:
		"https://sptlgis.com/server/rest/services/GISDev/rfs_route/FeatureServer/2",
	popupTemplate: {
		title: "<b>RFS Route</b>",
		content:
			"<b>Survey Status: </b>{survey_status}<br><b>Sub Section ID: </b>{sub_section_id}<br><b>Route ID: </b>{route_id}",
	},
});
const featureLayer3 = new FeatureLayer({
	url:
		"https://sptlgis.com/server/rest/services/GISDev/rfs_route/FeatureServer/3",
	popupTemplate: {
		title: "<b>Row_Corridor</b>",
		content:
			"<b>Route Name: </b>{route_name}<br><b>Project Name: </b>{project_name}<br><b>Route ID: </b>{route_id}",
	},
});

//Adding all feature layers at once
map.addMany([featureLayer1, featureLayer2, featureLayer3]);

export const initialize = container => {
	view.container = container;
	view.when()
		.then(_ => {
			console.log("Map and View are ready");
			view.goTo(featureLayer1.fullExtent);
		})
		.catch(noop);
	return () => {
		view.container = null;
	};
};
