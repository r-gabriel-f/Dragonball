import type { Character } from '../../models/character';
import QueryService from '../query.service';

export default new class CharacterService extends QueryService<Character> {
  constructor() {
    super('/characters', 'characters');
  }
};