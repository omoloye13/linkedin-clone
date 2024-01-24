import { StyleSheet, TextInput, Pressable, Image } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { gql, useMutation } from '@apollo/client';

const insertPost = gql`
	mutation MyMutation($content: String, $image: String, $userId: ID) {
		insertPost(content: $content, image: $image, userid: $userId) {
			content
			id
			image
			userid
		}
	}
`;

export default function NewPostScreen() {
	const [content, setContent] = useState('');
	const [image, setImage] = useState<string | null>(null);
	const navigation = useNavigation();
	const router = useRouter();

	const [handleMutation, { loading, error, data }] = useMutation(insertPost);

	// const onPost = () => {
	// 	console.warn('posting: ', content);

	// 	router.push('/(tabs)/');
	// 	setContent('');
	// 	setImage(null);
	// };
	const onPost = async () => {
		// console.warn(`Posting: ${content}`);
		try {
			await handleMutation({ variables: { content, userId: 1 } });
			//pushing the user back to the home screen immeiately after creating/clicking on the post button

			router.push('/(tabs)/');
			setContent('');
			setImage(null);
		} catch (e) {
			console.log(e);
		}
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable onPress={onPost} style={styles.postButton}>
					<Text style={styles.postButtonText}>Post</Text>
				</Pressable>
			),
		});
	}, [onPost]);

	//Function to pick image from the gallery

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 0.5,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='What do you want to talk about?  '
				multiline
				value={content}
				onChangeText={setContent}
			/>
			{image && <Image source={{ uri: image }} style={styles.image} />}
			<View style={styles.footer}>
				<Pressable style={styles.iconButton} onPress={pickImage}>
					<FontAwesome name='image' size={24} color='black' />
				</Pressable>
				<View style={styles.iconButton}>
					<FontAwesome name='camera' size={24} color='black' />
				</View>
				<View style={styles.iconButton}>
					<FontAwesome name='glass' size={24} color='black' />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	input: {
		fontSize: 20,
		// color: 'white',
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
	postButton: {
		backgroundColor: 'royalblue',
		padding: 5,
		paddingHorizontal: 15,
		borderRadius: 50,
		marginRight: 10,
	},
	postButtonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	footer: {
		// alignSelf:'flex-end',
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	iconButton: {
		backgroundColor: 'gainsboro',
		padding: 12,
		borderRadius: 100,
		overflow: 'hidden',
		width: 50,
		height: 50,
	},
	image: {
		width: '100%',
		aspectRatio: 1,
		marginTop: 'auto',
	},
});
