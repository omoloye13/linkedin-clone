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
