import { Component, OnInit } from '@angular/core';
import { Pokedex } from 'src/app/models/pokemon-model';
import { PokemonService } from 'src/app/_service/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loadinit: any;
  dataEdit:any;
  containerAdd = false;
  pokemonData: Array<Pokedex>[] = [];
  search='';
  constructor(private pokeService:PokemonService){
    this.getPokemon();
  } 

  ngOnInit(): void {
  }
  getPokemon(){
    this.pokeService.getPokemon()
      .subscribe( (resp: any) => {
        this.pokemonData =  resp;
        this.loadinit= 0;
      })
  }

  add(){
    this.containerAdd = true;
    this.dataEdit = 'add'
  }

  formCancel(event:boolean){
    this.containerAdd = event;
  }

  updateData(event:boolean){
    this.pokemonData = [];
    if (event === true) {
      this.getPokemon();
      this.loadinit = 0;
      console.info('Data actualizada');
    }
  }

  edit(value: any){
    this.containerAdd = true
    this.dataEdit = []
    this.dataEdit = value;
  }
}
