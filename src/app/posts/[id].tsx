import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import React from 'react';
import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';
import { useLocalSearchParams } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($id: ID!) {
		post(id: $id) {
			id
			content
			image
			userid
			profile {
				id
				image
				name
				position
			}
		}
	}
`;

const PostDetails = () => {
	const { id } = useLocalSearchParams();
	const post = posts.find((post) => post.id === id);

	const { loading, error, data } = useQuery(query, { variables: { id } });
	// loading state
	if (loading) {
		return <ActivityIndicator size={24} />;
	}
	if (error) {
		return <Text>Something went wrong...</Text>;
	}

	return (
		<ScrollView>
			<PostListItem post={data.post} />
		</ScrollView>
	);
};

export default PostDetails;
