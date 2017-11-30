import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Observable<any>;

  constructor(private apollo: Apollo) {}
  variable:any;
  ngOnInit() {

 this.data= this.apollo.use('blog').watchQuery({
      query: gql`
      query{
           titulos:allTitles{
             edges {
               node {
                 name
                 description
               }
             }
            }
          }
      `,
    }).valueChanges;


  this.data.subscribe(res=>
    this.variable=res.data.titulos);
  // console.log(res.data.titulos.length," ",res.data.titulos.edges[0].node.name, " | " , res.data.titulos.edges[0].node.description));
   }

}
