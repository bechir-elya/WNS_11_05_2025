import { useMutation, useQuery } from "@apollo/client";
import { Alert, Col, Container, Row, Spinner, Form, Button } from "react-bootstrap";
import { GET_COUNTRIES, CREATE_COUNTRY, GetCountriesData } from "../api/countries";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GET_CONTINENTS, GetContinentsData } from "../api/continents";

export function HomePage() {
  const { data, error, loading } = useQuery<GetCountriesData>(GET_COUNTRIES);
  const { data: continentsData } = useQuery<GetContinentsData>(GET_CONTINENTS);


  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [continent, setContinent] = useState("");


  const [addCountry, { loading: adding, error: addError }] = useMutation(CREATE_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      const existingData = cache.readQuery<GetCountriesData>({ query: GET_COUNTRIES });
      if (existingData) {
        cache.writeQuery({
          query: GET_COUNTRIES,
          data: {
            countries: [...existingData.countries, addCountry],
          },
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !emoji || !code) return;

    try {
      await addCountry({
        variables: {
          data: { name, emoji, code, continent },
        },
      });

      // Clear form
      setName("");
      setEmoji("");
      setCode("")
      setContinent("");
    } catch (err) {
      console.error("Error adding country", err);
    }
  };

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">Erreur: {error.message}</Alert>;
  if (!data) return <Alert variant="warning">Aucun pays trouvé</Alert>;

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Row xs={1} sm={2} md={4} className="mb-5 align-items-end">
          <Col>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>

          <Col>
            <Form.Label>Emoji</Form.Label>
            <Form.Control
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              required
            />
          </Col>

          <Col>
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              required
            />
          </Col>

          <Col>
            <Form.Label>Continent</Form.Label>
            <Form.Select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              required
            >
              <option value="">Sélectionner...</option>
              {continentsData?.continents.map((continent: any) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
            </Form.Select>
          </Col>


          <Col>
            <Button type="submit" disabled={adding} className="w-100 mt-4" style={{ backgroundColor: "#F7146B", border: "none" }}>
              {adding ? "Adding..." : "Add"}
            </Button>
          </Col>
        </Row>
      </Form>

      {addError && <Alert variant="danger">Erreur lors de l'ajout : {addError.message}</Alert>}

      <Row xs={1} sm={2} md={3} className="g-4">
        {data.countries.map((country: any) => (
          <Col key={country.code}>
            <Link to={`/country/${country.code}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="border rounded p-3 text-center shadow-sm h-100" style={{ cursor: "pointer" }}>
                <span style={{ fontSize: "2rem" }}>{country.emoji}</span>
                <h5 className="mt-2">{country.name}</h5>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
