const getId = require('../utils/getId');

/* 
This class provides an interface for managing Song data. 
Instances of this class can't do much really. They just store data.

The class itself provides static methods for CRUD actions on 
the collection of songs.
*/
class Song {
  static #all = [];

  constructor(title, artist) {
    this.id = getId();
    this.title = title;
    this.artist = artist;

    Song.#all.push(this);
  }

  static list() {
    return Song.#all;
  }

  static find(id) {
    return Song.#all.find((song) => song.id === id);
  }

  static update(id, newTitle, newArtist) {
    const song = Song.find(id);
    if (!song) return null;
    song.title = newTitle;
    song.artist = newArtist;
    return song;
  }

  static delete(id) {
    const songIndex = Song.#all.findIndex((song) => song.id === id);
    if (songIndex < 0) return null;

    Song.#all.splice(songIndex, 1);
    return true;
  }

  static deleteAll() {
    if (!Song.#all.length) return null;

    Song.#all.length = 0;
    return Song.#all;
  }
}

module.exports = Song;
