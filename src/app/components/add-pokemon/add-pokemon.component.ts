import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokemonService } from '../../_service/pokemon.service'
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {
  formPokemon!: FormGroup;
  @Input() dataEdit!: any;
  @Output () formCancel: EventEmitter<boolean> = new EventEmitter();
  @Output () updateList: EventEmitter<boolean> = new EventEmitter();
  
  

  constructor(private fb: FormBuilder, private pokeService: PokemonService) { 

  }

  ngOnInit(){
    this.formPokemon.valueChanges.subscribe(res =>{
      console.log(res);
    });
 
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.dataEdit === 'add') {
      this.form();
    }else{  
      this.editForm()
    }
    
  }


  form(){
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formPokemon =  this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5) ]],
      image: ['', [Validators.required, Validators.pattern(reg), Validators.min(3)] ],
      hp:[0],
      type: ['test'],
      idAuthor:[1],
      attack: [ 0, Validators.required],
      defense: [ 0, Validators.required]
    });
  }

  editForm(){
    this.form()
    this.formPokemon.addControl('id', this.fb.control(''));
    
    this.formPokemon.patchValue({
      name: this.dataEdit.name,
      image: this.dataEdit.image,
      hp: this.dataEdit.hp,
      id:this.dataEdit.id,
      type: this.dataEdit.type,
      idAuthor: this.dataEdit.idAuthor,
      attack: this.dataEdit.attack,
      defense: this.dataEdit.defense
    })
  }



  save(){

    if (this.dataEdit === 'add') {
      this.pokeService.createPokemon(this.formPokemon.value)
        .subscribe( (resp) =>{
          this.updateList.emit(true);
          this.form();
          this.formCancel.emit(false);
        }, (error) =>{
          console.log(error);
        })
    }else{
      this.pokeService.updatePokemon(this.formPokemon.value)
      .subscribe( (resp) =>{
        this.updateList.emit(true);
        this.form();
        this.formCancel.emit(false);

      }, (error) =>{
        console.log(error);
      })
    }

   
  }

  cancelPoke(){
    this.form();
    this.dataEdit = ''
    this.formCancel.emit(false);
  }
  

}
