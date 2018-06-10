import React from 'react';
import ReactDOM from 'react-dom';
import '../sass/style.scss';

var puppies = [
 {category: "male", age: "5", likesKids: true, name: "Dobby", pic: './images/dog1.jpg'},
 {category: "male", age: "4", likesKids: true, name: "Harry", pic: './images/dog2.jpeg'},
 {category: "male", age: "2", likesKids: false, name: "Grumpy", pic: './images/dog3.jpg'},
 {category: "male", age: "3", likesKids: true, name: "Ramzes", pic: './images/dog4.jpg'},
 {category: "male", age: "8", likesKids: false, name: "Rex", pic: './images/dog5.jpg'},
 {category: "male", age: "5", likesKids: true, name: "Pisak", pic: './images/dog6.jpg'},
 {category: "female", age: "3", likesKids: true, name: "Paw", pic: './images/dog7.jpeg'},
 {category: "female", age: "2", likesKids: false, name: "The Dog", pic: './images/dog1.jpg'},
 {category: "female", age: "14", likesKids: true, name: "Simba", pic: './images/dog2.jpeg'},
 {category: "female", age: "5", likesKids: true, name: "Claudette", pic: './images/dog3.jpg'},
 {category: "female", age: "4", likesKids: false, name: "Regina", pic: './images/dog4.jpg'},
 {category: "female", age: "1", likesKids: true, name: "Chap", pic: './images/dog1.jpg'},
 {category: "female", age: "2", likesKids: true, name: "Freezy", pic: './images/dog6.jpg'},
 {category: "female", age: "7", likesKids: false, name: "Ramona", pic: './images/dog4.jpg'},
 {category: "female", age: "6", likesKids: true, name: "Punta", pic: './images/dog5.jpg'},
];

class DogCategoryRow extends React.Component {
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

class DogRow extends React.Component {
  render() {
    let {puppy} = this.props;
    let name = puppy.name;
    return <tr className='table-row'>
      <td className='center'><img className='dogPic' src={puppy.pic}/></td>
      <td><a href='#'>{name}</a> {!puppy.likesKids && <span className='tooltip'><img data-tooltip='this dog does not like kids' src='./images/kid.png'/></span>}</td>
      <td className='center'>{puppy.age}</td>
    </tr>;
  }
}

class DogTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    let lastCategory = null;
    const {filterText, doesLikeKids} = this.props;

    this.props.puppies.forEach((elem) => {
      if (elem.category !== lastCategory) {
        let capitalizeCategory = elem.category.charAt(0).toUpperCase() + elem.category.substr(1);
        rows.push(<DogCategoryRow category={capitalizeCategory}  key={elem.category}/>);
      }

// *** function to filter array by input value and chekckbox state *** //
      if(filterText==='') {
        if(doesLikeKids) {
          if(elem.likesKids) {
            rows.push(<DogRow puppy={elem} key={elem.name} likesKids={elem.likesKids}/>);
          };
        } else {
          rows.push(<DogRow puppy={elem} key={elem.name} likesKids={elem.likesKids}/>);
        }
      } else if(filterText !== '') {
        if(doesLikeKids) {
          if(elem.name.toLowerCase().includes(filterText) && elem.likesKids) {
            rows.push(<DogRow puppy={elem} key={elem.name} likesKids={elem.likesKids}/>);
          }
        } else if(!doesLikeKids) {
          if(elem.name.toLowerCase().includes(filterText)) {
            rows.push(<DogRow puppy={elem} key={elem.name} likesKids={elem.likesKids}/>);
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
      <input type="text" name='searchBar' placeholder="Search by dog's name" onChange={e=>this.handleInputChange(e)}/>
            <div className='checkbox' onClick={e=>this.likesKids(e)}>
              {this.props.doesLikeKids ? <div className='checkboxBox'><img src='./images/tick.png'/></div> : <div className='checkboxBox'></div>}
              <p className='checkboxDesc'>Only show puppies that like kids</p>
            </div>
    </form>;
  }
}

function MainHeader(props) {
  return <div className='main-header-container'>
    <p className='main-header'>
      Adopt a dog
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
          <DogTable
            puppies={this.props.puppies}
            doesLikeKids={this.state.likesKids}
            filterText={this.state.filterText}
          />
      </div>
    </div>;
  }
}

ReactDOM.render(
  <App puppies={puppies}/>,
  document.getElementById('app')
);
