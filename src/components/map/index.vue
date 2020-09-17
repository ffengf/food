<template lang="html">
  	<div class="container">
      	<div class="search-box">
        	<input
          		v-model="searchKey"
          		type="search"
          		id="search"
			>
        	<button @click="searchByHand">搜索</button>
        	<div class="tip-box" id="searchTip"></div>
      	</div>
		<el-amap class="amap-box"
			:amap-manager="amapManager"
			:vid="'amap-vue'"
			:zoom="zoom"
			:plugin="plugin"
			:center="center"
			:events="events"
		>
        	<el-amap-marker v-for="(marker, index) in markers" :position="marker" :key="index"></el-amap-marker>
      	</el-amap>
      	<div class="ft">
        	<span slot="footer" class="dialog-footer">
          		<el-button @click.native = "mapBtn" type = "primary" size = "medium">确 定</el-button>
        	</span>
      	</div>
    </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
    props: ["locationInfo"],
    data() {
        let self = this;
        return {
            addressInfoObj: {},
            address: null,
            amapManager,
            markers: [],
            searchOption: {
                city: "全国",
                citylimit: true,
            },
            searchKey: "",
            center: [114.267952, 22.758427],
            zoom: 17,
            lng: 0,
            lat: 0,
            loaded: false,
            events: {
                init() {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        self.initSearch();
                    });
                },
                click(e) {
                    self.markers = [];
                    let { lng, lat } = e.lnglat;
                    self.lng = lng;
                    self.lat = lat;
                    self.center = [lng, lat];
                    self.markers.push([lng, lat]);
                    let geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all",
                    });
                    geocoder.getAddress([lng, lat], function (status, result) {
                        if (status === "complete" && result.info === "OK") {
                            if (result && result.regeocode) {
                                self.address =
                                    result.regeocode.formattedAddress;
                                self.searchKey =
                                    result.regeocode.formattedAddress;
                                self.$nextTick();
                                self.addressInfoObj = {
                                    name: result.regeocode.formattedAddress,
                                    gpsY: lat,
                                    gpsX: lng,
                                };
                            }
                        }
                    });
                },
            },
            plugin: [
                {
                    pName: "Geolocation",
                    events: {
                        init(o) {
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.center = [self.lng, self.lat];
                                    self.markers.push([self.lng, self.lat]);
                                    self.loaded = true;
                                    self.$nextTick();
                                }
                            });
                        },
                    },
                },
                {
                    pName: "ToolBar",
                    events: {
                        init(instance) {},
                    },
                },
                {
                    pName: "OverView",
                    events: {
                        init(instance) {},
                    },
                },
                {
                    pName: "MapType",
                    defaultType: 0,
                    events: {
                        init(instance) {},
                    },
                },
                {
                    // 搜索
                    pName: "PlaceSearch",
                    events: {
                        init(instance) {},
                    },
                },
            ],
        };
    },
    methods: {
        initSearch() {
            let vm = this;
            let map = this.amapManager.getMap();
            AMapUI.loadUI(["misc/PoiPicker"], function (PoiPicker) {
                var poiPicker = new PoiPicker({
                    input: "search",
                    placeSearchOptions: {
                        map: map,
                        pageSize: 10,
                    },
                    suggestContainer: "searchTip",
                    searchResultsContainer: "searchTip",
                });
                vm.poiPicker = poiPicker;
                poiPicker.on("poiPicked", function (poiResult) {
                    let source = poiResult.source;
                    let poi = poiResult.item;
                    if (source !== "search") {
                        poiPicker.searchByKeyword(poi.name);
                        vm.addressInfoObj = {
                            name: poiResult.item.name,
                            gpsY: poiResult.item.location.lat,
                            gpsX: poiResult.item.location.lng,
                        };
                    } else {
                        vm.addressInfoObj = {
                            name: poiResult.item.name,
                            gpsY: poiResult.item.location.lat,
                            gpsX: poiResult.item.location.lng,
                        };
                        poiPicker.clearSearchResults();
                        vm.markers = [];
                        let lng = poi.location.lng;
                        let lat = poi.location.lat;
                        let address = poi.cityname + poi.adname + poi.name;
                        vm.center = [lng, lat];
                        vm.markers.push([lng, lat]);
                        vm.lng = lng;
                        vm.lat = lat;
                        vm.address = address;
                        vm.searchKey = address;
                    }
                });
            });
        },
        searchByHand() {
            if (this.searchKey !== "") {
                this.poiPicker.searchByKeyword(this.searchKey);
            }
        },
        mapBtn() {
            if (this.searchKey === "") {
                this.$message.error("请选择或搜索地址");
                return false;
			}
            this.$emit("sendData", this.addressInfoObj);
        },
    },
    mounted() {},
};
</script>

<style lang="css">
.container {
    width: 100%;
    height: 500px;
}
.search-box {
    position: absolute;
    z-index: 5;
    width: 70%;
    left: 15%;
    top: 70px;
    height: 30px;
}
.search-box input {
    box-sizing: border-box;
    float: left;
    width: 80%;
    height: 100%;
    border: 1px solid #30ccc1;
    padding: 0 8px;
    outline: none;
}
.search-box button {
    float: left;
    width: 20%;
    height: 100%;
    background: #30ccc1;
    border: 1px solid #30ccc1;
    color: #fff;
    outline: none;
}
.tip-box {
    width: 100%;
    max-height: 260px;
    position: absolute;
    top: 30px;
    overflow-y: auto;
    background-color: #fff;
}
.el-dialog__body {
    padding: 15px 15px 50px 15px;
}
.ft {
    text-align: right;
    padding-top: 5px;
}
.dialog-footer {
    margin-top: 10px;
}
</style>
