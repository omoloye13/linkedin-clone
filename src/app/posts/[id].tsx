import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';
import { useLocalSearchParams } from 'expo-router';

const PostDetails = () => {
	const { id } = useLocalSearchParams();
	const post = posts.find((post) => post.id === id);

	if (!post) {
		return <Text>Not found</Text>;
	}

	return (
		<ScrollView>
			<PostListItem post={post} />
		</ScrollView>
	);
};

export default PostDetails;
