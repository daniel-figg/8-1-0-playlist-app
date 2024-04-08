import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import fetchData from '../utils/fetchData';

const SongDetails = () => {
  const [song, setSong] = useState({});
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`);
        if (data) setSong(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, []);

  const deleteSong = async () => {
    try {
      const options = {
        method: 'DELETE',
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const changeSongTitle = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, artist }),
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      if (data) setSong(data);
    } catch (error) {
      console.log(error);
    }
    setTitle('');
  };

  return (
    <>
      <h1>Song Details</h1>
      <p>
        Title: {song.title} Artist: {song.artist} Id: {song.id}
      </p>
      <button onClick={deleteSong}>Delete Song</button>
      <form onSubmit={changeSongTitle}>
        <label htmlFor="title">Update Song Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="artist">Update Song Artist</label>
        <input
          type="text"
          name="artist"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </>
  );
};

export default SongDetails;
