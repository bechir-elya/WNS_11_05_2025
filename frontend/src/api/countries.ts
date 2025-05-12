import { gql } from '@apollo/client';

export interface Country {
  name: string;
  code: string;
  emoji: string;
  continent?: {
    name: string;
  };
}

export interface GetCountriesData {
  countries: Country[];
}

// Query to get all countries

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

// Query to get a country

export const GET_COUNTRY = gql`
  query Country($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;


// Mutation to create a country

export const CREATE_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;