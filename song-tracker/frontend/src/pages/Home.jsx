import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [newlyAddedSong, setNewlyAddedSong] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData('/api/songs/');
        if (data) setSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, [newlyAddedSong]);

  const createSong = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, artist }),
      };
      const [data, error] = await fetchData(`/api/songs/`, options);
      if (data) setNewlyAddedSong(data);
    } catch (error) {
      console.log(error);
    }
    setTitle('');
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={createSong}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          name="artist"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.id}>
              <Link to={`/songs/${song.id}`}>
                Title: {song.title} Artist: {song.artist} Id: {song.id}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
