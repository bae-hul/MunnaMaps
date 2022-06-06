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

  midloc:any;

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
        this.map.setZoom(15);
        this.map.setCenter(mrker.getPosition() as google.maps.LatLng);
        console.log(mrker.getTitle())

        infoWindow.setContent("<b style='color:black'>"+mrker.getTitle()+"</b>");
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

  async myFunc(){
    console.log("It Works.");
    //Read Excel File
    await this.readmapfile();
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
    this.jsonList = [
      {
          "Name": "KAZHAKOOTAM Jn",
          "Photo": "KAZHAKOOTAM Jn",
          "Status": "Available",
          "Location coordinates": "8°34'00.4\"N 76°52'23.1\"E",
          "Latitude": "8.566777777777778",
          "Longitude": "76.87308333333333"
      },
      {
          "Name": "PULLATTUKARI - NAALUMUKKU",
          "Photo": "PULLATTUKARI - NAALUMUKKU",
          "Status": "Available",
          "Location coordinates": "8°34'01.8\"N 76°51'54.6\"E",
          "Latitude": "8.567166666666667",
          "Longitude": "76.86516666666667"
      },
      {
          "Name": "AMBALATHINKARA (Techno park)",
          "Client": "Precise",
          "Photo": "AMBALATHINKARA (Techno park)",
          "Status": "Occupied",
          "Location coordinates": "8°33'53.1\"N 76°52'53.3\"E",
          "Latitude": "8.56475",
          "Longitude": "76.88147222222221"
      },
      {
          "Name": "NETTAYAKONAM",
          "Photo": "NETTAYAKONAM",
          "Status": "Available",
          "Location coordinates": "8°34'10.6\"N 76°52'40.6\"E",
          "Latitude": "8.569611111111112",
          "Longitude": "76.87794444444444"
      },
      {
          "Name": "OPP AL SAJ CONV. CENTER",
          "Client": "Travancore Gold",
          "Photo": "OPP AL SAJ CONV. CENTER",
          "Status": "Occupied",
          "Location coordinates": "8°34'29.4\"N 76°52'07.5\"E",
          "Latitude": "8.574833333333332",
          "Longitude": "76.86874999999999"
      },
      {
          "Name": "VETTUROAD Jn",
          "Photo": "VETTUROAD Jn",
          "Status": "Available",
          "Location coordinates": "8°34'49.8\"N 76°51'36.0\"E",
          "Latitude": "8.580499999999999",
          "Longitude": "76.86"
      },
      {
          "Name": "KINFRA CHANDAVILA",
          "Photo": "KINFRA CHANDAVILA",
          "Status": "Available",
          "Location coordinates": "8°35'17.2\"N 76°52'41.6\"E",
          "Latitude": "8.588111111111111",
          "Longitude": "76.87822222222222"
      },
      {
          "Name": "SAINIK SCHOOL",
          "Photo": "SAINIK SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°35'14.0\"N 76°52'28.6\"E",
          "Latitude": "8.587222222222223",
          "Longitude": "76.87461111111111"
      },
      {
          "Name": "KURISADI LNCPE KARYAVATTOM",
          "Client": "Allianz",
          "Photo": "KURISADI LNCPE KARYAVATTOM",
          "Status": "Occupied",
          "Location coordinates": "8°34'28.3\"N 76°53'26.3\"E",
          "Latitude": "8.574527777777778",
          "Longitude": "76.8906388888889"
      },
      {
          "Name": "KATTAYIKONAM JN",
          "Photo": "KATTAYIKONAM JN",
          "Status": "Available",
          "Location coordinates": "8°36'13.2\"N 76°53'52.2\"E",
          "Latitude": "8.603666666666665",
          "Longitude": "76.89783333333334"
      },
      {
          "Name": "MADAVOORPARA",
          "Client": "Travancore Gold",
          "Photo": "MADAVOORPARA",
          "Status": "Occupied",
          "Location coordinates": "8°35'38.8\"N 76°54'11.0\"E",
          "Latitude": "8.594111111111111",
          "Longitude": "76.90305555555557"
      },
      {
          "Name": "CHENKOTTUKONAM",
          "Client": "Travancore Gold",
          "Photo": "CHENKOTTUKONAM",
          "Status": "Occupied",
          "Location coordinates": "8°35'02.3\"N 76°54'07.9\"E",
          "Latitude": "8.583972222222222",
          "Longitude": "76.90219444444445"
      },
      {
          "Name": "PANGAPPARA GURUMANDIRAM",
          "Photo": "PANGAPPARA GURUMANDIRAM",
          "Status": "Available",
          "Location coordinates": "8°35'02.3\"N 76°54'07.9\"E",
          "Latitude": "8.583972222222222",
          "Longitude": "76.90219444444445"
      },
      {
          "Name": "ENGINEERING COLLEGE",
          "Client": "Allianz",
          "Photo": "ENGINEERING COLLEGE",
          "Status": "Occupied",
          "Location coordinates": "8°32'47.7\"N 76°54'18.4\"E",
          "Latitude": "8.546583333333333",
          "Longitude": "76.90511111111111"
      },
      {
          "Name": "SREEKARYAM MARKET",
          "Client": "Bhima",
          "Photo": "SREEKARYAM MARKET",
          "Status": "Occupied",
          "Location coordinates": "8°32'59.2\"N 76°55'00.7\"E",
          "Latitude": "8.549777777777777",
          "Longitude": "76.91686111111112"
      },
      {
          "Name": "PANGAPPARA HEALTH CENTRE",
          "Client": "Precise",
          "Photo": "PANGAPPARA HEALTH CENTRE",
          "Status": "Occupied",
          "Location coordinates": "8°33'28.4\"N 76°54'08.7\"E",
          "Latitude": "8.55788888888889",
          "Longitude": "76.90241666666667"
      },
      {
          "Name": "SREEKARYAM JN",
          "Client": "Travancore Gold",
          "Photo": "SREEKARYAM JN",
          "Status": "Occupied",
          "Location coordinates": "8°32'54.3\"N 76°55'06.1\"E",
          "Latitude": "8.548416666666666",
          "Longitude": "76.91836111111111"
      },
      {
          "Name": "ENGG COLLEGE",
          "Photo": "ENGG COLLEGE",
          "Status": "Available",
          "Location coordinates": "8°32'53.2\"N 76°54'26.0\"E",
          "Latitude": "8.548111111111112",
          "Longitude": "76.90722222222223"
      },
      {
          "Name": "ALATHARA",
          "Photo": "ALATHARA",
          "Status": "Available",
          "Location coordinates": "8°31'57.6\"N 76°54'15.3\"E",
          "Latitude": "8.532666666666668",
          "Longitude": "76.90425"
      },
      {
          "Name": "CHERUVAYKKAL",
          "Photo": "CHERUVAYKKAL",
          "Status": "Available",
          "Location coordinates": "8°32'14.6\"N 76°54'45.3\"E",
          "Latitude": "8.53738888888889",
          "Longitude": "76.91258333333334"
      },
      {
          "Name": "PONGUMOODU",
          "Client": "Bhima",
          "Photo": "PONGUMOODU",
          "Status": "Occupied",
          "Location coordinates": "8°32'24.2\"N 76°55'24.7\"E",
          "Latitude": "8.540055555555556",
          "Longitude": "76.92352777777778"
      },
      {
          "Name": "ULOOR-PONGUMMOOD",
          "Client": "Allianz",
          "Photo": "ULOOR-PONGUMMOOD",
          "Status": "Occupied",
          "Location coordinates": "8°32'24.7\"N 76°55'28.5\"E",
          "Latitude": "8.540194444444444",
          "Longitude": "76.92458333333335"
      },
      {
          "Name": "KOCHULLOOR",
          "Client": "Precise",
          "Photo": "KOCHULLOOR",
          "Status": "Occupied",
          "Location coordinates": "8°31'58.9\"N 76°55'44.4\"E",
          "Latitude": "8.533027777777779",
          "Longitude": "76.929"
      },
      {
          "Name": "ULLOOR BRIDGE",
          "Client": "Bhima",
          "Photo": "ULLOOR BRIDGE",
          "Status": "Occupied",
          "Location coordinates": "8°31'47.0\"N 76°55'53.6\"E",
          "Latitude": "8.529722222222222",
          "Longitude": "76.93155555555556"
      },
      {
          "Name": "CHEKALAMUKKU",
          "Client": "Travancore Gold",
          "Photo": "CHEKALAMUKKU",
          "Status": "Occupied",
          "Location coordinates": "8°33'14.4\"N 76°55'02.8\"E",
          "Latitude": "8.554",
          "Longitude": "76.91744444444446"
      },
      {
          "Name": "EDAVACODE",
          "Client": "Travancore Gold",
          "Status": "Occupied"
      },
      {
          "Name": "KARIMBIKONAM TEMPLE",
          "Photo": "KARIMBIKONAM TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°33'10.1\"N 76°55'28.3\"E",
          "Latitude": "8.552805555555556",
          "Longitude": "76.92452777777778"
      },
      {
          "Name": "VENCHAVODU JN",
          "Client": "Travancore Gold",
          "Photo": "VENCHAVODU JN",
          "Status": "Occupied",
          "Location coordinates": "8°33'38.2\"N 76°54'44.6\"E",
          "Latitude": "8.560611111111111",
          "Longitude": "76.9123888888889"
      },
      {
          "Name": "VATTAVILA JN",
          "Client": "Travancore Gold",
          "Photo": "VATTAVILA JN",
          "Status": "Occupied",
          "Location coordinates": "8°33'58.6\"N 76°55'21.0\"E",
          "Latitude": "8.566277777777778",
          "Longitude": "76.9225"
      },
      {
          "Name": "CHELLAMANGALAM  JN",
          "Client": "Travancore Gold",
          "Photo": "CHELLAMANGALAM JN",
          "Status": "Occupied",
          "Location coordinates": "8.5644069, 76.9209259",
          "Latitude": 8.5644069,
          "Longitude": 76.9209259
      },
      {
          "Name": "KARIYAM",
          "Client": "Travancore Gold",
          "Status": "Occupied"
      },
      {
          "Name": "ANIYOOR",
          "Client": "Travancore Gold",
          "Photo": "ANIYOOR",
          "Status": "Occupied",
          "Location coordinates": "8°34'16.5\"N 76°54'24.3\"E",
          "Latitude": "8.57125",
          "Longitude": "76.90675"
      },
      {
          "Name": "PULLANNIVILA",
          "Photo": "PULLANNIVILA",
          "Status": "Available",
          "Location coordinates": "8°34'41.5\"N 76°53'40.5\"E",
          "Latitude": "8.578194444444444",
          "Longitude": "76.89458333333334"
      },
      {
          "Name": "KARYAVATTOM TEMPLE",
          "Client": "Allianz",
          "Photo": "KARYAVATTOM TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°33'55.2\"N 76°53'34.0\"E",
          "Latitude": "8.565333333333333",
          "Longitude": "76.89277777777778"
      },
      {
          "Name": "PERROOR",
          "Photo": "PERROOR",
          "Status": "Available",
          "Location coordinates": "8°33'49.9\"N 76°54'01.6\"E",
          "Latitude": "8.563861111111112",
          "Longitude": "76.90044444444445"
      },
      {
          "Name": "SUBHASH NAGAR",
          "Status": "Available",
          "Location coordinates": "8°34'58.6\"N 76°56'01.6\"E",
          "Latitude": "8.582944444444443",
          "Longitude": "76.93377777777778"
      },
      {
          "Name": "POWDIKONAM JN",
          "Client": "Travancore Gold",
          "Photo": "POWDIKONAM JN",
          "Status": "Occupied",
          "Location coordinates": "8°34'37.2\"N 76°55'31.6\"E",
          "Latitude": "8.577",
          "Longitude": "76.92544444444445"
      },
      {
          "Name": "PARACODE",
          "Photo": "PARACODE",
          "Status": "Available",
          "Location coordinates": "8°34'23.0\"N 76°54'53.5\"E",
          "Latitude": "8.573055555555555",
          "Longitude": "76.91486111111112"
      },
      {
          "Name": "KERALADITYAPURAM Jn",
          "Client": "Travancore Gold",
          "Photo": "KERALADITYAPURAM Jn",
          "Status": "Occupied",
          "Location coordinates": "8°33'48.5\"N 76°56'01.1\"E",
          "Latitude": "8.563472222222224",
          "Longitude": "76.9336388888889"
      },
      {
          "Name": "AYIROOPARA JN",
          "Client": "Travancore Gold",
          "Photo": "AYIROOPARA JN",
          "Status": "Occupied",
          "Location coordinates": "8°36'18.8\"N 76°54'47.6\"E",
          "Latitude": "8.605222222222222",
          "Longitude": "76.91322222222223"
      },
      {
          "Name": "NJANDOORKONAM",
          "Client": "Travancore Gold",
          "Status": "Occupied"
      },
      {
          "Name": "AASHRAMAM JN",
          "Photo": "AASHRAMAM JN",
          "Status": "Available",
          "Location coordinates": "8°35'08.2\"N 76°54'29.7\"E",
          "Latitude": "8.585611111111112",
          "Longitude": "76.90825000000001"
      },
      {
          "Name": "SHANTHIPURAM",
          "Client": "Travancore Gold",
          "Status": "Occupied",
          "Location coordinates": "8°35'46.5\"N 76°54'55.0\"E",
          "Latitude": "8.596250000000001",
          "Longitude": "76.91527777777779"
      },
      {
          "Name": "KURISADI - NALANCHIRA",
          "Client": "Allianz",
          "Photo": "KURISADI - NALANCHIRA",
          "Status": "Occupied",
          "Location coordinates": "8°32'42.2\"N 76°56'39.9\"E",
          "Latitude": "8.545055555555555",
          "Longitude": "76.94441666666667"
      },
      {
          "Name": "STEPS JUNCTION",
          "Client": "Travancore Gold",
          "Status": "Occupied",
          "Location coordinates": "8°32'53.9\"N 76°56'35.3\"E",
          "Latitude": "8.548305555555556",
          "Longitude": "76.9431388888889"
      },
      {
          "Name": "VELIKUNNU - AYURVEDA HOSP.",
          "Photo": "VELIKUNNU - AYURVEDA HOSP.",
          "Status": "Available",
          "Location coordinates": "8.535893,76.954272",
          "Latitude": 8.535893,
          "Longitude": 76.954272
      },
      {
          "Name": "NALANCHIRA CHURCH - PULIYOOR GARDENS",
          "Client": "Travancore Gold",
          "Status": "Occupied",
          "Location coordinates": "8°32'39.2\"N 76°56'33.1\"E",
          "Latitude": "8.544222222222222",
          "Longitude": "76.94252777777778"
      },
      {
          "Name": "MANNANTHALA JN",
          "Client": "Travancore Gold",
          "Photo": "MANNANTHALA JN",
          "Status": "Occupied",
          "Location coordinates": "8°33'37.8\"N 76°56'36.5\"E",
          "Latitude": "8.560500000000001",
          "Longitude": "76.94347222222223"
      },
      {
          "Name": "BENEDICT NAGAR",
          "Client": "Jayotsavam",
          "Photo": "BENEDICT NAGAR",
          "Status": "Occupied",
          "Location coordinates": "8°33'00.7\"N 76°56'31.2\"E",
          "Latitude": "8.550194444444445",
          "Longitude": "76.94200000000001"
      },
      {
          "Name": "MANNANTHALA PRESS",
          "Client": "Travancore Gold",
          "Photo": "MANNANTHALA PRESS",
          "Status": "Occupied",
          "Location coordinates": "8°34'04.9\"N 76°56'38.8\"E",
          "Latitude": "8.568027777777777",
          "Longitude": "76.94411111111111"
      },
      {
          "Name": "NALANCHIRA BSNL",
          "Client": "Bhima",
          "Photo": "NALANCHIRA BSNL",
          "Status": "Occupied",
          "Location coordinates": "8°32'27.6\"N 76°56'27.8\"E",
          "Latitude": "8.541",
          "Longitude": "76.94105555555556"
      },
      {
          "Name": "PAROTTUKONAM",
          "Photo": "PAROTTUKONAM",
          "Status": "Available",
          "Location coordinates": "8°32'17.3\"N 76°56'13.9\"E",
          "Latitude": "8.53813888888889",
          "Longitude": "76.93719444444444"
      },
      {
          "Name": "KESAVADASAPURAM MOSQUE",
          "Photo": "KESAVADASAPURAM MOSQUE",
          "Status": "Available",
          "Location coordinates": "8°31'47.6\"N 76°56'12.1\"E",
          "Latitude": "8.52988888888889",
          "Longitude": "76.93669444444444"
      },
      {
          "Name": "CHALAKKUZHI",
          "Client": "Bhima",
          "Photo": "CHALAKKUZHI",
          "Status": "Occupied",
          "Location coordinates": "8°31'23.0\"N 76°56'09.4\"E",
          "Latitude": "8.523055555555556",
          "Longitude": "76.93594444444444"
      },
      {
          "Name": "MUTTADA JUNCTION",
          "Photo": "MUTTADA JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°32'04.0\"N 76°56'59.0\"E",
          "Latitude": "8.534444444444444",
          "Longitude": "76.94972222222222"
      },
      {
          "Name": "PARUTHIPARA JN",
          "Photo": "PARUTHIPARA JN",
          "Status": "Available",
          "Location coordinates": "8°32'05.2\"N 76°56'33.2\"E",
          "Latitude": "8.534777777777778",
          "Longitude": "76.94255555555556"
      },
      {
          "Name": "M.G.COLLEGE",
          "Client": "Allianz",
          "Photo": "M.G.COLLEGE",
          "Status": "Occupied",
          "Location coordinates": "8°31'55.0\"N 76°56'24.9\"E",
          "Latitude": "8.531944444444445",
          "Longitude": "76.94025"
      },
      {
          "Name": "MARAPPALAM",
          "Client": "Travancore Gold",
          "Status": "Occupied",
          "Location coordinates": "8°31'11.1\"N 76°56'41.1\"E",
          "Latitude": "8.51975",
          "Longitude": "76.94475"
      },
      {
          "Name": "KUMARAPURAM JUNCTION",
          "Client": "Allianz",
          "Photo": "KUMARAPURAM JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°30'50.5\"N 76°55'39.3\"E",
          "Latitude": "8.514027777777779",
          "Longitude": "76.92758333333333"
      },
      {
          "Name": "ULLOOR ELANKAAVU TEMPLE",
          "Photo": "ULLOOR ELANKAAVU TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°31'37.6\"N 76°55'41.5\"E",
          "Latitude": "8.527111111111111",
          "Longitude": "76.92819444444444"
      },
      {
          "Name": "MURINJAPALAM JN",
          "Photo": "MURINJAPALAM JN",
          "Status": "Available",
          "Location coordinates": "8°30'56.9\"N 76°56'02.9\"E",
          "Latitude": "8.515805555555556",
          "Longitude": "76.9341388888889"
      },
      {
          "Name": "KOYIKKAL LANE",
          "Photo": "KOYIKKAL LANE",
          "Status": "Available",
          "Location coordinates": "8°30'28.8\"N 76°55'47.6\"E",
          "Latitude": "8.508",
          "Longitude": "76.9298888888889"
      },
      {
          "Name": "MEDICAL COLLEGE",
          "Client": "Physiotherapy",
          "Photo": "MEDICAL COLLEGE",
          "Status": "Occupied",
          "Location coordinates": "8°31'20.2\"N 76°55'47.0\"E",
          "Latitude": "8.522277777777779",
          "Longitude": "76.92972222222222"
      },
      {
          "Name": "POTTAKKUZHI",
          "Photo": "POTTAKKUZHI",
          "Status": "Available",
          "Location coordinates": "8°30'55.6\"N 76°56'14.6\"E",
          "Latitude": "8.515444444444444",
          "Longitude": "76.93738888888889"
      },
      {
          "Name": "PATTOM",
          "Photo": "PATTOM",
          "Status": "Available",
          "Location coordinates": "8°31'05.9\"N 76°56'30.2\"E",
          "Latitude": "8.518305555555557",
          "Longitude": "76.94172222222223"
      },
      {
          "Name": "GOUREESHA PATTOM",
          "Photo": "GOUREESHA PATTOM",
          "Status": "Available",
          "Location coordinates": "8°30'40.9\"N 76°56'16.4\"E",
          "Latitude": "8.51136111111111",
          "Longitude": "76.93788888888889"
      },
      {
          "Name": "ALAPURAM SWIMMING CLUB",
          "Photo": "ALAPURAM SWIMMING CLUB",
          "Status": "Available",
          "Location coordinates": "8°31'59.7\"N 76°57'06.1\"E",
          "Latitude": "8.53325",
          "Longitude": "76.95169444444444"
      },
      {
          "Name": "PATTOM THANUPILLA JN",
          "Client": "Bhima",
          "Photo": "PATTOM THANUPILLA JN",
          "Status": "Occupied",
          "Location coordinates": "8°31'13.6\"N 76°56'46.5\"E",
          "Latitude": "8.520444444444445",
          "Longitude": "76.94625"
      },
      {
          "Name": "KURAVANKONAM JUNCTION",
          "Client": "Alive",
          "Photo": "KURAVANKONAM JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°31'24.3\"N 76°57'11.4\"E",
          "Latitude": "8.523416666666668",
          "Longitude": "76.95316666666668"
      },
      {
          "Name": "KURAVANKONAM FORD",
          "Client": "Travancore Gold",
          "Status": "Occupied"
      },
      {
          "Name": "AKG NAGAR",
          "Photo": "AKG NAGAR",
          "Status": "Available",
          "Location coordinates": "8°32'24.0\"N 76°57'59.1\"E",
          "Latitude": "8.54",
          "Longitude": "76.96641666666667"
      },
      {
          "Name": "KUDAPPANAKKUNNU SCHOOL",
          "Client": "Travancore Gold",
          "Photo": "KUDAPPANAKKUNNU SCHOOL",
          "Status": "Occupied",
          "Location coordinates": "8°32'58.9\"N 76°57'47.5\"E",
          "Latitude": "8.549694444444444",
          "Longitude": "76.96319444444445"
      },
      {
          "Name": "CIVIL STATION",
          "Client": "Allianz",
          "Photo": "CIVIL STATION",
          "Status": "Occupied",
          "Location coordinates": "8°32'58.9\"N 76°57'47.5\"E",
          "Latitude": "8.549694444444444",
          "Longitude": "76.96319444444445"
      },
      {
          "Name": "MARIYA NAGAR",
          "Photo": "MARIYA NAGAR",
          "Status": "Available",
          "Location coordinates": "8°33'30.0\"N 76°57'37.7\"E",
          "Latitude": "8.558333333333334",
          "Longitude": "76.96047222222222"
      },
      {
          "Name": "MUKKOLA - ST THOMAS",
          "Client": "Allianz",
          "Photo": "MUKKOLA - ST THOMAS",
          "Status": "Occupied",
          "Location coordinates": "8°33'49.7\"N 76°57'09.9\"E",
          "Latitude": "8.563805555555556",
          "Longitude": "76.95275000000001"
      },
      {
          "Name": "MADATHUNADA",
          "Photo": "MADATHUNADA",
          "Status": "Available",
          "Location coordinates": "8°32'55.2\"N 76°57'00.5\"E",
          "Latitude": "8.548666666666666",
          "Longitude": "76.95013888888889"
      },
      {
          "Name": "UDIYANNOOR TEMPLE",
          "Client": "Travancore Gold",
          "Photo": "UDIYANNOOR TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°33'01.7\"N 76°56'42.1\"E",
          "Latitude": "8.550472222222224",
          "Longitude": "76.94502777777778"
      },
      {
          "Name": "KIZHAKKE MUKKOLA",
          "Photo": "KIZHAKKE MUKKOLA",
          "Status": "Available",
          "Location coordinates": "8°33'40.8\"N 76°57'23.9\"E",
          "Latitude": "8.561333333333334",
          "Longitude": "76.95663888888889"
      },
      {
          "Name": "NCC NAGAR",
          "Client": "Travancore Gold",
          "Photo": "NCC NAGAR",
          "Status": "Occupied",
          "Location coordinates": "8°32'26.5\"N 76°57'43.9\"E",
          "Latitude": "8.540694444444444",
          "Longitude": "76.96219444444445"
      },
      {
          "Name": "CHOOZHAMPALA",
          "Client": "Bhima",
          "Photo": "CHOOZHAMPALA",
          "Status": "Occupied",
          "Location coordinates": "8°32'23.6\"N 76°57'08.9\"E",
          "Latitude": "8.539888888888889",
          "Longitude": "76.95247222222223"
      },
      {
          "Name": "KUDAPANAKUNNU JN",
          "Photo": "KUDAPANAKUNNU JN",
          "Status": "Available",
          "Location coordinates": "8°33'00.3\"N 76°57'39.0\"E",
          "Latitude": "8.550083333333333",
          "Longitude": "76.96083333333334"
      },
      {
          "Name": "PIPENMOOD",
          "Client": "Precise",
          "Photo": "PIPENMOOD",
          "Status": "Occupied",
          "Location coordinates": "8°31'07.4\"N 76°58'20.1\"E",
          "Latitude": "8.518722222222223",
          "Longitude": "76.97225"
      },
      {
          "Name": "SASTHAMANGALAM",
          "Photo": "SASTHAMANGALAM",
          "Status": "Available",
          "Location coordinates": "8°30'47.2\"N 76°58'17.4\"E",
          "Latitude": "8.513111111111112",
          "Longitude": "76.9715"
      },
      {
          "Name": "OPP ALAKAPURI AUDITORIUM",
          "Client": "Bhima",
          "Photo": "OPP ALAKAPURI AUDITORIUM",
          "Status": "Occupied",
          "Location coordinates": "8°30'20.1\"N 76°58'10.5\"E",
          "Latitude": "8.505583333333334",
          "Longitude": "76.96958333333333"
      },
      {
          "Name": "OPP. PANIKER'S LANE",
          "Client": "Bhima",
          "Photo": "OPP. PANIKER'S LANE",
          "Status": "Occupied",
          "Location coordinates": "8°30'41.7\"N 76°58'03.1\"E",
          "Latitude": "8.511583333333334",
          "Longitude": "76.96752777777778"
      },
      {
          "Name": "AMBALAMMUKKU TEMPLE",
          "Client": "Travancore Gold",
          "Photo": "AMBALAMMUKKU TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°31'50.0\"N 76°57'49.5\"E",
          "Latitude": "8.530555555555557",
          "Longitude": "76.96375"
      },
      {
          "Name": "SWATHI NAGAR",
          "Photo": "SWATHI NAGAR",
          "Status": "Available",
          "Location coordinates": "8°31'15.7\"N 76°58'17.9\"E",
          "Latitude": "8.521027777777778",
          "Longitude": "76.97163888888889"
      },
      {
          "Name": "GOLF LINKS",
          "Photo": "GOLF LINKS",
          "Status": "Available",
          "Location coordinates": "8°31'14.0\"N 76°57'38.9\"E",
          "Latitude": "8.520555555555557",
          "Longitude": "76.96080555555555"
      },
      {
          "Name": "GOLF LINKS-2",
          "Client": "Allianz",
          "Photo": "GOLF LINKS-2",
          "Status": "Occupied",
          "Location coordinates": "8°31'19.4\"N 76°57'54.0\"E",
          "Latitude": "8.522055555555557",
          "Longitude": "76.965"
      },
      {
          "Name": "JAWAHAR NAGAR",
          "Photo": "JAWAHAR NAGAR",
          "Status": "Available",
          "Location coordinates": "8°31'02.0\"N 76°57'41.9\"E",
          "Latitude": "8.517222222222223",
          "Longitude": "76.96163888888888"
      },
      {
          "Name": "JAWAHAR NAGAR 2",
          "Client": "Precise",
          "Photo": "JAWAHAR NAGAR 2",
          "Status": "Occupied",
          "Location coordinates": "8°31'00.1\"N 76°58'09.5\"E",
          "Latitude": "8.516694444444445",
          "Longitude": "76.96930555555556"
      },
      {
          "Name": "KOWDIAR JN",
          "Photo": "KOWDIAR JN",
          "Status": "Available",
          "Location coordinates": "8°31'21.4\"N 76°57'37.7\"E",
          "Latitude": "8.522611111111113",
          "Longitude": "76.96047222222222"
      },
      {
          "Name": "OPP. TTC",
          "Client": "Alive",
          "Photo": "OPP. TTC",
          "Status": "Occupied",
          "Location coordinates": "8°31'09.4\"N 76°57'37.9\"E",
          "Latitude": "8.519277777777779",
          "Longitude": "76.96052777777778"
      },
      {
          "Name": "YMR",
          "Client": "Alive",
          "Photo": "YMR",
          "Status": "Occupied",
          "Location coordinates": "8°31'12.5\"N 76°57'05.6\"E",
          "Latitude": "8.520138888888889",
          "Longitude": "76.95155555555556"
      },
      {
          "Name": "AMBALA NAGAR",
          "Photo": "AMBALA NAGAR",
          "Status": "Available",
          "Location coordinates": "8°31'12.5\"N 76°57'05.6\"E",
          "Latitude": "8.520138888888889",
          "Longitude": "76.95155555555556"
      },
      {
          "Name": "IAS ACADEMY(CHARACHIRA)",
          "Client": "Allianz",
          "Photo": "IAS ACADEMY(CHARACHIRA)",
          "Status": "Occupied",
          "Location coordinates": "8°31'01.0\"N 76°56'56.0\"E",
          "Latitude": "8.516944444444444",
          "Longitude": "76.94888888888889"
      },
      {
          "Name": "NANTHANCODE JUNCTION",
          "Status": "Available"
      },
      {
          "Name": "DEVASAM BOARD",
          "Photo": "DEVASAM BOARD",
          "Status": "Available",
          "Location coordinates": "8°31'03.4\"N 76°57'25.2\"E",
          "Latitude": "8.517611111111112",
          "Longitude": "76.95700000000001"
      },
      {
          "Name": "PLAMOOD",
          "Photo": "PLAMOOD",
          "Status": "Available",
          "Location coordinates": "8°30'49.8\"N 76°56'48.0\"E",
          "Latitude": "8.513833333333332",
          "Longitude": "76.94666666666667"
      },
      {
          "Name": "NANTHANCODE 2",
          "Status": "Available"
      },
      {
          "Name": "KUNNUKUZHI",
          "Photo": "KUNNUKUZHI",
          "Status": "Available",
          "Location coordinates": "8°30'14.5\"N 76°56'42.0\"E",
          "Latitude": "8.504027777777777",
          "Longitude": "76.94500000000001"
      },
      {
          "Name": "LAW COLLEGE JUNCTION",
          "Client": "Allianz",
          "Photo": "LAW COLLEGE JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°30'31.6\"N 76°56'41.3\"E",
          "Latitude": "8.508777777777778",
          "Longitude": "76.94480555555556"
      },
      {
          "Name": "MULAVANA",
          "Photo": "MULAVANA",
          "Status": "Available",
          "Location coordinates": "8°30'24.6\"N 76°56'20.4\"E",
          "Latitude": "8.506833333333333",
          "Longitude": "76.93900000000001"
      },
      {
          "Name": "PMG",
          "Client": "Allianz",
          "Photo": "PMG",
          "Status": "Occupied",
          "Location coordinates": "8°30'33.9\"N 76°56'56.3\"E",
          "Latitude": "8.509416666666667",
          "Longitude": "76.94897222222222"
      },
      {
          "Name": "PANJAPPURA",
          "Photo": "PANJAPPURA",
          "Status": "Available",
          "Location coordinates": "8°30'13.7\"N 76°57'09.0\"E",
          "Latitude": "8.503805555555555",
          "Longitude": "76.9525"
      },
      {
          "Name": "CONNIMERA MARKET",
          "Client": "Travancore Gold",
          "Photo": "CONNIMERA MARKET",
          "Status": "Occupied",
          "Location coordinates": "8°30'11.2\"N 76°57'02.7\"E",
          "Latitude": "8.503111111111112",
          "Longitude": "76.95075"
      },
      {
          "Name": "MUSEUM (NGO QUARTERS)",
          "Photo": "MUSEUM (NGO QUARTERS)",
          "Status": "Available",
          "Location coordinates": "8°30'27.0\"N 76°57'23.0\"E",
          "Latitude": "8.5075",
          "Longitude": "76.9563888888889"
      },
      {
          "Name": "AKG CENTRE",
          "Client": "Allianz",
          "Photo": "AKG CENTRE",
          "Status": "Occupied",
          "Location coordinates": "8°30'04.3\"N 76°56'50.5\"E",
          "Latitude": "8.501194444444444",
          "Longitude": "76.94736111111112"
      },
      {
          "Name": "LEGISLATIVE COMPLEX",
          "Photo": "LEGISLATIVE COMPLEX",
          "Status": "Available",
          "Location coordinates": "8°30'23.9\"N 76°57'02.9\"E",
          "Latitude": "8.506638888888888",
          "Longitude": "76.95080555555556"
      },
      {
          "Name": "METUKADA",
          "Photo": "METUKADA",
          "Status": "Available",
          "Location coordinates": "8°29'24.0\"N 76°57'28.1\"E",
          "Latitude": "8.489999999999998",
          "Longitude": "76.95780555555555"
      },
      {
          "Name": "KANNATTUMUKKU MARKET",
          "Photo": "KANNATTUMUKKU MARKET",
          "Status": "Available",
          "Location coordinates": "8°29'23.6\"N 76°57'40.3\"E",
          "Latitude": "8.489888888888888",
          "Longitude": "76.96119444444444"
      },
      {
          "Name": "METUKADA D.C.OFFICE",
          "Photo": "METUKADA D.C.OFFICE",
          "Status": "Available",
          "Location coordinates": "8°29'20.2\"N 76°57'31.5\"E",
          "Latitude": "8.488944444444444",
          "Longitude": "76.95875000000001"
      },
      {
          "Name": "SASTHA TEMPLE",
          "Client": "Allianz",
          "Photo": "SASTHA TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°29'40.8\"N 76°57'20.7\"E",
          "Latitude": "8.494666666666665",
          "Longitude": "76.95575000000001"
      },
      {
          "Name": "AALTHARA",
          "Photo": "AALTHARA",
          "Status": "Available",
          "Location coordinates": "8°30'31.3\"N 76°57'46.1\"E",
          "Latitude": "8.508694444444444",
          "Longitude": "76.96280555555556"
      },
      {
          "Name": "VAZHUTHACAUD JUNCTION",
          "Client": "Precise",
          "Photo": "VAZHUTHACAUD JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°30'02.2\"N 76°57'33.9\"E",
          "Latitude": "8.50061111111111",
          "Longitude": "76.95941666666667"
      },
      {
          "Name": "OOTTUKUZHI",
          "Photo": "OOTTUKUZHI",
          "Status": "Available",
          "Location coordinates": "8°29'47.5\"N 76°57'10.4\"E",
          "Latitude": "8.496527777777777",
          "Longitude": "76.95288888888889"
      },
      {
          "Name": "BAKERY JUNCTION",
          "Client": "IME",
          "Photo": "BAKERY JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°30'02.2\"N 76°57'16.0\"E",
          "Latitude": "8.50061111111111",
          "Longitude": "76.95444444444445"
      },
      {
          "Name": "CSM NAGAR",
          "Photo": "CSM NAGAR",
          "Status": "Available",
          "Location coordinates": "8°30'14.6\"N 76°58'02.4\"E",
          "Latitude": "8.504055555555556",
          "Longitude": "76.96733333333333"
      },
      {
          "Name": "PUNNAN ROAD",
          "Photo": "PUNNAN ROAD",
          "Status": "Available",
          "Location coordinates": "8°30'01.2\"N 76°57'01.9\"E",
          "Latitude": "8.500333333333334",
          "Longitude": "76.95052777777778"
      },
      {
          "Name": "POLICE HEADQUARTERS",
          "Client": "KS Realtors",
          "Status": "Occupied",
          "Location coordinates": "8°30'25.2\"N 76°57'43.2\"E",
          "Latitude": "8.507",
          "Longitude": "76.962"
      },
      {
          "Name": "MARUTHANKUZHI",
          "Photo": "MARUTHANKUZHI",
          "Status": "Available",
          "Location coordinates": "8°30'50.6\"N 76°58'37.9\"E",
          "Latitude": "8.514055555555556",
          "Longitude": "76.97719444444445"
      },
      {
          "Name": "KANJIRAMPARA",
          "Photo": "KANJIRAMPARA",
          "Status": "Available",
          "Location coordinates": "8°31'09.7\"N 76°58'45.1\"E",
          "Latitude": "8.519361111111111",
          "Longitude": "76.97919444444445"
      },
      {
          "Name": "KANJIRAMPARA JN",
          "Photo": "KANJIRAMPARA JN",
          "Status": "Available",
          "Location coordinates": "8°31'16.7\"N 76°58'46.3\"E",
          "Latitude": "8.521305555555557",
          "Longitude": "76.97952777777778"
      },
      {
          "Name": "PEROORKADA SBI",
          "Client": "Allianz",
          "Photo": "PEROORKADA SBI",
          "Status": "Occupied",
          "Location coordinates": "8°32'13.0\"N 76°57'54.0\"E",
          "Latitude": "8.536944444444444",
          "Longitude": "76.965"
      },
      {
          "Name": "AMBALAMUKKU",
          "Photo": "AMBALAMUKKU",
          "Status": "Available",
          "Location coordinates": "8°29'37.6\"N 76°56'10.6\"E",
          "Latitude": "8.493777777777776",
          "Longitude": "76.93627777777778"
      },
      {
          "Name": "OOLANPARA",
          "Photo": "OOLANPARA",
          "Status": "Available",
          "Location coordinates": "8°31'50.4\"N 76°58'00.6\"E",
          "Latitude": "8.530666666666667",
          "Longitude": "76.96683333333334"
      },
      {
          "Name": "MANNAMMOOLA",
          "Photo": "MANNAMMOOLA",
          "Status": "Available",
          "Location coordinates": "8°31'51.5\"N 76°58'36.7\"E",
          "Latitude": "8.530972222222223",
          "Longitude": "76.97686111111112"
      },
      {
          "Name": "VAZHAYILA PALAM JN",
          "Client": "Precise",
          "Photo": "VAZHAYILA PALAM JN",
          "Status": "Occupied",
          "Location coordinates": "8°32'49.9\"N 76°58'26.5\"E",
          "Latitude": "8.547194444444445",
          "Longitude": "76.97402777777778"
      },
      {
          "Name": "VETTIKONAM SCHOOL",
          "Photo": "VETTIKONAM SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°32'46.3\"N 76°58'56.6\"E",
          "Latitude": "8.546194444444444",
          "Longitude": "76.98238888888889"
      },
      {
          "Name": "MANIKANTESWARAM",
          "Client": "Ashraya Medicals",
          "Photo": "MANIKANTESWARAM",
          "Status": "Occupied",
          "Location coordinates": "8°32'11.4\"N 76°58'32.9\"E",
          "Latitude": "8.5365",
          "Longitude": "76.97580555555555"
      },
      {
          "Name": "MUKKOLA JN.",
          "Photo": "MUKKOLA JN.",
          "Status": "Available",
          "Location coordinates": "8°32'49.9\"N 76°59'13.3\"E",
          "Latitude": "8.547194444444445",
          "Longitude": "76.98702777777778"
      },
      {
          "Name": "NETTAYAM ZONAL OFFICE",
          "Photo": "NETTAYAM ZONAL OFFICE",
          "Status": "Available",
          "Location coordinates": "8°32'28.2\"N 76°59'22.0\"E",
          "Latitude": "8.541166666666667",
          "Longitude": "76.98944444444444"
      },
      {
          "Name": "CHEENIKONAM",
          "Photo": "CHEENIKONAM",
          "Status": "Available",
          "Location coordinates": "8°32'19.5\"N 76°59'03.3\"E",
          "Latitude": "8.53875",
          "Longitude": "76.98425"
      },
      {
          "Name": "MELATHUMELE",
          "Photo": "MELATHUMELE",
          "Status": "Available",
          "Location coordinates": "8°32'01.0\"N 76°59'04.8\"E",
          "Latitude": "8.53361111111111",
          "Longitude": "76.98466666666667"
      },
      {
          "Name": "VELLAIKADAVU",
          "Photo": "VELLAIKADAVU",
          "Status": "Available",
          "Location coordinates": "8°31'56.1\"N 77°00'37.7\"E",
          "Latitude": "8.532250000000001",
          "Longitude": "77.01047222222222"
      },
      {
          "Name": "MOONNAMMOODU",
          "Photo": "MOONNAMMOODU",
          "Status": "Available",
          "Location coordinates": "8°32'09.4\"N 77°00'08.1\"E",
          "Latitude": "8.535944444444445",
          "Longitude": "77.00225"
      },
      {
          "Name": "VAYALIKADA",
          "Photo": "VAYALIKADA",
          "Status": "Available",
          "Location coordinates": "8°31'59.0\"N 77°00'02.0\"E",
          "Latitude": "8.533055555555556",
          "Longitude": "77.00055555555555"
      },
      {
          "Name": "VAZHOTTUKONAM",
          "Photo": "VAZHOTTUKONAM",
          "Status": "Available",
          "Location coordinates": "8°31'45.3\"N 76°59'49.6\"E",
          "Latitude": "8.529250000000001",
          "Longitude": "76.99711111111111"
      },
      {
          "Name": "VATTYOORKAVU POLICE STATION",
          "Client": "Bhima",
          "Photo": "VATTYOORKAVU POLICE STATION",
          "Status": "Occupied",
          "Location coordinates": "8°31'27.2\"N 76°59'18.9\"E",
          "Latitude": "8.524222222222223",
          "Longitude": "76.98858333333334"
      },
      {
          "Name": "MANNARAKONAM JUNCTION",
          "Photo": "MANNARAKONAM JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°31'43.9\"N 76°59'23.9\"E",
          "Latitude": "8.528861111111112",
          "Longitude": "76.98997222222222"
      },
      {
          "Name": "MELATHUMELE",
          "Photo": "MELATHUMELE",
          "Status": "Available",
          "Location coordinates": "8°32'00.8\"N 76°59'09.9\"E",
          "Latitude": "8.533555555555555",
          "Longitude": "76.98608333333334"
      },
      {
          "Name": "THOPPUMUKKU",
          "Client": "Precise",
          "Photo": "THOPPUMUKKU",
          "Status": "Occupied",
          "Location coordinates": "8°31'32.6\"N 76°59'32.5\"E",
          "Latitude": "8.525722222222223",
          "Longitude": "76.99236111111111"
      },
      {
          "Name": "KODUNGANOOR JUNCTION",
          "Photo": "KODUNGANOOR JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°31'26.7\"N 76°59'59.4\"E",
          "Latitude": "8.524083333333333",
          "Longitude": "76.99983333333333"
      },
      {
          "Name": "KULASEKHARAM",
          "Photo": "KULASEKHARAM",
          "Status": "Available",
          "Location coordinates": "8°31'28.4\"N 77°00'34.1\"E",
          "Latitude": "8.524555555555557",
          "Longitude": "77.00947222222223"
      },
      {
          "Name": "PLAVOD",
          "Photo": "PLAVOD",
          "Status": "Available",
          "Location coordinates": "8°31'10.0\"N 77°00'17.7\"E",
          "Latitude": "8.519444444444446",
          "Longitude": "77.00491666666667"
      },
      {
          "Name": "KURUVIKAD",
          "Photo": "KURUVIKAD",
          "Status": "Available",
          "Location coordinates": "8°31'15.2\"N 76°59'51.7\"E",
          "Latitude": "8.520888888888889",
          "Longitude": "76.99769444444445"
      },
      {
          "Name": "FOREST ROAD ENTRANCE",
          "Photo": "FOREST ROAD ENTRANCE",
          "Status": "Available",
          "Location coordinates": "8°30'49.8\"N 76°58'45.0\"E",
          "Latitude": "8.513833333333332",
          "Longitude": "76.97916666666667"
      },
      {
          "Name": "UDHIYANNOOR TEMPLE",
          "Photo": "UDIYANNOOR TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°30'46.6\"N 76°58'41.7\"E",
          "Latitude": "8.512944444444445",
          "Longitude": "76.97825"
      },
      {
          "Name": "OPP. BEACON FLAT",
          "Photo": "OPP. BEACON FLAT",
          "Status": "Available",
          "Location coordinates": "8°31'12.5\"N 76°58'46.4\"E",
          "Latitude": "8.520138888888889",
          "Longitude": "76.97955555555556"
      },
      {
          "Name": "SARASWATHY VIDYALAYA",
          "Client": "Allianz",
          "Photo": "SARASWATHY VIDYALAYA",
          "Status": "Occupied",
          "Location coordinates": "8°31'04.6\"N 76°59'13.5\"E",
          "Latitude": "8.517944444444446",
          "Longitude": "76.98708333333333"
      },
      {
          "Name": "VETTAMUKKU BANK OF INDIA",
          "Client": "Bhima",
          "Photo": "VETTAMUKKU BANK OF INDIA",
          "Status": "Occupied",
          "Location coordinates": "8°30'36.6\"N 76°59'11.5\"E",
          "Latitude": "8.510166666666667",
          "Longitude": "76.98652777777778"
      },
      {
          "Name": "KATTACHAL",
          "Photo": "KATTACHAL",
          "Status": "Available",
          "Location coordinates": "8°30'23.9\"N 76°59'16.4\"E",
          "Latitude": "8.506638888888888",
          "Longitude": "76.98788888888889"
      },
      {
          "Name": "THIRUMALA MILITARY CAMP",
          "Client": "Precise",
          "Photo": "THIRUMALA MILITARY CAMP",
          "Status": "Occupied",
          "Location coordinates": "8°30'10.3\"N 76°59'20.4\"E",
          "Latitude": "8.50286111111111",
          "Longitude": "76.989"
      },
      {
          "Name": "SREE CHITHRA NAGAR",
          "Photo": "SREE CHITHRA NAGAR",
          "Status": "Available",
          "Location coordinates": "8°30'19.1\"N 76°58'20.7\"E",
          "Latitude": "8.505305555555555",
          "Longitude": "76.97241666666667"
      },
      {
          "Name": "THIRUMALA NEAR SBI",
          "Client": "Precise",
          "Photo": "THIRUMALA NEAR SBI",
          "Status": "Occupied",
          "Location coordinates": "8°30'05.7\"N 76°59'28.8\"E",
          "Latitude": "8.501583333333333",
          "Longitude": "76.99133333333333"
      },
      {
          "Name": "THIRUMALA ARAYALLOOR",
          "Status": "Available",
          "Location coordinates": "8°30'22.3\"N 76°59'40.2\"E",
          "Latitude": "8.506194444444445",
          "Longitude": "76.9945"
      },
      {
          "Name": "PUTHENKADA",
          "Photo": "PUTHENKADA",
          "Status": "Available",
          "Location coordinates": "8°30'00.5\"N 76°59'38.8\"E",
          "Latitude": "8.50013888888889",
          "Longitude": "76.99411111111111"
      },
      {
          "Name": "VALIYAVILA",
          "Photo": "VALIYAVILA",
          "Status": "Available",
          "Location coordinates": "8°30'25.1\"N 76°59'55.3\"E",
          "Latitude": "8.506972222222222",
          "Longitude": "76.99869444444444"
      },
      {
          "Name": "ILIPOD",
          "Photo": "ILIPOD",
          "Status": "Available",
          "Location coordinates": "8°30'33.7\"N 76°59'40.8\"E",
          "Latitude": "8.509361111111112",
          "Longitude": "76.99466666666667"
      },
      {
          "Name": "KUNDAMAN BHAGAM",
          "Client": "Precise",
          "Photo": "KUNDAMAN BHAGAM",
          "Status": "Occupied",
          "Location coordinates": "8°30'28.3\"N 77°00'07.7\"E",
          "Latitude": "8.507861111111112",
          "Longitude": "77.0021388888889"
      },
      {
          "Name": "KUNNANPARA",
          "Status": "Available",
          "Location coordinates": "8°30'55.8\"N 77°00'03.4\"E",
          "Latitude": "8.5155",
          "Longitude": "77.00094444444444"
      },
      {
          "Name": "NEAR POOJAPPURA ISLAND",
          "Client": "Precise",
          "Photo": "NEAR POOJAPPURA ISLAND",
          "Status": "Occupied",
          "Location coordinates": "8°29'25.7\"N 76°58'23.5\"E",
          "Latitude": "8.490472222222222",
          "Longitude": "76.97319444444445"
      },
      {
          "Name": "CHERUKARA",
          "Photo": "CHERUKARA",
          "Status": "Available",
          "Location coordinates": "8°29'51.5\"N 76°58'57.6\"E",
          "Latitude": "8.497638888888888",
          "Longitude": "76.98266666666667"
      },
      {
          "Name": "VIVEKANANDA NAGAR - SK HOSPITAL",
          "Photo": "VIVEKANANDA NAGAR - SK HOSPITAL",
          "Status": "Available",
          "Location coordinates": "8°30'16.6\"N 76°58'13.3\"E",
          "Latitude": "8.50461111111111",
          "Longitude": "76.97036111111112"
      },
      {
          "Name": "POOJAPPURA MARKET JUNCTION",
          "Photo": "POOJAPPURA MARKET JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°29'30.6\"N 76°58'34.6\"E",
          "Latitude": "8.491833333333332",
          "Longitude": "76.97627777777778"
      },
      {
          "Name": "CHENTHITTA",
          "Status": "Available",
          "Location coordinates": "8°29'00.9\"N 76°57'26.7\"E",
          "Latitude": "8.483583333333332",
          "Longitude": "76.95741666666667"
      },
      {
          "Name": "GRAMOM",
          "Photo": "GRAMOM",
          "Status": "Available",
          "Location coordinates": "8°29'07.0\"N 76°57'32.9\"E",
          "Latitude": "8.485277777777776",
          "Longitude": "76.95913888888889"
      },
      {
          "Name": "PUTHENKOTTA",
          "Photo": "PUTHENKOTTA",
          "Status": "Available",
          "Location coordinates": "8°28'43.2\"N 76°57'18.6\"E",
          "Latitude": "8.478666666666667",
          "Longitude": "76.95516666666667"
      },
      {
          "Name": "AZAD BAKERY",
          "Client": "Precise",
          "Photo": "AZAD BAKERY",
          "Status": "Occupied",
          "Location coordinates": "8°30'07.8\"N 76°57'51.0\"E",
          "Latitude": "8.502166666666668",
          "Longitude": "76.96416666666667"
      },
      {
          "Name": "EDAPAZHINJI",
          "Client": "Allianz",
          "Photo": "EDAPAZHINJI",
          "Status": "Occupied",
          "Location coordinates": "8°30'16.4\"N 76°58'08.8\"E",
          "Latitude": "8.504555555555555",
          "Longitude": "76.96911111111112"
      },
      {
          "Name": "JAGATHY BRIDGE",
          "Client": "IME",
          "Photo": "JAGATHY BRIDGE",
          "Status": "Occupied",
          "Location coordinates": "8°29'39.2\"N 76°57'57.6\"E",
          "Latitude": "8.494222222222222",
          "Longitude": "76.96600000000001"
      },
      {
          "Name": "DPI",
          "Photo": "DPI",
          "Status": "Available",
          "Location coordinates": "8°29'44.7\"N 76°57'45.0\"E",
          "Latitude": "8.49575",
          "Longitude": "76.9625"
      },
      {
          "Name": "ANANTHAPURI AUDITORIUM",
          "Client": "Bhima",
          "Photo": "ANANTHAPURI AUDITORIUM",
          "Status": "Occupied",
          "Location coordinates": "8°29'37.7\"N 76°57'48.5\"E",
          "Latitude": "8.493805555555555",
          "Longitude": "76.96347222222222"
      },
      {
          "Name": "KOCHAR ROAD",
          "Photo": "KOCHAR ROAD",
          "Status": "Available",
          "Location coordinates": "8°29'14.8\"N 76°57'40.2\"E",
          "Latitude": "8.487444444444444",
          "Longitude": "76.96116666666667"
      },
      {
          "Name": "ILANKAM",
          "Photo": "ILANKAM",
          "Status": "Available",
          "Location coordinates": "8°28'45.5\"N 76°57'55.4\"E",
          "Latitude": "8.479305555555555",
          "Longitude": "76.9653888888889"
      },
      {
          "Name": "THALIYAL",
          "Photo": "THALIYAL",
          "Status": "Available",
          "Location coordinates": "8°28'40.3\"N 76°58'03.4\"E",
          "Latitude": "8.47786111111111",
          "Longitude": "76.96761111111111"
      },
      {
          "Name": "AMBEDKAR COLONY",
          "Photo": "AMBEDKAR COLONY",
          "Status": "Available",
          "Location coordinates": "8°29'02.0\"N 76°58'27.8\"E",
          "Latitude": "8.483888888888888",
          "Longitude": "76.9743888888889"
      },
      {
          "Name": "CHULLAMUKKU",
          "Photo": "CHULLAMUKKU",
          "Status": "Available",
          "Location coordinates": "8°28'31.2\"N 76°58'55.3\"E",
          "Latitude": "8.475333333333333",
          "Longitude": "76.98202777777777"
      },
      {
          "Name": "KARAMANA P.S.ROAD",
          "Photo": "KARAMANA P.S.ROAD",
          "Status": "Available",
          "Location coordinates": "8°28'53.1\"N 76°58'06.4\"E",
          "Latitude": "8.481416666666666",
          "Longitude": "76.96844444444444"
      },
      {
          "Name": "MELARANNOOR RAILWAY GATE",
          "Photo": "MELARANNOOR RAILWAY GATE",
          "Status": "Available",
          "Location coordinates": "8°29'06.9\"N 76°57'58.2\"E",
          "Latitude": "8.485249999999999",
          "Longitude": "76.96616666666667"
      },
      {
          "Name": "CIT ROAD NEAR NSS OFFICE",
          "Photo": "CIT ROAD NEAR NSS OFFICE",
          "Status": "Available",
          "Location coordinates": "8°29'16.0\"N 76°57'48.9\"E",
          "Latitude": "8.487777777777778",
          "Longitude": "76.96358333333333"
      },
      {
          "Name": "NEDUMKAD - JUDGE ROAD",
          "Photo": "NEDUMKAD - JUDGE ROAD",
          "Status": "Available",
          "Location coordinates": "8°28'43.1\"N 76°57'47.0\"E",
          "Latitude": "8.47863888888889",
          "Longitude": "76.96305555555556"
      },
      {
          "Name": "MUDAVANMUGHAL JN.",
          "Photo": "MUDAVANMUGHAL JN.",
          "Status": "Available",
          "Location coordinates": "8°29'11.3\"N 76°59'02.9\"E",
          "Latitude": "8.486472222222222",
          "Longitude": "76.98413888888889"
      },
      {
          "Name": "THRIVIKRAMANGALAM TEMPLE",
          "Photo": "THRIVIKRAMANGALAM TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°28'44.0\"N 76°58'58.7\"E",
          "Latitude": "8.47888888888889",
          "Longitude": "76.98297222222223"
      },
      {
          "Name": "KUNNAPUZHA",
          "Photo": "KUNNAPUZHA",
          "Status": "Available",
          "Location coordinates": "8°29'19.9\"N 76°59'53.3\"E",
          "Latitude": "8.48886111111111",
          "Longitude": "76.99813888888889"
      },
      {
          "Name": "PLAVILA",
          "Photo": "PLAVILA",
          "Status": "Available",
          "Location coordinates": "8°29'39.4\"N 76°59'46.1\"E",
          "Latitude": "8.494277777777777",
          "Longitude": "76.9961388888889"
      },
      {
          "Name": "PRIMARY HEALTH CENTRE",
          "Status": "Available",
          "Location coordinates": "8°29'02.3\"N 76°59'56.5\"E",
          "Latitude": "8.48397222222222",
          "Longitude": "76.99902777777778"
      },
      {
          "Name": "THRIKKANAPURAM BRIDGE",
          "Photo": "THRIKKANAPURAM BRIDGE",
          "Status": "Available",
          "Location coordinates": "8°28'28.8\"N 77°00'09.9\"E",
          "Latitude": "8.474666666666666",
          "Longitude": "77.00275"
      },
      {
          "Name": "NEMOM JN POLICE STATION",
          "Client": "Precise",
          "Photo": "NEMOM JN POLICE STATION",
          "Status": "Occupied",
          "Location coordinates": "8°27'15.4\"N 77°00'12.2\"E",
          "Latitude": "8.454277777777778",
          "Longitude": "77.00338888888889"
      },
      {
          "Name": "PLANKALAMUKKU",
          "Photo": "PLANKALAMUKKU",
          "Status": "Available",
          "Location coordinates": "8°28'06.2\"N 77°00'03.3\"E",
          "Latitude": "8.468388888888889",
          "Longitude": "77.00091666666667"
      },
      {
          "Name": "VELLAYANI JUNCTION",
          "Client": "Precise",
          "Photo": "VELLAYANI JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°27'25.4\"N 77°00'00.6\"E",
          "Latitude": "8.457055555555554",
          "Longitude": "77.00016666666667"
      },
      {
          "Name": "COUNCELOR OFF MAZJID LANE",
          "Status": "Available",
          "Location coordinates": "8°27'38.0\"N 76°59'39.2\"E",
          "Latitude": "8.460555555555555",
          "Longitude": "76.99422222222222"
      },
      {
          "Name": "NEW KARAKKAMANDAPAM",
          "Photo": "NEW KARAKKAMANDAPAM",
          "Status": "Available",
          "Location coordinates": "8°27'44.0\"N 76°59'25.4\"E",
          "Latitude": "8.462222222222222",
          "Longitude": "76.99038888888889"
      },
      {
          "Name": "KURUMI",
          "Status": "Available",
          "Location coordinates": "8°27'21.2\"N 76°59'16.2\"E",
          "Latitude": "8.455888888888888",
          "Longitude": "76.98783333333333"
      },
      {
          "Name": "VATTAVILA",
          "Photo": "VATTAVILA",
          "Status": "Available",
          "Location coordinates": "8°29'33.2\"N 76°59'00.5\"E",
          "Latitude": "8.492555555555555",
          "Longitude": "76.98347222222222"
      },
      {
          "Name": "THELIBHAGAM",
          "Photo": "THELIBHAGAM",
          "Status": "Available",
          "Location coordinates": "8°29'47.4\"N 76°59'15.9\"E",
          "Latitude": "8.4965",
          "Longitude": "76.98775"
      },
      {
          "Name": "PUNNAKKAMUGHAL JN",
          "Photo": "PUNNAKKAMUGHAL JN",
          "Status": "Available",
          "Location coordinates": "8°29'33.6\"N 76°59'33.3\"E",
          "Latitude": "8.492666666666667",
          "Longitude": "76.99258333333333"
      },
      {
          "Name": "KONGALAM",
          "Photo": "KONGALAM",
          "Status": "Available",
          "Location coordinates": "8°29'10.9\"N 76°59'29.4\"E",
          "Latitude": "8.48636111111111",
          "Longitude": "76.9915"
      },
      {
          "Name": "KAIMANAM",
          "Client": "Precise",
          "Photo": "KAIMANAM",
          "Status": "Occupied",
          "Location coordinates": "8°28'22.7\"N 76°58'38.5\"E",
          "Latitude": "8.472972222222221",
          "Longitude": "76.97736111111111"
      },
      {
          "Name": "KARUMOM",
          "Photo": "KARUMOM",
          "Status": "Available",
          "Location coordinates": "8°27'35.9\"N 76°58'28.0\"E",
          "Latitude": "8.459972222222222",
          "Longitude": "76.97444444444444"
      },
      {
          "Name": "NIRAMANKARA TVS",
          "Client": "Allianz",
          "Photo": "NIRAMANKARA TVS",
          "Status": "Occupied",
          "Location coordinates": "8°28'36.2\"N 76°58'20.2\"E",
          "Latitude": "8.476722222222222",
          "Longitude": "76.97227777777778"
      },
      {
          "Name": "PAPPANAMCODE JN NH",
          "Status": "Available",
          "Location coordinates": "8°28'13.7\"N 76°58'51.5\"E",
          "Latitude": "8.470472222222222",
          "Longitude": "76.98097222222222"
      },
      {
          "Name": "KARAKKAMANDAPAM NH",
          "Photo": "KARAKKAMANDAPAM NH",
          "Status": "Available",
          "Location coordinates": "8°27'52.9\"N 76°59'26.0\"E",
          "Latitude": "8.464694444444444",
          "Longitude": "76.99055555555556"
      },
      {
          "Name": "POOZHIKKUNNU JN",
          "Photo": "POOZHIKKUNNU JN",
          "Status": "Available",
          "Location coordinates": "8°28'10.9\"N 76°59'52.9\"E",
          "Latitude": "8.469694444444444",
          "Longitude": "76.99802777777778"
      },
      {
          "Name": "ESTATE JN",
          "Photo": "ESTATE JN",
          "Status": "Available",
          "Location coordinates": "8°28'09.7\"N 76°59'23.1\"E",
          "Latitude": "8.46936111111111",
          "Longitude": "76.98975"
      },
      {
          "Name": "NEDUMKAD JUNCTION",
          "Photo": "NEDUMKAD JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°28'33.5\"N 76°57'45.8\"E",
          "Latitude": "8.475972222222222",
          "Longitude": "76.96272222222223"
      },
      {
          "Name": "KALADY JUNCTION",
          "Photo": "KALADY JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°28'01.7\"N 76°57'48.3\"E",
          "Latitude": "8.46713888888889",
          "Longitude": "76.96341666666667"
      },
      {
          "Name": "ATTUKAL ISLAND",
          "Client": "Precise",
          "Photo": "ATTUKAL ISLAND",
          "Status": "Occupied",
          "Location coordinates": "8°28'26.7\"N 76°57'26.8\"E",
          "Latitude": "8.474083333333333",
          "Longitude": "76.95744444444445"
      },
      {
          "Name": "MARUTHOOR KADAVU",
          "Photo": "MARUTHOOR KADAVU",
          "Status": "Available",
          "Location coordinates": "8°27'43.3\"N 76°58'16.6\"E",
          "Latitude": "8.462027777777777",
          "Longitude": "76.97127777777779"
      },
      {
          "Name": "KALADY SOUTH",
          "Photo": "KALADY SOUTH",
          "Status": "Available",
          "Location coordinates": "8°27'27.6\"N 76°57'33.7\"E",
          "Latitude": "8.457666666666666",
          "Longitude": "76.95936111111111"
      },
      {
          "Name": "KARUMAM CHENNAKKAMUKKU",
          "Client": "Bhima",
          "Photo": "KARUMAM CHENNAKKAMUKKU",
          "Status": "Occupied",
          "Location coordinates": "8°27'24.0\"N 76°58'22.7\"E",
          "Latitude": "8.456666666666665",
          "Longitude": "76.97297222222223"
      },
      {
          "Name": "MELAMKODU",
          "Status": "Available",
          "Location coordinates": "8°27'20.5\"N 76°58'59.4\"E",
          "Latitude": "8.455694444444443",
          "Longitude": "76.98316666666666"
      },
      {
          "Name": "THOPPUMUKKU - MELAKCODE",
          "Photo": "THOPPUMUKKU - MELAMKODE",
          "Status": "Available",
          "Location coordinates": "8°27'54.2\"N 76°58'48.6\"E",
          "Latitude": "8.465055555555555",
          "Longitude": "76.98016666666666"
      },
      {
          "Name": "CHITRANJALI STUDIO JN",
          "Client": "Allianz",
          "Status": "Occupied",
          "Location coordinates": "8°26'22.5\"N 76°57'38.5\"E",
          "Latitude": "8.439583333333333",
          "Longitude": "76.96069444444444"
      },
      {
          "Name": "NELLIYOD JN",
          "Photo": "NELLIYOD JN",
          "Status": "Available",
          "Location coordinates": "8°27'06.2\"N 76°57'53.4\"E",
          "Latitude": "8.451722222222221",
          "Longitude": "76.96483333333333"
      },
      {
          "Name": "POONKULAM JN",
          "Photo": "POONKULAM JN",
          "Status": "Available",
          "Location coordinates": "8°27'06.2\"N 76°57'53.4\"E",
          "Latitude": "8.451722222222221",
          "Longitude": "76.96483333333333"
      },
      {
          "Name": "KOLIYOOOR JN",
          "Status": "Available",
          "Location coordinates": "8°25'04.5\"N 76°59'06.0\"E",
          "Latitude": "8.417916666666667",
          "Longitude": "76.985"
      },
      {
          "Name": "PACHALLOOR JN",
          "Client": "Bhima",
          "Photo": "PACHALLOOR JN",
          "Status": "Occupied",
          "Location coordinates": "8°25'53.5\"N 76°57'56.7\"E",
          "Latitude": "8.431527777777777",
          "Longitude": "76.96575"
      },
      {
          "Name": "PARAVILA (NEAR VAZHAMUTTOM)",
          "Photo": "PARAVILA (NEAR VAZHAMUTTOM)",
          "Status": "Available",
          "Location coordinates": "8°25'05.8\"N 76°58'10.4\"E",
          "Latitude": "8.418277777777778",
          "Longitude": "76.96955555555556"
      },
      {
          "Name": "VENGANOOR JN.",
          "Photo": "VENGANOOR JN.",
          "Status": "Available",
          "Location coordinates": "8°23'47.2\"N 77°00'11.8\"E",
          "Latitude": "8.396444444444445",
          "Longitude": "77.00327777777778"
      },
      {
          "Name": "MUKKOLA JN.",
          "Photo": "MUKKOLA JN.",
          "Status": "Available",
          "Location coordinates": "8°23'00.9\"N 77°00'20.3\"E",
          "Latitude": "8.383583333333332",
          "Longitude": "77.00563888888888"
      },
      {
          "Name": "NEHRU SMARAKA VAYANASALA",
          "Photo": "NEHRU SMARAKA VAYANASALA",
          "Status": "Available",
          "Location coordinates": "8°23'12.3\"N 76°59'33.7\"E",
          "Latitude": "8.38675",
          "Longitude": "76.99269444444444"
      },
      {
          "Name": "NELLIVILA BHADRAKALI TEMPLE",
          "Photo": "NELLIVILA BHADRAKALI TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°23'57.2\"N 77°00'31.2\"E",
          "Latitude": "8.399222222222221",
          "Longitude": "77.00866666666667"
      },
      {
          "Name": "PULINKUDI JN",
          "Client": "Bhima",
          "Photo": "PULINKUDI JN",
          "Status": "Occupied",
          "Location coordinates": "8°21'56.2\"N 77°00'44.6\"E",
          "Latitude": 8.36561111111111,
          "Longitude": 77.0123888888888
      },
      {
          "Name": "KIDARAKKUZHI (NEAR VIZHINJAM VILLAGE OFFICE)",
          "Client": "Precise",
          "Photo": "KIDARAKKUZHI (NEAR VIZHINJAM VILLAGE OFFICE)",
          "Status": "Occupied",
          "Location coordinates": "8°23'15.1\"N 77°00'40.1\"E",
          "Latitude": "8.387527777777777",
          "Longitude": "77.0111388888889"
      },
      {
          "Name": "THENNOORKONAM JN",
          "Photo": "THENNOORKONAM JN",
          "Status": "Available",
          "Location coordinates": "8°22'51.5\"N 76°59'57.1\"E",
          "Latitude": "8.380972222222223",
          "Longitude": "76.99919444444444"
      },
      {
          "Name": "MUKKOLA - NELLIKKUNNU RD ENT",
          "Photo": "MUKKOLA - NELLIKKUNNU RD ENT",
          "Status": "Available",
          "Location coordinates": "8°23'00.9\"N 77°00'20.3\"E",
          "Latitude": "8.383583333333332",
          "Longitude": "77.00563888888888"
      },
      {
          "Name": "VIZHINJAM JN",
          "Client": "Bhima",
          "Photo": "VIZHINJAM JN",
          "Status": "Occupied",
          "Location coordinates": "8°22'57.3\"N 76°59'30.7\"E",
          "Latitude": "8.382583333333335",
          "Longitude": "76.9918611111111"
      },
      {
          "Name": "THEATER VIZHINJAM",
          "Photo": "THEATER VIZHINJAM",
          "Status": "Available",
          "Location coordinates": "8°23'23.7\"N 76°59'22.8\"E",
          "Latitude": "8.389916666666666",
          "Longitude": "76.98966666666666"
      },
      {
          "Name": "AMBEDKAR JN VIZHINJAM",
          "Photo": "AMBEDKAR JN VIZHINJAM",
          "Status": "Available",
          "Location coordinates": "8°23'26.8\"N 76°59'10.5\"E",
          "Latitude": "8.390777777777778",
          "Longitude": "76.98625"
      },
      {
          "Name": "MUHIYUDEEN MOSQUE",
          "Photo": "MUHIYUDEEN MOSQUE",
          "Status": "Available",
          "Location coordinates": "8°22'36.8\"N 76°59'10.4\"E",
          "Latitude": "8.376888888888889",
          "Longitude": "76.98622222222222"
      },
      {
          "Name": "PALACE JN. LEELA RAVIZ,KOVALAM",
          "Client": "Allianz",
          "Status": "Occupied",
          "Location coordinates": "8°23'30.3\"N 76°58'30.1\"E",
          "Latitude": "8.39175",
          "Longitude": "76.97502777777778"
      },
      {
          "Name": "SAMUDRA",
          "Photo": "SAMUDRA",
          "Status": "Available",
          "Location coordinates": "8°24'10.2\"N 76°58'27.1\"E",
          "Latitude": "8.402833333333334",
          "Longitude": "76.97419444444445"
      },
      {
          "Name": "VAZHAMUTTOM JN",
          "Photo": "VAZHAMUTTOM JN",
          "Status": "Available",
          "Location coordinates": "8°24'43.0\"N 76°58'18.9\"E",
          "Latitude": "8.411944444444444",
          "Longitude": "76.97191666666667"
      },
      {
          "Name": "COIR CO-OP. SOCIETY",
          "Photo": "COIR CO-OP. SOCIETY",
          "Status": "Available",
          "Location coordinates": "8°25'23.8\"N 76°58'03.0\"E",
          "Latitude": "8.423277777777777",
          "Longitude": "76.9675"
      },
      {
          "Name": "THIRUVALLAM LP SCHOOL",
          "Photo": "THIRUVALLAM LP SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°26'28.1\"N 76°57'27.8\"E",
          "Latitude": "8.441138888888888",
          "Longitude": "76.95772222222223"
      },
      {
          "Name": "POONTHURA NEAR ST. THOMAS CHURCH",
          "Client": "Precise",
          "Photo": "POONTHURA NEAR ST. THOMAS CHURCH",
          "Status": "Occupied",
          "Location coordinates": "8°26'28.0\"N 76°56'42.9\"E",
          "Latitude": "8.44111111111111",
          "Longitude": "76.94525"
      },
      {
          "Name": "MILMA",
          "Client": "Precise",
          "Photo": "MILMA",
          "Status": "Occupied",
          "Location coordinates": "8°26'54.5\"N 76°57'07.1\"E",
          "Latitude": "8.448472222222222",
          "Longitude": "76.95197222222222"
      },
      {
          "Name": "PARAVANKUNNU",
          "Photo": "PARAVANKUNNU",
          "Status": "Available",
          "Location coordinates": "8°27'21.3\"N 76°56'59.4\"E",
          "Latitude": "8.455916666666665",
          "Longitude": "76.94983333333333"
      },
      {
          "Name": "KALLADIMUKHAM",
          "Photo": "KALLADIMUKHAM",
          "Status": "Available",
          "Location coordinates": "8°27'22.7\"N 76°57'26.9\"E",
          "Latitude": "8.456305555555554",
          "Longitude": "76.95747222222222"
      },
      {
          "Name": "AMBALATHARA JN",
          "Client": "Precise",
          "Photo": "AMBALATHARA JN",
          "Status": "Occupied",
          "Location coordinates": "8°27'09.4\"N 76°57'03.6\"E",
          "Latitude": "8.45261111111111",
          "Longitude": "76.95100000000001"
      },
      {
          "Name": "KAMALESHWARAM JUNCTION",
          "Photo": "KAMALESHWARAM JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°28'02.7\"N 76°56'53.7\"E",
          "Latitude": "8.467416666666667",
          "Longitude": "76.94825"
      },
      {
          "Name": "IRUMKULANGARA TEMPLE (KOPPAM)",
          "Photo": "IRUMKULANGARA TEMPLE (KOPPAM)",
          "Status": "Available",
          "Location coordinates": "8°28'14.1\"N 76°56'42.1\"E",
          "Latitude": "8.470583333333334",
          "Longitude": "76.94502777777778"
      },
      {
          "Name": "BALAVAN NAGAR (MUTTATHARA)",
          "Photo": "BALAVAN NAGAR (MUTTATHARA)",
          "Status": "Available",
          "Location coordinates": "8°28'11.9\"N 76°56'26.2\"E",
          "Latitude": "8.469972222222223",
          "Longitude": "76.94061111111111"
      },
      {
          "Name": "COUNCELLOR OFFICE",
          "Status": "Available",
          "Location coordinates": "8°27'54.8\"N 76°56'36.9\"E",
          "Latitude": "8.465222222222222",
          "Longitude": "76.94358333333334"
      },
      {
          "Name": "KONJIRAVILA TEMPLE",
          "Photo": "KONJIRAVILA TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°27'43.5\"N 76°57'23.2\"E",
          "Latitude": "8.462083333333332",
          "Longitude": "76.95644444444444"
      },
      {
          "Name": "KUTHUKALLUMMOOD JN",
          "Photo": "KUTHUKALLUMMOOD JN",
          "Status": "Available",
          "Location coordinates": "8°27'51.5\"N 76°57'14.9\"E",
          "Latitude": "8.464305555555555",
          "Longitude": "76.95413888888889"
      },
      {
          "Name": "MANACAUD VALIYAPALLI JN",
          "Photo": "MANACAUD VALIYAPALLI JN",
          "Status": "Available",
          "Location coordinates": "8°28'10.9\"N 76°57'03.1\"E",
          "Latitude": "8.469694444444444",
          "Longitude": "76.95086111111111"
      },
      {
          "Name": "PAYATTUKUPPAM AUDITORIUM",
          "Photo": "PAYATTUKUPPAM AUDITORIUM",
          "Status": "Available",
          "Location coordinates": "8°27'59.9\"N 76°57'01.8\"E",
          "Latitude": "8.466638888888887",
          "Longitude": "76.9505"
      },
      {
          "Name": "IRANIMUTTOM",
          "Photo": "IRANIMUTTOM",
          "Status": "Available",
          "Location coordinates": "8°28'00.8\"N 76°57'27.8\"E",
          "Latitude": "8.466888888888889",
          "Longitude": "76.95772222222223"
      },
      {
          "Name": "CHIRAMUKKU",
          "Photo": "CHIRAMUKKU",
          "Status": "Available",
          "Location coordinates": "8°27'60.0\"N 76°57'17.0\"E",
          "Latitude": "8.466666666666667",
          "Longitude": "76.95472222222223"
      },
      {
          "Name": "KONCHIRAVILA",
          "Photo": "KONCHIRAVILA",
          "Status": "Available",
          "Location coordinates": "8°27'45.9\"N 76°57'22.3\"E",
          "Latitude": "8.46275",
          "Longitude": "76.95619444444445"
      },
      {
          "Name": "KURIYATHI SCHOOL",
          "Photo": "KURIYATHI SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°28'33.9\"N 76°57'02.7\"E",
          "Latitude": "8.476083333333333",
          "Longitude": "76.95075"
      },
      {
          "Name": "SREEVARAHAM TEMPLE",
          "Photo": "SREEVARAHAM TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°28'25.4\"N 76°56'33.1\"E",
          "Latitude": "8.473722222222221",
          "Longitude": "76.94252777777778"
      },
      {
          "Name": "MANACAUD PARK",
          "Photo": "MANACAUD PARK",
          "Status": "Available",
          "Location coordinates": "8°28'34.1\"N 76°56'49.9\"E",
          "Latitude": "8.476138888888888",
          "Longitude": "76.94719444444445"
      },
      {
          "Name": "MANACAUD MARKET",
          "Photo": "MANACAUD MARKET",
          "Status": "Available",
          "Location coordinates": "8°28'33.3\"N 76°56'58.6\"E",
          "Latitude": "8.475916666666667",
          "Longitude": "76.94961111111111"
      },
      {
          "Name": "KARIMADAM COLONY",
          "Photo": "KARIMADAM COLONY",
          "Status": "Available",
          "Location coordinates": "8°28'42.4\"N 76°57'07.7\"E",
          "Latitude": "8.478444444444445",
          "Longitude": "76.9521388888889"
      },
      {
          "Name": "MANACAUD JUNCTION",
          "Client": "Precise",
          "Photo": "MANACAUD JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°28'24.7\"N 76°56'51.2\"E",
          "Latitude": "8.473527777777777",
          "Longitude": "76.94755555555555"
      },
      {
          "Name": "SREENAGAR MANACAUD",
          "Photo": "SREENAGAR MANACAUD",
          "Status": "Available",
          "Location coordinates": "8°28'16.0\"N 76°57'00.1\"E",
          "Latitude": "8.471111111111112",
          "Longitude": "76.95002777777778"
      },
      {
          "Name": "PUTHANPALLI",
          "Photo": "PUTHANPALLI",
          "Status": "Available",
          "Location coordinates": "8°26'54.8\"N 76°56'51.2\"E",
          "Latitude": "8.448555555555556",
          "Longitude": "76.94755555555555"
      },
      {
          "Name": "PALLITHERUVU",
          "Photo": "PALLITHERUVU",
          "Status": "Available",
          "Location coordinates": "8°27'19.5\"N 76°56'38.7\"E",
          "Latitude": "8.455416666666666",
          "Longitude": "76.94408333333334"
      },
      {
          "Name": "PATHEKKAR",
          "Photo": "PATHEKKAR",
          "Status": "Available",
          "Location coordinates": "8°27'13.3\"N 76°56'25.7\"E",
          "Latitude": "8.453694444444444",
          "Longitude": "76.94047222222223"
      },
      {
          "Name": "POONTHURA POLICE STATION",
          "Photo": "POONTHURA POLICE STATION",
          "Status": "Available",
          "Location coordinates": "8°26'50.6\"N 76°56'47.3\"E",
          "Latitude": "8.44738888888889",
          "Longitude": "76.94647222222223"
      },
      {
          "Name": "POONTHURA JUNCTION",
          "Client": "Bhima",
          "Photo": "POONTHURA JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°26'37.5\"N 76°56'38.5\"E",
          "Latitude": "8.44375",
          "Longitude": "76.94402777777778"
      },
      {
          "Name": "MANIKYAVILAKAM JUNCTION",
          "Photo": "MANIKYAVILAKAM JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°26'53.9\"N 76°56'34.2\"E",
          "Latitude": "8.448305555555557",
          "Longitude": "76.94283333333334"
      },
      {
          "Name": "JAWAHAR MASJID",
          "Photo": "JAWAHAR MASJID",
          "Status": "Available",
          "Location coordinates": "8°26'53.1\"N 76°56'32.1\"E",
          "Latitude": "8.448083333333333",
          "Longitude": "76.94225"
      },
      {
          "Name": "BADRIYA NAGAR",
          "Status": "Available",
          "Location coordinates": "8°27'31.7\"N 76°56'21.2\"E",
          "Latitude": "8.458805555555555",
          "Longitude": "76.93922222222223"
      },
      {
          "Name": "CBI OFFICE",
          "Status": "Available",
          "Location coordinates": "8°27'49.3\"N 76°55'54.3\"E",
          "Latitude": "8.463694444444444",
          "Longitude": "76.93175000000001"
      },
      {
          "Name": "PRASAR BHARATHI",
          "Client": "Bhima",
          "Photo": "PRASAR BHARATHI",
          "Status": "Occupied",
          "Location coordinates": "8°27'23.4\"N 76°56'09.6\"E",
          "Latitude": "8.4565",
          "Longitude": "76.936"
      },
      {
          "Name": "ASSUMPTION CHURCH (ROSEMINI CONVENT)",
          "Client": "Precise",
          "Photo": "ASSUMPTION CHURCH (ROSEMINI CONVENT)",
          "Status": "Occupied",
          "Location coordinates": "8°27'32.3\"N 76°55'51.9\"E",
          "Latitude": "8.458972222222222",
          "Longitude": "76.93108333333333"
      },
      {
          "Name": "UPS BEEMAPALLY",
          "Photo": "UPS BEEMAPALLY",
          "Status": "Available",
          "Location coordinates": "8°27'13.7\"N 76°56'10.0\"E",
          "Latitude": "8.453805555555554",
          "Longitude": "76.93611111111112"
      },
      {
          "Name": "VFA GROUND - VALIYATHURA",
          "Client": "Bhima",
          "Status": "Occupied",
          "Location coordinates": "8°27'53.9\"N 76°55'30.2\"E",
          "Latitude": "8.464972222222222",
          "Longitude": "76.92505555555556"
      },
      {
          "Name": "NAVABHARATH SCHOOL",
          "Photo": "NAVABHARATH SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°27'01.3\"N 76°56'19.1\"E",
          "Latitude": "8.45036111111111",
          "Longitude": "76.93863888888889"
      },
      {
          "Name": "PONNARA BRIDGE",
          "Photo": "PONNARA BRIDGE",
          "Status": "Available",
          "Location coordinates": "8°28'06.4\"N 76°56'01.2\"E",
          "Latitude": "8.468444444444444",
          "Longitude": "76.93366666666667"
      },
      {
          "Name": "PERUNELLI MARKET",
          "Photo": "PERUNELLI MARKET",
          "Status": "Available",
          "Location coordinates": "8°28'01.1\"N 76°56'09.8\"E",
          "Latitude": "8.466972222222223",
          "Longitude": "76.93605555555555"
      },
      {
          "Name": "POYYANI JUNCTION",
          "Photo": "POYYANI JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°28'28.4\"N 76°56'38.6\"E",
          "Latitude": "8.474555555555556",
          "Longitude": "76.94405555555556"
      },
      {
          "Name": "KALLUMMOOD",
          "Client": "Bhima",
          "Photo": "KALLUMMOOD",
          "Status": "Occupied",
          "Location coordinates": "8°28'10.6\"N 76°56'13.1\"E",
          "Latitude": "8.469611111111112",
          "Longitude": "76.93697222222222"
      },
      {
          "Name": "KALATHUMUDUMPU",
          "Photo": "KALATHUMUDUMPU",
          "Status": "Available",
          "Location coordinates": "8°28'25.9\"N 76°56'19.3\"E",
          "Latitude": "8.47386111111111",
          "Longitude": "76.93869444444445"
      },
      {
          "Name": "SREEVARAHAM MUCKOLLAKKAL TEMPLE",
          "Status": "Available",
          "Location coordinates": "8°28'25.4\"N 76°56'33.1\"E",
          "Latitude": "8.473722222222221",
          "Longitude": "76.94252777777778"
      },
      {
          "Name": "VAZHAPPALLI",
          "Photo": "VAZHAPPALLI",
          "Status": "Available",
          "Location coordinates": "8°28'50.3\"N 76°56'31.2\"E",
          "Latitude": "8.480638888888889",
          "Longitude": "76.94200000000001"
      },
      {
          "Name": "S.P. FORT HOSPITAL",
          "Photo": "S.P. FORT HOSPITAL",
          "Status": "Available",
          "Location coordinates": "8°29'03.9\"N 76°56'31.0\"E",
          "Latitude": "8.484416666666666",
          "Longitude": "76.94194444444445"
      },
      {
          "Name": "THEKKEKOTTAMUKKU",
          "Photo": "THEKKEKOTTAMUKKU",
          "Status": "Available",
          "Location coordinates": "8°28'44.8\"N 76°56'37.9\"E",
          "Latitude": "8.479111111111111",
          "Longitude": "76.94386111111112"
      },
      {
          "Name": "VADAKKENADA",
          "Client": "Precise",
          "Photo": "VADAKKENADA",
          "Status": "Occupied",
          "Location coordinates": "8°29'05.1\"N 76°56'36.6\"E",
          "Latitude": "8.48475",
          "Longitude": "76.9435"
      },
      {
          "Name": "MANJALIKULAM",
          "Client": "Our College",
          "Photo": "MANJALIKULAM",
          "Status": "Occupied",
          "Location coordinates": "8°29'29.1\"N 76°56'57.9\"E",
          "Latitude": "8.491416666666666",
          "Longitude": "76.94941666666666"
      },
      {
          "Name": "HANTEX CHENKALCHOOLA",
          "Photo": "HANTEX CHENKALCHOOLA",
          "Status": "Occupied",
          "Location coordinates": "8°29'45.0\"N 76°57'09.9\"E",
          "Latitude": "8.495833333333332",
          "Longitude": "76.95275000000001"
      },
      {
          "Name": "MUSIC COLLEGE",
          "Photo": "MUSIC COLLEGE",
          "Status": "Available",
          "Location coordinates": "8°29'25.9\"N 76°57'19.6\"E",
          "Latitude": "8.490527777777777",
          "Longitude": "76.95544444444445"
      },
      {
          "Name": "MODEL SCHOOL",
          "Photo": "MODEL SCHOOL",
          "Status": "Available",
          "Location coordinates": "8°29'35.3\"N 76°57'14.4\"E",
          "Latitude": "8.493138888888888",
          "Longitude": "76.95400000000001"
      },
      {
          "Name": "SECRATARIAT GENERAL HOSP RD",
          "Photo": "SECRATARIAT GENERAL HOSP RD",
          "Status": "Available",
          "Location coordinates": "8°29'57.0\"N 76°56'44.5\"E",
          "Latitude": "8.499166666666666",
          "Longitude": "76.94569444444444"
      },
      {
          "Name": "PULIMOOD HOTEL CAPITAL - 1976",
          "Status": "Available",
          "Location coordinates": "8°29'38.9\"N 76°56'49.4\"E",
          "Latitude": "8.494138888888887",
          "Longitude": "76.94705555555556"
      },
      {
          "Name": "UPPIDAMOOD BRIDGE",
          "Photo": "UPPIDAMOOD BRIDGE",
          "Status": "Available",
          "Location coordinates": "8°29'24.4\"N 76°56'28.2\"E",
          "Latitude": "8.49011111111111",
          "Longitude": "76.94116666666667"
      },
      {
          "Name": "VANCHIYOOR COURT JUNCTION",
          "Photo": "VANCHIYOOR COURT JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°29'37.3\"N 76°56'25.0\"E",
          "Latitude": "8.493694444444444",
          "Longitude": "76.94027777777778"
      },
      {
          "Name": "THAKARAPARAMBU",
          "Client": "Bhima",
          "Photo": "THAKARAPARAMBU",
          "Status": "Occupied",
          "Location coordinates": "8°29'11.3\"N 76°56'39.8\"E",
          "Latitude": "8.486472222222222",
          "Longitude": "76.9443888888889"
      },
      {
          "Name": "RAILWAY MARKET UPPIDAMMOOD",
          "Status": "Available",
          "Location coordinates": "8°29'21.2\"N 76°56'32.1\"E",
          "Latitude": "8.489222222222221",
          "Longitude": "76.94225"
      },
      {
          "Name": "H.I. OFFICE",
          "Photo": "H.I. OFFICE",
          "Status": "Available",
          "Location coordinates": "8°29'11.1\"N 76°56'23.0\"E",
          "Latitude": "8.486416666666665",
          "Longitude": "76.93972222222223"
      },
      {
          "Name": "SREEKANDESHWARAM TEMPLE",
          "Client": "Precise",
          "Photo": "SREEKANDESHWARAM TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°29'14.9\"N 76°56'33.1\"E",
          "Latitude": "8.487472222222221",
          "Longitude": "76.94252777777778"
      },
      {
          "Name": "KARALI BHAGAM",
          "Photo": "KARALI BHAGAM",
          "Status": "Available",
          "Location coordinates": "8°29'06.8\"N 76°55'35.9\"E",
          "Latitude": "8.485222222222221",
          "Longitude": "76.92663888888889"
      },
      {
          "Name": "PERUNTHANNI TRANSFORMER",
          "Photo": "PERUNTHANNI TRANSFORMER",
          "Status": "Available",
          "Location coordinates": "8°28'48.8\"N 76°56'04.1\"E",
          "Latitude": "8.480222222222222",
          "Longitude": "76.93447222222223"
      },
      {
          "Name": "PERUNTHANNI",
          "Client": "Alive",
          "Photo": "PERUNTHANNI",
          "Status": "Occupied",
          "Location coordinates": "8°29'01.9\"N 76°56'21.4\"E",
          "Latitude": "8.48386111111111",
          "Longitude": "76.93927777777778"
      },
      {
          "Name": "CHAMPAKADA",
          "Photo": "CHAMPAKADA",
          "Status": "Available",
          "Location coordinates": "8°29'20.1\"N 76°56'06.2\"E",
          "Latitude": "8.488916666666666",
          "Longitude": "76.93505555555556"
      },
      {
          "Name": "PALKULANGARA VAYANASALA",
          "Photo": "PALKULANGARA VAYANASALA",
          "Status": "Available",
          "Location coordinates": "8°29'12.3\"N 76°55'59.4\"E",
          "Latitude": "8.486749999999999",
          "Longitude": "76.93316666666666"
      },
      {
          "Name": "PUTHEN ROAD",
          "Photo": "PUTHEN ROAD",
          "Status": "Available",
          "Location coordinates": "8°29'25.4\"N 76°55'45.1\"E",
          "Latitude": "8.490388888888887",
          "Longitude": "76.92919444444445"
      },
      {
          "Name": "CHAKKAI ITI JUNCTION",
          "Client": "Allianz",
          "Photo": "ITI JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°29'26.6\"N 76°55'00.1\"E",
          "Latitude": "8.490722222222221",
          "Longitude": "76.91669444444445"
      },
      {
          "Name": "CHAKKAI ISLAND",
          "Photo": "CHAKKAI ISLAND",
          "Status": "Available",
          "Location coordinates": "8°29'29.2\"N 76°55'18.8\"E",
          "Latitude": "8.491444444444443",
          "Longitude": "76.92188888888889"
      },
      {
          "Name": "AKSHARA VEEDHI LANE",
          "Photo": "AKSHARA VEEDHI LANE",
          "Status": "Available",
          "Location coordinates": "8°29'37.1\"N 76°55'34.6\"E",
          "Latitude": "8.493638888888889",
          "Longitude": "76.92627777777778"
      },
      {
          "Name": "VALIYATHURA JUNCTION",
          "Client": "Precise",
          "Photo": "VALIYATHURA JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°27'53.3\"N 76°55'34.3\"E",
          "Latitude": "8.464805555555555",
          "Longitude": "76.92619444444445"
      },
      {
          "Name": "ST.MARY'S KUZHIVILAKAM",
          "Photo": "ST.MARY'S KUZHIVILAKAM",
          "Status": "Available",
          "Location coordinates": "8°28'08.4\"N 76°55'23.2\"E",
          "Latitude": "8.469",
          "Longitude": "76.92311111111111"
      },
      {
          "Name": "AIRPORT JUNCTION",
          "Client": "Bhima",
          "Photo": "AIRPORT JUNCTION",
          "Status": "Occupied",
          "Location coordinates": "8°28'29.6\"N 76°55'10.6\"E",
          "Latitude": "8.47488888888889",
          "Longitude": "76.91961111111111"
      },
      {
          "Name": "SULAIMAN THERUVU",
          "Photo": "SULAIMAN THERUVU",
          "Status": "Available",
          "Location coordinates": "8°28'26.4\"N 76°55'24.6\"E",
          "Latitude": "8.474",
          "Longitude": "76.9235"
      },
      {
          "Name": "NEAR DOMESTIC AIRPORT",
          "Client": "Allianz",
          "Photo": "NEAR DOMESTIC AIRPORT",
          "Status": "Occupied",
          "Location coordinates": "8°28'33.6\"N 76°55'01.1\"E",
          "Latitude": "8.476",
          "Longitude": "76.91697222222223"
      },
      {
          "Name": "VALLAKKADAVU BRIDGE",
          "Photo": "VALLAKKADAVU BRIDGE",
          "Status": "Available",
          "Location coordinates": "8°28'42.2\"N 76°55'53.9\"E",
          "Latitude": "8.478388888888889",
          "Longitude": "76.9316388888889"
      },
      {
          "Name": "BANGLADESH COLONY",
          "Photo": "BANGLADESH COLONY",
          "Status": "Available",
          "Location coordinates": "8°28'05.2\"N 76°55'58.8\"E",
          "Latitude": "8.468111111111112",
          "Longitude": "76.933"
      },
      {
          "Name": "N.S. DEPOT",
          "Photo": "N.S. DEPOT",
          "Status": "Available",
          "Location coordinates": "8°28'31.5\"N 76°55'51.6\"E",
          "Latitude": "8.475416666666666",
          "Longitude": "76.93100000000001"
      },
      {
          "Name": "VALLAKADAVU JUMA MASJID",
          "Photo": "VALLAKADAVU JUMA MASJID",
          "Status": "Available",
          "Location coordinates": "8°28'16.0\"N 76°55'42.2\"E",
          "Latitude": "8.471111111111112",
          "Longitude": "76.92838888888889"
      },
      {
          "Name": "SHANGHUMUGHAM",
          "Client": "Precise",
          "Photo": "SHANGHUMUGHAM",
          "Status": "Occupied",
          "Location coordinates": "8°28'52.3\"N 76°54'45.7\"E",
          "Latitude": "8.481194444444444",
          "Longitude": "76.91269444444445"
      },
      {
          "Name": "KANNANTHURA",
          "Photo": "KANNANTHURA",
          "Status": "Available",
          "Location coordinates": "8°29'10.1\"N 76°54'28.7\"E",
          "__EMPTY": "   ",
          "Latitude": "8.486138888888888",
          "Longitude": "76.90797222222223"
      },
      {
          "Name": "VETTUKADU",
          "Photo": "VETTUKADU",
          "Status": "Available",
          "Location coordinates": "8°29'42.3\"N 76°54'01.0\"E",
          "Latitude": "8.495083333333332",
          "Longitude": "76.90027777777779"
      },
      {
          "Name": "ALL SAINTS MOSQUE",
          "Client": "Allianz",
          "Photo": "ALL SAINTS MOSQUE",
          "Status": "Occupied",
          "Location coordinates": "8°29'37.1\"N 76°54'21.3\"E",
          "Latitude": "8.493638888888889",
          "Longitude": "76.90591666666667"
      },
      {
          "Name": "ALL SAINTS COLONY",
          "Photo": "ALL SAINTS COLONY",
          "Status": "Available",
          "Location coordinates": "8°29'28.9\"N 76°54'30.9\"E",
          "Latitude": "8.491361111111111",
          "Longitude": "76.90858333333334"
      },
      {
          "Name": "VETTUKADU CHURCH",
          "Client": "Precise",
          "Photo": "VETTUKADU CHURCH",
          "Status": "Occupied",
          "Location coordinates": "8°29'42.3\"N 76°54'01.0\"E",
          "Latitude": "8.495083333333332",
          "Longitude": "76.90027777777779"
      },
      {
          "Name": "BALA NAGAR",
          "Photo": "BALA NAGAR",
          "Status": "Available",
          "Location coordinates": "8°29'57.2\"N 76°54'19.4\"E",
          "Latitude": "8.49922222222222",
          "Longitude": "76.9053888888889"
      },
      {
          "Name": "KOCHUVELI RAILWAY STATION",
          "Photo": "KOCHUVELI RAILWAY STATION",
          "Status": "Available",
          "Location coordinates": "8°30'38.3\"N 76°53'40.2\"E",
          "Latitude": "8.51063888888889",
          "Longitude": "76.89450000000001"
      },
      {
          "Name": "KOCHUVELI CHURCH",
          "Client": "Precise",
          "Photo": "KOCHUVELI CHURCH",
          "Status": "Occupied",
          "Location coordinates": "8°30'06.6\"N 76°53'37.7\"E",
          "Latitude": "8.501833333333334",
          "Longitude": "76.89380555555556"
      },
      {
          "Name": "KARIKAKAM LIBRARY",
          "Photo": "KARIKAKAM LIBRARY",
          "Status": "Available",
          "Location coordinates": "8°29'55.9\"N 76°54'49.1\"E",
          "Latitude": "8.49886111111111",
          "Longitude": "76.9136388888889"
      },
      {
          "Name": "KARIKKAKAM TEMPLE",
          "Client": "Precise",
          "Photo": "KARIKKAKAM TEMPLE",
          "Status": "Occupied",
          "Location coordinates": "8°30'24.7\"N 76°54'22.9\"E",
          "Latitude": "8.50686111111111",
          "Longitude": "76.90636111111111"
      },
      {
          "Name": "GANAPATHI TEMPLE - KARIKKAKAM",
          "Photo": "GANAPATHI TEMPLE - KARIKKAKAM",
          "Status": "Available",
          "Location coordinates": "8°30'24.9\"N 76°54'01.0\"E",
          "Latitude": "8.506916666666667",
          "Longitude": "76.90027777777779"
      },
      {
          "Name": "VENPALAVATTOM",
          "Photo": "VENPALAVATTOM",
          "Status": "Available",
          "Location coordinates": "8°30'40.8\"N 76°54'21.7\"E",
          "Latitude": "8.511333333333333",
          "Longitude": "76.90602777777778"
      },
      {
          "Name": "OOLANKUZHI",
          "Photo": "OOLANKUZHI",
          "Status": "Available",
          "Location coordinates": "8°30'25.2\"N 76°54'51.2\"E",
          "Latitude": "8.507",
          "Longitude": "76.91422222222222"
      },
      {
          "Name": "ARASUMMOOD",
          "Photo": "ARASUMMOOD",
          "Status": "Available",
          "Location coordinates": "8°30'19.0\"N 76°54'59.0\"E",
          "Latitude": "8.505277777777778",
          "Longitude": "76.91638888888889"
      },
      {
          "Name": "PUMP HOUSE",
          "Photo": "PUMP HOUSE",
          "Status": "Available",
          "Location coordinates": "8°30'12.3\"N 76°55'07.6\"E",
          "Latitude": "8.503416666666666",
          "Longitude": "76.91877777777778"
      },
      {
          "Name": "MUDAVOOR",
          "Photo": "MUDAVOOR",
          "Status": "Available",
          "Location coordinates": "8°30'04.2\"N 76°55'17.9\"E",
          "Latitude": "8.501166666666666",
          "Longitude": "76.92163888888889"
      },
      {
          "Name": "PETTA JUNCTION",
          "Photo": "PETTA JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°29'42.2\"N 76°55'45.4\"E",
          "Latitude": "8.495055555555554",
          "Longitude": "76.92927777777778"
      },
      {
          "Name": "AMBALATHUMUKKU JUNCTION",
          "Photo": "AMBALATHUMUKKU JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°30'24.9\"N 76°54'01.0\"E",
          "Latitude": "8.506916666666667",
          "Longitude": "76.90027777777779"
      },
      {
          "Name": "BHAGATH SINGH",
          "Photo": "BHAGATH SINGH",
          "Status": "Available",
          "Location coordinates": "8°29'51.5\"N 76°55'33.4\"E",
          "Latitude": "8.497638888888888",
          "Longitude": "76.92594444444445"
      },
      {
          "Name": "AANAYARA",
          "Photo": "AANAYARA",
          "Status": "Available",
          "Location coordinates": "8°30'03.3\"N 76°55'18.3\"E",
          "Latitude": "8.500916666666667",
          "Longitude": "76.92175"
      },
      {
          "Name": "KERALA KAUMUDI",
          "Client": "Physiotherapy",
          "Photo": "KERALA KAUMUDI",
          "Status": "Occupied",
          "Location coordinates": "8°29'47.4\"N 76°55'53.8\"E",
          "Latitude": "8.4965",
          "Longitude": "76.93161111111111"
      },
      {
          "Name": "MOOLAVILAKAM JUNCTION",
          "Photo": "MOOLAVILAKAM JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°30'05.1\"N 76°56'23.7\"E",
          "Latitude": "8.501416666666668",
          "Longitude": "76.93991666666668"
      },
      {
          "Name": "THAMPURAN MUKKU",
          "Photo": "THAMPURAN MUKKU",
          "Status": "Occupied",
          "Location coordinates": "8°30'10.0\"N 76°56'30.9\"E",
          "Latitude": "8.502777777777778",
          "Longitude": "76.94191666666667"
      },
      {
          "Name": "VADAYAKADU JN",
          "Photo": "VADAYAKADU JN",
          "Status": "Available",
          "Location coordinates": "8°30'14.7\"N 76°56'18.5\"E",
          "Latitude": "8.504083333333334",
          "Longitude": "76.93847222222223"
      },
      {
          "Name": "KANNAMMOOLA JUNCTION",
          "Photo": "KANNAMMOOLA JUNCTION",
          "Status": "Available",
          "Location coordinates": "8°30'07.9\"N 76°55'54.9\"E",
          "Latitude": "8.502194444444445",
          "Longitude": "76.93191666666667"
      },
      {
          "Name": "PATOOR",
          "Client": "Physiotherapy",
          "Photo": "PATOOR",
          "Status": "Occupied",
          "Location coordinates": "8°29'52.8\"N 76°56'16.2\"E",
          "Latitude": "8.498",
          "Longitude": "76.93783333333333"
      },
      {
          "Name": "KIMS HOSPITAL",
          "Client": "Physiotherapy",
          "Photo": "KIMS HOSPITAL",
          "Status": "Occupied",
          "Location coordinates": "8°30'46.8\"N 76°54'38.1\"E",
          "Latitude": "8.513",
          "Longitude": "76.91058333333334"
      },
      {
          "Name": "KUMARAPURAM AJ HALL JN",
          "Client": "Bhima",
          "Photo": "KUMARAPURAM AJ HALL JN",
          "Status": "Occupied",
          "Location coordinates": "8°30'44.0\"N 76°55'39.3\"E",
          "Latitude": "8.512222222222222",
          "Longitude": "76.92758333333333"
      },
      {
          "Name": "KANNAMOOLA JN",
          "Client": "Physiotherapy",
          "Photo": "KANNAMOOLA JN",
          "Status": "Occupied",
          "Location coordinates": "8°30'12.5\"N 76°55'54.3\"E",
          "Latitude": "8.503472222222221",
          "Longitude": "76.93175000000001"
      },
      {
          "Name": "PRASANTH NAGAR ENTRANCE",
          "Client": "Precise",
          "Photo": "PRASANTH NAGAR ENTRANCE",
          "Status": "Occupied",
          "Location coordinates": "8°31'32.7\"N 76°55'12.2\"E",
          "Latitude": "8.52575",
          "Longitude": "76.92005555555556"
      },
      {
          "Name": "PRASANTH NAGAR",
          "Photo": "PRASANTH NAGAR",
          "Status": "Available",
          "Location coordinates": "8°31'49.6\"N 76°55'14.2\"E",
          "Latitude": "8.530444444444445",
          "Longitude": "76.92061111111111"
      },
      {
          "Name": "HINDUSTAN LATEX - AAKULAM",
          "Photo": "HINDUSTAN LATEX - AAKULAM",
          "Status": "Available",
          "Location coordinates": "8°31'33.1\"N 76°54'39.6\"E",
          "Latitude": "8.525861111111112",
          "Longitude": "76.911"
      },
      {
          "Name": "THAMPURAN MUKKU BYPASS HEERA",
          "Client": "Allianz",
          "Photo": "THAMPURAN MUKKU BYPASS HEERA",
          "Status": "Occupied",
          "Location coordinates": "8°31'48.2\"N 76°53'07.3\"E",
          "Latitude": "8.530055555555556",
          "Longitude": "76.88536111111112"
      },
      {
          "Name": "KUZHIVILA BYPASS",
          "Client": "Bhima",
          "Photo": "KUZHIVILA BYPASS",
          "Status": "Occupied",
          "Location coordinates": "8°31'25.9\"N 76°53'29.3\"E",
          "Latitude": "8.523861111111112",
          "Longitude": "76.89147222222223"
      },
      {
          "Name": "KARIMANAL JN",
          "Photo": "KARIMANAL JN",
          "Status": "Available",
          "Location coordinates": "8°31'26.2\"N 76°53'14.9\"E",
          "Latitude": "8.523944444444446",
          "Longitude": "76.88747222222223"
      },
      {
          "Name": "PULLUKAADU",
          "Photo": "PULLUKAADU",
          "Status": "Available",
          "Location coordinates": "8°31'36.4\"N 76°53'32.3\"E",
          "Latitude": "8.52677777777778",
          "Longitude": "76.89230555555557"
      },
      {
          "Name": "AAKAASHAVANI MANVILA",
          "Photo": "AAKAASHAVANI MANVILA",
          "Status": "Available",
          "Location coordinates": "8°32'50.3\"N 76°54'03.6\"E",
          "Latitude": "8.547305555555555",
          "Longitude": "76.90100000000001"
      },
      {
          "Name": "ARASHUMOODU",
          "Photo": "ARASHUMOODU",
          "Status": "Available",
          "Location coordinates": "8°32'32.5\"N 76°53'07.2\"E",
          "Latitude": "8.542361111111111",
          "Longitude": "76.88533333333334"
      },
      {
          "Name": "MANVILA",
          "Client": "Bhima",
          "Photo": "MANVILA",
          "Status": "Occupied",
          "Location coordinates": "8°32'35.3\"N 76°53'29.7\"E",
          "Latitude": "8.543138888888889",
          "Longitude": "76.89158333333334"
      },
      {
          "Name": "TRIPADAPURAM",
          "Photo": "TRIPADAPURAM",
          "Status": "Available",
          "Location coordinates": "8°32'59.4\"N 76°53'04.5\"E",
          "Latitude": "8.549833333333334",
          "Longitude": "76.88458333333334"
      },
      {
          "Name": "TECHNOPARK KALLINGAL",
          "Photo": "TECHNOPARK KALLINGAL",
          "Status": "Available",
          "Location coordinates": "8°32'50.7\"N 76°52'55.5\"E",
          "Latitude": "8.547416666666667",
          "Longitude": "76.88208333333333"
      },
      {
          "Name": "MUKKOLAKKAL JUNCTION - BYPASS",
          "Photo": "MUKKOLAKKAL JUNCTION - BYPASS",
          "Status": "Available",
          "Location coordinates": "8°32'45.7\"N 76°52'38.5\"E",
          "Latitude": "8.546027777777777",
          "Longitude": "76.8773611111111"
      },
      {
          "Name": "POUNDKADAVU MARKET",
          "Photo": "POUNDKADAVU MARKET",
          "Status": "Available",
          "Location coordinates": "8°31'36.7\"N 76°53'00.7\"E",
          "Latitude": "8.526861111111112",
          "Longitude": "76.88352777777779"
      },
      {
          "Name": "STATION KADAVU PULIMOODU",
          "Photo": "STATION KADAVU PULIMOODU",
          "Status": "Available",
          "Location coordinates": "8°32'38.2\"N 76°52'33.0\"E",
          "Latitude": "8.543944444444444",
          "Longitude": "76.87583333333333"
      },
      {
          "Name": "THUMBA JN",
          "Photo": "THUMBA JN",
          "Status": "Available",
          "Location coordinates": "8°31'19.0\"N 76°52'39.5\"E",
          "Latitude": "8.521944444444445",
          "Longitude": "76.87763888888888"
      },
      {
          "Name": "VELI OPP HEALTH CENTRE",
          "Photo": "VELI OPP HEALTH CENTRE",
          "Status": "Available",
          "Location coordinates": "8°30'58.2\"N 76°52'55.1\"E",
          "Latitude": "8.516166666666667",
          "Longitude": "76.88197222222222"
      },
      {
          "Name": "KULATHOOR JN",
          "Status": "Available",
          "Location coordinates": "8°32'26.2\"N 76°52'49.3\"E",
          "Latitude": "8.540611111111112",
          "Longitude": "76.8803611111111"
      },
      {
          "Name": "STATION KADAVU",
          "Photo": "STATION KADAVU",
          "Status": "Available",
          "Location coordinates": "8°32'34.3\"N 76°52'25.3\"E",
          "Latitude": "8.542861111111112",
          "Longitude": "76.87369444444444"
      },
      {
          "Name": "SAMSKARIKA NILAYAM",
          "Photo": "SAMSKARIKA NILAYAM",
          "Status": "Available",
          "Location coordinates": "8°32'50.5\"N 76°51'41.5\"E",
          "Latitude": "8.547361111111112",
          "Longitude": "76.86152777777777"
      },
      {
          "Name": "NEHRU JN",
          "Photo": "NEHRU JN",
          "Status": "Available",
          "Location coordinates": "8°32'57.7\"N 76°52'01.1\"E",
          "Latitude": "8.54936111111111",
          "Longitude": "76.86697222222222"
      },
      {
          "Name": "VILAYILKULAM GURUMANDIRAM",
          "Photo": "VILAYILKULAM GURUMANDIRAM",
          "Status": "Available",
          "Location coordinates": "8°33'14.4\"N 76°52'04.3\"E",
          "Latitude": "8.554",
          "Longitude": "76.86786111111111"
      },
      {
          "Name": "AATTINKUZHI SHAJI HOSP",
          "Client": "Dr Rudy's Dental Speciality Clinic",
          "Photo": "AATTINKUZHI SHAJI HOSP",
          "Status": "Occupied",
          "Location coordinates": "8°33'36.1\"N 76°52'28.4\"E",
          "Latitude": "8.560027777777778",
          "Longitude": "76.87455555555555"
      }
  ];

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
        this.map.setZoom(15);
        this.map.setCenter(mrkerz.getPosition() as google.maps.LatLng);
        console.log(mrkerz.getTitle())

        infoWindow.setContent("<b style='color:black'>"+mrkerz.getTitle()+"</b>");
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

