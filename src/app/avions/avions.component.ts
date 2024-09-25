import { Component, OnInit } from '@angular/core';
import { Avion } from '../model/avion.model';
import { AvionService } from '../services/avion.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
})
export class AvionsComponent implements OnInit {

  avions?: Avion[]; //un tableau des avions

  constructor(private avionService: AvionService,
    private router : Router,
    public authService: AuthService)

  {

    
    
  }

  ngOnInit(): void {
    this.chargerAvions();
  }
  chargerAvions() {
    this.avionService.listeAvion().subscribe((avios) => {
      console.log(avios);
      this.avions = avios;
    });
  }
  supprimerAvion(a: Avion) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.avionService.supprimerAvion(a.idAvion).subscribe(() => {
        console.log('avion supprimé');
        this.chargerAvions();
      });
  }


}
