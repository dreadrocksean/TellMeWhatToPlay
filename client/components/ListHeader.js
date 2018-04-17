import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import Logo from '../images/logo.png';

const ListHeader = props => {
	return (
		<View style={styles.component}>
			{props.children}
			<TouchableOpacity
				onPress={props.home}
			>
				<Image style={styles.logo}
					source={Logo}
				        resizeMode={'contain'}
				/>
			</TouchableOpacity>
		</View>
	);
}

export default ListHeader;

const styles = StyleSheet.create({
	component: {
		padding: 10,
		// flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'rgba(220,220,255,0.9)',
		height: 70,
		// overflow: 'hidden',
	},
	logo: {
		height: 70,
		width: 70,
	},
});

