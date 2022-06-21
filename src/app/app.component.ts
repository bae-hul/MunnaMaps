import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from './mapstyles';

import * as $ from 'jquery';

import * as XLSX from 'xlsx';
import { TestBed } from '@angular/core/testing';
import { ThrowStmt } from '@angular/compiler';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

import { AppService } from './app.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


var gdialog;
var openIW = null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(public dialog:MatDialog, private appService: AppService){gdialog = this.dialog;}
    //dialog: MatDialog;
    openDialog(dtext)
    {
        let stext = dtext.substring(46, dtext.length-10)
        console.log("Inside open diag");
        gdialog.open(DialogExampleComponent,{
            data: {name: stext},
        });
    }

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
  AllNamesList = [];

  MyList = [];
  MyListDisplay: any;

  markers: marker[];
  allmarkers: marker[];
  availmarkers: marker[];
  occmarkers: marker[];
  gmarkers=[];

  midloc:any;

  checkthis = 1010;

  tempmrker="";

  visiblenum: number;
  //private _router: Subscription;
  //End of Vars

  apires: any[];

  ngOnInit(): void {
    this.myFunc();

    sessionStorage.setItem('myList',JSON.stringify([]));
  }

  //Load Maps
  async loadMaps(){
    let loader = new Loader({
      apiKey: 'AIzaSyC5dGJZs93eMbnWYrhPiTyWPesKby6VYpI'
    })

    loader.load().then(() => {
      console.log('loaded gmaps')

      const location = { lat: 8.506777777777778, lng: 	76.97308333333333 }
      this.midloc = location;

      this.map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 13,
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
        title: i.title,
        animation: google.maps.Animation.DROP
        })

        let infoWindow = new google.maps.InfoWindow();

    //test on click
    mrker.addListener("click", ((infoWindow) => { 
        return() =>{
        
        if (openIW!=null)
        openIW.close();
        openIW = infoWindow;

        this.map.setZoom(15);
        this.map.setCenter(mrker.getPosition() as google.maps.LatLng);
        console.log(mrker.getTitle())
        this.tempmrker = mrker.getTitle();

        infoWindow.setContent("<div id='myInfoWinDiv'><b style='color:black'>"+mrker.getTitle()+"</b></div>");

        google.maps.event.addListener(infoWindow,'domready',function(){
            $('#myInfoWinDiv').click(function() {

                
                console.log("The STKO works");
                infoFuncO(infoWindow.getContent());

                //let AC:AppComponent = new AppComponent();

                //console.log(this.checkthis);
            });
        });

        infoWindow.open(this.map,mrker);
        
      }
    })(infoWindow));
    

        // place marker in map
      mrker.setMap(this.map)
      
      this.gmarkers.push(mrker);

      google.maps.event.addListener(this.map, "click", function(event) {
        infoWindow.close();
    });

      }
    })

    
  }
  //Changes

  infoFunc(data)
  {
      console.log("Data from info window");
      console.log(data);
  }
  
  destroy$: Subject <boolean> = new Subject <boolean>();

  async myFunc(){
    console.log("It Works.");

    //Node JS API Changes
    await this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) =>{
        this.apires = users;
        //console.log("Done! -> "+this.apires);
        console.log("API Response Received!");
        //Read Excel File
        this.readmapfile();

        //Load GMaps
        this.loadMaps();

    });

    console.log(this.apires);

    
  }

  // async readmapfile(){
  //   let url = "../assets/MapSheet.xlsx";
  //   let req = new XMLHttpRequest();
  //   req.open("GET", url, true);
  //   req.responseType = "arraybuffer";
  //   req.onload = (e) =>
  //   {
  //       this.arrayBuffer = new Uint8Array(req.response);
  //       var data = new Uint8Array(this.arrayBuffer);
  //       var arr = new Array();
  //       for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  //       var bstr = arr.join("");
  //       var workbook = XLSX.read(bstr, {type:"binary"});
  //       var first_sheet_name = workbook.SheetNames[0];
  //       var worksheet = workbook.Sheets[first_sheet_name];
  //       this.jsonList = XLSX.utils.sheet_to_json(worksheet,{raw:true});
  //       console.log(this.jsonList[0].Name);

  //       console.log(this.jsonList);

  //       //Split JSON Array (Into available/taken)
  //       this.splitArrays();
  //   };
  //   await req.send();
  // }

  readmapfile(){

  this.jsonList = this.apires;

  this.splitArrays();
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

        //Changes to Sort Alpha
        this.AllNamesList.push({Name:this.jsonList[i].Name, Photo:this.jsonList[i].Photo});
      }

    }

    //Sort Alphabetically
    this.AllNamesList.sort((a, b) => a.Name.localeCompare(b.Name));
    sessionStorage.setItem('ANL',JSON.stringify(this.AllNamesList));

    //console.log(this.AllNamesList);
    console.log("Names: ", this.AllNamesList.length);

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

    this.viewAll1();
  }

  viewAll1()
  {

    this.clearMarkers();

    this.markers = this.allmarkers;
    this.visiblenum = this.markers.length;
    this.temp = "";

    //this.refreshMarkers();
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
    google.maps.event.clearListeners(this.map, 'click');

    for (let i of this.markers)
    {
      let latLng = {lat: Number(i.lat), lng: Number(i.lng)};

      // Set the position and title
    let mrkerz = new google.maps.Marker({
      position: latLng,
      title: i.title
      })

      let infoWindow = new google.maps.InfoWindow();

      mrkerz.addListener("click", ((infoWindow) => { 
        return() =>{
        
        if (openIW!=null)
            openIW.close();
        openIW = infoWindow;

        this.map.setZoom(15);
        this.map.setCenter(mrkerz.getPosition() as google.maps.LatLng);
        console.log(mrkerz.getTitle())
        this.tempmrker = mrkerz.getTitle();

        infoWindow.setContent("<div id='myInfoWinDiv'><b style='color:black'>"+mrkerz.getTitle()+"</b></div>");

        google.maps.event.addListener(infoWindow,'domready',function(){
            $('#myInfoWinDiv').click(function() {

                
                console.log("The STKO works");
                infoFuncO(infoWindow.getContent());

                //let AC:AppComponent = new AppComponent();

                //console.log(this.checkthis);
            });
        });

        
        infoWindow.open(this.map,mrkerz);
        
      }
    })(infoWindow));

      // place marker in map
    mrkerz.setMap(this.map)
    
    this.gmarkers.push(mrkerz);
    
    google.maps.event.addListener(this.map, "click", function(event) {
        infoWindow.close();
    });


    }

  }

  testz(){
    console.log(this.markers.length);
  }

  hamenu() {
    var element = document.getElementById("nav-icon2");
    element.classList.toggle("open");

    var element = document.getElementById("menuoverlay");
    element.classList.toggle("after1");

    var element = document.getElementById("overlayop");
    element.classList.toggle("op0");
    element.classList.toggle("op100");

}

