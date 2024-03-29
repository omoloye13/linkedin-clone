import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	Image,
	ActivityIndicator,
	Pressable,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import userData from '../../../assets/data/user.json';
import { useState, useLayoutEffect } from 'react';
import { User } from '../../types';
import ExperienceListItem from '../../components/ExperienceListItem';

import { gql, useQuery } from '@apollo/client';

const query = gql`
	query MyQuery($id: ID!) {
		profile(id: $id) {
			id
			image
			name
			backimage
			about
			experience {
				companyimage
				companyname
				id
				title
				userid
			}
			position
		}
	}
`;

const UserProfile = () => {
	// const [user, setUser] = useState<User>(userData);
	const { id } = useLocalSearchParams();

	const { loading, error, data } = useQuery(query, { variables: { id } });
	const user = data?.profile;
	// loading state
	if (loading) {
		return <ActivityIndicator size={24} />;
	}
	if (error) {
		return <Text>Something went wrong...</Text>;
	}
	const navigation = useNavigation();
	useLayoutEffect(() => {
		navigation.setOptions({ title: user?.name || 'User' });
	}, [user?.name]);

	return (
		<ScrollView>
			<View style={styles.headerContainer}>
				<Image source={{ uri: user?.backimage }} style={styles.backImage} />
				<View style={styles.headerContent}>
					<Image source={{ uri: user.image }} style={styles.image} />

					<Text style={styles.name}>{user.name}</Text>
					<Text>{user.position}</Text>

					<Pressable style={styles.button}>
						<Text style={styles.buttonText}>Connect</Text>
					</Pressable>
				</View>
			</View>

			{user.about && (
				<View style={styles.container}>
					<Text style={styles.title}>About</Text>
					<Text>{user.about}</Text>
				</View>
			)}

			<View style={styles.container}>
				<Text style={styles.title}>Experience</Text>
				{user.experience?.map((experience) => (
					<ExperienceListItem experience={experience} key={experience.id} />
				))}
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: 'white',
	},
	headerContainer: {
		marginBottom: 5,
		backgroundColor: 'white',
	},
	headerContent: {
		padding: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		marginVertical: 5,
	},
	backImage: {
		width: '100%',
		height: 150,
		marginBottom: -60,
	},
	image: {
		width: 100,
		aspectRatio: 1,
		borderRadius: 100,
		borderWidth: 3,
		borderColor: 'white',
		marginBottom: 10,
	},
	name: {
		fontSize: 24,
		fontWeight: '500',
	},

	button: {
		backgroundColor: 'royalblue',
		padding: 5,
		borderRadius: 100,
		alignItems: 'center',
		marginVertical: 10,
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16,
	},
});
export default UserProfile;
