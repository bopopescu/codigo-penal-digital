import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';

// import { Post,Title,Query } from '../types';

@Component({
  selector: 'app-capitulos',
  templateUrl: './capitulos.component.html',
  styleUrls: ['./capitulos.component.css']
})

export class CapitulosComponent implements OnInit {
  titles: Observable<any>;
  variable:any;
  loading:boolean;
  sample:any;
   constructor(private apollo: Apollo, private route:ActivatedRoute) {}

   ngOnInit() {
     console.log(this.route.snapshot.params['name']);
    this.titles=this.apollo.use('blog').watchQuery({
       query: gql`
       query Titles($name:String!){
       title2(name:$name) {
         name
         description
         chapterSet {
       	  edges {
       	    node {
       	      chapter
              articleSet {
                edges {
                  node {
                    number
                    body
                  }
                }
              }
       	    }
       	  }
       	}
       }
     }
       `,variables: {
        name:this.route.snapshot.params['name']
      }
     }).valueChanges;

     this.titles.subscribe( ({data}) => {
       this.titles = data.title2;
       console.log(data);
   });
   console.log(this.titles);

     // console.log(res.data.titulos.length," ",res.data.titulos.edges[0].node.name, " | " , res.data.titulos.edges[0].node.description));
    }




}
