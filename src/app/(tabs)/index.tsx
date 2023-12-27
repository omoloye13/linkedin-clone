import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import posts from '../../../assets/data/posts.json';
import PostListItem from '../../components/PostListItem';

import { FlatList } from 'react-native';

export default function HomeFeed() {
	return (
		<FlatList
			data={posts}
			renderItem={({ item }) => <PostListItem post={item} />}
			contentContainerStyle={{ gap: 10 }}
			showsVerticalScrollIndicator={false}
			bounces={false}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
