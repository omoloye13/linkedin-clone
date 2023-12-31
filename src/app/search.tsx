import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import users from '../../assets/data/users.json';
import UserListItem from '../components/UserListItem';
import { useNavigation } from 'expo-router';

const SearchScreen = () => {
	const navigation = useNavigation();
	const [search, setSearch] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerSearchBarOptions: {
				//serach bar options
				placeholder: 'Search Users',
				onChangeText: setSearch,
			},
		});
	}, [navigation]);
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

const styles = StyleSheet.create({});
