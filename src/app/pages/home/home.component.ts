import { Component, OnInit } from '@angular/core';
import { pokedex } from '../../pokedex';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pokemons: any[] = pokedex;
  
  selectedItems: any[] = [];

  data: any = {
    labels: ["HP","Attack","Defense","Sp. Attack","Sp. Defense","Speed"],
    datasets: [
      { label : 'pikachu', borderColor: 'yellow', data: [1,2,1,5,1,3] }
    ]
  }

  colors: string[] = [
    'red', 'blue', 'green', 'yellow', 'pink'
  ]

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    
  }

  toggleFavorite(pokemon: any) {
    pokemon.favori = !pokemon.favori;
    if(pokemon.favori) {
      this.messageService.add({ severity: 'info', summary: pokemon.name.french + ' a été ajouté à vos favoris' })
    } else {
      this.messageService.add({ severity: 'warn', summary: pokemon.name.french + ' a été retiré de vos favoris' })
    }
  }

  addToStats(pokemon: any) {
    this.selectedItems.push(pokemon);

    this.data = {
      labels: ["HP","Attack","Defense","Sp. Attack","Sp. Defense","Speed"],

      datasets: this.selectedItems.map((p, i) => ({ 
        label : p.name.french,
        borderColor: this.colors[i % this.colors.length],
        data: Object.values(p.base) 
      }))
    }
  }
}
