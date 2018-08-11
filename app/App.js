import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight
} from 'react-native';
import _ from 'lodash';

import Card from './Card';
import SortableListView from 'react-native-sortable-listview'

var cardCount = {
					0: {num: 1, color: 'lightcoral'},
					1: {num: 2, color: 'lightcoral'},
					2: {num: 3, color:'lightcoral'}
				}
let order1 = Object.keys(cardCount) 
var cardCount2 = {
					0: {num: 1, color: 'lightcoral'},
					1: {num: 2, color: 'lightcoral'}
				}
let order2 = Object.keys(cardCount2) 
var colors = ['black', 'white', 'red', 'green', 'blue', 'brown', 'pink', 'yellow']


export default class App extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	cardCount: cardCount
	  };
	}

	changeColor(columnName, i){
		var RandomNumber = Math.floor(Math.random() * 6) + 1 ;
		if(columnName == 'col1')
		{
			cardCount[i.num - 1].color = colors[RandomNumber]
			this.forceUpdate()
			this.setState(this.state)
		}
		else if(columnName == 'col2')
		{
			cardCount2[i.num - 1].color = colors[RandomNumber]
			this.forceUpdate()
			this.setState(this.state)
		}
	}

	addRowToColumn(columnName)
	{
		if(columnName == 'column1')
		{
			
			value = cardCount[Object.keys(cardCount).length - 1]
			value = value.num + 1
			if(value <= 9)
			{
				cardCount[value-1] = {num: value, color: 'lightcoral'}
				order1.push((value-1).toString())
				this.forceUpdate()
				this.setState(this.state)
			}	
		}
		else if(columnName == 'column2')
		{
			value = cardCount2[Object.keys(cardCount2).length - 1]
			value = value.num + 1
			if(value <= 9)
			{
				cardCount2[value-1] = {num: value, color: 'lightcoral'}
				order2.push((value-1).toString())
				this.forceUpdate()
				this.setState(this.state)
			}	
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.column}>
				  <View style={styles.columnContent}>
				  	 <SortableListView
				        style={{ flex: 1 }}
				        data={this.state.cardCount}
				        order={order1}
				        onRowMoved={e => {
				          order1.splice(e.to, 0, order1.splice(e.from, 1)[0])
				          this.forceUpdate()
				        }}
				        renderRow={(row, i) => <RowComponent data={row} color={row.color} i={i} changeColor={this.changeColor.bind(this)} colName={'col1'}/>}
				      />
					
				  </View>

				  <TouchableOpacity 
				  	style={styles.addBtn}
				  	onPress={()=>this.addRowToColumn('column1')}>
					<Text style={styles.addBtnText}>Add</Text>
				  </TouchableOpacity>
				</View>

			<View style={styles.column}>
				  <View style={styles.columnContent}>
					 <SortableListView
				        style={{ flex: 1 }}
				        data={cardCount2}
				        order={order2}
				        onRowMoved={e => {
				          order2.splice(e.to, 0, order2.splice(e.from, 1)[0])
				          this.forceUpdate()
				        }}
				        renderRow={(row, i) => <RowComponent data={row} i={i} changeColor={this.changeColor.bind(this)} colName={'col2'}/>}
				      />
				  </View>

				  <TouchableOpacity 
				  	onPress={()=>this.addRowToColumn('column2')}
				  	style={styles.addBtn}>
					<Text style={styles.addBtnText}>Add</Text>
				  </TouchableOpacity>
			</View>
	  </View>
		);
	}
}

class RowComponent extends React.PureComponent {
  changeColor(columnName, data){
  		this.props.changeColor(columnName, data)
  }
  render() {
    return (
			<TouchableOpacity
				underlayColor={'#FFF'}
				key={this.props.data.num+"col1"}
				onPress={()=>this.changeColor(this.props.colName,this.props.data)}
				 {...this.props.sortHandlers}>
				<Card num={this.props.data.num}  labelColor={this.props.data.color}/>
			</TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#f2f2f2',
		padding: 8,
		paddingTop: 20,
		flexDirection: 'row'
	},

	column: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: '#FFF',
		padding: 8,
		margin: 8
	},
	columnContent: {
		flex: 1,
  },
  addBtn: {
	height: 50,
	backgroundColor: '#412243',
	marginTop: 12,
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 8
  },
  addBtnText: {
	color: '#fff',
	fontWeight: 'bold',
	fontSize: 20,
  }
} );