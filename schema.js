import {
  GraphQLSchema,
} from 'graphql';
import fecth from 'node-fetch';

const BASE_URL = 'http://localhost:8000';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: '...',

  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: (person) => person.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (person) => person.lastName,
    },
    email: { type: GraphQLString },
  })
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  desciption: '...',

  fields: () => ({
    person: {
      type: PersonType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: (root, args) => 
          fetch(`${BASE_URL}/people/${args.id}`)
            .then(res => res.json())
            .then(json => json.person)
    }
  })
})

export default new GraphQLSchema({
  query: QueryType,
})