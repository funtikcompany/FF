<template>
  <div style="height: 80vh; width: 100%">
    <l-map v-if="showMap" :zoom="zoom" :center="center" @click="addMarker" @update:zoom="zoomUpdate"
      style="height: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-for="item in markers" :lat-lng="item.lng">
        <l-popup :content="item.content"></l-popup>
      </l-marker>
    </l-map>
  </div>
  <div v-if="popUp" class="popup">
    <span @click="closePopup" id="close">
      <div class="cross"></div>
    </span>
    <input placeholder="Name Marker" v-model="nameMarker" type="text">
    <label class="label" for="">LAT</label>
    <input readonly placeholder="LAT" v-model="lat" type="text">
    <label class="label" for="">LNG</label>
    <input readonly placeholder="LNG" v-model="lng" type="text">
    <button @click="create" id="save">
      Save
    </button>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

#map {
  height: 100vh;
}

.popup {
  position: fixed;
  padding: 50px;
  border-radius: 20px;
  background-color: rgb(182, 232, 227);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate3d(-50%, -50%, 0)
}

.label {
  text-align: left;
  width: 100%;
  margin: 10px 0;
}

#close {
  position: absolute;
  right: 5px;
  top: 10px;
  cursor: pointer;
  padding: 10px;
}

.cross {
  width: 40px;
  height: 3px;
  position: relative;

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background: #000;
  }

  &::after {
    transform: rotate(-45deg);
  }

  &::before {
    transform: rotate(45deg);
  }
}


#close::after {
  position: absolute
}

#save {
  margin-top: 20px;
  background-color: rgb(72, 54, 232);
  font-size: 30px;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

input {
  padding: 10px;
  font-size: 18px;
}
</style>

<script>

import { latLng } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  name: "map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      popUp: false,
      lat: '',
      lng: '',
      nameMarker: '',
      latlng: '',
      zoom: 7,
      center: latLng(50.401699, 30.2525114),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(50.401699, 30.2525114),
      currentZoom: 12,
      markers: [
        {
          lng: [50.401699, 30.2525114],
          content: 'Київ',
        }

      ],
      nameMarkers: ['marker1', 'marker2', 'marker3'],
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    addMarker(event) {
      this.lat = event.latlng.lat
      this.lng = event.latlng.lng
      this.latlng = event.latlng
      this.popUp = true
      console.log(typeof event.latlng)
    },
    closePopup() {
      this.popUp = false
    },
    create(event) {
      if (this.nameMarker) {
        this.markers.push({
          lng: this.latlng,
          content: this.nameMarker,
        });
        this.popUp = false
        localStorage.setItem('markers', JSON.stringify(this.markers));
        this.nameMarker = ""
      } else {
        alert("Enter name marker")
      }

    },
    createLocal() {
      this.markers = JSON.parse(localStorage.getItem('markers'))
    }
  }, mounted() {
    if (localStorage.getItem('markers')) {
      this.createLocal()
    }
  }
};

</script>