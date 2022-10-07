import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { FetchAdapter } from 'src/common/adapters/fetch.adapter';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=650';

  constructor(
    // private readonly httpService: HttpService,
    private readonly pokemonsService: PokemonService,
    private readonly http: AxiosAdapter,
    private readonly fetch: FetchAdapter,
  ) {}

  async executeSeedDB() {
    const pokemonsDB: CreatePokemonDto[] = [];

    try {
      const data = await this.http.get<PokeResponse>(this.baseURL);

      data.results.forEach(({ name, url }) => {
        const segments = url.split('/');
        const no: number = Number(segments[segments.length - 2]);
        name = name.toLowerCase();
        pokemonsDB.push({ name, no });
      })

      await this.pokemonsService.fillPokemonsDBWithSeedData(pokemonsDB);

      return 'Seed executed!';
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemons - Check server logs`)
    }
  }
}
