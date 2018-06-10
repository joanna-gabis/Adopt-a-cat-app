import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/style.scss';

var kitties = [
 {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
 {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
 {category: "male", age: "2", likesKids: false, name: "Grumpy"},
 {category: "male", age: "3", likesKids: true, name: "Ramzes"},
 {category: "male", age: "8", likesKids: false, name: "Gucio"},
 {category: "male", age: "5", likesKids: true, name: "Pisak"},
 {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
 {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
 {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"},
 {category: "female", age: "5", likesKids: true, name: "Klaudyna"},
 {category: "female", age: "4", likesKids: false, name: "Kicia"},
 {category: "female", age: "1", likesKids: true, name: "Mizia"},
 {category: "female", age: "2", likesKids: true, name: "Fizia"},
 {category: "female", age: "7", likesKids: false, name: "Ramona"},
 {category: "female", age: "6", likesKids: true, name: "Puszka"},
];

class CatCategoryRow extends React.Component {
  render() {
    return <tr className='category'>
      <td></td>
      <td colSpan="1" >
        {this.props.category}
      </td>
      <td></td>
    </tr>;
  }
}

class CatRow extends React.Component {
  render() {
    let {kitty} = this.props;
    //let name = kitty.likesKids ? kitty.name : <span style={{color: 'red'}}> {kitty.name} </span>;
    let name = kitty.name;
    return <tr className='table-row'>
      <td className='center'><img className='catPic' src='./images/cat.png'/></td>
      <td><a href='#'>{name}</a> {!kitty.likesKids && <span className='tooltip'><img data-tooltip='this cat does not like kids' src='./images/kid.png'/></span>}</td>
      <td className='center'>{kitty.age}</td>
    </tr>;
  }
}

class CatTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    let lastCategory = null;
    const {filterText, doesLikeKids} = this.props;

    this.props.kitties.forEach((elem) => {
      if (elem.category !== lastCategory) {
        let capitalizeCategory = elem.category.charAt(0).toUpperCase() + elem.category.substr(1);
        rows.push(<CatCategoryRow category={capitalizeCategory}  key={elem.category}/>);
      }

// *** function to filter array by input value and chekckbox state *** //
      if(filterText==='') {
        if(doesLikeKids) {
          if(elem.likesKids) {
            rows.push(<CatRow kitty={elem} key={elem.name} likesKids={elem.likesKids}/>);
          };
        } else {
          rows.push(<CatRow kitty={elem} key={elem.name} likesKids={elem.likesKids}/>);
        }
      } else if(filterText !== '') {
        if(doesLikeKids) {
          if(elem.name.toLowerCase().includes(filterText) && elem.likesKids) {
            rows.push(<CatRow kitty={elem} key={elem.name} likesKids={elem.likesKids}/>);
          }
        } else if(!doesLikeKids) {
          if(elem.name.toLowerCase().includes(filterText)) {
            rows.push(<CatRow kitty={elem} key={elem.name} likesKids={elem.likesKids}/>);
          }
        }
      }
// *** end of filter function *** //

      lastCategory = elem.category;
    });

    return <table className='table'>
      <thead className='table-header'>
        <tr>
          <th className='align-left'></th>
          <th className='align-left'>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody className='table-row'>{rows}</tbody>
    </table>;
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInputChange = (e) => {
    if(typeof this.props.changeInputValue === 'function') {
      this.props.changeInputValue(e);
    }
  }
  likesKids = (e) => {
    if(typeof this.props.likesKids === 'function') {
      this.props.likesKids(e);
    }
  }

  render() {
    return <form className='searchbar'>
      <input type="text" name='searchBar' placeholder="Search by cat's name" onChange={e=>this.handleInputChange(e)}/>
            <div className='checkbox' onClick={e=>this.likesKids(e)}>
              {this.props.doesLikeKids ? <div className='checkboxBox'><img src='./images/tick.png'/></div> : <div className='checkboxBox'></div>}
              <p className='checkboxDesc'>Only show kitties that like kids</p>
            </div>
    </form>;
  }
}

function MainHeader(props) {
  return <div className='main-header-container'>
    <p className='main-header'>
      Adopt a cat
    </p>

  </div>
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      likesKids: false
    }
  }

  handleInputChange = (e) => {
    this.setState({
      filterText: e.target.value.toLowerCase(),
    })
  }
  likesKids = (e) => {
    this.setState({
      likesKids: !this.state.likesKids
    })
  }

  render() {
    return <div>
      <MainHeader/>
        <div className='container'>
          <SearchBar
            filterText={this.state.filterText}
            doesLikeKids={this.state.likesKids}
            likesKids={this.likesKids}
            changeInputValue={this.handleInputChange}
            />
          <CatTable
            kitties={this.props.kitties}
            doesLikeKids={this.state.likesKids}
            filterText={this.state.filterText}
          />
      </div>
    </div>;
  }
}

ReactDOM.render(
  <App kitties={kitties}/>,
  document.getElementById('app')
);
