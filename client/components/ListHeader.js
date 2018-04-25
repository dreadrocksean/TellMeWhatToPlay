import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import Logo from '../images/logo.png';

const ListHeader = props => {
	return (
		<View style={styles.component}>
			<View style={styles.children}>{props.children}</View>
			<TouchableOpacity style={styles.logoWrap} onPress={props.home} >
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// backgroundColor: 'rgba(220,220,255,0.9)',
		height: 70,
		// overflow: 'hidden',
	},
	logoWrap: {
		flex: 1,
	},
	logo: {
		flex: 1,
		height: 70,
		width: 70,
	},
	children: {
		flex: 4,
	},
});

