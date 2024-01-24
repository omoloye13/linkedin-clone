// import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';
import { FlatList, Text, ActivityIndicator } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const postList = gql`
	query postList {
		postList {
			id
			image
			content
			profile {
				image
				id
				name
				position
			}
		}
	}
`;

export default function HomeFeed() {
	const { loading, error, data } = useQuery(postList);

	if (loading) return <ActivityIndicator />;
	if (error) {
		console.log(error);
		return <Text>Something went wrong...</Text>;
	}
	return (
		<FlatList
			data={data.postList}
			renderItem={({ item }) => <PostListItem post={item} />}
			contentContainerStyle={{ gap: 10 }}
			showsVerticalScrollIndicator={false}
			bounces={false}
		/>
	);
}
