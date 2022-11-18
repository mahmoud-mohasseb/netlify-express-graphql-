import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
query GetHello {
  hello
}
`;

// [build]
// publish ='build'
// command = 'npm run build'
// functions='functions'



// [[redirects]]
//     from = "/api/*"
//     to = "/.netlify/functions/:splat"
//     status = 200


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
