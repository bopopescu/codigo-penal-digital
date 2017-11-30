import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

import { map } from 'rxjs/operators';


import 'rxjs/add/operator/map';
// import { Title,Query,Edge } from '../types';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {

   titles:Observable<any>;

  constructor(private apollo: Apollo) {}
   ngOnInit() {

 this.titles= this.apollo.use('blog').watchQuery({
      query: gql`
      query allTitles{
        allTit {
          id
          name
          description
          chapterSet {
            edges {
              node {
                id
                chapter
              }
            }
          }
        }
      }
      `,
    }).valueChanges;

    console.log(this.titles)
  // // console.log(res.data.titulos.length," ",res.data.titulos.edges[0].node.name, " | " , res.data.titulos.edges[0].node.description));
   }

}
