import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loadedFeature: string = "recipe";

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCs_XGHppzkHwO_TpKbHyQYjxiMK7-9eoQ",
      authDomain: "ng-recipe-book-92d3f.firebaseapp.com"
    })

  }

  onNavigate(feature) {
    this.loadedFeature = feature;
  }
}
