import { Component, OnInit } from '@angular/core';
declare let google: any;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  public latitude = 7.3223996;
  public longitude = -2.3161264;
  public zoom = 18;
  public map: any;

  public places: Markers[] = [
    {
      lat: 7.3222184,
      long: -2.3155441,
      name: 'Auditorium'
    },

    {
      lat: 7.3225184,
      long: -2.3170441,
      name: 'Block B'
    },
    {
      lat: 7.3225184,
      long: -2.3160441,
      name: 'Engineering Block'
    },

    {
      lat: 7.3219184,
      long: -2.3160441,
      name: 'Computer Lab'
    }
  ];

  public origin: LngLat = {
    longitude: 0,
    latitude: 0
  };

  public destination: LngLat = {
    longitude: 0,
    latitude: 0
  };

  private directionRenderer: any;
  private showDirection = true;

  constructor() {}

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  setCurrentLocation() {
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.origin.latitude = position.coords.latitude;
        this.origin.longitude = position.coords.longitude;
      });
    }
  }

  mapReadyFunc(event) {
    this.map = event;
  }

  gotoLocation(lat, long) {
    this.destination.latitude = lat;
    this.destination.longitude = long;

    if(!this.directionRenderer) {
      this.directionRenderer = new google.maps.DirectionsRenderer({suppressMakers: true});
    }

    if(this.destination && this.showDirection) {
      // eslint-disable-next-line new-parens
      const directionService = new google.maps.DirectionsService;
      this.directionRenderer.setMap(this.map);
      directionService.route({
        origin: new google.maps.LatLng(this.origin.latitude, this.origin.longitude),
        destination: new google.maps.LatLng(this.destination.latitude, this.destination.longitude),
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'WALKING'
      }, (response, status) => {
        if(status === 'OK'){
          this.directionRenderer.setDirections(response);
        }
        else{
          console.log('Error, could not find directions');
        }
      });
    }
  }

}

interface Markers {
  lat: number;
  long: number;
  name: string;
}

interface LngLat {
  longitude: number;
  latitude: number;
}
