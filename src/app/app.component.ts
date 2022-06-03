import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';

import * as XLSX from 'xlsx';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'google-maps';

  private map: google.maps.Map

  //Vars
  temp: any;
  flag: boolean = false;
  file: File;
  arrayBuffer: any;
  jsonList = [];

  AllLists = [];
  AvailableLists = [];
  OccupiedLists = [];

  MyList = [];
  MyListDisplay: any;

  markers: marker[];
  allmarkers: marker[];
  availmarkers: marker[];
  occmarkers: marker[];
  gmarkers=[];

  visiblenum: number;
  //private _router: Subscription;
  //End of Vars

  ngOnInit(): void {
    this.myFunc();
    this.loadMaps();
  }

  //Load Maps
  async loadMaps(){
    let loader = new Loader({
      apiKey: 'AIzaSyBMGH91a04LI8u01RCVeoYvr4PNeVswbq8'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')

      const location = { lat: 8.506777777777778, lng: 	76.97308333333333 }

      this.map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 11,
        styles: styles
      })

      // const marker = new google.maps.Marker({
      //   position: location,
      //   map: this.map,
      // });

      for (let i of this.markers)
      {
        let latLng = {lat: Number(i.lat), lng: Number(i.lng)};

        // Set the position and title
      let mrker = new google.maps.Marker({
        position: latLng,
        title: i.title
        })

        // place marker in map
      mrker.setMap(this.map)
      
      this.gmarkers.push(mrker);

      }
    })
  }
  //Changes

  async myFunc(){
    console.log("It Works.");
    //Read Excel File
    await this.readmapfile();
  }

  async readmapfile(){
    let url = "/assets/MapSheet.xlsx";
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = (e) =>
    {
        this.arrayBuffer = new Uint8Array(req.response);
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        this.jsonList = XLSX.utils.sheet_to_json(worksheet,{raw:true});
        console.log(this.jsonList[0].Name);

        //Split JSON Array (Into available/taken)
        this.splitArrays();
    };
    await req.send();
  }

  splitArrays(){
    for (var i=0; i<this.jsonList.length; i++)
    {
      if(this.jsonList[i].Latitude!=null)
      {
        this.AllLists.push(this.jsonList[i]);
        if(this.jsonList[i].Status=="Occupied")
        {
          this.OccupiedLists.push(this.jsonList[i]);
        }
        else if (this.jsonList[i].Status=="Available")
        {
          this.AvailableLists.push(this.jsonList[i]);
        }
      }

    }

    console.log("All", this.AllLists.length);
    console.log("Available", this.AvailableLists.length);
    console.log("Occupied", this.OccupiedLists.length);

    console.log("Error in dataset found in: ", this.jsonList.length-this.AllLists.length," entries!");

    this.setAll();
  }

  setAll()
  {
    this.markers = [];
    this.allmarkers = [];
    this.occmarkers = [];
    this.availmarkers = [];

    for (var i=0; i<this.AllLists.length; i++)
    {
      this.allmarkers.push(
        {
            lat: this.AllLists[i].Latitude,
            lng: this.AllLists[i].Longitude,
            label: '',
            title: this.AllLists[i].Name,
            draggable: false          
        }
      );
    }
    for (var i=0;i<this.OccupiedLists.length;i++)
    {
      this.occmarkers.push(
        {
            lat: this.OccupiedLists[i].Latitude,
            lng: this.OccupiedLists[i].Longitude,
            label: '',
            title: this.OccupiedLists[i].Name,
            draggable: false          
        }
      );
    }
    for (var i=0;i<this.AvailableLists.length;i++)
    {
      this.availmarkers.push(
        {
            lat: this.AvailableLists[i].Latitude,
            lng: this.AvailableLists[i].Longitude,
            label: '',
            title: this.AvailableLists[i].Name,
            draggable: false          
        }
      );
    }

    this.viewAll();
  }

  viewAll()
  {

    this.clearMarkers();

    this.markers = this.allmarkers;
    this.visiblenum = this.markers.length;
    this.temp = "";

    this.refreshMarkers();
  }

  viewAvail()
  {

    this.clearMarkers();

    this.markers = this.availmarkers;
    this.visiblenum = this.markers.length;
    this.temp = "";

    this.refreshMarkers();

  }

  viewOcc()
  {
    
    this.clearMarkers();

    this.markers = this.occmarkers;
    this.visiblenum = this.markers.length;
    this.temp = "";

    this.refreshMarkers();

  }
  //End of Changes

  clearMarkers()
  {
    if (this.gmarkers) {
      for (let i in this.gmarkers) {
        this.gmarkers[i].setMap(null);
      }

      this.gmarkers = [];
   }
  }

  refreshMarkers()
  {
    for (let i of this.markers)
    {
      let latLng = {lat: Number(i.lat), lng: Number(i.lng)};

      // Set the position and title
    let mrkerz = new google.maps.Marker({
      position: latLng,
      title: i.title
      })

      // place marker in map
    mrkerz.setMap(this.map)
    
    this.gmarkers.push(mrkerz);

    }
  }

  testz(){
    console.log(this.markers.length);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
  title?: string;
  visible?: boolean;
}

