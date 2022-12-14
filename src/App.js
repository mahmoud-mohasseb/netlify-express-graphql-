// import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_LOCATIONS = gql`
query GetHello {
  hello
}
`;
// [build]
// publish ='build'
// command = 'npm run build'
// functions='functions'
// 
// [build]
// command = "npm run build"
// functions = "functions"
// publish = "build"
// 
// [build]
// publish = "public"
// command = "echo No build command"
// node_bundler = "esbuild"
// [dev]
// publish = "public"
// node_bundler = "esbuild"

// [[redirects]]
// from = "/api/*"
// to = "/.netlify/functions/:splat"
// status = 200
function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="App">
      <h1>{data?.hello}</h1>
    </div>
  );
}

export default App;
