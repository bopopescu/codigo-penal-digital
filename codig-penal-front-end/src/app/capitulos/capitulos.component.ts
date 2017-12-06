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
classification:any;
chapters:any;
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
              categorycrimeSet {
  edges {
    node {
      crimeType {
        crimeName
        category {
          name
        }
      }
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

      this.classification = [];


       for(let i = 0; i <data.title2.chapterSet.edges.length; i++ ){
         var capitulo = data.title2.chapterSet.edges[i].node.chapter;
         var chapter={};
        console.log("for ",capitulo);
        chapter['chapter']=capitulo;
        chapter['classifications']=[];
        for(let j = 0; j < data.title2.chapterSet.edges[i].node.categorycrimeSet.edges.length; j++)
        {
          var element={};

          element['class']=data.title2.chapterSet.edges[i].node.categorycrimeSet.edges[j].node.crimeType.category.name;
          element['tipos']=[data.title2.chapterSet.edges[i].node.categorycrimeSet.edges[j].node.crimeType.crimeName];
          // console.log(data.title2.chapterSet.edges[i].node.categorycrimeSet.edges[j].node.crimeType.category.name);

          var flag = true;
          if(chapter['classifications'].length){
            for(let x =0; x < chapter['classifications'].length; x++){
              if(element['class']==chapter['classifications'][x]['class']){
                chapter['classifications'][x]['tipos'].push(element['tipos']);
                flag = false;
              }
            }
            if(flag){
              chapter['classifications'].push(element);
            }
          }else{
            chapter['classifications'].push(element);
          }

        }

         this.classification.push(chapter);

      }
      console.log("class ",this.classification);
      this.crimes = data.allCrimeType;
     });
    //  this.classification = [];
    // var chapter = {};
    // var element={}
 //     element['class']='CLASIFICACIÓN POR EL ELEMENTO INTERNO';
 //     element['tipos']=[];
 //     element['tipos'].push('dolosos');
 //     element['tipos'].push('culposos');
 //     chapter['chapter']="1";
 //     chapter['clasifications']=[]
 //     chapter['clasifications'].push(
 //       element
 //   );
 //  this.classification.push(chapter);
 //
 //  var element={}
 //   element['class']='CLASIFICACIÓN EN FUNCIÓN DE SU GRAVEDAD';
 //   element['tipos']=[];
 //   element['tipos'].push('delitos graves');
 //  this.classification[0]['clasifications'].push(element);
 //  var chapter = {};
 //  var element={}
 //   element['class']='CLASIFICACIÓN POR EL ELEMENTO INTERNO';
 //   element['tipos']=[];
 //   element['tipos'].push('dolosos');
 //   chapter['chapter']="2";
 //   chapter['clasifications']=[]
 //   chapter['clasifications'].push(
 //     element
 // );
 // this.classification.push(chapter);
  }

   open(content,value:any) {
    this.value = value;
    this.definition= this.searchType(value);
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  getElement(chapter){
    return this.classification[chapter];
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
