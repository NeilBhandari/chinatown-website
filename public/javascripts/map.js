// To the extent possible under law, I waive all copyright and related
// or neighboring rights to this program via CC0

var locations = [
	/*
{"name": "Nine Dragon Wall",
  "address": "158 W Cermak Rd",
  "position": {"lat": 41.853170000, "lng": -87.631345000},
  "icon": "/images/map-icons/NineDragonWallIcon.png",
  "link": "./Location/NineDragonWall.html"},
 {"name": "Chinatown Gate",
  "address": "Wentworth and Cermak",
  "position": {"lat": 41.852697400, "lng": -87.632211300},
  "icon": "",
  "link": ""},
 {"name": "Pui Tak Center",
  "address": "2216 S Wentworth Ave",
  "position": {"lat": 41.852396900, "lng": -87.632291100},
  "icon": "/images/map-icons/PuiTakCenterIcon.png",
  "link": "./Location/PuiTakCenter.html"},
*/
 {"name": "International Buddhist Friendship Association",
  "address": "2249 S Wentworth Ave",
  "position": {"lat": 41.851436200, "lng": -87.631652300},
  "icon": "/images/map-icons/dragon.png",
  "link": "location"} //TODO: proper link to location
	/*,
 {"name": "Chinese Christian Union Church",
  "address": "2301 S Wentworth Ave",
  "position": {"lat": 41.850719000, "lng": -87.631671600},
  "icon": "/images/map-icons/ChineseChristianUnionChurchIcon.png",
  "link": "./Location/ChineseChristianCatholicChurch.html"},
 {"name": "Herbalist",
  "address": "2400 S Wentworth Ave",
  "position": {"lat": 41.849052000, "lng": -87.632070700},
  "icon": "",
  "link": ""},
 {"name": "Chinese Shop",
  "address": "2316 S Wentworth Ave",
  "position": {"lat": 41.850397200, "lng": -87.632185900},
  "icon": "",
  "link": ""},
 {"name": "Chinese-American Museum",
  "address": "238 W 23rd St",
  "position": {"lat": 41.851217700, "lng": -87.633518200},
  "icon": "/images/map-icons/dragon.png",
  "link": "./Location/Chinese-AmericanMuseum.html"},
 {"name": "St Therese Church",
  "address": "218 W Alexander St",
  "position": {"lat": 41.851545200, "lng": -87.632607200},
  "icon": "/images/map-icons/StThereseChurchIcon.png",
  "link": "./Location/ChinatownChurch-SaintTherese.html"},
 {"name": "Moy Family Association",
  "address": "2238 S Wentworth Ave",
  "position": {"lat": 41.851749300, "lng": -87.632259500},
  "icon": "",
  "link": ""},
 {"name": "ChinaTown Public Library",
  "address": "2100 S Wentworth Ave",
  "position": {"lat": 41.853860, "lng": -87.632160},
  "icon": "/images/map-icons/books.png",
  "link": "./Location/Library.html"},
 {"name": "Chinatown Square Plaza",
  "address": "2133 S China Pl",
  "position": {"lat": 41.853490, "lng": -87.635407},
  "icon": "",
  "link": ""},
 {"name": "Chinese American Service League / CBCAC",
  "address": "2141 S Tan Ct",
  "position": {"lat": 41.854406300, "lng": -87.635565500},
  "icon": "",
  "link": ""},
 {"name": "Ping Tom Park",
  "address": "1700 S Wentworth Ave",
  "position": {"lat": 41.859115900, "lng": -87.632596900},
  "icon": "/images/map-icons/pinghut.png",
  "link": "./Location/PingTomPark.html"}
*/
];

var location_elems = []; // Icons and maps added for locations

var origin_lat = 41.848;
var origin_long = -87.6400;

var origin_lat_end = 41.8595;
var origin_long_end = -87.6300;

var map_width_coords = origin_long_end - origin_long;
var map_height_coords = origin_lat_end - origin_lat;

var map_width = 600;
var map_height = 600;

var main_map = document.createElement("img");
main_map.src = "/images/ct-map-coords-big.png";
main_map.setAttribute("id", "main_map");
main_map.setAttribute("alt", "map");
main_map.setAttribute("width", map_width.toString());
main_map.setAttribute("height", map_height.toString());
document.getElementById("map").appendChild(main_map);

function mapOpen(v) {
	var icon_width = 32;

	var elem=document.createElement("img");

	var coords = translate_coords(v.position.lat, v.position.lng);

	elem.src = v.icon;
	elem.setAttribute("alt", "icon");
	elem.setAttribute("usemap", "#clickable ".concat(v.name));

	elem.style.position = "absolute";

	var rect = document.getElementById("main_map").getBoundingClientRect();
	var doc_rect = document.documentElement.getBoundingClientRect();
	
	var x = (rect.left - doc_rect.left - icon_width / 2 + coords[1]);
	var y = (rect.bottom - doc_rect.top - icon_width / 2 - coords[0]);
	elem.style.width = icon_width.toString().concat("px");
	elem.style.height = icon_width.toString().concat("px");
	elem.style.top = y.toString().concat("px");
	elem.style.left = x.toString().concat("px");
	document.getElementById("map").appendChild(elem);

	var clickable = document.createElement("map");
	clickable.setAttribute("name", "clickable ".concat(v.name));
	document.getElementById("map").appendChild(clickable);
	
	var click_area = document.createElement("area");
	click_area.setAttribute("shape", "rect");
	click_area.setAttribute("coords", "0,0,".concat(icon_width.toString()).concat(",").concat(icon_width.toString()));
	click_area.setAttribute("href", v.link);
	clickable.appendChild(click_area);

	location_elems.push(elem);
	location_elems.push(click_area);
	location_elems.push(clickable);
}

function translate_coords(latitude, longitude) {
	if (latitude > origin_lat_end || longitude > origin_long_end || latitude < origin_lat || longitude < origin_long) {
		alert("Uh-oh, coordinates out of bounds: (".concat(latitude.toString().concat(", ").concat(longitude.toString().concat(")"))));
	}
	return [(latitude - origin_lat) * map_height / map_height_coords, (longitude - origin_long) * map_width / map_width_coords];
}

function load_locs() {
	for (var loc = 0; loc < locations.length; loc++) {
		mapOpen(locations[loc]);
	}
}

function erase_locs() {
	for (var i = 0; i < location_elems.length; i++) {
		if (location_elems[i].parentNode != null) {
			location_elems[i].parentNode.removeChild(location_elems[i]);
		}
	}
}

function refresh_locs() {
	erase_locs();
	load_locs();
}

load_locs();

window.onresize = refresh_locs;