async activBut(i){
  console.log(i);
    if (i==1)
    {
      var element = document.getElementById("togbut1");
      element.classList.add("active");

      var element = document.getElementById("togbut2");
      element.classList.remove("active");
      var element = document.getElementById("togbut3");
      element.classList.remove("active");
      
    }
    else if (i==2)
    {
      var element = document.getElementById("togbut2");
      element.classList.add("active");

      var element = document.getElementById("togbut1");
      element.classList.remove("active");
      var element = document.getElementById("togbut3");
      element.classList.remove("active");
      
    }
    else if (i==3)
    {
      var element = document.getElementById("togbut3");
      element.classList.add("active");

      var element = document.getElementById("togbut1");
      element.classList.remove("active");
      var element = document.getElementById("togbut2");
      element.classList.remove("active");
      
    }
}

async activButa(i){
  //console.log(i);
    if (i==1)
    {
      var element = document.getElementById("togbuta1");
      element.classList.add("active");

      var element = document.getElementById("togbuta2");
      element.classList.remove("active");
      var element = document.getElementById("togbuta3");
      element.classList.remove("active");
      this.viewAll();
    }
    else if (i==2)
    {
      var element = document.getElementById("togbuta2");
      element.classList.add("active");

      var element = document.getElementById("togbuta1");
      element.classList.remove("active");
      var element = document.getElementById("togbuta3");
      element.classList.remove("active");
      this.viewAvail();
    }
    else if (i==3)
    {
      var element = document.getElementById("togbuta3");
      element.classList.add("active");

      var element = document.getElementById("togbuta1");
      element.classList.remove("active");
      var element = document.getElementById("togbuta2");
      element.classList.remove("active");
      this.viewOcc();
    }
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


function infoFuncO(data)
{
    console.log("Info Func Outside the class");
    console.log(data);
    AppComponent.prototype.openDialog(data);
}
