import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    const pokemons = await this.pokemonModel.find();
    return pokemons;
  }

  async findOne(term: string) {
    // let pokemon: Pokemon;

    // if (!isNaN(Number(term))) {
    //   pokemon = await this.pokemonModel.findOne({ no: term })
    // }

    // // MongoID
    // if (!pokemon && isValidObjectId(term))
    //   pokemon = await this.pokemonModel.findById(term);

    // // Name
    // if (!pokemon)
    //   pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    // if (!pokemon)
    //   throw new NotFoundException(`Pokemon with id, name or no "${ term }" not found`);

    // return pokemon;

    const pokemon = await this.pokemonModel.findOne({
      $or: [
        ...(!isNaN(Number(term)) ? [{ no: term }] : []),
        ...(isValidObjectId(term) ? [{ _id: term }] : []),
        { name: term.toLowerCase().trim() },
      ],
    });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no "${ term }" not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    try {
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    const resultDelete = await this.pokemonModel.findByIdAndDelete(id);

    if (!resultDelete) throw new NotFoundException(`Pokemon with id: "${ id }" not found!`);

    return resultDelete;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
