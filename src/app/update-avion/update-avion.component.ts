import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AvionService } from '../services/avion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Avion } from '../model/avion.model';
import { TypeAv } from '../model/TypeAv.model';

@Component({
  selector: 'app-update-avion',
  templateUrl: './update-avion.component.html',
  styles: [],
})
export class UpdateAvionComponent implements OnInit {
  currentAvion = new Avion();
  types: TypeAv[] = []; // Initialize as an empty array
  updatedTypId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private avionService: AvionService
  ) {}
  ngOnInit(): void {
    this.avionService.listeTypes().subscribe(
      (typs) => {
        console.log("API Response:", typs);
        this.types = typs._embedded?.typeAvs || []; // Use typeAvs here
        console.log("types:", this.types);
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  
    this.avionService
      .consulterAvion(this.activatedRoute.snapshot.params['id'])
      .subscribe((avio) => {
        this.currentAvion = avio;
        this.updatedTypId = this.currentAvion.typeAv.idAv;
      });
  }
  
  

  updateAvion() {
    this.currentAvion.typeAv = this.types.find(
      (typ) => typ.idAv == this.updatedTypId
    )!;

    this.avionService.updateAvion(this.currentAvion).subscribe(() => {
      this.router.navigate(['avions']);
    });
  }
}
