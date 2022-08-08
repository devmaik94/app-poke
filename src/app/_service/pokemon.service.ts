import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokedex} from '../models/pokemon-model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  getPokemon(): Observable<Pokedex>{
    return this.httpClient.get<Pokedex>('https://bp-pokemons.herokuapp.com/?idAuthor=1');
  }

  createPokemon(pokeData: any): Observable<any>{
    return this.httpClient.post<any>('https://bp-pokemons.herokuapp.com/?idAuthor=1', pokeData);
    
  }

  deletePokemon(data: any): Observable<any>{
    const user = 2348;

    return this.httpClient.delete<any>(`https://bp-pokemons.herokuapp.com/${data.id}`);
  }

  updatePokemon(data: any): Observable<any>{
    console.log(data.id)
    return this.httpClient.put(`https://bp-pokemons.herokuapp.com/${data.id}`, data);
  }
  

}
