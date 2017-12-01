import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private modalService: NgbModal,private apollo: Apollo, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['name']);
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
     }
       `, variables: {
        name: this.route.snapshot.params['name']
      }
    }).valueChanges;

    this.titles.subscribe(({ data }) => {
      this.titles = data.title2;
     });
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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



}
