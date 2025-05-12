import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/countries";
import { Alert, Container, Spinner } from "react-bootstrap";

export function CountryPage() {

  const { code } = useParams<{ code: string }>();
  const { data, error, loading } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">Erreur : {error.message}</Alert>;
  if (!data.country) return <Alert variant="warning">Aucun pays trouvé</Alert>;

  const { name, emoji, continent } = data.country;

  return (
    <>
      <Container className="mt-4 text-center">
        <h1>
          {emoji}
        </h1>
        <p><strong>Name :</strong> {name}</p>
        <p><strong>Code :</strong> {code}</p>
        {continent && <p><strong>Continent :</strong> {continent.name}</p>}
      </Container>
    </>
  )
}