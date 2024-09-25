import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeAv } from '../model/TypeAv.model';
import { AvionService } from '../services/avion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-type',
  templateUrl: './update-type.component.html',
  styles: [],
})
export class UpdateTypeComponent implements OnInit {
  typesAv: TypeAv[] = []; // Initialize as an empty array


  @Input()
  type!: TypeAv;

  @Input()
  ajout!: boolean;

  @Output()
  typeUpdated = new EventEmitter<TypeAv>();

  // @Input()
  // data!: String;

  constructor(private avionService: AvionService, private router: Router) {}

  // ngOnInit(): void {
  //   //console.log(this.data);
  //   console.log('ngOnInit du composant UpdateType ', this.type);
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

  saveType() {
    this.typeUpdated.emit(this.type);
  }
}
