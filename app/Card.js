import React from 'react';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Column extends React.Component {
	static propTypes = {
		num: PropTypes.number
	}

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	render () {
		return (
			<View style={styles.container}>
				<Text>{this.props.num}</Text>

				<View style={[styles.label, { backgroundColor: this.props.labelColor ? this.props.labelColor : 'lightcoral'}]}></View>
			</View>
		)
	}
}

const styles = StyleSheet.create( {
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#d8d8d8',
		padding: 8,
		marginVertical: 8,
		height: 44,
		borderRadius: 8
	},
	label: {
		backgroundColor: 'lightcoral',
		width: 32,
		height: 8,
		borderRadius: 4,
		position: 'absolute',
		top: 5,
		right: 5
	}
} );