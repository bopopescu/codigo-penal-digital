import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories:any;

  constructor(private apollo: Apollo) {}
  titles:any;
  ngOnInit() {

 this.titles= this.apollo.use('blog').watchQuery({
      query: gql`
      query{
           titulos:allTitles(first:4){
             edges {
               node {
                 name
                 description
               }
             }
            }
            allCategory {
              edges {
                node {
                  name
                  crimetypeSet {
                    edges {
                      node {
                        crimeName
                        description
                      }
                    }
                  }
                }
              }
            }
          }
      `,
    }).valueChanges;
        this.titles.subscribe(({data})=>{
          this.categories = data.allCategory;
        });
        this.titles.subscribe(({ data }) => {
          this.titles = data.titulos;
         });
    }

}
