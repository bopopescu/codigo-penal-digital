import { Component, OnInit,Input } from '@angular/core';

import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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
  public titles: any;
  closeResult: string;
//   test= [{
//             'class':'CLASIFICACIÓN POR EL ELEMENTO INTERNO O DE CULPABILIDAD',
//             'tipo': ['doloso']
// },
// {
//           'class':'CLASIFICACIÓN POR EL ELEMENTO INTERNO',
//           'tipo': ['doloso','culposos']
// }];
crimes:any;
test:any;
value:string;
definition:string;
  constructor(private modalService: NgbModal,private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit() {
     this.titles = this.apollo.use('blog').watchQuery({
      query: gql`
       query Titles($name:String!){
       title2(name:$name) {
         name
         description
         chapterSet {
       	  edges {
       	    node {
       	      chapter
              description
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

  allCrimeType {
    edges {
      node {
        crimeName
        description
      }
    }
  }
     }
       `, variables: {
        name: this.route.snapshot.params['name']
      }
    }).valueChanges;

    this.titles.subscribe(({ data }) => {
      this.titles = data.title2;
      this.crimes = data.allCrimeType;
     });
     this.test = [];
    var element = {};
     element['class']='CLASIFICACIÓN POR EL ELEMENTO INTERNO';
     element['tipo']=[];
     element['tipo'].push('dolosos');
     element['tipo'].push('culposos');
     this.test.push(
       element,
   );
  }

   open(content,value:string) {

    console.log(value,this.crimes.edges.length);
    // this.definition = definition;
    this.value = value;
    this.definition= this.searchType(value);
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  searchType(name:string){

    for(let i = 0; i<this.crimes.edges.length;i++)
    {
      if(name == this.crimes.edges[i].node.crimeName){
         return this.crimes.edges[i].node.description;
      }
    }
    return "";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

public prueba(a:string,b:string){
  if(a==b)
  {
    return true;
  }
  return false;
  }
}
