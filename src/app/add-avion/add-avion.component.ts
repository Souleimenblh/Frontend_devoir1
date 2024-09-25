import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion.model';
import { AvionService } from '../services/avion.service';
import { TypeAv } from '../model/TypeAv.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-avion',
  templateUrl: './add-avion.component.html',
})
export class AddAvionComponent implements OnInit {
  newAvion = new Avion();
  typesAv: TypeAv[] = []; // Initialize as an empty array
  newIdAv!: number;

  message: string = '';

  constructor(private avionService: AvionService, private router: Router) {}

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

  addAvion() {
    const selectedType = this.typesAv.find(type => type.idAv === this.newIdAv);
    
    if (selectedType) {
      this.newAvion.typeAv = selectedType; // Set the type for the new avion
    }

    this.avionService.ajouterAvion(this.newAvion).subscribe((avio) => {
      console.log(avio);
      this.router.navigate(['avions']);
    });
  }
}
