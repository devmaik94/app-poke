import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pokedex } from 'src/app/models/pokemon-model';
import { PokemonService } from 'src/app/_service/pokemon.service';

@Component({
  selector: 'list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {
  @Output () updateList: EventEmitter<boolean> = new EventEmitter();
  @Input () PokeList: any;
  @Input () sear:any;
  @Input() loader!: number;
  @Output () editPoke: EventEmitter<any> = new EventEmitter();

  dataDel: any;
  dataUpd: any;
  constructor(private pokeService: PokemonService) { 

  }

  ngOnInit() {
    console.log(this.loader)
    setTimeout(() => {
      this.loader = 1;
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  deletePoke(value:Pokedex){

    this.dataDel = {
      attack: value.attack,
      defense: value.defense,
      hp: value.hp,
      id: value.id,
      idAuthor: value.id_author,
      image: value.image,
      name: value.name,
      type: value.type
    }
    
    this.pokeService.deletePokemon(this.dataDel)
      .subscribe(( resp ) =>{
        this.updateList.emit(true);
        
      }, ( error ) =>{  
        console.log(error);
      })
    
  }


  edit(value:any){
    this.dataUpd = []
    this.dataUpd= {
      attack: value.attack,
      defense: value.defense,
      hp: value.hp,
      id: value.id,
      idAuthor: value.id_author,
      image: value.image,
      name: value.name,
      type: value.type
    }

    this.editPoke.emit(this.dataUpd);
    
  }

}