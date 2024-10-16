import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchGitHubUsers = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}`);
      setUsers(response.data.items);
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchGitHubUsers(query);
    }
  };

  return (
    <div id="app">
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <div>
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="enter the name you search" />&nbsp;<button onClick={handleSearch}>Search</button>
          </div>
        </section>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="row">
          {
            users.map((u) => <div className="card">
              <a href={u.html_url} target="_blank">
                <img src={u.avatar_url} style={{ width: "100px" }} />
              </a>
              <p className="card-text">{u.login}</p>
            </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
