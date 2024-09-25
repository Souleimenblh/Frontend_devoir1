import { Component, OnInit } from '@angular/core';
import { TypeAv } from '../model/TypeAv.model';
import { Avion } from '../model/avion.model';
import { AvionService } from '../services/avion.service';
//import { AvionsComponent } from '../avions/avions.component';

@Component({
  selector: 'app-recherche-par-type-av',
  templateUrl: './recherche-par-type-av.component.html',
  styles: [],
})
export class RechercheParTypeAvComponent implements OnInit {
  idAv!: number;
  typesAv!: TypeAv[];
  avions!: Avion[];

  constructor(private avionService: AvionService) {}

  // ngOnInit(): void {
  //   this.avionService.listeTypes().subscribe((avios) => {
  //     this.typesAv = avios._embedded.TypesAv;
  //     //console.log(avios);
  //     console.log(this.avionService.listeTypes());
  //   });
  // }

  ngOnInit(): void {
    this.avionService.listeTypes().subscribe(
      (typs) => {
        console.log('Types data:', typs);
        this.typesAv = typs._embedded?.typeAvs || []; // Use typeAvs here
      },
      (error) => {
        console.error('Error fetching types', error);
      }
    );
  }
  onChange() {
    this.avionService.rechercherparTypeAv(this.idAv).subscribe((avios) => {
      this.avions = avios;
    });
  }
}