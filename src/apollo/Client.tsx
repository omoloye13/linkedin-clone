import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://sulzbachrosenberg.stepzen.net/api/linkedin/__graphql',
	headers: {
		Authorization:
			'apikey sulzbachrosenberg::stepzen.io+1000::24c6a89b401101a61ed3237fdca6333761ef358740860e029be437118e477971',
	},
	cache: new InMemoryCache(),
});
export default client;
