import { StyleSheet, TextInput, View, FlatList } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import users from '../../assets/data/users.json';
import UserListItem from '../components/UserListItem';
import { useNavigation } from 'expo-router';

const SearchScreen = () => {
	const navigation = useNavigation();
	const [search, setSearch] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={styles.searchBarContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder='Search Users'
						onChangeText={setSearch}
					/>
				</View>
			),
		});
	}, [navigation, setSearch]);
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<FlatList
				data={users}
				renderItem={({ item }) => <UserListItem user={item} />}
			/>
		</View>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	searchBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchInput: {
		// flex: 1,
		// backgroundColor: 'white', // Adjust styles as needed
		borderRadius: 10,
		paddingHorizontal: 0,
		height: 40,
	},
});
