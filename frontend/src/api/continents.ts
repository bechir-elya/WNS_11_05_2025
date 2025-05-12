import { gql } from '@apollo/client';

export interface Continent {
  id: string;
  name: string;
}

export interface GetContinentsData {
  continents: Continent[];
}


// Query to get all continents

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      id
      name
    }
  }
`;

// Muration to create a continent

export const CREATE_CONTINENT = gql`
  mutation AddContinent($data: NewContinentInput!) {
    addContinent(data: $data) {
      id
      name
    }
  }
`;