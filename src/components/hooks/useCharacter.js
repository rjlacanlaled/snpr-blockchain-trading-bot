import { useQuery, gql } from "@apollo/client";

const GET_CHARACTER = gql`
    query getCharacter($id: ID!){
        character(id: $id) {
            id
            name
            image
        }
    }
`

const useCharacter = (id) => {
    const {error, loading, data} = useQuery(GET_CHARACTER, {
        variables: {
            id: id
        }
    });

    return { error, loading, data };
}

export default useCharacter;