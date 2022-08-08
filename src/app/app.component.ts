import { Component } from '@angular/core';
import { Pokedex } from './models/pokemon-model';
import { PokemonService } from './_service/pokemon.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // formCancel(event:any){
  //   console.log(event);
  // }
}
