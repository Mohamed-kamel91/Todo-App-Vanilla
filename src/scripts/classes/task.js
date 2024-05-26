import { generateID } from '../utils/generateId.js';

export default class Task {
  constructor(text) {
    this.id = generateID();
    this.text = text;
    this.completed = false;
  }
}
